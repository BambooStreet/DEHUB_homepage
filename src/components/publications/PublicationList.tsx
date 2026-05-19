"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/types";
import PublicationItem from "./PublicationItem";

type RegionFilter = "all" | Publication["region"];
type TypeFilter = "all" | Publication["type"];

const regionOptions: { value: RegionFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "international", label: "International" },
  { value: "domestic", label: "Domestic" },
];

const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "journal", label: "Journal" },
  { value: "conference", label: "Conference" },
  { value: "workshop", label: "Workshop" },
  { value: "thesis", label: "Thesis" },
];

export default function PublicationList({ publications }: { publications: Publication[] }) {
  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [publications]
  );
  const [region, setRegion] = useState<RegionFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [year, setYear] = useState<number | null>(null);

  const filtered = publications.filter((p) => {
    if (region !== "all" && p.region !== region) return false;
    if (type !== "all" && p.type !== type) return false;
    if (year !== null && p.year !== year) return false;
    return true;
  });

  const grouped = useMemo(() => {
    const map = new Map<number, Publication[]>();
    for (const p of filtered) {
      if (!map.has(p.year)) map.set(p.year, []);
      map.get(p.year)!.push(p);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <>
      <div className="space-y-3 mb-8">
        <FilterRow label="Region">
          {regionOptions.map((opt) => (
            <FilterButton
              key={opt.value}
              active={region === opt.value}
              onClick={() => setRegion(opt.value)}
            >
              {opt.label}
            </FilterButton>
          ))}
        </FilterRow>
        <FilterRow label="Type">
          {typeOptions.map((opt) => (
            <FilterButton
              key={opt.value}
              active={type === opt.value}
              onClick={() => setType(opt.value)}
            >
              {opt.label}
            </FilterButton>
          ))}
        </FilterRow>
        <FilterRow label="Year">
          <FilterButton active={year === null} onClick={() => setYear(null)}>
            All
          </FilterButton>
          {years.map((y) => (
            <FilterButton key={y} active={year === y} onClick={() => setYear(y)}>
              {y}
            </FilterButton>
          ))}
        </FilterRow>
      </div>

      <p className="text-sm text-secondary-400 mb-6">{filtered.length} publications</p>

      <div className="space-y-10">
        {grouped.map(([y, items]) => (
          <div key={y}>
            <h2 className="text-xl font-bold text-secondary-800 mb-4">{y}</h2>
            <div className="space-y-4">
              {items.map((pub) => (
                <PublicationItem key={pub.id} publication={pub} />
              ))}
            </div>
          </div>
        ))}
        {grouped.length === 0 && (
          <p className="text-secondary-400 text-sm">조건에 맞는 논문이 없습니다.</p>
        )}
      </div>
    </>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-secondary-500 w-16 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
        active
          ? "bg-secondary-800 text-white"
          : "bg-secondary-50 text-secondary-500 hover:bg-secondary-100"
      }`}
    >
      {children}
    </button>
  );
}
