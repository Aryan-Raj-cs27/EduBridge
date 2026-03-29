"use client";
import { FaBook, FaMicrophone, FaGlobe, FaWifi } from "react-icons/fa";
import Reveal from "./Reveal";

export default function Features() {
  return (
    <section className="section-padding bg-transparent pt-10 sm:pt-14">
      <div className="site-container text-center">
        <Reveal>
          <h2 className="section-title">Why Learners Choose EduBridge AI</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="section-copy mx-auto mt-3 max-w-2xl">
            A clear and modern learning experience built for confidence, speed, and practical outcomes.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<FaBook className="text-4xl text-blue-700" />}
            title="Personalized Learning"
            description="AI adapts study materials based on student needs."
            delay={60}
          />
          <FeatureCard
            icon={<FaMicrophone className="text-4xl text-emerald-700" />}
            title="Voice Commands"
            description="Hands-free navigation with smart voice control."
            delay={120}
          />
          <FeatureCard
            icon={<FaGlobe className="text-4xl text-cyan-700" />}
            title="Multi-Language Support"
            description="Learn in your preferred language."
            delay={180}
          />
          <FeatureCard
            icon={<FaWifi className="text-4xl text-rose-700" />}
            title="Offline Mode"
            description="Access courses even without an internet connection."
            delay={240}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card-surface flex h-full flex-col p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-4">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </Reveal>
  );
}
