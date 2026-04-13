import Link from "next/link";
import { news } from "@/data/news";

export default function RecentNews() {
  const recentNews = news.slice(0, 3);

  return (
    <section className="py-16 bg-secondary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800">Latest News</h2>
          <Link href="/news" className="inline-flex items-center gap-1 px-4 py-2 bg-secondary-800 text-white text-sm font-medium rounded-lg hover:bg-secondary-700 transition-colors">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentNews.map((item) => (
            <article
              key={item.id}
              className="p-6 rounded-xl border border-secondary-100 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-600 text-white mb-3">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">{item.title}</h3>
              <p className="text-sm text-secondary-400 mb-3">{item.date}</p>
              <p className="text-sm text-secondary-500 line-clamp-2">{item.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
