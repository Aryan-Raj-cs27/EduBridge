import Reveal from "./Reveal";

export default function PageHero({ title, subtitle, image }) {
  return (
    <section
      className="relative flex min-h-[250px] items-center justify-center overflow-hidden bg-cover bg-center py-16 sm:min-h-[280px]"
      style={image ? { backgroundImage: `url('${image}')` } : undefined}
    >
      {!image && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900"
          aria-hidden="true"
        ></div>
      )}
      <div className="absolute inset-0 bg-slate-950/55" aria-hidden="true"></div>
      <div className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-blue-400/35 blur-3xl" aria-hidden="true"></div>
      <div className="absolute -right-20 bottom-6 h-44 w-44 rounded-full bg-cyan-300/30 blur-3xl" aria-hidden="true"></div>

      <div className="relative site-container text-center text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 bg-slate-900/35 px-5 py-6 shadow-2xl backdrop-blur-md">
          <Reveal>
            <p className="mx-auto mb-4 inline-block rounded-full border border-blue-100/30 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-100">
              <span className="text-cyan-100">Edu</span>Bridge AI
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="hero-page-title text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="hero-page-subtitle mx-auto mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">{subtitle}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
