import Link from "next/link";
import { publications } from "@/data/publications";

export default function RecentPublications() {
  const recentPubs = publications.slice(0, 3);

  return (
    <section className="py-16 bg-secondary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800">Recent Publications</h2>
          <Link href="/publications" className="inline-flex items-center gap-1 px-4 py-2 bg-secondary-800 text-white text-sm font-medium rounded-lg hover:bg-secondary-700 transition-colors">
            View all &rarr;
          </Link>
        </div>
        <div className="space-y-4">
          {recentPubs.map((pub) => (
            <div
              key={pub.id}
              className="p-5 bg-white rounded-xl border border-secondary-100 hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-secondary-800">{pub.title}</h3>
                  <p className="text-sm text-secondary-400 mt-1">{pub.authors.join(", ")}</p>
                  <p className="text-sm text-secondary-300 mt-1">{pub.venue}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-white bg-primary-600 px-2 py-1 rounded">
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
