import { ResearchProject } from "@/types";

export default function ProjectCard({ project }: { project: ResearchProject }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-secondary-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            project.status === "ongoing"
              ? "bg-primary-50 text-primary-700"
              : "bg-secondary-100 text-secondary-400"
          }`}
        >
          {project.status === "ongoing" ? "진행중" : "완료"}
        </span>
        <span className="text-sm text-secondary-300">{project.period}</span>
      </div>

      <h3 className="text-lg font-semibold text-secondary-800 mb-2">{project.title}</h3>
      <p className="text-sm text-secondary-500 leading-relaxed">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs bg-primary-50 text-primary-700 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
