"use client";

import { useRef, useState } from "react";
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import logoImage from "../assets/logo.png";
import { SOCIAL_LINKS } from "../constants/links";
import { THEME } from "../constants/theme";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./ui/utils";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  gradientFrom: string;
  gradientTo: string;
  isExternal?: boolean;
}

const SocialIcon = ({ href, icon, label, gradientFrom, gradientTo, isExternal = true }: SocialIconProps) => {
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="relative group p-3 rounded-full bg-muted/30 transition-all duration-300 hover:scale-110"
      whileHover={{
        boxShadow: `0 0 20px ${gradientFrom}50`,
      }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}
      />
      <motion.div 
        className="relative z-10"
        animate={{ rotate: [0, 0] }}
        whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.div>
    </motion.a>
  );
};

interface NewsletterFormProps {
  onSubmit: (email: string) => void;
}

const NewsletterForm = ({ onSubmit }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitState("success");
      setEmail("");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitState("idle");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 3000);
    }, 1500);
    
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col space-y-2">
        <div className="relative flex items-center">
          <Input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting || submitState === "success"}
            className={cn(
              "pr-12 transition-all duration-300",
              submitState === "success" && "border-green-500 ring-green-200/50",
              submitState === "error" && "border-red-500 ring-red-200/50"
            )}
          />
          <AnimatePresence mode="wait">
            {submitState === "idle" && (
              <motion.div 
                className="absolute right-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                key="submit"
              >
                <Button 
                  type="submit" 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 px-2 text-muted-foreground hover:bg-transparent hover:text-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="h-4 w-4 border-2 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>
              </motion.div>
            )}
            
            {submitState === "success" && (
              <motion.div 
                className="absolute right-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key="success"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
            )}
            
            {submitState === "error" && (
              <motion.div 
                className="absolute right-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key="error"
              >
                <AlertCircle className="h-5 w-5 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {submitState === "success" && (
            <motion.p
              className="text-xs text-green-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              Thank you for subscribing! Check your inbox soon.
            </motion.p>
          )}
          
          {submitState === "error" && (
            <motion.p
              className="text-xs text-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export function Footer() {
  const handleNewsletterSubmit = (email: string) => {
    console.log("Newsletter subscription:", email);
    // In a real app, you would send this to your API
  };

  // Animated quick links
  const linkVariants = {
    hover: {
      x: 5,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <footer className="py-16 px-6 backdrop-blur-xl bg-background/80 border-t border-border/50 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image src={logoImage} alt="Mind Mesh Logo" width={32} height={32} />
              <span className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-bold text-lg">
                Mind Mesh
              </span>
            </motion.div>
            <p className="text-muted-foreground">
              A community for builders, thinkers, and creators at the intersection of technology and innovation.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Events", href: "#events" },
                { name: "Team", href: "#team" }
              ].map((link, i) => (
                <motion.li key={i} whileHover="hover">
                  <motion.a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    variants={linkVariants}
                  >
                    {link.name}
                    <motion.span
                      variants={{
                        hover: { opacity: 1, x: 0 },
                        initial: { opacity: 0, x: -5 }
                      }}
                      initial="initial"
                      animate="initial"
                      className="opacity-0"
                    >
                      <ArrowRight size={12} />
                    </motion.span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              <SocialIcon 
                href={SOCIAL_LINKS.github} 
                icon={<Github className="w-5 h-5" />} 
                label="GitHub"
                gradientFrom="#6366F1" 
                gradientTo="#A855F7" 
              />
              <SocialIcon 
                href={SOCIAL_LINKS.linkedin} 
                icon={<Linkedin className="w-5 h-5" />} 
                label="LinkedIn" 
                gradientFrom="#0077B5" 
                gradientTo="#00A0DC" 
              />
              <SocialIcon 
                href={SOCIAL_LINKS.twitter} 
                icon={<Twitter className="w-5 h-5" />} 
                label="Twitter" 
                gradientFrom="#1DA1F2" 
                gradientTo="#14171A" 
              />
              <SocialIcon 
                href={SOCIAL_LINKS.instagram} 
                icon={<Instagram className="w-5 h-5" />} 
                label="Instagram" 
                gradientFrom="#833AB4" 
                gradientTo="#FD1D1D" 
              />
            </div>
            <motion.div 
              className="text-muted-foreground flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="w-4 h-4" />
              <span>mindmesh@university.edu</span>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest events and updates.
            </p>
            <NewsletterForm onSubmit={handleNewsletterSubmit} />
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            © 2025 Mind Mesh. All rights reserved.
          </motion.p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
              <motion.a 
                key={i}
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                whileHover={{ y: -1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}