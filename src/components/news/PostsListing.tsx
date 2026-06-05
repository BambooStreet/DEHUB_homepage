import Link from "next/link";
import type { NewsItem } from "@/types";
import NewsCard from "./NewsCard";

const PAGE_SIZE = 10;

interface Props {
  title: string;
  basePath: string;
  items: NewsItem[];
  page: number;
}

export default function PostsListing({ title, basePath, items, page: requestedPage }: Props) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const visible = items.slice(start, start + PAGE_SIZE);

  const pageHref = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">{title}</h1>

        <p className="text-sm text-secondary-400 mb-6">
          총 {items.length}개 · {page}/{totalPages} 페이지
        </p>

        <div className="space-y-6">
          {visible.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
          {visible.length === 0 && (
            <p className="text-sm text-secondary-400">표시할 내용이 없습니다.</p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} pageHref={pageHref} />
        )}
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  pageHref,
}: {
  page: number;
  totalPages: number;
  pageHref: (p: number) => string;
}) {
  const pages = pageWindow(page, totalPages, 5);
  const baseBtn =
    "inline-flex items-center justify-center min-w-9 h-9 px-3 text-sm rounded-md border transition-colors";
  const disabled = "pointer-events-none opacity-40";

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
      <Link
        href={pageHref(Math.max(1, page - 1))}
        className={`${baseBtn} border-secondary-200 text-secondary-600 hover:bg-secondary-50 ${
          page === 1 ? disabled : ""
        }`}
        aria-disabled={page === 1}
      >
        ‹
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={pageHref(p)}
          className={`${baseBtn} ${
            p === page
              ? "border-secondary-800 bg-secondary-800 text-white"
              : "border-secondary-200 text-secondary-600 hover:bg-secondary-50"
          }`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Link>
      ))}
      <Link
        href={pageHref(Math.min(totalPages, page + 1))}
        className={`${baseBtn} border-secondary-200 text-secondary-600 hover:bg-secondary-50 ${
          page === totalPages ? disabled : ""
        }`}
        aria-disabled={page === totalPages}
      >
        ›
      </Link>
    </nav>
  );
}

function pageWindow(current: number, total: number, size: number): number[] {
  const half = Math.floor(size / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + size - 1);
  start = Math.max(1, end - size + 1);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
}
