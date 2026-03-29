export default function AboutPage() {
  return (
    <div className="bg-transparent">
      <div
        className="relative flex h-[56vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/about-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-950/55"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
          <p className="mt-2 text-base text-blue-100 sm:text-lg">For explorers everywhere.</p>
        </div>
      </div>

      <div className="site-container section-padding text-center">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-copy mx-auto mt-4 max-w-3xl">
          We believe that education should be accessible to everyone. EduBridge AI helps underprivileged students learn in a personalized way, breaking barriers through adaptive learning technology.
        </p>
        <div className="mx-auto mt-8 max-w-xl rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-700 shadow-sm">
          Customer Care: +91 9031859167
        </div>
      </div>
    </div>
  );
}
