import { neon } from "@neondatabase/serverless";
import { members } from "../../data/members";
import { publications } from "../../data/publications";
import { news } from "../../data/news";

const sql = neon(process.env.DATABASE_URL!);

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 5): Promise<T> {
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const wait = 500 * 2 ** (i - 1);
      console.warn(`  [${label}] attempt ${i}/${attempts} failed, retrying in ${wait}ms...`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

async function seed() {
  console.log("Seeding members...");
  for (const m of members) {
    await withRetry(m.id, () => sql`
      INSERT INTO members (id, name, name_en, role, position, email, image, research, homepage, graduation_year)
      VALUES (${m.id}, ${m.name}, ${m.nameEn}, ${m.role}, ${m.position},
              ${m.email ?? null}, ${m.image ?? null}, ${m.research ?? []},
              ${m.homepage ?? null}, ${m.graduationYear ?? null})
      ON CONFLICT (id) DO NOTHING
    `);
  }

  console.log("Seeding publications...");
  for (const p of publications) {
    await withRetry(p.id, () => sql`
      INSERT INTO publications (id, title, authors, venue, year, type, region, indexing, link, doi)
      VALUES (${p.id}, ${p.title}, ${p.authors}, ${p.venue}, ${p.year},
              ${p.type}, ${p.region}, ${p.indexing ?? null},
              ${p.link ?? null}, ${p.doi ?? null})
      ON CONFLICT (id) DO NOTHING
    `);
  }

  console.log("Seeding news...");
  for (const n of news) {
    await withRetry(n.id, () => sql`
      INSERT INTO news (id, title, date, content, category, image)
      VALUES (${n.id}, ${n.title}, ${n.date}, ${n.content},
              ${n.category}, ${n.image ?? null})
      ON CONFLICT (id) DO NOTHING
    `);
  }

  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
