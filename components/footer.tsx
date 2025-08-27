import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/terms" className="text-gray-600 hover:text-indigo-600 text-sm">
            Terms
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 text-sm">
            Privacy
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-indigo-600 text-sm">
            Contact
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-6 text-gray-500">
            &copy; {new Date().getFullYear()} L&amp;D Talent Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
