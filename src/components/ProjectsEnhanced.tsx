"use client";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Github, ArrowLeft, ArrowRight, ChevronRight, Filter } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { cn } from "./ui/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { THEME } from "../constants/theme";

// Extended project type with more details
type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  featured?: boolean;
  link?: string;
  github?: string;
  type: 'app' | 'research' | 'hardware' | 'design';
};

// Sample expanded projects data
const projects: Project[] = [
  {
    id: "ai-assistant",
    title: "AI Research Assistant",
    description: "A smart tool that helps students find and summarize academic papers using natural language processing and machine learning algorithms.",
    tags: ["Python", "NLP", "React", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1581916459131-90da1f9c7162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHJvYm90aWNzJTIwcHJvamVjdHxlbnwxfHx8fDE3NTk5Mjk0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
    github: "https://github.com",
    link: "https://example.com",
    type: "research"
  },
  {
    id: "campus-events",
    title: "Campus Event Platform",
    description: "A full-stack web application for discovering and managing campus events with real-time updates and personalized recommendations.",
    tags: ["TypeScript", "Next.js", "Supabase", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc1OTgxNTk2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
    github: "https://github.com",
    link: "https://example.com",
    type: "app"
  },
  {
    id: "collab-hub",
    title: "Code Collaboration Hub",
    description: "A real-time collaborative coding environment designed for pair programming and team projects with integrated version control and chat.",
    tags: ["WebRTC", "Node.js", "MongoDB", "Socket.io"],
    image: "https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9qZWN0JTIwbGFwdG9wfGVufDF8fHx8MTc1OTkyOTQzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
    github: "https://github.com",
    type: "app"
  },
  {
    id: "smart-greenhouse",
    title: "Smart Greenhouse System",
    description: "IoT-powered greenhouse monitoring system that uses sensors and automation to create optimal growing conditions for plants.",
    tags: ["IoT", "Raspberry Pi", "Python", "C++"],
    image: "https://images.unsplash.com/photo-1458323679450-544d14a91ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxncmVlbmhvdXNlfGVufDB8fHx8MTY4MzAzOTA5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    github: "https://github.com",
    type: "hardware"
  },
  {
    id: "data-viz",
    title: "Interactive Data Visualization",
    description: "A platform for creating beautiful, interactive data visualizations for complex research datasets with collaboration features.",
    tags: ["D3.js", "React", "TypeScript", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE2ODM4MTAyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    github: "https://github.com",
    link: "https://example.com",
    type: "app"
  },
  {
    id: "learning-platform",
    title: "Adaptive Learning Platform",
    description: "An educational platform that uses AI to personalize learning experiences based on student performance and preferences.",
    tags: ["Machine Learning", "React", "Node.js", "Firebase"],
    image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWNofGVufDB8fHx8MTY4MzAzOTMwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    github: "https://github.com",
    type: "app"
  },
  {
    id: "ux-redesign",
    title: "University Portal UX Redesign",
    description: "A comprehensive redesign of the university's student portal focusing on accessibility, usability, and modern interface design.",
    tags: ["UI/UX", "Figma", "User Research", "Accessibility"],
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbnxlbnwwfHx8fDE2ODMwMzkzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    link: "https://example.com",
    type: "design"
  },
];

// Extract all unique tags for filtering
const allTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort();

// Project Card Component
function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border bg-card h-full flex flex-col">
        <div className="relative overflow-hidden h-48">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-4 pb-4">
            {project.github && (
              <motion.a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 text-black" />
              </motion.a>
            )}
            {project.link && (
              <motion.a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer" 
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5 text-black" />
              </motion.a>
            )}
          </div>
          
          {/* Project type badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant="outline"
              className={cn(
                "rounded-full text-xs bg-background/80 backdrop-blur-md border-none px-3 shadow-md",
                project.type === 'app' && "bg-green-500/20 text-green-500",
                project.type === 'research' && "bg-blue-500/20 text-blue-500",
                project.type === 'hardware' && "bg-orange-500/20 text-orange-500", 
                project.type === 'design' && "bg-purple-500/20 text-purple-500"
              )}
            >
              {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold mb-3 group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#A855F7] group-hover:bg-clip-text group-hover:text-transparent transition-all">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full text-xs"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="rounded-full text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Featured Project Carousel
function FeaturedProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProjects = projects.filter(p => p.featured);
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredProjects.length - 1 : prevIndex - 1
    );
  };

  return (
    <motion.div 
      className="mb-16 rounded-xl overflow-hidden bg-muted/50 p-1 shadow-xl relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative h-[500px] overflow-hidden rounded-lg">
        <div 
          className="absolute inset-0 transition-all duration-700 ease-in-out bg-cover bg-center bg-no-repeat opacity-60 blur-sm"
          style={{ backgroundImage: `url(${featuredProjects[currentIndex].image})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="flex h-full relative z-10">
          <div className="w-1/2 lg:w-3/5 flex items-center justify-center p-8 lg:p-16">
            <div>
              <Badge 
                className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                Featured Project
              </Badge>
              
              <motion.h3 
                className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent"
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {featuredProjects[currentIndex].title}
              </motion.h3>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-6"
                key={`desc-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {featuredProjects[currentIndex].description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-2 mb-8"
                key={`tags-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {featuredProjects[currentIndex].tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </motion.div>
              
              <motion.div 
                className="flex gap-4"
                key={`btns-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {featuredProjects[currentIndex].github && (
                  <Button 
                    variant="outline" 
                    className="rounded-full group"
                    asChild
                  >
                    <a href={featuredProjects[currentIndex].github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Source
                      <motion.div
                        className="inline-block ml-1"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.8 }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </a>
                  </Button>
                )}
                {featuredProjects[currentIndex].link && (
                  <Button 
                    className="rounded-full bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#6366F1]/20"
                    asChild
                  >
                    <a href={featuredProjects[currentIndex].link} target="_blank" rel="noopener noreferrer">
                      View Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="w-1/2 lg:w-2/5 relative flex items-center justify-center p-8"
            key={`image-container-${currentIndex}`}
          >
            <motion.div
              className="w-full h-[280px] lg:h-[320px] relative rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: 0,
                transition: { duration: 0.7, ease: "easeOut" }
              }}
              key={`image-${currentIndex}`}
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              <ImageWithFallback
                src={featuredProjects[currentIndex].image}
                alt={featuredProjects[currentIndex].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Navigation controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredProjects.map((_, idx) => (
            <button 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-8 bg-gradient-to-r from-[#6366F1] to-[#A855F7]' 
                  : 'bg-white/30'
              }`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all"
          onClick={handlePrevious}
          aria-label="Previous project"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all"
          onClick={handleNext}
          aria-label="Next project"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Filter projects based on selected tags and type
  useEffect(() => {
    let result = projects;
    
    // Filter by project type if not "all"
    if (activeTab !== "all") {
      result = result.filter(project => project.type === activeTab);
    }
    
    // Filter by selected tags if any
    if (selectedTags.length > 0) {
      result = result.filter(project => 
        selectedTags.some(tag => project.tags.includes(tag))
      );
    }
    
    setFilteredProjects(result);
  }, [activeTab, selectedTags]);

  return (
    <section id="projects" className="py-32 px-6 relative" ref={ref}>
      {/* Background design element */}
      <div 
        className="absolute inset-0 pointer-events-none bg-no-repeat bg-center opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, ${THEME.colors.primary} 0%, transparent 70%), 
                           radial-gradient(circle at 80% 80%, ${THEME.colors.accent} 0%, transparent 50%)`
        }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
            Our Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore what we've been building. From AI experiments to full-stack applications, our projects showcase innovation and technical excellence.
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        <FeaturedProjectCarousel />

        {/* Filtering Interface */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs 
            defaultValue="all" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid grid-cols-5 w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="app">Apps</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter by Tags
                  {selectedTags.length > 0 && (
                    <Badge className="ml-1 rounded-full bg-primary text-white hover:bg-primary/90">
                      {selectedTags.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {allTags.map(tag => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTags(prev => [...prev, tag]);
                      } else {
                        setSelectedTags(prev => prev.filter(t => t !== tag));
                      }
                    }}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {selectedTags.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedTags([])}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid with Filter Results Message */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-muted-foreground/20 rounded-xl">
            <p className="text-muted-foreground">No projects match your filters. Try adjusting your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setActiveTab("all");
                setSelectedTags([]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Result count */}
            {(selectedTags.length > 0 || activeTab !== "all") && (
              <motion.p 
                className="mb-4 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              </motion.p>
            )}
          
            {/* Projects grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={isInView}
                />
              ))}
            </div>
          </>
        )}

        {/* More Projects Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full group hover:bg-muted/50"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}