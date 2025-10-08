"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputMode, setInputMode] = useState<"pointer" | "keyboard">("pointer");

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluatePreferences = () => {
      setIsEnabled(pointerFine.matches && !reducedMotion.matches);
    };

    evaluatePreferences();

    const handlePointerChange = () => evaluatePreferences();
    const handleMotionChange = () => evaluatePreferences();

    pointerFine.addEventListener("change", handlePointerChange);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      pointerFine.removeEventListener("change", handlePointerChange);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        setInputMode("keyboard");
      }
    };

    const handlePointerDown = () => {
      setInputMode("pointer");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || inputMode === "keyboard") {
      return;
    }

    const updateMousePosition = (event: PointerEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const interactiveSelector = "a, button, [role='button'], input, textarea, select, [data-cursor-interactive='true']";

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(interactiveSelector);
      setIsHovering(Boolean(interactive));
      setInputMode("pointer");
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const related = event.relatedTarget as HTMLElement | null;
      if (related && (related === target || target.contains(related))) {
        return;
      }
      setIsHovering(false);
    };

    window.addEventListener("pointermove", updateMousePosition, { passive: true });
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", updateMousePosition);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, [isEnabled, inputMode]);

  if (!isEnabled || inputMode === "keyboard") {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
        aria-hidden
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-primary/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200,
          mass: 0.8,
        }}
        aria-hidden
      />
    </>
  );
}
