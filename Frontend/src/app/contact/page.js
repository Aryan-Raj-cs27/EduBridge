import PageHero from "@/app/components/PageHero";

export default function Contact() {
  return (
    <main>
      <PageHero
        title="Contact"
        subtitle="Talk to us for support, collaborations, and course-related questions."
      />

      <div className="section-padding">
        <div className="site-container">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="card-surface p-6 text-left">
              <h2 className="text-lg font-semibold text-slate-900">Email</h2>
              <p className="mt-2 text-slate-600">For support and queries</p>
              <p className="mt-3 text-base font-medium text-blue-700">aryan.raj.cs27@gmail.com</p>
            </div>

            <div className="card-surface p-6 text-left">
              <h2 className="text-lg font-semibold text-slate-900">Response Time</h2>
              <p className="mt-2 text-slate-600">We usually reply within 24 hours on working days.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
