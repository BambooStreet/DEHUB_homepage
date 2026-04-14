import Link from "next/link";
import { getMembers } from "@/lib/db/queries";
import { deleteMemberAction } from "../../actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminMembersPage() {
  const members = await getMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary-800">Members</h1>
        <Link
          href="/admin/members/new"
          className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700"
        >
          + Add Member
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary-50 text-secondary-600">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Position</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-secondary-50">
                <td className="px-4 py-3 font-medium text-secondary-800">
                  {m.name} <span className="text-secondary-400">({m.nameEn})</span>
                </td>
                <td className="px-4 py-3 text-secondary-600">{m.role}</td>
                <td className="px-4 py-3 text-secondary-600">{m.position}</td>
                <td className="px-4 py-3 text-secondary-500">{m.email || "-"}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/members/${m.id}/edit`} className="text-primary-600 hover:text-primary-800 text-sm">
                    Edit
                  </Link>
                  <DeleteButton action={deleteMemberAction} id={m.id} />
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-secondary-400">No members yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
