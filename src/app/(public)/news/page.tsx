export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { getNews } from "@/lib/db/queries";
import NewsCard from "@/components/news/NewsCard";

export const metadata: Metadata = {
  title: "News",
};

type Tab = "news" | "notice";

const tabs: { value: Tab; label: string }[] = [
  { value: "news", label: "News" },
  { value: "notice", label: "Notice" },
];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const sp = await searchParams;
  const tab: Tab = sp.tab === "notice" ? "notice" : "news";

  const all = await getNews();
  const filtered =
    tab === "notice"
      ? all.filter((n) => n.category === "announcement")
      : all.filter((n) => n.category !== "announcement");

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
          {tab === "notice" ? "Notice" : "News"}
        </h1>

        <div className="mb-8 flex items-center gap-1 border-b border-secondary-200">
          {tabs.map((t) => {
            const active = tab === t.value;
            return (
              <Link
                key={t.value}
                href={`/news?tab=${t.value}`}
                className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "text-secondary-900"
                    : "text-secondary-500 hover:text-secondary-700"
                }`}
              >
                {t.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-900" />
                )}
              </Link>
            );
          })}
        </div>

        <p className="text-sm text-secondary-400 mb-6">{filtered.length}개</p>

        <div className="space-y-6">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-secondary-400">표시할 내용이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
