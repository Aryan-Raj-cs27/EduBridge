"use client";

import PageHero from "@/app/components/PageHero";
import { useMemo, useState } from "react";
import Reveal from "@/app/components/Reveal";

export default function Contact() {
  const [copiedField, setCopiedField] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const phoneNumber = "+91-9031859167";
  const email = "aryan.raj.cs27@gmail.com";

  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent(`EduBridge Lead: ${formData.topic || "General Inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [email, formData]);

  const gmailComposeLink = useMemo(() => {
    const subject = encodeURIComponent(`EduBridge Lead: ${formData.topic || "General Inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}&body=${body}`;
  }, [email, formData]);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.topic.trim()) nextErrors.topic = "Topic is required.";
    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 15) {
      nextErrors.message = "Message must be at least 15 characters.";
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccessMessage(data.message || "Thanks, your message has been submitted successfully.");
        setFormData({ name: "", email: "", topic: "", message: "" });
        setErrors({});
      } else {
        setSuccessMessage(data.message || "Failed to submit your message. Please try again.");
      }
    } catch {
      setSuccessMessage("Unable to connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <Reveal className="h-full">
              <div className="card-surface flex h-full flex-col p-6 text-left">
                <h2 className="text-lg font-semibold text-slate-900">Email</h2>
                <p className="mt-2 text-slate-600">For support and queries</p>
                <button
                  type="button"
                  onClick={() => copyText(email, "email")}
                  className="mt-3 inline-flex w-fit rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-base font-semibold text-blue-700 transition hover:bg-blue-100"
                  title="Click to copy email"
                >
                    {email}
                </button>
                <p className="mt-3 text-sm text-slate-600">
                  Click the email box to copy it instantly.
                </p>
                {copiedField === "email" && (
                  <p className="mt-2 text-sm font-medium text-emerald-600">Email copied.</p>
                )}
              </div>
            </Reveal>

            <Reveal delay={120} className="h-full">
              <div className="card-surface flex h-full flex-col p-6 text-left">
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

          <Reveal delay={180}>
            <div className="mx-auto mt-6 max-w-4xl card-surface p-6 text-left">
              <h2 className="text-xl font-semibold text-slate-900">Send Us a Message</h2>
              <p className="mt-2 text-slate-600">Share your requirement and we will follow up with the next steps.</p>

              <form onSubmit={handleLeadSubmit} className="mt-5 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="formEmail" className="mb-1 block text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      id="formEmail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="topic" className="mb-1 block text-sm font-semibold text-slate-700">
                    Topic
                  </label>
                  <input
                    id="topic"
                    name="topic"
                    type="text"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Course inquiry / Collaboration / Support"
                  />
                  {errors.topic && <p className="mt-1 text-xs text-red-600">{errors.topic}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-semibold text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Tell us what you need..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>

                  <a
                    href={mailtoLink}
                    className="rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    Compose in Mail App
                  </a>

                  <a
                    href={gmailComposeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    Open in Gmail
                  </a>
                </div>

                {successMessage && (
                  <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    {successMessage}
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
