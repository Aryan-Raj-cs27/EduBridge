import Features from "./components/Features";
import Hero from "./components/Hero";
import Link from "next/link";
import Reveal from "./components/Reveal";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />

      <section className="section-padding pt-4 sm:pt-6">
        <div className="site-container">
          <Reveal>
            <div className="card-surface mx-auto max-w-4xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Ready to start your adaptive learning journey?
              </h2>
              <p className="mt-3 text-slate-600">
                Create your account, explore live courses from the database, and track your growth with EduBridge.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href="/signup" className="btn-primary">Get Started</Link>
                <Link
                  href="/courses"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
