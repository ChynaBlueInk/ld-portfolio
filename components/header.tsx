// components/header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// ⬇️ Public preview flag: set to true to hide Log in / Sign up everywhere
const PUBLIC_PREVIEW = true;

// base links everyone sees
const navigation = [
  { name: "Home", href: "/" },
  // ⬇️ go directly to /professionals (avoid extra redirect)
  { name: "Browse Professionals", href: "/professionals" },
  { name: "Talent Requests", href: "/talent-requests" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
];

// extra links for logged-in users
const authedNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "My Profile", href: "/profile" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [profileComplete, setProfileComplete] = useState(true);

  // Check profile completeness
  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        try {
          const res = await fetch(
            `/api/users?userID=${encodeURIComponent(user.userID || user.email)}`
          );
          if (res.ok) {
            const profile = await res.json();
            const hasBasics =
              profile.fullName && profile.title && profile.location && profile.bio;
            const hasContact = profile.contact && profile.contact.email;
            setProfileComplete(!!(hasBasics && hasContact));
          } else {
            setProfileComplete(false);
          }
        } catch {
          setProfileComplete(false);
        }
      }
    };
    checkProfile();
  }, [user]);

  return (
    <header className="bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo / Brand */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">L&D Talent Hub</span>
            <h1 className="text-2xl font-bold text-indigo-600">L&D Talent Hub</h1>
          </Link>
        </div>

        {/* Mobile menu button */}
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

        {/* Desktop nav links */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-lg font-semibold ${
                pathname === item.href
                  ? "text-indigo-600"
                  : "text-gray-900 hover:text-indigo-600"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user &&
            !PUBLIC_PREVIEW &&
            authedNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-semibold ${
                  pathname === item.href
                    ? "text-indigo-600"
                    : "text-gray-900 hover:text-indigo-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {PUBLIC_PREVIEW ? (
            <Link
              href="/professionals"
              className="rounded border border-gray-300 px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
            >
              Browse
            </Link>
          ) : user ? (
            <>
              <span className="text-lg text-gray-700 flex items-center gap-2">
                {user.fullName || user.email}
                {!profileComplete && (
                  <Link
                    href="/profile/create"
                    className="ml-2 text-xs bg-yellow-400 text-gray-800 px-2 py-1 rounded"
                  >
                    Profile Incomplete
                  </Link>
                )}
              </span>
              <button
                onClick={logout}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 text-lg">
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 text-lg">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
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
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 ${
                        pathname === item.href
                          ? "text-indigo-600"
                          : "text-gray-900 hover:text-indigo-600"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {user && !PUBLIC_PREVIEW &&
                    authedNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 ${
                          pathname === item.href
                            ? "text-indigo-600"
                            : "text-gray-900 hover:text-indigo-600"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
                <div className="py-6 space-y-2">
                  {PUBLIC_PREVIEW ? (
                    <Link
                      href="/professionals"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Browse
                    </Link>
                  ) : user ? (
                    <>
                      <p className="px-3 py-2 text-lg font-semibold text-gray-700 flex items-center gap-2">
                        {user.fullName || user.email}
                        {!profileComplete && (
                          <Link
                            href="/profile/create"
                            className="ml-2 text-xs bg-yellow-400 text-gray-800 px-2 py-1 rounded"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Profile Incomplete
                          </Link>
                        )}
                      </p>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="-mx-3 block w-full rounded-lg bg-red-500 px-3 py-2.5 text-lg font-semibold text-white hover:bg-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/signup"
                        className="-mx-3 block rounded-lg bg-indigo-600 px-3 py-2.5 text-lg font-semibold leading-7 text-white hover:bg-indigo-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
