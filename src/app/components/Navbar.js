"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-3">
        <h1 className="text-2xl font-bold">EduBridge AI</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded transition ${
                  isActive ? "bg-blue-700 border border-blue-200" : "hover:underline"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/signup"
            className={`px-3 py-1 rounded font-medium transition ${
              pathname === "/signup"
                ? "bg-gray-100 text-blue-700"
                : "bg-white text-blue-600 hover:bg-gray-200"
            }`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
