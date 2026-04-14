import { notFound } from "next/navigation";
import { getMemberById } from "@/lib/db/queries";
import { updateMemberAction } from "../../../../actions";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getMemberById(id);
  if (!member) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Edit Member</h1>
      <form action={updateMemberAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <input type="hidden" name="id" value={member.id} />
        <input type="hidden" name="existingImage" value={member.image || ""} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Name (Korean)</label>
            <input name="name" required defaultValue={member.name} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Name (English)</label>
            <input name="nameEn" required defaultValue={member.nameEn} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Role</label>
            <select name="role" required defaultValue={member.role} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm">
              <option value="professor">Professor</option>
              <option value="phd">Ph.D. Student</option>
              <option value="master">M.S. Student</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Position</label>
            <input name="position" required defaultValue={member.position} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
          <input name="email" type="email" defaultValue={member.email || ""} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Research (comma-separated)</label>
          <input name="research" defaultValue={(member.research || []).join(", ")} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Homepage URL</label>
          <input name="homepage" type="url" defaultValue={member.homepage || ""} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Graduation Year</label>
          <input name="graduationYear" type="number" defaultValue={member.graduationYear || ""} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Photo</label>
          {member.image && <p className="text-xs text-secondary-400 mb-1">Current: {member.image}</p>}
          <input name="image" type="file" accept="image/*" className="w-full text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">
            Save
          </button>
          <a href="/admin/members" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
