import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "@/types";

const categoryLabels: Record<NewsItem["category"], string> = {
  announcement: "공지",
  award: "수상",
  event: "행사",
  media: "미디어",
};

const categoryColors: Record<NewsItem["category"], string> = {
  announcement: "bg-secondary-100 text-secondary-600",
  award: "bg-primary-50 text-primary-700",
  event: "bg-emerald-50 text-emerald-700",
  media: "bg-purple-50 text-purple-700",
};

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.id}`}>
      <article className="p-6 bg-white rounded-xl border border-secondary-100 hover:border-primary-300 hover:shadow-sm transition-all flex gap-5">
        {item.image && (
          <div className="relative w-32 h-24 rounded-lg overflow-hidden shrink-0 hidden sm:block">
            <Image src={item.image} alt={item.title} fill className="object-cover" sizes="128px" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[item.category]}`}>
              {categoryLabels[item.category]}
            </span>
            <span className="text-sm text-secondary-300">{item.date}</span>
          </div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-1">{item.title}</h3>
          <p className="text-sm text-secondary-500 leading-relaxed line-clamp-2">{item.content}</p>
        </div>
      </article>
    </Link>
  );
}
