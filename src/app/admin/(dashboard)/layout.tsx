export const dynamic = "force-dynamic";

import Link from "next/link";
import { logoutAction } from "../actions";

const adminNav = [
  { name: "Dashboard", href: "/admin" },
  { name: "Members", href: "/admin/members" },
  { name: "News", href: "/admin/news" },
  { name: "Publications", href: "/admin/publications" },
  { name: "Projects", href: "/admin/projects" },
  { name: "Awards", href: "/admin/awards" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-secondary-800 text-white flex flex-col">
        <div className="p-4 border-b border-secondary-700">
          <Link href="/admin" className="text-lg font-bold">
            DEHUB <span className="text-primary-300">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm rounded-md text-secondary-300 hover:text-white hover:bg-secondary-700 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-secondary-700">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-md transition-colors text-left"
            >
              Logout
            </button>
          </form>
          <Link
            href="/"
            className="block px-3 py-2 text-sm text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-md transition-colors mt-1"
          >
            View Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 bg-secondary-50 p-8">{children}</main>
    </div>
  );
}
