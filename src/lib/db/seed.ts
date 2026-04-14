import { neon } from "@neondatabase/serverless";
import { members } from "../../data/members";
import { publications } from "../../data/publications";
import { news } from "../../data/news";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("Seeding members...");
  for (const m of members) {
    await sql`
      INSERT INTO members (id, name, name_en, role, position, email, image, research, homepage, graduation_year)
      VALUES (${m.id}, ${m.name}, ${m.nameEn}, ${m.role}, ${m.position},
              ${m.email ?? null}, ${m.image ?? null}, ${m.research ?? []},
              ${m.homepage ?? null}, ${m.graduationYear ?? null})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  console.log("Seeding publications...");
  for (const p of publications) {
    await sql`
      INSERT INTO publications (id, title, authors, venue, year, type, link, doi)
      VALUES (${p.id}, ${p.title}, ${p.authors}, ${p.venue}, ${p.year},
              ${p.type}, ${p.link ?? null}, ${p.doi ?? null})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  console.log("Seeding news...");
  for (const n of news) {
    await sql`
      INSERT INTO news (id, title, date, content, category, image)
      VALUES (${n.id}, ${n.title}, ${n.date}, ${n.content},
              ${n.category}, ${n.image ?? null})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
