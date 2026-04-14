export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getNewsById } from "@/lib/db/queries";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsById(id);
  return { title: item?.title ?? "News" };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsById(id);

  if (!item) notFound();

  const categoryLabels: Record<string, string> = {
    announcement: "공지",
    award: "수상",
    event: "행사",
    media: "미디어",
  };

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href="/news" className="text-sm text-secondary-400 hover:text-secondary-600 transition-colors mb-8 inline-flex items-center gap-1">
          &larr; 뉴스 목록으로
        </Link>

        <article className="mt-6">
          {item.image && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
              />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-600 text-white">
              {categoryLabels[item.category]}
            </span>
            <span className="text-sm text-secondary-400">{item.date}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-6">
            {item.title}
          </h1>

          <p className="text-lg text-secondary-500 leading-relaxed">
            {item.content}
          </p>
        </article>
      </div>
    </div>
  );
}
