import type { Metadata } from "next";
import { projects } from "@/data/research";
import ProjectCard from "@/components/research/ProjectCard";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchPage() {
  const ongoing = projects.filter((p) => p.status === "ongoing");
  const completed = projects.filter((p) => p.status === "completed");

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Research Projects
        </h1>

        {ongoing.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-slate-700 mb-6 pb-2 border-b border-slate-200">
              진행중인 프로젝트
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ongoing.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {completed.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-6 pb-2 border-b border-slate-200">
              완료된 프로젝트
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completed.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
