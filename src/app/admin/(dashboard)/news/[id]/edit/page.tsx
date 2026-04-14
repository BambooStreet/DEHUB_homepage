import { notFound } from "next/navigation";
import { getNewsById } from "@/lib/db/queries";
import { updateNewsAction } from "../../../../actions";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNewsById(id);
  if (!news) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Edit News</h1>
      <form action={updateNewsAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <input type="hidden" name="id" value={news.id} />
        <input type="hidden" name="existingImage" value={news.image || ""} />
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
          <input name="title" required defaultValue={news.title} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Date</label>
            <input name="date" type="date" required defaultValue={news.date} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Category</label>
            <select name="category" required defaultValue={news.category} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm">
              <option value="announcement">Announcement</option>
              <option value="award">Award</option>
              <option value="event">Event</option>
              <option value="media">Media</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Content</label>
          <textarea name="content" required rows={6} defaultValue={news.content} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Image</label>
          {news.image && <p className="text-xs text-secondary-400 mb-1">Current: {news.image}</p>}
          <input name="image" type="file" accept="image/*" className="w-full text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">Save</button>
          <a href="/admin/news" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">Cancel</a>
        </div>
      </form>
    </div>
  );
}
