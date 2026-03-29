"use client";
import { FaBook, FaMicrophone, FaGlobe, FaWifi } from "react-icons/fa";

export default function Features() {
  return (
    <section className="section-padding bg-transparent">
      <div className="site-container text-center">
        <h2 className="section-title">Why Choose EduBridge AI?</h2>
        <p className="section-copy mx-auto mt-3 max-w-2xl">
          A compact, high-speed learning experience designed for depth, clarity, and consistency.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<FaBook className="text-4xl text-blue-700" />}
            title="Personalized Learning"
            description="AI adapts study materials based on student needs."
          />
          <FeatureCard
            icon={<FaMicrophone className="text-4xl text-emerald-700" />}
            title="Voice Commands"
            description="Hands-free navigation with smart voice control."
          />
          <FeatureCard
            icon={<FaGlobe className="text-4xl text-cyan-700" />}
            title="Multi-Language Support"
            description="Learn in your preferred language."
          />
          <FeatureCard
            icon={<FaWifi className="text-4xl text-rose-700" />}
            title="Offline Mode"
            description="Access courses even without an internet connection."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="card-surface p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
