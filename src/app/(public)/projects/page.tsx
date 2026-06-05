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
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-10">
          Projects
        </h1>
        {projects.length === 0 ? (
          <p className="text-secondary-500">Coming soon.</p>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="p-6 md:p-8 bg-white rounded-xl border border-secondary-100 hover:shadow-md transition-shadow"
              >
                <header className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl md:text-2xl font-semibold text-secondary-800">
                      {project.title}
                    </h2>
                    {project.partner && (
                      <div className="mt-1 flex items-center gap-2 text-sm text-secondary-500">
                        <span>with {project.partner}</span>
                        {project.partnerLogo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.partnerLogo}
                            alt={project.partner}
                            className="h-5 w-auto object-contain"
                          />
                        )}
                      </div>
                    )}
                    {project.subtitle && (
                      <p className="mt-2 text-secondary-600">{project.subtitle}</p>
                    )}
                  </div>
                  <span className={`shrink-0 px-2 py-1 text-xs font-medium rounded ${
                    project.status === "active" ? "bg-green-100 text-green-700" :
                    project.status === "upcoming" ? "bg-blue-100 text-blue-700" :
                    "bg-secondary-100 text-secondary-600"
                  }`}>
                    {project.status}
                  </span>
                </header>

                {project.purpose && (
                  <section className="mt-5">
                    <h3 className="text-sm font-semibold text-secondary-700">프로젝트 목적</h3>
                    <p className="mt-1 text-secondary-600 leading-relaxed">{project.purpose}</p>
                  </section>
                )}

                {project.description && (
                  <section className="mt-4">
                    <h3 className="text-sm font-semibold text-secondary-700">프로젝트 내용</h3>
                    <p className="mt-1 text-secondary-600 leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  </section>
                )}

                <section className="mt-4">
                  <h3 className="text-sm font-semibold text-secondary-700">프로젝트 기간</h3>
                  <p className="mt-1 text-secondary-500">{project.period}</p>
                </section>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-secondary-100 text-secondary-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
