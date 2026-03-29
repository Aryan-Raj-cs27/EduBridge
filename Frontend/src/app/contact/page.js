"use client";

import PageHero from "@/app/components/PageHero";
import { useState } from "react";
import Reveal from "@/app/components/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const phoneNumber = "+91-9031859167";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <PageHero
        title="Contact"
        subtitle="Reach out for support, collaborations, and course-related guidance."
      />

      <div className="section-padding pt-16 sm:pt-20">
        <div className="site-container">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <Reveal>
              <div className="card-surface p-6 text-left">
                <h2 className="text-lg font-semibold text-slate-900">Email</h2>
                <p className="mt-2 text-slate-600">For support and queries</p>
                <p className="mt-3 text-base font-medium text-blue-700">aryan.raj.cs27@gmail.com</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card-surface p-6 text-left">
                <h2 className="text-lg font-semibold text-slate-900">Customer Care</h2>
                <p className="mt-2 text-slate-600">Click to copy the number for quick WhatsApp or call support.</p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="mt-3 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-base font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  {phoneNumber}
                </button>
                <p className="mt-3 text-sm text-slate-600">
                  We review every message with care and do our best to resolve your query clearly.
                </p>
                {copied && <p className="mt-2 text-sm font-medium text-emerald-600">Copied to clipboard.</p>}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
