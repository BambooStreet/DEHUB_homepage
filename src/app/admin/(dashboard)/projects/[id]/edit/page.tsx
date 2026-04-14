import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/db/queries";
import { updateProjectAction } from "../../../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Edit Project</h1>
      <form action={updateProjectAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <input type="hidden" name="id" value={project.id} />
        <input type="hidden" name="existingImage" value={project.image || ""} />
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
          <input name="title" required defaultValue={project.title} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
          <textarea name="description" required rows={4} defaultValue={project.description} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Period</label>
            <input name="period" required defaultValue={project.period} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
            <select name="status" required defaultValue={project.status} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm">
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Tags (comma-separated)</label>
          <input name="tags" defaultValue={project.tags.join(", ")} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Image</label>
          {project.image && <p className="text-xs text-secondary-400 mb-1">Current: {project.image}</p>}
          <input name="image" type="file" accept="image/*" className="w-full text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">Save</button>
          <a href="/admin/projects" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">Cancel</a>
        </div>
      </form>
    </div>
  );
}
