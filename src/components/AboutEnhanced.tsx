"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, Suspense } from "react";
import { FloatingCards3D } from "./FloatingCards3D";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  BadgeCheck, 
  BookOpen, 
  Code, 
  Compass, 
  Lightbulb, 
  Users, 
  Zap, 
  ChevronRight,
  ChevronsUp
} from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const HighlightCard = ({ icon, title, description, index }: HighlightCardProps) => {
  return (
    <motion.div
      className="flex gap-4 p-5 rounded-xl border border-border bg-gradient-to-br from-white/5 to-white/0 dark:from-white/5 dark:to-white/0 backdrop-blur-sm relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
    >
      {/* Background glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-[#6366F1]/0 to-[#A855F7]/0 opacity-0 group-hover:from-[#6366F1]/10 group-hover:to-[#A855F7]/10 group-hover:opacity-100 rounded-xl transition-all duration-700 ease-out" />
      
      <div className="mt-1 text-[#6366F1]">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

const TimelineItem = ({ year, title, description, index }: TimelineItemProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={cn(
        "flex gap-4",
        isEven ? "flex-row" : "flex-row-reverse"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Timeline connector */}
      <div className="relative flex flex-col items-center">
        <div className="w-px h-full bg-gradient-to-b from-[#6366F1] to-[#A855F7]/50 absolute top-0 left-1/2 transform -translate-x-1/2" />
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#A855F7] flex items-center justify-center text-white text-xs font-medium z-10"
          whileHover={{ scale: 1.2 }}
        >
          {year}
        </motion.div>
      </div>
      
      {/* Content */}
      <motion.div 
        className={cn(
          "bg-white/5 backdrop-blur-sm border border-border rounded-lg p-5 shadow-lg max-w-xs my-4",
          isEven ? "ml-4" : "mr-4"
        )}
        whileHover={{ y: -4 }}
      >
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </motion.div>
    </motion.div>
  );
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("mission");

  const highlights = [
    {
      icon: <Users size={24} />,
      title: "Community First",
      description: "A supportive network of tech enthusiasts, creators and innovators"
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Creative Innovation",
      description: "We encourage thinking outside the box and turning ideas into reality"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Continuous Learning",
      description: "Regular workshops, tutorials, and knowledge-sharing sessions"
    },
    {
      icon: <Code size={24} />,
      title: "Hands-on Projects",
      description: "Build real-world solutions through collaborative projects"
    },
    {
      icon: <Compass size={24} />,
      title: "Industry Exposure",
      description: "Connect with leaders and professionals from top tech companies"
    },
    {
      icon: <Zap size={24} />,
      title: "Tech Diversity",
      description: "Explore multiple domains from AI and web dev to robotics and VR"
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "Mind Mesh Founded",
      description: "Started with just 15 members and a vision to create a collaborative tech community"
    },
    {
      year: "2019",
      title: "First Hackathon",
      description: "Organized our first 24-hour hackathon with over 100 participants"
    },
    {
      year: "2020",
      title: "Virtual Transition",
      description: "Successfully transitioned all activities to virtual platforms during the pandemic"
    },
    {
      year: "2021",
      title: "Mentorship Program",
      description: "Launched our industry mentorship program connecting students with professionals"
    },
    {
      year: "2022",
      title: "Cross-Campus Expansion",
      description: "Expanded to five university campuses across the country"
    },
    {
      year: "2023",
      title: "Innovation Lab",
      description: "Established a dedicated innovation lab with state-of-the-art equipment"
    },
    {
      year: "2024",
      title: "Global Recognition",
      description: "Received international recognition for student-led technology initiatives"
    }
  ];
  
  const values = [
    "Curiosity and continuous learning",
    "Collaboration over competition",
    "Diversity of thought and background",
    "Responsible and ethical innovation",
    "Community support and mentorship",
    "Hands-on experimentation"
  ];

  // Scroll to top of the section
  const scrollToTop = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative" ref={ref}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto pb-16" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#6366F1]/10 to-[#A855F7]/10 text-[#6366F1] mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About Us
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Building the Future,{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            
            <motion.p 
              className="text-muted-foreground mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Mind Mesh is more than just a tech club — it's a space where passionate students come together to learn, build, and innovate. We believe in the power of collaboration and the magic that happens when curious minds connect.
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              From hackathons to workshops, from AI experiments to web development, we explore the full spectrum of technology while fostering a supportive, inclusive community.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button 
                className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9333EA] group"
                size="lg"
              >
                <span>Learn More</span>
                <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl overflow-hidden h-[450px]">
              <Suspense fallback={<div className="w-full h-[450px] bg-muted rounded-2xl" />}>
                <FloatingCards3D />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto py-16">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
          <p className="text-muted-foreground">At Mind Mesh, we combine technology education with community building to create an environment where innovation thrives.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-5xl mx-auto py-24">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl font-bold mb-3">Our Story</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Dive deeper into what makes Mind Mesh special.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Tabs 
            defaultValue="mission" 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="mission">Our Mission</TabsTrigger>
              <TabsTrigger value="values">Our Values</TabsTrigger>
              <TabsTrigger value="history">Our History</TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <TabsContent 
                value="mission" 
                className="mt-2"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  key="mission"
                >
                  <div className="bg-gradient-to-br from-[#6366F1]/5 to-[#A855F7]/5 p-8 rounded-xl">
                    <div className="mx-auto text-center max-w-3xl">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10 flex items-center justify-center">
                        <BadgeCheck size={32} className="text-[#6366F1]" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        To foster a community where technology enthusiasts can learn, create, and innovate together, breaking down barriers to knowledge and forming meaningful connections.
                      </p>
                      <div className="max-w-lg mx-auto border border-[#6366F1]/20 rounded-lg p-6 bg-white/5 backdrop-blur-sm">
                        <p className="italic text-muted-foreground">
                          "We believe that the most groundbreaking innovations come not from isolated genius but from collaborative environments where diverse perspectives meet technical skills."
                        </p>
                        <p className="mt-4 font-medium">— Mind Mesh Founding Team</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent 
                value="values" 
                className="mt-2"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  key="values"
                >
                  <div className="bg-gradient-to-br from-[#6366F1]/5 to-[#A855F7]/5 p-8 rounded-xl">
                    <div className="max-w-3xl mx-auto">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10 flex items-center justify-center">
                        <Compass size={32} className="text-[#6366F1]" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-6 text-center">Core Values</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {values.map((value, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-[#6366F1]/10 p-4 rounded-lg"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#6366F1]/20 to-[#A855F7]/20 flex items-center justify-center shrink-0">
                              <BadgeCheck size={16} className="text-[#6366F1]" />
                            </div>
                            <p className="text-sm">{value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent 
                value="history" 
                className="mt-2"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  key="history"
                >
                  <div className="bg-gradient-to-br from-[#6366F1]/5 to-[#A855F7]/5 p-8 rounded-xl">
                    <div className="max-w-4xl mx-auto">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10 flex items-center justify-center">
                        <BookOpen size={32} className="text-[#6366F1]" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-10 text-center">Our Journey</h3>
                      
                      <div className="space-y-8 relative">
                        {/* Vertical timeline line */}
                        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-[#6366F1] to-[#A855F7]/30" />
                        
                        {/* Timeline items */}
                        {timeline.map((item, index) => (
                          <TimelineItem
                            key={index}
                            year={item.year}
                            title={item.title}
                            description={item.description}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
      
      {/* Back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-10 h-10 rounded-full bg-gradient-to-r from-[#6366F1] to-[#A855F7] flex items-center justify-center text-white shadow-lg z-50"
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: false }}
      >
        <ChevronsUp size={20} />
      </motion.button>
    </section>
  );
}