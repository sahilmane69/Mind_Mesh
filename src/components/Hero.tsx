"use client";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Scene3D } from "./Scene3D";
import { Suspense, useEffect, useState } from "react";

// Animated gradient orb component
function GradientOrb({ delay = 0, x, y, size, color1, color2 }: any) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1}, ${color2})`,
        left: x,
        top: y,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
        x: [0, 30, 0],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Floating particle component
function FloatingParticle({ delay = 0, x, y }: any) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-full"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -100, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated gradient background
  const gradientX = useTransform(
    useSpring(mousePosition.x, { damping: 50 }),
    [-1, 1],
    [0, 100]
  );
  const gradientY = useTransform(
    useSpring(mousePosition.y, { damping: 50 }),
    [-1, 1],
    [0, 100]
  );

  // Text reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  } satisfies Variants;

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  } satisfies Variants;

  const title = "Connecting Curious Minds";
  const words = title.split(" ");

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, #6366F1 0%, transparent 50%), radial-gradient(circle at ${100 - Number(gradientX)}% ${100 - Number(gradientY)}%, #A855F7 0%, transparent 50%)`,
        }}
      />

      {/* Gradient orbs */}
      <GradientOrb delay={0} x="10%" y="20%" size="400px" color1="#6366F1" color2="transparent" />
      <GradientOrb delay={2} x="70%" y="60%" size="500px" color1="#A855F7" color2="transparent" />
      <GradientOrb delay={4} x="40%" y="10%" size="350px" color1="#8B5CF6" color2="transparent" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.2}
          x={`${Math.random() * 100}%`}
          y={`${50 + Math.random() * 50}%`}
        />
      ))}

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, #6366F1 1px, transparent 1px),
                           linear-gradient(to bottom, #6366F1 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6366F1]/10 to-[#A855F7]/10 border border-[#6366F1]/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#6366F1]" />
          <span className="text-sm text-muted-foreground">
            Building the future of tech together
          </span>
        </motion.div>

        {/* Animated title with word-by-word reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl leading-tight">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 md:mr-6">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    variants={letterVariants}
                    className="inline-block bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent"
                    style={{ perspective: "1000px" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle with typing effect */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          Mind Mesh is a community for{" "}
          <span className="text-foreground font-medium">builders</span>,{" "}
          <span className="text-foreground font-medium">thinkers</span>, and{" "}
          <span className="text-foreground font-medium">creators</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:opacity-90 transition-all duration-300 rounded-full group shadow-lg shadow-[#6366F1]/25 hover:shadow-xl hover:shadow-[#6366F1]/40 hover:scale-105"
          >
            <Link href="/join">
              Join the Club
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-2 hover:bg-muted/50 transition-all duration-300"
          >
            Explore Projects
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
        >
          {[
            { value: "500+", label: "Members" },
            { value: "50+", label: "Projects" },
            { value: "100+", label: "Events" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
}
