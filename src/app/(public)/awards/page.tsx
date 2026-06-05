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
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-10">
          Awards
        </h1>
        {awards.length === 0 ? (
          <p className="text-secondary-500">Coming soon.</p>
        ) : (
          <div className="space-y-4">
            {awards.map((award) => {
              const year = new Date(award.date).getFullYear();
              return (
                <article
                  key={award.id}
                  className="group relative overflow-hidden rounded-xl border border-secondary-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500" />
                  <div className="flex gap-5 p-6 pl-8">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 ring-1 ring-amber-200 sm:flex">
                      <TrophyIcon className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h2 className="text-lg font-semibold text-secondary-800 leading-snug">
                          {award.title}
                        </h2>
                        <span className="shrink-0 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold tracking-wider text-amber-700 ring-1 ring-amber-200">
                          {year}
                        </span>
                      </div>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-secondary-700">
                        <span className="h-1 w-1 rounded-full bg-amber-500" />
                        {award.recipient}
                      </p>
                      {award.description && (
                        <p className="mt-3 text-sm leading-relaxed text-secondary-500">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
