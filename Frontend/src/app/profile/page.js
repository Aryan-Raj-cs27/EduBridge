"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "@/app/components/Reveal";
import PageHero from "@/app/components/PageHero";

export default function ProfilePage() {
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("edubridgeSession");
      const parsed = raw ? JSON.parse(raw) : null;
      setSessionUser(parsed && parsed.email ? parsed : null);
    } catch {
      setSessionUser(null);
    }
  }, []);

  if (!sessionUser) {
    return (
      <main>
        <PageHero title="Profile" subtitle="Sign in to view and manage your account information." />
        <div className="section-padding pt-14 sm:pt-18">
          <div className="site-container">
            <Reveal className="mx-auto max-w-xl">
              <div className="card-surface p-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900">Login Required</h2>
                <p className="mt-2 text-slate-600">Please login or sign up to access your profile.</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/login" className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800">
                    Login
                  </Link>
                  <Link href="/signup" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    Sign Up
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="Profile" subtitle="Your EduBridge account overview." />
      <div className="section-padding pt-14 sm:pt-18">
        <div className="site-container">
          <Reveal className="mx-auto max-w-2xl">
            <div className="card-surface p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Welcome, {sessionUser.name || "Learner"}</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="profile-meta-card">
                  <p className="text-slate-500">Name</p>
                  <p className="font-semibold text-slate-900">{sessionUser.name || "Not set"}</p>
                </div>
                <div className="profile-meta-card">
                  <p className="text-slate-500">Email</p>
                  <p className="font-semibold text-slate-900">{sessionUser.email}</p>
                </div>
                <div className="profile-meta-card">
                  <p className="text-slate-500">Signed In At</p>
                  <p className="font-semibold text-slate-900">{sessionUser.loggedInAt ? new Date(sessionUser.loggedInAt).toLocaleString() : "Unknown"}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
