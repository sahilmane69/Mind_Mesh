"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, MapPin, Users, Info, ChevronRight, Star, ExternalLink, Filter } from "lucide-react";
import { cn } from "./ui/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  attendees: number;
  featured?: boolean;
  image?: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    id: "e1",
    date: "Oct 15, 2025",
    time: "6:00 PM - 8:00 PM",
    title: "AI & Machine Learning Workshop",
    description: "Join us for a hands-on workshop exploring the fundamentals of artificial intelligence and machine learning. We'll cover basic concepts and work through practical examples using Python and popular ML libraries. Perfect for beginners and those looking to refresh their knowledge.",
    location: "CS Building, Room 301",
    tags: ["Workshop", "AI", "Python"],
    attendees: 45,
    featured: true,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "e2",
    date: "Oct 22, 2025",
    time: "5:00 PM - 9:00 PM",
    title: "Hack Night: Build Something Cool",
    description: "A casual evening of coding, collaboration, and creativity. Bring your projects, ideas, or just your laptop and join other Mind Mesh members for an informal hackathon. Mentors will be available to help with projects and there will be pizza!",
    location: "Innovation Lab",
    tags: ["Hackathon", "Social", "Coding"],
    attendees: 38
  },
  {
    id: "e3",
    date: "Nov 5, 2025",
    time: "7:00 PM - 8:30 PM",
    title: "Tech Talk: Modern Web Development",
    description: "An in-depth look at current trends and best practices in web development. Our guest speaker will discuss the latest frameworks, performance optimization, and responsive design techniques that are shaping the modern web.",
    location: "Virtual (Zoom)",
    tags: ["Tech Talk", "Web Dev", "Remote"],
    attendees: 120,
    featured: true
  },
  {
    id: "e4",
    date: "Nov 12, 2025",
    time: "4:00 PM - 5:30 PM",
    title: "Introduction to Cybersecurity",
    description: "Learn about the basics of cybersecurity, common vulnerabilities, and how to protect your applications. This session will cover fundamental security concepts every developer should know.",
    location: "CS Building, Room 105",
    tags: ["Workshop", "Cybersecurity"],
    attendees: 50
  },
  {
    id: "e5",
    date: "Nov 18, 2025",
    time: "6:30 PM - 8:00 PM",
    title: "Design Systems Workshop",
    description: "A collaborative workshop on creating and maintaining design systems. Learn how to build component libraries and ensure design consistency across projects.",
    location: "Design Studio",
    tags: ["Workshop", "UI/UX", "Design"],
    attendees: 30,
  }
];

const PAST_EVENTS: Event[] = [
  {
    id: "p1",
    date: "Sep 20, 2025",
    time: "6:00 PM - 8:00 PM",
    title: "Welcome Meet & Greet",
    description: "The kickoff event for the Fall 2025 semester. We introduced new members to Mind Mesh, discussed upcoming events and projects, and had a great time getting to know each other over food and games.",
    location: "Student Center",
    tags: ["Social", "Networking"],
    attendees: 75,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=2200&q=80"
  },
  {
    id: "p2",
    date: "Sep 28, 2025",
    time: "9:00 AM - 9:00 PM",
    title: "Fall Hackathon 2025",
    description: "Our biggest event of the semester! Teams competed to build innovative projects from scratch in just 12 hours. Projects were judged based on creativity, technical difficulty, and practical application.",
    location: "Engineering Building",
    tags: ["Hackathon", "Competition"],
    attendees: 130,
    featured: true,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "p3",
    date: "Sep 10, 2025",
    time: "5:30 PM - 7:00 PM",
    title: "Industry Talk: Future of AR/VR",
    description: "A fascinating discussion on the current state and future prospects of augmented and virtual reality technologies. Our guest speaker from a leading tech company shared insights into industry trends and career opportunities.",
    location: "Virtual (Zoom)",
    tags: ["Tech Talk", "AR/VR", "Remote"],
    attendees: 90
  },
  {
    id: "p4",
    date: "Aug 27, 2025",
    time: "6:00 PM - 8:00 PM",
    title: "Git & GitHub Workshop",
    description: "A hands-on workshop covering the essentials of Git and GitHub for effective collaboration. Participants learned about version control, branching strategies, and pull requests.",
    location: "CS Building, Room 201",
    tags: ["Workshop", "Tools"],
    attendees: 42
  }
];

