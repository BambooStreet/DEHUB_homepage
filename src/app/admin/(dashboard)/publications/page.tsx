import Link from "next/link";
import { getPublications } from "@/lib/db/queries";
import { deletePublicationAction } from "../../actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminPublicationsPage() {
  const publications = await getPublications();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary-800">Publications</h1>
        <Link href="/admin/publications/new" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">
          + Add Publication
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary-50 text-secondary-600">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Year</th>
              <th className="text-left px-4 py-3">Venue</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {publications.map((p) => (
              <tr key={p.id} className="hover:bg-secondary-50">
                <td className="px-4 py-3 font-medium text-secondary-800 max-w-md truncate">{p.title}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-secondary-100 text-secondary-600 rounded text-xs">{p.type}</span>
                </td>
                <td className="px-4 py-3 text-secondary-500">{p.year}</td>
                <td className="px-4 py-3 text-secondary-500 max-w-xs truncate">{p.venue}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/publications/${p.id}/edit`} className="text-primary-600 hover:text-primary-800 text-sm">Edit</Link>
                  <DeleteButton action={deletePublicationAction} id={p.id} />
                </td>
              </tr>
            ))}
            {publications.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-secondary-400">No publications yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
