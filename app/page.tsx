"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Projects } from "@/components/Projects";
import { Team } from "@/components/Team";
import { CountUp, StatsGroup } from "@/components/CountUp";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Button } from "@/components/ui/button";

export default function Page() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove global smooth scroll to keep navigation snappy
    document.documentElement.style.scrollBehavior = "auto";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <About />
        </div>
      </section>
      
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <StatsGroup 
            stats={[
              { value: 750, label: "Community Members", icon: "users" },
              { value: 45, label: "Active Projects", icon: "code" },
              { value: 120, label: "Events Hosted", icon: "calendar" },
              { value: 25, label: "Partner Universities", icon: "building" }
            ]}
          />
        </div>
      </section>
      
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Projects />
        </div>
      </section>
      
      <section id="events" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Events />
        </div>
      </section>
      
      {/* Testimonials section removed */}
      
      <section id="team" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Team />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent mb-6">
            Ready to Join Mind Mesh?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Become part of our innovative community and collaborate with like-minded creators, builders, and thinkers.
          </p>
          <Link href="/join" passHref>
            <Button 
              className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9333EA] text-white px-8 py-6 text-lg h-auto"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

