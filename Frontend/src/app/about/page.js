import PageHero from "@/app/components/PageHero";

export default function AboutPage() {
  return (
    <div className="bg-transparent">
      <PageHero
        title="About EduBridge"
        subtitle="Built for learners who want practical growth, not just passive content."
        image="/about-bg.jpg"
      />

      <div className="site-container section-padding text-center">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-copy mx-auto mt-4 max-w-3xl">
          EduBridge combines clarity, structure, and adaptive learning support so anyone can build job-ready skills faster.
        </p>
        <div className="mx-auto mt-8 max-w-xl rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-700 shadow-sm">
          Customer Care: +91 9031859167
        </div>
      </div>
    </div>
  );
}
