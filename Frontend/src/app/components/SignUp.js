"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reveal from "./Reveal";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validateName = (name) => {
    if (!name.trim()) return "Name is required.";
    if (name.trim().length < 3) return "Name must be at least 3 characters long.";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must include at least one lowercase letter.";
    if (!/[0-9]/.test(password)) return "Password must include at least one number.";
    if (!/[^A-Za-z0-9]/.test(password)) return "Password must include at least one special character.";
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return "Please confirm your password.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const passwordChecks = {
    minLength: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

    const nextErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    setErrors(nextErrors);
    setSuccessMessage("");

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccessMessage(data.message || "Account created successfully. Redirecting to login...");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => {
          router.push("/login");
        }, 1200);
        return;
      }

      if (response.status === 409) {
        setErrors((prev) => ({ ...prev, email: "An account with this email already exists. Please login." }));
        setApiError(data.message || "This email is already registered.");
        return;
      }

      setApiError(data.message || "Something went wrong while creating your account.");
    } catch {
      setApiError("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="auth-shell relative min-h-[calc(100vh-68px)] overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-slate-950/72" aria-hidden="true"></div>
      <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-blue-500/25 blur-3xl" aria-hidden="true"></div>
      <div className="absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true"></div>

      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center">
        <Reveal className="w-full">
          <div className="grid w-full overflow-hidden rounded-2xl border border-white/15 bg-white/95 shadow-2xl backdrop-blur-sm md:grid-cols-5">
            <div className="hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white md:col-span-2 md:block">
              <p className="hero-chip inline-block">
                EduBridge AI
              </p>
              <h2 className="mt-6 text-3xl font-bold leading-tight">Create your learning profile</h2>
              <p className="mt-3 text-sm text-blue-100/95">
                Join a focused, personalized learning experience designed for real progress.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-100">
                <li>- Structured learning paths</li>
                <li>- Practical, project-led curriculum</li>
                <li>- Progress-focused learning support</li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 md:col-span-3 md:p-10">
              <div className="auth-switcher mb-5">
                <Link
                  href="/signup"
                  className="auth-switcher-btn auth-switcher-btn-active"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="auth-switcher-btn auth-switcher-btn-inactive"
                >
                  Login
                </Link>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sign Up</h1>
              <p className="mt-2 text-sm text-slate-600">Start your EduBridge journey in less than a minute.</p>

              {successMessage && (
                <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  {successMessage}
                </p>
              )}

              {apiError && (
                <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {apiError}
                </p>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={handleChange}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

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
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                    Create Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={handleChange}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}

                  {formData.password && (
                    <div className="mt-2 space-y-1 rounded-md border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-sm">
                      <p className={passwordChecks.minLength ? "text-emerald-600" : "text-red-500"}>At least 8 characters</p>
                      <p className={passwordChecks.uppercase ? "text-emerald-600" : "text-red-500"}>At least 1 uppercase letter</p>
                      <p className={passwordChecks.lowercase ? "text-emerald-600" : "text-red-500"}>At least 1 lowercase letter</p>
                      <p className={passwordChecks.number ? "text-emerald-600" : "text-red-500"}>At least 1 number</p>
                      <p className={passwordChecks.special ? "text-emerald-600" : "text-red-500"}>At least 1 special character</p>
                    </div>
                  )}
                </div>

                {formData.password && (
                  <div>
                    <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="mt-4 text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-blue-700 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
