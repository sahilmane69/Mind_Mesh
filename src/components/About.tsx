"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, Suspense } from "react";
import { FloatingCards3D } from "./FloatingCards3D";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">
              Building the Future,{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Mind Mesh is more than just a tech club — it's a space where passionate students come together to learn, build, and innovate. We believe in the power of collaboration and the magic that happens when curious minds connect.
            </p>
            <p className="text-muted-foreground text-lg">
              From hackathons to workshops, from AI experiments to web development, we explore the full spectrum of technology while fostering a supportive, inclusive community.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Suspense fallback={<div className="w-full h-[400px] bg-muted rounded-2xl" />}>
                <FloatingCards3D />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
