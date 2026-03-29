"use client";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
    if (password.length < 6) return "Password must be at least 6 characters long.";
    return "";
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const nextErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
    };

    setErrors(nextErrors);
    setSuccessMessage("");

    if (nameError || emailError || passwordError) {
      return;
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("edubridgeUser", JSON.stringify(userData));

    console.log("Form Data:", {
      name: formData.name,
      email: formData.email,
      password: "***hidden***",
    });

    setSuccessMessage("Account created successfully! Welcome to EduBridge AI.");

    setTimeout(() => {
      setFormData({ name: "", email: "", password: "" });
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <section
      className="relative min-h-[88vh] overflow-hidden bg-cover bg-center px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/about-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-950/65" aria-hidden="true"></div>

      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl border border-white/15 bg-white/95 shadow-2xl backdrop-blur-sm md:grid-cols-5">
          <div className="hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white md:col-span-2 md:block">
            <p className="inline-block rounded-full border border-white/25 px-3 py-1 text-xs font-semibold tracking-wide text-slate-100">
              EduBridge AI
            </p>
            <h2 className="mt-6 text-3xl font-bold leading-tight">Create your learning profile</h2>
            <p className="mt-3 text-sm text-blue-100/95">
              Join a focused, personalized learning experience designed for real progress.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-100">
              <li>- Guided learning paths</li>
              <li>- Practical project-first content</li>
              <li>- Fast, mobile-friendly experience</li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 md:col-span-3 md:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sign Up</h1>
            <p className="mt-2 text-sm text-slate-600">Start your EduBridge journey in less than a minute.</p>

            {successMessage && (
              <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {successMessage}
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
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChange}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
