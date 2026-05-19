import { neon } from "@neondatabase/serverless";

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("Adding region column if missing...");
  await sql`
    ALTER TABLE publications
      ADD COLUMN IF NOT EXISTS region TEXT NOT NULL DEFAULT 'international'
      CHECK (region IN ('domestic','international'))
  `;

  console.log("Adding indexing column if missing...");
  await sql`
    ALTER TABLE publications
      ADD COLUMN IF NOT EXISTS indexing TEXT
  `;

  console.log("Wiping existing publications so the new seed can take over...");
  await sql`TRUNCATE publications`;

  console.log("Adding received column to members if missing...");
  await sql`
    ALTER TABLE members
      ADD COLUMN IF NOT EXISTS received TEXT[] NOT NULL DEFAULT '{}'
  `;

  console.log("Adding work_at column to members if missing...");
  await sql`
    ALTER TABLE members
      ADD COLUMN IF NOT EXISTS work_at TEXT
  `;

  console.log("Wiping existing members so the new seed can take over...");
  await sql`TRUNCATE members`;

  console.log("Migration complete. Run `npm run db:seed` next.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
