import { notFound } from "next/navigation";
import { getPublicationById } from "@/lib/db/queries";
import { updatePublicationAction } from "../../../../actions";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pub = await getPublicationById(id);
  if (!pub) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Edit Publication</h1>
      <form action={updatePublicationAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <input type="hidden" name="id" value={pub.id} />
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
          <input name="title" required defaultValue={pub.title} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Authors (comma-separated)</label>
          <input name="authors" required defaultValue={pub.authors.join(", ")} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Venue</label>
          <input name="venue" required defaultValue={pub.venue} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Year</label>
            <input name="year" type="number" required defaultValue={pub.year} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Type</label>
            <select name="type" required defaultValue={pub.type} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm">
              <option value="conference">Conference</option>
              <option value="journal">Journal</option>
              <option value="workshop">Workshop</option>
              <option value="thesis">Thesis</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Link</label>
          <input name="link" type="url" defaultValue={pub.link || ""} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">DOI</label>
          <input name="doi" defaultValue={pub.doi || ""} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">Save</button>
          <a href="/admin/publications" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">Cancel</a>
        </div>
      </form>
    </div>
  );
}
