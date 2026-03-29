"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) {
      return;
    }

    let angle = 0;
    const timer = window.setInterval(() => {
      angle += 0.08;
      const x = 50 + Math.sin(angle) * 12;
      const y = 36 + Math.cos(angle * 0.8) * 8;
      setMouse({ x, y });
    }, 80);

    return () => window.clearInterval(timer);
  }, []);

  const styleVars = useMemo(
    () => ({
      "--hero-mx": `${mouse.x}%`,
      "--hero-my": `${mouse.y}%`,
    }),
    [mouse]
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  };

  return (
    <section
      className="hero-shell"
      onMouseMove={handleMouseMove}
      style={styleVars}
    >
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-orb hero-orb-left" aria-hidden="true"></div>
      <div className="hero-orb hero-orb-right" aria-hidden="true"></div>

      <div className="site-container relative py-16 text-center sm:py-20">
        <Reveal delay={90} duration={540}>
          <p className="hero-chip">
            Future-ready Learning Platform
          </p>
        </Reveal>

        <Reveal delay={210} duration={620}>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
            Learn Smarter with
            <span className="hero-brand mt-3 block">EduBridge AI</span>
          </h1>
        </Reveal>

        <Reveal delay={340} duration={600}>
          <p className="mx-auto mt-5 max-w-2xl text-base text-blue-100 sm:text-lg">
            Structured and practical learning paths for students, professionals, and career switchers.
          </p>
        </Reveal>

        <Reveal delay={430} duration={560} className="mt-9">
          <Link href="/courses" className="btn-fancy">
            Explore Courses
            <span className="ml-2" aria-hidden="true">
              {"->"}
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
