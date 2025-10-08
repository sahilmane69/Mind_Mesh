"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const upcomingEvents = [
  {
    date: "Oct 15, 2025",
    time: "6:00 PM - 8:00 PM",
    title: "AI & Machine Learning Workshop",
    location: "CS Building, Room 301",
    tags: ["Workshop", "AI"],
  },
  {
    date: "Oct 22, 2025",
    time: "5:00 PM - 9:00 PM",
    title: "Hack Night: Build Something Cool",
    location: "Innovation Lab",
    tags: ["Hackathon", "Social"],
  },
  {
    date: "Nov 5, 2025",
    time: "7:00 PM - 8:30 PM",
    title: "Tech Talk: Modern Web Development",
    location: "Virtual (Zoom)",
    tags: ["Tech Talk", "Web Dev"],
  },
];

const pastEvents = [
  {
    date: "Sep 20, 2025",
    time: "6:00 PM - 8:00 PM",
    title: "Welcome Meet & Greet",
    location: "Student Center",
    tags: ["Social", "Networking"],
  },
  {
    date: "Sep 28, 2025",
    time: "5:00 PM - 10:00 PM",
    title: "Fall Hackathon 2025",
    location: "Engineering Building",
    tags: ["Hackathon", "Competition"],
  },
];

export function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  
  const events = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <section id="events" className="py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">Events</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join us for workshops, hackathons, and tech talks.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === "upcoming"
                ? "bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === "past"
                ? "bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Past Events
          </button>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card group cursor-pointer hover:border-[#6366F1]/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="min-w-[100px]">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#A855F7] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
