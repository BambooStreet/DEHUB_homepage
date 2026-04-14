"use client";

import { useState } from "react";
import { publications } from "@/data/publications";
import PublicationItem from "@/components/publications/PublicationItem";

const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

export default function PublicationsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filtered = selectedYear
    ? publications.filter((p) => p.year === selectedYear)
    : publications;

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-8">
          Publications
        </h1>

        {/* Year filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedYear === null
                ? "bg-secondary-800 text-white"
                : "bg-secondary-50 text-secondary-500 hover:bg-secondary-100"
            }`}
          >
            All
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedYear === year
                  ? "bg-secondary-800 text-white"
                  : "bg-secondary-50 text-secondary-500 hover:bg-secondary-100"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <p className="text-sm text-secondary-400 mb-6">{filtered.length} publications</p>

        <div className="space-y-4">
          {filtered.map((pub) => (
            <PublicationItem key={pub.id} publication={pub} />
          ))}
        </div>
      </div>
    </div>
  );
}
