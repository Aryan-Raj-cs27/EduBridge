import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-12">
      <div className="site-container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              <span className="brand-accent">Edu</span>Bridge AI
            </h3>
            <p className="mt-3 max-w-sm text-sm text-slate-600">
              Adaptive, project-led learning pathways built for students who want practical outcomes.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/courses" className="hover:text-blue-600">Courses</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Account</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/login" className="hover:text-blue-600">Login</Link></li>
              <li><Link href="/signup" className="hover:text-blue-600">Sign Up</Link></li>
              <li><Link href="/profile" className="hover:text-blue-600">Profile</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200/70 pt-5 text-sm text-slate-600">
          <p>Copyright {year} EduBridge AI. Built for Web Technology evaluation.</p>
        </div>
      </div>
    </footer>
  );
}
