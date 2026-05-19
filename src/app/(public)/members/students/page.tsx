export const dynamic = "force-dynamic";

import type { Metadata } from "next";
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

function StudentSection({ title, students }: { title: string; students: Member[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-800 mb-8 pb-3 border-b border-secondary-200">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    <article className="rounded-xl border border-secondary-100 bg-white p-6 hover:shadow-md transition-shadow">
      <header className="mb-4 pb-3 border-b border-secondary-100">
        <h3 className="text-lg font-bold text-secondary-800">
          {student.nameEn}
          <span className="ml-2 text-secondary-500 font-medium">{student.name}</span>
        </h3>
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
    </article>
  );
}
