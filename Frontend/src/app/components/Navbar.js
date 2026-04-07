"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [themeChoice, setThemeChoice] = useState("auto");
  const [sessionUser, setSessionUser] = useState(null);

  const themeCycle = ["auto", "light", "dark"];

  const loadSession = () => {
    try {
      const rawSession = localStorage.getItem("edubridgeSession");
      const parsedSession = rawSession ? JSON.parse(rawSession) : null;
      setSessionUser(parsedSession && parsedSession.email ? parsedSession : null);
    } catch {
      setSessionUser(null);
    }
  };

  useEffect(() => {
    const savedChoice = localStorage.getItem("edubridge-theme") || "auto";
    setThemeChoice(savedChoice);
    loadSession();

    const syncSession = () => loadSession();
    window.addEventListener("storage", syncSession);

    return () => window.removeEventListener("storage", syncSession);
  }, []);

  useEffect(() => {
    loadSession();
  }, [pathname]);

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
    { href: "/profile", label: "Profile" },
  ];

  const activeThemeIcon =
    themeChoice === "dark" ? <FaMoon size={14} /> : themeChoice === "light" ? <FaSun size={14} /> : <FaDesktop size={14} />;

  const activeThemeLabel =
    themeChoice === "dark" ? "Dark mode" : themeChoice === "light" ? "Light mode" : "Auto mode";

  const cycleTheme = () => {
    const currentIndex = themeCycle.indexOf(themeChoice);
    const nextTheme = themeCycle[(currentIndex + 1) % themeCycle.length];
    setThemeChoice(nextTheme);
  };

  const logout = () => {
    localStorage.removeItem("edubridgeSession");
    setSessionUser(null);
  };

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
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={cycleTheme}
            aria-label={`Change theme. Current: ${activeThemeLabel}`}
            title={`Theme: ${activeThemeLabel}`}
            className="theme-toggle-btn"
          >
            {activeThemeIcon}
          </button>

          {sessionUser ? (
            <>
              <span className="hidden rounded-md border border-slate-300/70 bg-white/80 px-2 py-1 text-xs font-medium text-slate-700 sm:inline-flex">
                {sessionUser.name || sessionUser.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-slate-300 px-3 py-1 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className={`nav-link ${pathname === "/signup" || pathname === "/login" ? "nav-link-active" : ""}`}
              >
                Login / Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
