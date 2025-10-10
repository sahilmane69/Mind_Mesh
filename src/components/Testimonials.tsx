"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { THEME } from "../constants/theme";

// Testimonial type definition
type Testimonial = {
  id: string;
  content: string;
  name: string;
  role: string;
  image?: string;
  featured?: boolean;
};

// Sample testimonials
const testimonials: Testimonial[] = [
  {
    id: "1",
    content: "Mind Mesh has been the highlight of my university experience. The collaborative projects and workshops have helped me grow both technically and professionally. I've made lifelong connections and built a portfolio that landed me my dream internship.",
    name: "Sophia Martinez",
    role: "Computer Science Student",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    featured: true
  },
  {
    id: "2",
    content: "Joining Mind Mesh was the best decision I made during my freshman year. The mentorship from senior members helped me navigate the complex world of software engineering and find my passion in AI research.",
    name: "Jason Wong",
    role: "AI Research Assistant",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
  },
  {
    id: "3",
    content: "The hackathons organized by Mind Mesh are unlike any other. The focus on solving real-world problems and the supportive environment helped our team create an accessibility tool that's now being used by students across campus.",
    name: "Aisha Johnson",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    featured: true
  },
  {
    id: "4",
    content: "As a non-technical student, I was intimidated to join a tech club. Mind Mesh welcomed me with open arms and taught me how my skills in project management and design thinking were valuable to technical projects. Now I bridge the gap between developers and users.",
    name: "Miguel Rodriguez",
    role: "Product Management Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    id: "5",
    content: "The workshops and mentorship I received through Mind Mesh helped me land an internship at a major tech company. The practical skills and portfolio projects made all the difference in my interviews.",
    name: "Emma Chen",
    role: "Software Engineering Intern",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop"
  },
  {
    id: "6",
    content: "Mind Mesh created a space where I could experiment with new technologies without fear of failure. The collaborative environment and constructive feedback helped me grow exponentially as a developer.",
    name: "Jamal Thompson",
    role: "Full-stack Developer",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop"
  },
];

// Single testimonial card component
function TestimonialCard({ 
  testimonial,
  isActive = false
}: { 
  testimonial: Testimonial;
  isActive?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className={`p-8 h-full border-border relative overflow-hidden ${
        isActive ? "shadow-lg" : ""
      }`}>
        {/* Background gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6366F1] to-[#A855F7]"
        />

        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-10">
          <Quote size={60} />
        </div>

        {/* Testimonial content */}
        <div className="mb-8 relative text-lg leading-relaxed">
          "{testimonial.content}"
        </div>

        {/* Author info */}
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4 ring-2 ring-background">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Featured testimonial with larger card
function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <Card className="overflow-hidden bg-gradient-to-r p-[2px] from-[#6366F1] to-[#A855F7]">
        <div className="bg-card p-8 rounded-[calc(0.75rem-2px)] h-full">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 flex justify-center">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-32 h-32 ring-4 ring-background shadow-xl">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  <div className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white text-xs py-1 px-3 rounded-full">
                    Featured
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="md:w-2/3">
              <Quote className="h-10 w-10 text-primary/20 mb-4" />
              <p className="text-xl leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-lg">{testimonial.name}</div>
                <div className="text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Automatic carousel with controls
export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get featured testimonials
  const featuredTestimonials = testimonials.filter(t => t.featured);
  
  // Handle navigation
  const next = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };
  
  const prev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Set up autoplay
  useEffect(() => {
    if (autoplay && isInView) {
      autoplayRef.current = setInterval(() => {
        next();
      }, 5000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, isInView]);
  
  // Pause autoplay on hover/focus
  const handleInteraction = (paused: boolean) => {
    setAutoplay(!paused);
  };

  return (
    <section id="testimonials" className="py-32 px-6 relative" ref={ref}>
      {/* Background design elements */}
      <div 
        className="absolute inset-0 pointer-events-none bg-no-repeat bg-center opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 20%, ${THEME.colors.primary} 0%, transparent 70%), 
                           radial-gradient(circle at 30% 70%, ${THEME.colors.accent} 0%, transparent 50%)`
        }}
      />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
            What Our Members Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from the students who have been part of our community and how Mind Mesh has impacted their journey.
          </p>
        </motion.div>

        {/* Featured testimonial */}
        {featuredTestimonials.length > 0 && (
          <FeaturedTestimonial testimonial={featuredTestimonials[0]} />
        )}

        {/* Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => handleInteraction(true)}
          onMouseLeave={() => handleInteraction(false)}
          onFocus={() => handleInteraction(true)}
          onBlur={() => handleInteraction(false)}
        >
          {/* Carousel wrapper */}
          <div className="overflow-hidden">
            <div className="pb-12">
              <AnimatePresence mode="wait">
                <div 
                  key={currentIndex}
                  className="grid md:grid-cols-3 gap-6"
                >
                  {[0, 1, 2].map(offset => {
                    const index = (currentIndex + offset) % testimonials.length;
                    return (
                      <TestimonialCard 
                        key={testimonials[index].id}
                        testimonial={testimonials[index]}
                        isActive={offset === 0}
                      />
                    );
                  })}
                </div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-muted/80 transition-all"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            {/* Dots indicator */}
            <div className="flex items-center gap-2 px-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-gradient-to-r from-[#6366F1] to-[#A855F7]'
                      : 'bg-muted'
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-muted/80 transition-all"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}