import { NewsItem } from "@/types";

const categoryLabels: Record<NewsItem["category"], string> = {
  announcement: "공지",
  award: "수상",
  event: "행사",
  media: "미디어",
};

const categoryColors: Record<NewsItem["category"], string> = {
  announcement: "bg-secondary-50 text-secondary-700",
  award: "bg-amber-50 text-amber-700",
  event: "bg-primary-50 text-primary-700",
  media: "bg-purple-50 text-purple-700",
};

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="p-6 bg-white rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-sm transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[item.category]}`}>
          {categoryLabels[item.category]}
        </span>
        <span className="text-sm text-slate-400">{item.date}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{item.content}</p>
    </article>
  );
}
