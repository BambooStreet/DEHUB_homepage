export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getPublications } from "@/lib/db/queries";
import PublicationList from "@/components/publications/PublicationList";

export const metadata: Metadata = {
  title: "Publications",
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-8">
          Publications
        </h1>
        <PublicationList publications={publications} />
      </div>
    </div>
  );
}
