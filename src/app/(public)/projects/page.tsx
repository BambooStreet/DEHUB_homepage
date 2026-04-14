export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getProjects } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-8">
          Projects
        </h1>
        {projects.length === 0 ? (
          <p className="text-secondary-500">Coming soon.</p>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-6 bg-white rounded-xl border border-secondary-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-secondary-800">{project.title}</h2>
                    <p className="text-sm text-secondary-400 mt-1">{project.period}</p>
                    <p className="text-secondary-500 mt-2">{project.description}</p>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-secondary-100 text-secondary-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className={`shrink-0 px-2 py-1 text-xs font-medium rounded ${
                    project.status === "active" ? "bg-green-100 text-green-700" :
                    project.status === "upcoming" ? "bg-blue-100 text-blue-700" :
                    "bg-secondary-100 text-secondary-600"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
