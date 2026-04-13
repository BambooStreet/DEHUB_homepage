import Link from "next/link";
import { news } from "@/data/news";

export default function RecentNews() {
  const recentNews = news.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Latest News</h2>
          <Link href="/news" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentNews.map((item) => (
            <article
              key={item.id}
              className="p-6 rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all"
            >
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-600 mb-3">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{item.date}</p>
              <p className="text-sm text-slate-600 line-clamp-2">{item.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
