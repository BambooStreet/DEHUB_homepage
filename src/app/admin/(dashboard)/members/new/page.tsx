import { createMemberAction } from "../../../actions";

export default function NewMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Add Member</h1>
      <form action={createMemberAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Name (Korean)</label>
            <input name="name" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Name (English)</label>
            <input name="nameEn" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Role</label>
            <select name="role" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm">
              <option value="professor">Professor</option>
              <option value="phd">Ph.D. Student</option>
              <option value="master">M.S. Student</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Position</label>
            <input name="position" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
          <input name="email" type="email" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Research (comma-separated)</label>
          <input name="research" placeholder="HCI, AI, UX Design" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Homepage URL</label>
          <input name="homepage" type="url" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Graduation Year</label>
          <input name="graduationYear" type="number" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Photo</label>
          <input name="image" type="file" accept="image/*" className="w-full text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">
            Create
          </button>
          <a href="/admin/members" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
