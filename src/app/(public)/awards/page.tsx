export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getAwards } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Awards",
};

export default async function AwardsPage() {
  const awards = await getAwards();

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-8">
          Awards
        </h1>
        {awards.length === 0 ? (
          <p className="text-secondary-500">Coming soon.</p>
        ) : (
          <div className="space-y-4">
            {awards.map((award) => (
              <div
                key={award.id}
                className="p-5 bg-white rounded-xl border border-secondary-100 hover:shadow-sm transition-shadow"
              >
                <h2 className="font-semibold text-secondary-800">{award.title}</h2>
                <p className="text-sm text-secondary-500 mt-1">{award.recipient} &middot; {award.date}</p>
                {award.description && (
                  <p className="text-sm text-secondary-400 mt-2">{award.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
