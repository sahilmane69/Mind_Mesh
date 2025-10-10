"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const layerSlowRef = useRef<HTMLDivElement | null>(null);
  const layerMidRef = useRef<HTMLDivElement | null>(null);
  const layerFastRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMouseMove);

    const ctx = gsap.context(() => {
      if (layerSlowRef.current) {
        gsap.to(layerSlowRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { scrub: 0.3 },
        });
      }
      if (layerMidRef.current) {
        gsap.to(layerMidRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { scrub: 0.3 },
        });
      }
      if (layerFastRef.current) {
        gsap.to(layerFastRef.current, {
          yPercent: 26,
          ease: "none",
          scrollTrigger: { scrub: 0.3 },
        });
      }
    }, rootRef);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient mesh that follows the cursor subtly */}
      <div
        ref={layerSlowRef}
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, var(--ring) 0%, transparent 45%), radial-gradient(circle at ${100 - mouse.x}% ${100 - mouse.y}%, var(--primary) 0%, transparent 45%)`,
        }}
      />

      {/* Soft color orbs */}
      <div ref={layerMidRef} className="absolute inset-0">
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{ left: "8%", top: "18%", width: 380, height: 380, background: "radial-gradient(circle, var(--ring), transparent)" }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{ left: "68%", top: "62%", width: 460, height: 460, background: "radial-gradient(circle, var(--primary), transparent)" }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{ left: "42%", top: "8%", width: 320, height: 320, background: "radial-gradient(circle, var(--accent), transparent)" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        ref={layerFastRef}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--ring) 1px, transparent 1px), linear-gradient(to bottom, var(--ring) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}


