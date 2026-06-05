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
                <header>
                  {project.partnerLogo && (
                    <div className="mb-5 flex h-10 w-36 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.partnerLogo}
                        alt={project.partner || ""}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                  <h2 className="text-xl md:text-2xl font-semibold text-secondary-800">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="mt-2 text-secondary-600">{project.subtitle}</p>
                  )}
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
