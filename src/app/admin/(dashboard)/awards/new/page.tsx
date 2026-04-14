import { createAwardAction } from "../../../actions";

export default function NewAwardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Add Award</h1>
      <form action={createAwardAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
          <input name="title" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Recipient</label>
            <input name="recipient" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Date</label>
            <input name="date" type="date" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
          <textarea name="description" rows={4} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Image</label>
          <input name="image" type="file" accept="image/*" className="w-full text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">Create</button>
          <a href="/admin/awards" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">Cancel</a>
        </div>
      </form>
    </div>
  );
}
