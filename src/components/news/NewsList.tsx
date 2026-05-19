"use client";

import { useState } from "react";
import type { NewsItem } from "@/types";
import NewsCard from "./NewsCard";

type CategoryFilter = "all" | NewsItem["category"];

const categoryOptions: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "announcement", label: "공지" },
  { value: "event", label: "행사" },
  { value: "award", label: "수상" },
  { value: "media", label: "미디어" },
];

export default function NewsList({ news }: { news: NewsItem[] }) {
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filtered = category === "all" ? news : news.filter((n) => n.category === category);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categoryOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setCategory(opt.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              category === opt.value
                ? "bg-secondary-800 text-white"
                : "bg-secondary-50 text-secondary-500 hover:bg-secondary-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-secondary-400 mb-6">{filtered.length}개의 소식</p>

      <div className="space-y-6">
        {filtered.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
        {filtered.length === 0 && (
          <p className="text-secondary-400 text-sm">해당 카테고리의 소식이 없습니다.</p>
        )}
      </div>
    </>
  );
}
