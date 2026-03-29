import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-blue-500/30 blur-3xl"></div>
      <div className="absolute -right-12 bottom-8 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="site-container section-padding relative text-center">
        <p className="mx-auto mb-4 inline-block rounded-full border border-blue-300/35 bg-blue-400/15 px-3 py-1 text-xs font-semibold tracking-wide text-blue-100">
          Future-ready Learning Platform
        </p>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Welcome to EduBridge AI
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-blue-100 sm:text-lg">
          Personalized, practical, and adaptive learning for every student on any device.
        </p>
        <div className="mt-9">
          <Link href="/courses" className="btn-primary bg-white text-blue-800 hover:bg-slate-100">
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
