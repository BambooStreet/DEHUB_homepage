import Link from "next/link";
import { getNews } from "@/lib/db/queries";
import { deleteNewsAction } from "../../actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminNewsPage() {
  const news = await getNews();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary-800">News</h1>
        <Link href="/admin/news/new" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">
          + Add News
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary-50 text-secondary-600">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {news.map((n) => (
              <tr key={n.id} className="hover:bg-secondary-50">
                <td className="px-4 py-3 font-medium text-secondary-800">{n.title}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-secondary-100 text-secondary-600 rounded text-xs">{n.category}</span>
                </td>
                <td className="px-4 py-3 text-secondary-500">{n.date}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/news/${n.id}/edit`} className="text-primary-600 hover:text-primary-800 text-sm">Edit</Link>
                  <DeleteButton action={deleteNewsAction} id={n.id} />
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-secondary-400">No news yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
