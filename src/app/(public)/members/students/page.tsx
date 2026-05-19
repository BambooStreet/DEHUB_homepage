export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getMembers } from "@/lib/db/queries";
import { getRoleLabel } from "@/data/members";
import MemberCard from "@/components/members/MemberCard";
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
          <section key={group.role} className="mb-12">
            <h2 className="text-xl font-semibold text-secondary-600 mb-6 pb-2 border-b border-secondary-100">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        ))}
        {groups.length === 0 && (
          <p className="text-secondary-400 text-sm">등록된 학생이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
