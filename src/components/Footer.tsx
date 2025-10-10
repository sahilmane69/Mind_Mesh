"use client";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import logoImage from "../assets/logo.png";
import { SOCIAL_LINKS } from "../constants/links";
import { THEME } from "../constants/theme";

export function Footer() {
  return (
    <footer className="py-16 px-6 backdrop-blur-xl bg-background/80 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo and description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={logoImage} alt="Mind Mesh Logo" width={32} height={32} />
              <span className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                Mind Mesh
              </span>
            </div>
            <p className="text-muted-foreground">
              A community for builders, thinkers, and creators at the intersection of technology and innovation.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Team
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-gradient-to-r hover:from-[#6366F1] hover:to-[#A855F7] hover:text-white transition-all"
                aria-label="Follow us on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-gradient-to-r hover:from-[#6366F1] hover:to-[#A855F7] hover:text-white transition-all"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-gradient-to-r hover:from-[#6366F1] hover:to-[#A855F7] hover:text-white transition-all"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-gradient-to-r hover:from-[#6366F1] hover:to-[#A855F7] hover:text-white transition-all"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="p-2 rounded-full bg-muted hover:bg-gradient-to-r hover:from-[#6366F1] hover:to-[#A855F7] hover:text-white transition-all"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground">
              mindmesh@university.edu
            </p>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            © 2025 Mind Mesh. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
