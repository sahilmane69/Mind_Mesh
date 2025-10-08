"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const team = [
  {
    name: "Alex Chen",
    role: "President",
    image: "https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHN0dWRlbnR8ZW58MXx8fHwxNzU5OTI5NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bio: "Full-stack developer passionate about AI and education tech.",
  },
  {
    name: "Sarah Johnson",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "UX designer and front-end enthusiast building accessible web experiences.",
  },
  {
    name: "Marcus Williams",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Backend wizard specializing in distributed systems and cloud architecture.",
  },
  {
    name: "Emily Rodriguez",
    role: "Events Coordinator",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    bio: "Community builder and hackathon organizer with a love for robotics.",
  },
  {
    name: "David Kim",
    role: "Workshop Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "ML researcher exploring the intersection of AI and creative applications.",
  },
  {
    name: "Priya Patel",
    role: "Marketing Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Creative technologist bridging design, code, and community outreach.",
  },
];

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">Meet the Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The passionate individuals driving Mind Mesh forward.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer text-center">
                <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-background group-hover:ring-[#6366F1]/50 transition-all">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <h3 className="mb-1 group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#A855F7] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {member.name}
                </h3>
                <p className="text-muted-foreground mb-4">{member.role}</p>
                <p className="text-muted-foreground mb-6">{member.bio}</p>
                
                <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Github className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
