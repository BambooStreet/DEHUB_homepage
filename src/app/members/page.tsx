import type { Metadata } from "next";
import { members, getRoleLabel } from "@/data/members";
import MemberCard from "@/components/members/MemberCard";
import { Member } from "@/types";

export const metadata: Metadata = {
  title: "Members",
};

const roleOrder: Member["role"][] = ["professor", "phd", "master", "undergraduate", "alumni"];

export default function MembersPage() {
  const groupedMembers = roleOrder
    .map((role) => ({
      role,
      label: getRoleLabel(role),
      members: members.filter((m) => m.role === role),
    }))
    .filter((group) => group.members.length > 0);

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Members
        </h1>

        {groupedMembers.map((group) => (
          <section key={group.role} className="mb-12">
            <h2 className="text-xl font-semibold text-slate-700 mb-6 pb-2 border-b border-slate-200">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
