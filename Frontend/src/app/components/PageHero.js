export default function PageHero({ title, subtitle, image }) {
  return (
    <section
      className="relative flex h-[44vh] min-h-[280px] items-center justify-center overflow-hidden bg-cover bg-center"
      style={image ? { backgroundImage: `url('${image}')` } : undefined}
    >
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" aria-hidden="true"></div>
      )}
      <div className="absolute inset-0 bg-slate-950/55" aria-hidden="true"></div>

      <div className="relative site-container text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">{subtitle}</p>
      </div>
    </section>
  );
}
