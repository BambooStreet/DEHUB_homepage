import { Member } from "@/types";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-xl shrink-0">
          {member.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900">{member.name}</h3>
          <p className="text-sm text-slate-500">{member.nameEn}</p>
          <p className="text-sm text-primary-600">{member.position}</p>
        </div>
      </div>

      {member.email && (
        <p className="mt-4 text-sm text-slate-500">
          <a href={`mailto:${member.email}`} className="hover:text-primary-600 transition-colors">
            {member.email}
          </a>
        </p>
      )}

      {member.research && member.research.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {member.research.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {member.graduationYear && (
        <p className="mt-3 text-xs text-slate-400">
          졸업: {member.graduationYear}
        </p>
      )}
    </div>
  );
}
