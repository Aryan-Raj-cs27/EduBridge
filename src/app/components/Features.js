"use client";
import { FaBook, FaMicrophone, FaGlobe, FaWifi } from "react-icons/fa";

export default function Features() {
  return (
    <section className="py-20 bg-gray-200">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Why Choose EduBridge AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FaBook className="text-blue-800 text-5xl" />}
            title="Personalized Learning"
            description="AI adapts study materials based on student needs."
          />
          <FeatureCard
            icon={<FaMicrophone className="text-green-800 text-5xl" />}
            title="Voice Commands"
            description="Hands-free navigation with smart voice control."
          />
          <FeatureCard
            icon={<FaGlobe className="text-purple-800 text-5xl" />}
            title="Multi-Language Support"
            description="Learn in your preferred language."
          />
          <FeatureCard
            icon={<FaWifi className="text-red-800 text-5xl" />}
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
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
