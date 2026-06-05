import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level?: number; text: string }
  | { type: "image"; src: string; alt?: string; caption?: string; local?: string };

interface CrawledArticle {
  source_url: string;
  article_no: string;
  title: string;
  date: string;
  views?: string;
  category?: string;
  category_tag?: string;
  main_image?: string;
  blocks: Block[];
}

type ImportType = "news" | "notice";

interface Config {
  type: ImportType;
  jsonFile: string;
  idPrefix: string;
  blobFolder: string;
  dbCategory: string | null;
  mainImageLocalDir: string;
}

const CONFIGS: Record<ImportType, Config> = {
  news: {
    type: "news",
    jsonFile: "news.json",
    idPrefix: "crawled-",
    blobFolder: "news/crawled",
    dbCategory: null,
    mainImageLocalDir: "images",
  },
  notice: {
    type: "notice",
    jsonFile: "notice.json",
    idPrefix: "crawled-notice-",
    blobFolder: "notice/crawled",
    dbCategory: "announcement",
    mainImageLocalDir: "images_notice",
  },
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CRAWLER_DIR = join(ROOT, "crawler");

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function paragraphToHtml(text: string): string {
  return `<p>${escapeHtml(text).replace(/\n/g, "<br>")}</p>`;
}

function blocksToHtml(blocks: Block[], urlMap: Map<string, string>): string {
  const out: string[] = [];
  for (const b of blocks) {
    if (b.type === "paragraph") {
      out.push(paragraphToHtml(b.text));
    } else if (b.type === "heading") {
      const lvl = Math.min(Math.max(b.level ?? 2, 2), 4);
      out.push(`<h${lvl}>${escapeHtml(b.text)}</h${lvl}>`);
    } else if (b.type === "image") {
      const newSrc = urlMap.get(b.src) ?? b.src;
      const alt = escapeAttr(b.alt || "");
      if (b.caption) {
        out.push(
          `<figure><img src="${escapeAttr(newSrc)}" alt="${alt}"><figcaption>${escapeHtml(b.caption)}</figcaption></figure>`,
        );
      } else {
        out.push(`<figure><img src="${escapeAttr(newSrc)}" alt="${alt}"></figure>`);
      }
    }
  }
  return out.join("\n");
}

async function uploadOnce(
  localPath: string,
  blobKey: string,
  cache: Map<string, string>,
): Promise<string> {
  const cached = cache.get(localPath);
  if (cached) return cached;
  const buf = readFileSync(localPath);
  const blob = await put(blobKey, buf, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  cache.set(localPath, blob.url);
  return blob.url;
}

async function main() {
  const arg = process.argv[2];
  if (arg !== "news" && arg !== "notice") {
    throw new Error(`Usage: tsx import_crawled.ts <news|notice>`);
  }
  const cfg = CONFIGS[arg];

  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  if (!process.env.BLOB_READ_WRITE_TOKEN)
    throw new Error("BLOB_READ_WRITE_TOKEN is not set");

  const jsonPath = join(CRAWLER_DIR, cfg.jsonFile);
  if (!existsSync(jsonPath)) throw new Error(`${cfg.jsonFile} not found at ${jsonPath}`);

  const sql = neon(process.env.DATABASE_URL);
  const articles: CrawledArticle[] = JSON.parse(readFileSync(jsonPath, "utf8"));
  console.log(`[${cfg.type}] Loaded ${articles.length} articles from ${cfg.jsonFile}`);

  const existing = await sql`
    SELECT id FROM news WHERE id LIKE ${cfg.idPrefix + "%"}
  `;
  const existingIds = new Set(existing.map((r) => r.id as string));
  console.log(`[${cfg.type}] ${existingIds.size} already imported, will skip.`);

  const uploadCache = new Map<string, string>();
  let inserted = 0;
  let skipped = 0;
  let imageCount = 0;

  for (const a of articles) {
    const id = `${cfg.idPrefix}${a.article_no}`;
    if (existingIds.has(id)) {
      skipped++;
      continue;
    }

    const urlMap = new Map<string, string>();
    for (const b of a.blocks) {
      if (b.type === "image" && b.local) {
        const localFull = join(CRAWLER_DIR, b.local);
        if (!existsSync(localFull)) {
          console.warn(`  [${a.article_no}] missing local image: ${b.local}`);
          continue;
        }
        const filename = b.local.split("/").pop()!;
        const blobKey = `${cfg.blobFolder}/${filename}`;
        const newUrl = await uploadOnce(localFull, blobKey, uploadCache);
        urlMap.set(b.src, newUrl);
        imageCount++;
      }
    }

    let mainImage: string | null = null;
    if (a.main_image) {
      mainImage = urlMap.get(a.main_image) ?? a.main_image;
      if (mainImage === a.main_image) {
        const srcName = a.main_image.split("/").pop();
        if (srcName) {
          const candidate = join(CRAWLER_DIR, cfg.mainImageLocalDir, srcName);
          if (existsSync(candidate)) {
            mainImage = await uploadOnce(
              candidate,
              `${cfg.blobFolder}/${srcName}`,
              uploadCache,
            );
            imageCount++;
          }
        }
      }
    }

    const html = blocksToHtml(a.blocks, urlMap);

    await sql`
      INSERT INTO news (id, title, date, content, category, image)
      VALUES (${id}, ${a.title}, ${a.date}, ${html}, ${cfg.dbCategory}, ${mainImage})
      ON CONFLICT (id) DO NOTHING
    `;
    inserted++;
    console.log(
      `  [${inserted}/${articles.length - skipped}] ${a.date} ${a.title.slice(0, 50)}`,
    );
  }

  console.log(
    `\n[${cfg.type}] Done. Inserted: ${inserted}, Skipped: ${skipped}, Images: ${imageCount}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
