"use client";

import { useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Events } from "@/components/Events";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

export default function Page() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Events />
      <Team />
      <Footer />
    </div>
  );
}


