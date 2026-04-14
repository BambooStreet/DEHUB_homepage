import { createProjectAction } from "../../../actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Add Project</h1>
      <form action={createProjectAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
          <input name="title" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
          <textarea name="description" required rows={4} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Period</label>
            <input name="period" required placeholder="2024.03 - 2025.12" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
            <select name="status" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm">
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Tags (comma-separated)</label>
          <input name="tags" placeholder="HCI, AI, UX" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Image</label>
          <input name="image" type="file" accept="image/*" className="w-full text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">Create</button>
          <a href="/admin/projects" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">Cancel</a>
        </div>
      </form>
    </div>
  );
}
