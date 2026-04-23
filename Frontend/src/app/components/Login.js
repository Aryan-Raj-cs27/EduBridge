"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Reveal from "./Reveal";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setError("Email and password are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem(
          "edubridgeSession",
          JSON.stringify({
            name: data?.user?.name,
            email: data?.user?.email,
            loggedInAt: new Date().toISOString(),
          })
        );

        setSuccess(data.message || "Login successful. Redirecting to Courses...");
        setTimeout(() => {
          router.push("/courses");
        }, 900);
        return;
      }

      if (response.status === 404) {
        setError(data.message || "Account not found.");
        return;
      }

      if (response.status === 401) {
        setError(data.message || "Invalid password.");
        return;
      }

      setError(data.message || "Unable to login right now.");
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="auth-shell relative min-h-[calc(100vh-68px)] overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-slate-950/72" aria-hidden="true"></div>
      <div className="relative mx-auto flex w-full max-w-3xl items-center justify-center">
        <Reveal className="w-full">
          <div className="card-surface mx-auto w-full max-w-xl p-8 sm:p-10">
            <div className="auth-switcher mb-5">
              <Link
                href="/login"
                className="auth-switcher-btn auth-switcher-btn-active"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="auth-switcher-btn auth-switcher-btn-inactive"
              >
                Sign Up
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Login</h1>
            <p className="mt-2 text-sm text-slate-600">Continue your learning progress where you left off.</p>

            {error && (
              <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}
            {success && (
              <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChange}
                />
                <div className="mt-2 text-right">
                  <Link href="/reset-password" className="text-sm font-medium text-blue-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                {isSubmitting ? "Signing In..." : "Login"}
              </button>
            </form>

            <p className="mt-4 text-sm text-slate-600">
              New to EduBridge?{" "}
              <Link href="/signup" className="font-semibold text-blue-700 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
