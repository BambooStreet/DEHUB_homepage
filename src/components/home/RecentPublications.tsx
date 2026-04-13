import Link from "next/link";
import { publications } from "@/data/publications";

export default function RecentPublications() {
  const recentPubs = publications.slice(0, 3);

  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Recent Publications</h2>
          <Link href="/publications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all &rarr;
          </Link>
        </div>
        <div className="space-y-4">
          {recentPubs.map((pub) => (
            <div
              key={pub.id}
              className="p-5 bg-white rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{pub.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{pub.authors.join(", ")}</p>
                  <p className="text-sm text-slate-400 mt-1">{pub.venue}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {pub.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
