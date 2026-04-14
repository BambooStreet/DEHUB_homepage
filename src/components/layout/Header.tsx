"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Members", href: "/members" },
  {
    name: "Research",
    children: [
      { name: "Publications", href: "/publications" },
      { name: "Projects", href: "/projects" },
      { name: "Awards", href: "/awards" },
    ],
  },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

type NavItem = (typeof navigation)[number];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDropdownActive = (item: NavItem) =>
    "children" in item &&
    item.children?.some((child) => pathname.startsWith(child.href));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-secondary-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo9.gif" alt="DEHUB" width={120} height={40} className="h-20 w-auto" unoptimized />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:gap-1">
            {navigation.map((item) => {
              if ("children" in item && item.children) {
                const active = isDropdownActive(item);
                return (
                  <div key={item.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active
                          ? "text-primary-700 bg-primary-50"
                          : "text-secondary-500 hover:text-secondary-800 hover:bg-secondary-50"
                      }`}
                    >
                      {item.name}
                      <svg
                        className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-secondary-100 py-1 z-50">
                        {item.children.map((child) => {
                          const childActive = pathname.startsWith(child.href);
                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setDropdownOpen(false)}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                childActive
                                  ? "text-primary-700 bg-primary-50"
                                  : "text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50"
                              }`}
                            >
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href!);
              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-primary-700 bg-primary-50"
                      : "text-secondary-500 hover:text-secondary-800 hover:bg-secondary-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-secondary-500 hover:bg-secondary-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">메뉴 열기</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navigation.map((item) => {
              if ("children" in item && item.children) {
                const active = isDropdownActive(item);
                return (
                  <div key={item.name}>
                    <span
                      className={`block px-3 py-2 text-sm font-medium ${
                        active ? "text-primary-700" : "text-secondary-400"
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.children.map((child) => {
                      const childActive = pathname.startsWith(child.href);
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block pl-6 pr-3 py-2 text-sm font-medium rounded-md ${
                            childActive
                              ? "text-primary-700 bg-primary-50"
                              : "text-secondary-500 hover:text-secondary-800 hover:bg-secondary-50"
                          }`}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                );
              }

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href!);
              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "text-primary-700 bg-primary-50"
                      : "text-secondary-500 hover:text-secondary-800 hover:bg-secondary-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