const EventCard = ({ event, onClick, priority }: { event: Event; onClick: () => void; priority: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: priority * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      layout
    >
      <Card 
        className={cn(
          "p-6 hover:shadow-lg transition-all duration-300 border-border bg-card group cursor-pointer",
          "hover:border-[#6366F1]/50",
          event.featured && "border-[#6366F1]/30 bg-gradient-to-br from-[#6366F1]/5 to-[#A855F7]/5"
        )}
        onClick={onClick}
      >
        <div className="flex flex-col gap-4">
          {event.featured && (
            <div className="flex justify-end">
              <Badge variant="outline" className="bg-[#6366F1]/10 border-[#6366F1]/20 text-[#6366F1] flex items-center gap-1">
                <Star className="h-3 w-3" />
                Featured
              </Badge>
            </div>
          )}
          
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
                  <h3 className="text-xl font-medium mb-2 group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#A855F7] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} Attendees</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
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
              <Button 
                variant="ghost" 
                className="flex items-center justify-center gap-1 group-hover:text-[#6366F1]"
                onClick={onClick}
              >
                <span>Details</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const EventDialog = ({ event, open, onClose }: { event: Event | null; open: boolean; onClose: () => void }) => {
  if (!event) return null;
  
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap gap-2 mb-4 mt-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>

        {event.image && (
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Date & Time</h4>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Location</h4>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{event.attendees} Attendees</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-muted-foreground">
              {event.description}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button className="bg-gradient-to-r from-[#6366F1] to-[#A855F7]">
              Register Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Calendar view component
interface CalendarDayProps {
  date: number;
  month: string;
  year: number;
  events: Event[];
  isToday?: boolean;
  onClick?: (events: Event[]) => void;
}

const CalendarDay = ({ date, month, year, events, isToday, onClick }: CalendarDayProps) => {
  const hasEvents = events.length > 0;
  
  return (
    <motion.div 
      className={cn(
        "aspect-square rounded-lg p-2 border border-border relative",
        hasEvents ? "hover:border-[#6366F1]" : "bg-muted/20",
        isToday && "border-[#6366F1]",
        hasEvents && "cursor-pointer"
      )}
      whileHover={hasEvents ? { y: -4 } : {}}
      onClick={() => hasEvents && onClick && onClick(events)}
    >
      <div className={cn(
        "text-sm absolute top-2 right-2",
        isToday ? "font-bold text-[#6366F1]" : ""
      )}>
        {date}
      </div>
      
      {hasEvents && (
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center gap-1">
            <div className={cn(
              "h-2 w-2 rounded-full",
              isToday ? "bg-[#6366F1]" : "bg-[#A855F7]"
            )} />
            <span className="text-xs text-muted-foreground">{events.length} event{events.length > 1 ? 's' : ''}</span>
          </div>
          
          {events.length === 1 && (
            <div className="mt-1">
              <p className="text-xs truncate font-medium">{events[0].title}</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export function EventsEnhanced() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"list" | "calendar">("list");
  const [eventType, setEventType] = useState<"upcoming" | "past">("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  
  const allEvents = eventType === "upcoming" ? UPCOMING_EVENTS : PAST_EVENTS;
  const allTags = [...new Set(allEvents.flatMap(event => event.tags))];
  
  // Filter events based on selected tags
  const events = filteredTags.length > 0
    ? allEvents.filter(event => event.tags.some(tag => filteredTags.includes(tag)))
    : allEvents;
  
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };
  
  const handleTagToggle = (tag: string) => {
    setFilteredTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Generate calendar data for the calendar view
  const [calendarDays, setCalendarDays] = useState<Array<{date: number; month: string; year: number; events: Event[];}>>([]);
  
  useEffect(() => {
    // Generate a simple calendar for demo purposes (October 2025)
    const days = [];
    for (let i = 1; i <= 31; i++) {
      // Find events for this day
      const dayEvents = UPCOMING_EVENTS.filter(event => {
        const eventDate = event.date.split(', ')[0];
        return eventDate.includes(`Oct ${i}`) || (i % 7 === 3); // Just for demonstration
      });
      
      days.push({
        date: i,
        month: 'Oct',
        year: 2025,
        events: dayEvents
      });
    }
    setCalendarDays(days);
  }, []);
  
  return (
    <section id="events" className="py-16 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#6366F1]/10 to-[#A855F7]/10 text-[#6366F1] mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join Us
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Events</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with like-minded individuals at our workshops, hackathons, and tech talks.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-4">
            <button
              onClick={() => setEventType("upcoming")}
              className={`px-6 py-2 rounded-full transition-all ${
                eventType === "upcoming"
                  ? "bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setEventType("past")}
              className={`px-6 py-2 rounded-full transition-all ${
                eventType === "past"
                  ? "bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Past Events
            </button>
          </div>
          
          <div className="flex gap-4">
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "list" | "calendar")}
              className="w-[240px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  {filteredTags.length > 0 && (
                    <Badge variant="secondary" className="rounded-full ml-1">
                      {filteredTags.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {allTags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={filteredTags.includes(tag)}
                    onCheckedChange={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "list" ? (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {events.length === 0 ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Info size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl font-medium mb-2">No events match your filters</p>
                  <p className="text-muted-foreground">Try selecting different filters or changing your search criteria.</p>
                  
                  {filteredTags.length > 0 && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setFilteredTags([])}
                    >
                      Clear Filters
                    </Button>
                  )}
                </motion.div>
              ) : (
                <>
                  {/* Featured events (show first if any) */}
                  {events.filter(e => e.featured).length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <h3 className="text-xl font-medium mb-4">Featured Events</h3>
                      <div className="space-y-4">
                        {events
                          .filter(e => e.featured)
                          .map((event, index) => (
                            <EventCard
                              key={event.id}
                              event={event}
                              onClick={() => handleEventClick(event)}
                              priority={index}
                            />
                          ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Regular events */}
                  <motion.div>
                    {events.filter(e => !e.featured).length > 0 && (
                      <h3 className="text-xl font-medium mb-4">
                        {events.filter(e => e.featured).length > 0 ? "All Events" : ""}
                      </h3>
                    )}
                    <div className="space-y-4">
                      {events
                        .filter(e => !e.featured)
                        .map((event, index) => (
                          <EventCard
                            key={event.id}
                            event={event}
                            onClick={() => handleEventClick(event)}
                            priority={events.filter(e => e.featured).length + index}
                          />
                        ))}
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="calendar-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-muted/20 border border-border rounded-xl p-6"
            >
              <div className="mb-6">
                <h3 className="text-xl font-medium">October 2025</h3>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for proper alignment */}
                {Array(2).fill(0).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                
                {calendarDays.map((day, i) => (
                  <CalendarDay
                    key={`day-${i}`}
                    date={day.date}
                    month={day.month}
                    year={day.year}
                    events={day.events}
                    isToday={day.date === 15} // Just for demo
                    onClick={(events) => {
                      if (events.length === 1) {
                        handleEventClick(events[0]);
                      } else if (events.length > 1) {
                        // Could show a list of events for this day
                        handleEventClick(events[0]);
                      }
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* CTA Banner */}
        <motion.div 
          className="mt-16 p-8 rounded-xl bg-gradient-to-r from-[#6366F1]/10 to-[#A855F7]/10 border border-[#6366F1]/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">Want to stay updated?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter to get notified about upcoming events, workshops, and hackathons.
          </p>
          <Button className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] flex items-center gap-2">
            <span>Subscribe Now</span>
            <ExternalLink size={16} />
          </Button>
        </motion.div>
        
        {/* Event Details Dialog */}
        <EventDialog
          event={selectedEvent}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </div>
    </section>
  );
}