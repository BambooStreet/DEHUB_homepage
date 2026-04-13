import { ResearchProject } from "@/types";

export default function ProjectCard({ project }: { project: ResearchProject }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            project.status === "ongoing"
              ? "bg-primary-50 text-primary-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {project.status === "ongoing" ? "진행중" : "완료"}
        </span>
        <span className="text-sm text-slate-400">{project.period}</span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-2">{project.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs bg-secondary-50 text-secondary-600 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
