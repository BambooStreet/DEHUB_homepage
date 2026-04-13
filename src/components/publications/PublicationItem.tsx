import { Publication } from "@/types";

const typeLabels: Record<Publication["type"], string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  thesis: "Thesis",
};

const typeColors: Record<Publication["type"], string> = {
  journal: "bg-primary-50 text-primary-700",
  conference: "bg-secondary-50 text-secondary-700",
  workshop: "bg-amber-50 text-amber-700",
  thesis: "bg-purple-50 text-purple-700",
};

export default function PublicationItem({ publication }: { publication: Publication }) {
  return (
    <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-primary-200 transition-colors">
      <div className="flex items-start gap-3">
        <span className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[publication.type]}`}>
          {typeLabels[publication.type]}
        </span>
        <div>
          <h3 className="font-semibold text-slate-900 leading-snug">
            {publication.link ? (
              <a href={publication.link} className="hover:text-primary-600 transition-colors" target="_blank" rel="noopener noreferrer">
                {publication.title}
              </a>
            ) : (
              publication.title
            )}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{publication.authors.join(", ")}</p>
          <p className="text-sm text-slate-400 mt-0.5">
            {publication.venue}, {publication.year}
          </p>
        </div>
      </div>
    </div>
  );
}
