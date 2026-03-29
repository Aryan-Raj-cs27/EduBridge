"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  duration = 560,
  className = "",
  as: Component = "div",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-duration": `${duration}ms`,
      }}
    >
      {children}
    </Component>
  );
}
