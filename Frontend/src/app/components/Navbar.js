"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [themeChoice, setThemeChoice] = useState("auto");

  useEffect(() => {
    const savedChoice = localStorage.getItem("edubridge-theme") || "auto";
    setThemeChoice(savedChoice);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (choice) => {
      const resolved = choice === "auto" ? (media.matches ? "dark" : "light") : choice;
      document.documentElement.setAttribute("data-theme", resolved);
      document.documentElement.setAttribute("data-theme-choice", choice);
      localStorage.setItem("edubridge-theme", choice);
    };

    applyTheme(themeChoice);

    if (themeChoice !== "auto") {
      return;
    }

    const handleChange = () => applyTheme("auto");
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [themeChoice]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="nav-shell">
      <div className="site-container flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="brand-lockup"
        >
          <span className="brand-accent">Edu</span>Bridge AI
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded-md transition ${
                  isActive
                    ? "border border-blue-300/60 bg-blue-500/10 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <label className="sr-only" htmlFor="theme-choice">
            Theme
          </label>
          <select
            id="theme-choice"
            value={themeChoice}
            onChange={(e) => setThemeChoice(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 outline-none transition focus:border-blue-500"
          >
            <option value="auto">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <Link
            href="/signup"
            className={`rounded-md px-3 py-1 font-medium transition ${
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
