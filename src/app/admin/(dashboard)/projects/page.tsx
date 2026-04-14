import Link from "next/link";
import { getProjects } from "@/lib/db/queries";
import { deleteProjectAction } from "../../actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary-800">Projects</h1>
        <Link href="/admin/projects/new" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">
          + Add Project
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary-50 text-secondary-600">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Period</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-secondary-50">
                <td className="px-4 py-3 font-medium text-secondary-800">{p.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    p.status === "active" ? "bg-green-100 text-green-700" :
                    p.status === "upcoming" ? "bg-blue-100 text-blue-700" :
                    "bg-secondary-100 text-secondary-600"
                  }`}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-secondary-500">{p.period}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/projects/${p.id}/edit`} className="text-primary-600 hover:text-primary-800 text-sm">Edit</Link>
                  <DeleteButton action={deleteProjectAction} id={p.id} />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-secondary-400">No projects yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
