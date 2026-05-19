import { Publication } from "@/types";

const typeLabels: Record<Publication["type"], string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  thesis: "Thesis",
};

const typeColors: Record<Publication["type"], string> = {
  journal: "bg-primary-50 text-primary-800",
  conference: "bg-secondary-100 text-secondary-600",
  workshop: "bg-amber-50 text-amber-700",
  thesis: "bg-purple-50 text-purple-700",
};

const regionLabels: Record<Publication["region"], string> = {
  domestic: "Domestic",
  international: "International",
};

const regionColors: Record<Publication["region"], string> = {
  domestic: "bg-emerald-50 text-emerald-700",
  international: "bg-sky-50 text-sky-700",
};

export default function PublicationItem({ publication }: { publication: Publication }) {
  return (
    <div className="p-5 bg-white rounded-xl border border-secondary-100 hover:border-primary-300 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-1 shrink-0">
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full text-center ${typeColors[publication.type]}`}>
            {typeLabels[publication.type]}
          </span>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full text-center ${regionColors[publication.region]}`}>
            {regionLabels[publication.region]}
          </span>
          {publication.indexing && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full text-center bg-secondary-100 text-secondary-600">
              {publication.indexing}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-secondary-800 leading-snug">
            {publication.link ? (
              <a href={publication.link} className="hover:text-primary-600 transition-colors" target="_blank" rel="noopener noreferrer">
                {publication.title}
              </a>
            ) : (
              publication.title
            )}
          </h3>
          <p className="text-sm text-secondary-400 mt-1">{publication.authors.join(", ")}</p>
          <p className="text-sm text-secondary-300 mt-0.5">
            {publication.venue}, {publication.year}
          </p>
        </div>
      </div>
    </div>
  );
}
