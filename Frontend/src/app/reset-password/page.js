"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/app/components/Reveal";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const checks = {
    minLength: formData.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(formData.newPassword),
    lowercase: /[a-z]/.test(formData.newPassword),
    number: /[0-9]/.test(formData.newPassword),
    special: /[^A-Za-z0-9]/.test(formData.newPassword),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = { email: "", newPassword: "", confirmPassword: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) next.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) next.email = "Enter a valid email address.";

    if (!formData.newPassword) next.newPassword = "New password is required.";
    else if (!checks.minLength || !checks.uppercase || !checks.lowercase || !checks.number || !checks.special) {
      next.newPassword = "Please satisfy all password requirements.";
    }

    if (!formData.confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (formData.confirmPassword !== formData.newPassword) next.confirmPassword = "Passwords do not match.";

    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const nextErrors = validate();
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.newPassword || nextErrors.confirmPassword) return;

    const normalizedEmail = formData.email.trim().toLowerCase();
    let users = [];

    try {
      const raw = localStorage.getItem("edubridgeUsers");
      users = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(users)) users = [];
    } catch {
      users = [];
    }

    const userIndex = users.findIndex((u) => (u.email || "").toLowerCase() === normalizedEmail);
    if (userIndex < 0) {
      setErrors((prev) => ({ ...prev, email: "No account found for this email." }));
      return;
    }

    users[userIndex] = { ...users[userIndex], password: formData.newPassword, updatedAt: new Date().toISOString() };
    localStorage.setItem("edubridgeUsers", JSON.stringify(users));

    setSuccessMessage("Password reset successful. Redirecting to login...");
    window.setTimeout(() => router.push("/login"), 1000);
  };

  return (
    <section
      className="auth-shell relative min-h-[calc(100vh-68px)] overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-slate-950/72" aria-hidden="true"></div>
      <div className="relative mx-auto flex w-full max-w-3xl items-center justify-center">
        <Reveal className="w-full">
          <div className="card-surface mx-auto w-full max-w-xl p-8 sm:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reset Password</h1>
            <p className="mt-2 text-sm text-slate-600">Set a new password for your EduBridge account.</p>
            <p className="form-hint mt-4">
              Secure OTP verification requires backend support. This demo resets your password locally only.
            </p>

            {successMessage && (
              <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {successMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}

                {formData.newPassword && (
                  <div className="mt-2 space-y-1 rounded-md border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-sm">
                    <p className={checks.minLength ? "text-emerald-600" : "text-red-500"}>At least 8 characters</p>
                    <p className={checks.uppercase ? "text-emerald-600" : "text-red-500"}>At least 1 uppercase letter</p>
                    <p className={checks.lowercase ? "text-emerald-600" : "text-red-500"}>At least 1 lowercase letter</p>
                    <p className={checks.number ? "text-emerald-600" : "text-red-500"}>At least 1 number</p>
                    <p className={checks.special ? "text-emerald-600" : "text-red-500"}>At least 1 special character</p>
                  </div>
                )}
              </div>

              {formData.newPassword && (
                <div>
                  <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your new password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Update Password
              </button>
            </form>

            <p className="mt-4 text-sm text-slate-600">
              Back to{" "}
              <Link href="/login" className="font-semibold text-blue-700 hover:underline">Login</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
