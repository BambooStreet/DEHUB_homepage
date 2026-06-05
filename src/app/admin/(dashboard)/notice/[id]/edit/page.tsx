import { notFound } from "next/navigation";
import { getNewsById } from "@/lib/db/queries";
import { updateNewsAction } from "../../../../actions";
import { FileInput } from "../../../../_components/FileInput";

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getNewsById(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Edit Notice</h1>
      <form action={updateNewsAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <input type="hidden" name="id" value={item.id} />
        <input type="hidden" name="existingImage" value={item.image || ""} />
        <input type="hidden" name="category" value="announcement" />
        <input type="hidden" name="redirectTo" value="/admin/notice" />
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
          <input name="title" required defaultValue={item.title} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Date</label>
          <input name="date" type="date" required defaultValue={item.date} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Content (HTML 가능)</label>
          <textarea name="content" required rows={12} defaultValue={item.content} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm font-mono" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">대표 이미지</label>
          <FileInput name="image" label="이미지 업로드" existingUrl={item.image} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">Save</button>
          <a href="/admin/notice" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">Cancel</a>
        </div>
      </form>
    </div>
  );
}
