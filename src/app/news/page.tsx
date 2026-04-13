import type { Metadata } from "next";
import { news } from "@/data/news";
import NewsCard from "@/components/news/NewsCard";

export const metadata: Metadata = {
  title: "News",
};

export default function NewsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          News
        </h1>

        <div className="space-y-6">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
