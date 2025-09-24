// components/header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Browse Professionals", href: "/professionals" }, // ⬅️ was /browse
  { name: "Talent Requests", href: "/talent-requests" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 items-center gap-3">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">L&D Talent Hub</span>
            <h1 className="text-2xl font-bold text-indigo-600">L&D Talent Hub</h1>
          </Link>
          <span className="hidden sm:inline-block rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 border border-yellow-300">
            Public Preview (Auth Off)
          </span>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-lg font-semibold ${
                pathname === item.href ? "text-indigo-600" : "text-gray-900 hover:text-indigo-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end" />
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/30" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">L&D Talent Hub</span>
                <h1 className="text-xl font-bold text-indigo-600">L&D Talent Hub</h1>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 rounded bg-yellow-50 border border-yellow-200 px-3 py-2 text-sm text-yellow-800">
              Public Preview: sign in/up is temporarily disabled while we gather feedback.
            </p>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 ${
                        pathname === item.href ? "text-indigo-600" : "text-gray-900 hover:text-indigo-600"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                {/* no auth actions */}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
