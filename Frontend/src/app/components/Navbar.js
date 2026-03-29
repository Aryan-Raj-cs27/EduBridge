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
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 py-3 text-slate-900 shadow-sm backdrop-blur-md">
      <div className="site-container flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">EduBridge AI</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded transition ${
                  isActive
                    ? "border border-blue-200 bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
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
                ? "bg-blue-700 text-white"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
