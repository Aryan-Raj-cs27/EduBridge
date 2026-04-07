"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 50, y: 34 });
  const pointerTarget = useRef({ x: 50, y: 34 });
  const visualPos = useRef({ x: 50, y: 34 });
  const hovered = useRef(false);

  useEffect(() => {
    let rafId = 0;
    let driftX = 50;
    let driftY = 34;
    let vx = 0.18;
    let vy = 0.12;

    const tick = () => {
      driftX += vx;
      driftY += vy;

      if (driftX < 34 || driftX > 66) vx *= -1;
      if (driftY < 22 || driftY > 52) vy *= -1;

      const wanderX = driftX + Math.sin(Date.now() * 0.0012) * 4;
      const wanderY = driftY + Math.cos(Date.now() * 0.001) * 3;
      const target = hovered.current ? pointerTarget.current : { x: wanderX, y: wanderY };
      const followStrength = hovered.current ? 0.06 : 0.08;

      const nextX = visualPos.current.x + (target.x - visualPos.current.x) * followStrength;
      const nextY = visualPos.current.y + (target.y - visualPos.current.y) * followStrength;
      visualPos.current = { x: nextX, y: nextY };
      setMouse({ x: nextX, y: nextY });

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
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
    pointerTarget.current = {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  };

  return (
    <section
      className="hero-shell"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        hovered.current = true;
      }}
      onMouseLeave={() => {
        hovered.current = false;
      }}
      style={styleVars}
    >
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-orb hero-orb-left" aria-hidden="true"></div>
      <div className="hero-orb hero-orb-right" aria-hidden="true"></div>

      <div className="site-container relative py-16 text-center sm:py-20">
        <p className="hero-chip hero-intro" style={{ "--hero-intro-delay": "60ms" }}>
          Future-ready Learning Platform
        </p>

        <h1 className="hero-intro mx-auto mt-4 max-w-4xl text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl" style={{ "--hero-intro-delay": "170ms" }}>
          Learn Smarter with
          <span className="hero-brand mt-3 block">EduBridge AI</span>
        </h1>

        <p className="hero-intro mx-auto mt-5 max-w-2xl text-base text-blue-100 sm:text-lg" style={{ "--hero-intro-delay": "280ms" }}>
          Structured and practical learning paths for students, professionals, and career switchers.
        </p>

        <div className="hero-intro mt-9" style={{ "--hero-intro-delay": "390ms" }}>
          <Link href="/courses" className="btn-fancy">
            Explore Courses
            <span className="ml-2" aria-hidden="true">
              {"->"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
