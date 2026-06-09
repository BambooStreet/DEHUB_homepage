export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import { getMembers } from "@/lib/db/queries";
import { getRoleLabel } from "@/data/members";
import type { Member } from "@/types";

export const metadata: Metadata = {
  title: "Students",
};

const studentRoles: Member["role"][] = ["phd", "master", "undergraduate", "alumni"];

export default async function StudentsPage() {
  const members = await getMembers();

  const groups = studentRoles
    .map((role) => ({
      role,
      label: getRoleLabel(role),
      members: members.filter((m) => m.role === role),
    }))
    .filter((g) => g.members.length > 0);

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-12">
          Students
        </h1>

        {groups.map((group) => (
          <StudentSection key={group.role} title={group.label} students={group.members} />
        ))}

        {groups.length === 0 && (
          <p className="text-secondary-400 text-sm">등록된 학생이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

function StudentPhoto({ student }: { student: Member }) {
  if (student.image) {
    return (
      <div className="relative aspect-[4/3] w-full bg-secondary-50">
        <Image
          src={student.image}
          alt={`${student.nameEn} (${student.name})`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div className="aspect-[4/3] w-full bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center text-primary-800 font-bold text-7xl">
      {student.name.charAt(0)}
    </div>
  );
}

function StudentSection({ title, students }: { title: string; students: Member[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-800 mb-8 pb-3 border-b border-secondary-200">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </section>
  );
}

function StudentCard({ student }: { student: Member }) {
  const researchText = (student.research ?? []).join(" / ");
  return (
    <article className="rounded-xl border border-secondary-100 bg-white overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <StudentPhoto student={student} />
      <div className="p-6 flex-1">
        <header className="mb-4 pb-3 border-b border-secondary-100">
          {student.homepage ? (
            <a
              href={student.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-lg font-bold text-secondary-800 hover:text-primary-600"
              title="개인 홈페이지로 이동"
            >
              <h3>
                {student.nameEn}
                <span className="ml-2 text-secondary-500 font-medium group-hover:text-primary-600">
                  {student.name}
                </span>
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-secondary-400 group-hover:text-primary-600"
              >
                <path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7Z" />
              </svg>
            </a>
          ) : (
            <h3 className="text-lg font-bold text-secondary-800">
              {student.nameEn}
              <span className="ml-2 text-secondary-500 font-medium">{student.name}</span>
            </h3>
          )}
        </header>

        <dl className="space-y-3 text-sm">
        {researchText && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">
              Research Interest
            </dt>
            <dd className="text-secondary-600 leading-relaxed">{researchText}</dd>
          </div>
        )}

        {student.email && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">
              Email
            </dt>
            <dd>
              <a
                href={`mailto:${student.email}`}
                className="text-primary-600 hover:text-primary-700 break-all"
              >
                {student.email}
              </a>
            </dd>
          </div>
        )}

        {student.received && student.received.length > 0 && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">
              Received
            </dt>
            <dd>
              <ul className="space-y-1 text-secondary-600 leading-relaxed">
                {student.received.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary-400 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}

        {student.workAt && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">
              Work at
            </dt>
            <dd className="text-secondary-600">{student.workAt}</dd>
          </div>
        )}
        </dl>
      </div>
    </article>
  );
}
