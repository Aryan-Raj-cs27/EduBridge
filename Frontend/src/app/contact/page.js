"use client";

import PageHero from "@/app/components/PageHero";
import { useState } from "react";
import Reveal from "@/app/components/Reveal";

export default function Contact() {
  const [copiedField, setCopiedField] = useState("");

  const phoneNumber = "+91-9031859167";
  const email = "aryan.raj.cs27@gmail.com";

  const copyText = async (text, type) => {
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        copied = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch {
        copied = false;
      }
    }

    setCopiedField(copied ? type : "");
    window.setTimeout(() => setCopiedField(""), 1800);
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
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a href={`mailto:${email}`} className="text-base font-medium text-blue-700 underline-offset-4 hover:underline">
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={() => copyText(email, "email")}
                    className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    Copy
                  </button>
                </div>
                {copiedField === "email" && (
                  <p className="mt-2 text-sm font-medium text-emerald-600">Email copied.</p>
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card-surface p-6 text-left">
                <h2 className="text-lg font-semibold text-slate-900">Customer Care</h2>
                <p className="mt-2 text-slate-600">Click to copy the number for quick WhatsApp or call support.</p>
                <button
                  type="button"
                  onClick={() => copyText(phoneNumber, "phone")}
                  className="mt-3 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-base font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  {phoneNumber}
                </button>
                <p className="mt-3 text-sm text-slate-600">
                  We review every message with care and do our best to resolve your query clearly.
                </p>
                {copiedField === "phone" && (
                  <p className="mt-2 text-sm font-medium text-emerald-600">Number copied.</p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
