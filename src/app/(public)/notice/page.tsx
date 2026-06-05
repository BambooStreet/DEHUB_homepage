export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getNews } from "@/lib/db/queries";
import PostsListing from "@/components/news/PostsListing";

export const metadata: Metadata = {
  title: "Notice",
};

export default async function NoticePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const rawPage = Number(sp.page);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;

  const all = await getNews();
  const items = all.filter((n) => n.category === "announcement");

  return <PostsListing title="Notice" basePath="/notice" items={items} page={page} />;
}
