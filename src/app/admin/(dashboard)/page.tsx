import Link from "next/link";
import { getDb } from "@/lib/db";

async function getCounts() {
  const sql = getDb();
  const [members] = await sql`SELECT COUNT(*)::int AS count FROM members`;
  const [news] = await sql`SELECT COUNT(*)::int AS count FROM news`;
  const [publications] = await sql`SELECT COUNT(*)::int AS count FROM publications`;
  const [projects] = await sql`SELECT COUNT(*)::int AS count FROM projects`;
  const [awards] = await sql`SELECT COUNT(*)::int AS count FROM awards`;
  return {
    members: members.count as number,
    news: news.count as number,
    publications: publications.count as number,
    projects: projects.count as number,
    awards: awards.count as number,
  };
}

const cards = [
  { label: "Members", href: "/admin/members", key: "members" as const },
  { label: "News", href: "/admin/news", key: "news" as const },
  { label: "Publications", href: "/admin/publications", key: "publications" as const },
  { label: "Projects", href: "/admin/projects", key: "projects" as const },
  { label: "Awards", href: "/admin/awards", key: "awards" as const },
];

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-secondary-500">{card.label}</p>
            <p className="text-3xl font-bold text-secondary-800 mt-1">
              {counts[card.key]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
