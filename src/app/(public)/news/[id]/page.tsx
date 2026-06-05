export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsById } from "@/lib/db/queries";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsById(id);
  return { title: item?.title ?? "News" };
}

const categoryLabels: Record<string, string> = {
  announcement: "공지",
  award: "수상",
  event: "행사",
  media: "미디어",
};

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsById(id);

  if (!item) notFound();

  const isNotice = item.category === "announcement";
  const backHref = isNotice ? "/notice" : "/news";
  const backLabel = isNotice ? "공지 목록으로" : "뉴스 목록으로";

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href={backHref} className="text-sm text-secondary-400 hover:text-secondary-600 transition-colors mb-8 inline-flex items-center gap-1">
          &larr; {backLabel}
        </Link>

        <article className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            {item.category && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-600 text-white">
                {categoryLabels[item.category]}
              </span>
            )}
            <span className="text-sm text-secondary-400">{item.date}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-6">
            {item.title}
          </h1>

          <div
            className="news-content text-secondary-700 leading-relaxed [&_p]:my-4 [&_p]:text-base md:[&_p]:text-lg [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-secondary-800 [&_figure]:my-6 [&_img]:rounded-xl [&_img]:w-full [&_img]:h-auto [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-secondary-400 [&_figcaption]:text-center [&_a]:text-primary-700 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </article>
      </div>
    </div>
  );
}
