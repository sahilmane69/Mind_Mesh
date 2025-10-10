"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Page() {
  useEffect(() => {
    // Remove global smooth scroll to keep navigation snappy
    document.documentElement.style.scrollBehavior = "auto";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}


