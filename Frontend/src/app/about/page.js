import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";

export default function AboutPage() {
  return (
    <div className="bg-transparent">
      <PageHero
        title="About EduBridge"
        subtitle="Built for learners who want practical growth with clarity, structure, and momentum."
        image="/about-bg.jpg"
      />

      <div className="site-container section-padding text-center">
        <Reveal>
          <h2 className="section-title">Our Mission</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="section-copy mx-auto mt-4 max-w-3xl">
            EduBridge blends practical curriculum design with modern guidance so learners can build useful skills without confusion.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
