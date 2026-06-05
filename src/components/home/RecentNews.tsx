import Link from "next/link";
import { getNews } from "@/lib/db/queries";
import type { NewsItem } from "@/types";

export default async function RecentNews() {
  const all = await getNews();
  const recentNews = all.filter((n) => n.category !== "announcement").slice(0, 3);
  const recentNotices = all.filter((n) => n.category === "announcement").slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Column
            title="Latest News"
            items={recentNews}
            viewAllHref="/news?tab=news"
            emptyText="아직 등록된 소식이 없습니다."
          />
          <Column
            title="Notice"
            items={recentNotices}
            viewAllHref="/news?tab=notice"
            emptyText="아직 등록된 공지가 없습니다."
          />
        </div>
      </div>
    </section>
  );
}

function Column({
  title,
  items,
  viewAllHref,
  emptyText,
}: {
  title: string;
  items: NewsItem[];
  viewAllHref: string;
  emptyText: string;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between border-b border-secondary-200 pb-3">
        <h2 className="text-xl md:text-2xl font-bold text-secondary-800">{title}</h2>
        <Link
          href={viewAllHref}
          className="text-xs font-medium text-secondary-500 hover:text-secondary-800"
        >
          View all →
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-secondary-400">{emptyText}</p>
      ) : (
        <ul className="divide-y divide-secondary-100">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className="group block py-3 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium text-secondary-800 group-hover:text-primary-700 line-clamp-2">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-xs text-secondary-400">
                    {formatDate(item.date)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDate(date: string): string {
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return date;
  return `${y}.${m}.${d}`;
}
