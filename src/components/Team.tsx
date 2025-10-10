"use client";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Mail, X, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { THEME } from "../constants/theme";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  email?: string;
  website?: string;
  featured?: boolean;
  group: 'leadership' | 'tech' | 'design' | 'events' | 'alumni';
  position?: { x: number; y: number };
};

// Extended team members data with additional details
const team: TeamMember[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "President",
    image: "https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHN0dWRlbnR8ZW58MXx8fHwxNzU5OTI5NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Full-stack developer passionate about AI and education tech. Leading Mind Mesh to create opportunities for students to collaborate and innovate.",
    skills: ["React", "Node.js", "Python", "AI"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "alex@university.edu",
    featured: true,
    group: 'leadership',
    position: { x: 0.5, y: 0.3 }
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "UX designer and front-end enthusiast building accessible web experiences. Focused on creating inclusive tech communities on campus.",
    skills: ["UI/UX", "Figma", "React", "Accessibility"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "sarah@university.edu",
    featured: true,
    group: 'leadership',
    position: { x: 0.3, y: 0.4 }
  },
  {
    id: "marcus-williams",
    name: "Marcus Williams",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Backend wizard specializing in distributed systems and cloud architecture. Building scalable infrastructure for student projects.",
    skills: ["Go", "AWS", "Kubernetes", "System Design"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "marcus@university.edu",
    website: "https://personalsite.com",
    featured: true,
    group: 'tech',
    position: { x: 0.7, y: 0.5 }
  },
  {
    id: "emily-rodriguez",
    name: "Emily Rodriguez",
    role: "Events Coordinator",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    bio: "Community builder and hackathon organizer with a love for robotics. Creating spaces for students to learn, build, and connect.",
    skills: ["Event Planning", "Arduino", "Robotics", "Community Building"],
    linkedin: "https://linkedin.com",
    email: "emily@university.edu",
    group: 'events',
    position: { x: 0.4, y: 0.6 }
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "Workshop Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "ML researcher exploring the intersection of AI and creative applications. Leading workshops to make machine learning accessible to all students.",
    skills: ["PyTorch", "TensorFlow", "Data Science", "Teaching"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "david@university.edu",
    group: 'tech',
    position: { x: 0.8, y: 0.3 }
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    role: "Marketing Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Creative technologist bridging design, code, and community outreach. Amplifying Mind Mesh's impact through strategic communications.",
    skills: ["Digital Marketing", "Graphic Design", "Content Strategy", "Analytics"],
    linkedin: "https://linkedin.com",
    email: "priya@university.edu",
    website: "https://personalsite.com",
    group: 'design',
    position: { x: 0.6, y: 0.7 }
  },
  {
    id: "james-lee",
    name: "James Lee",
    role: "Design Lead",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    bio: "Visual designer creating cohesive brand experiences. Working at the intersection of technology and creative expression.",
    skills: ["Brand Design", "Motion Graphics", "UI/UX", "Illustration"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    group: 'design',
    position: { x: 0.2, y: 0.6 }
  },
  {
    id: "olivia-taylor",
    name: "Olivia Taylor",
    role: "Hackathon Director",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
    bio: "Experienced hackathon organizer and community builder. Creating immersive learning experiences through competitive events.",
    skills: ["Event Management", "Sponsorships", "Project Management", "Web Development"],
    linkedin: "https://linkedin.com",
    email: "olivia@university.edu",
    group: 'events',
    position: { x: 0.3, y: 0.2 }
  },
  {
    id: "daniel-garcia",
    name: "Daniel Garcia",
    role: "Technical Mentor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Software engineer with industry experience mentoring the next generation of developers. Specializing in full-stack development and systems design.",
    skills: ["Java", "Spring Boot", "React", "Mentorship"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "daniel@university.edu",
    group: 'tech',
    position: { x: 0.1, y: 0.4 }
  },
  {
    id: "zoe-wong",
    name: "Zoe Wong",
    role: "Content Creator",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    bio: "Digital storyteller documenting the journey of Mind Mesh and its members. Crafting narratives that inspire innovation and collaboration.",
    skills: ["Video Production", "Social Media", "Storytelling", "Graphic Design"],
    linkedin: "https://linkedin.com",
    website: "https://personalsite.com",
    group: 'design',
    position: { x: 0.7, y: 0.2 }
  },
  {
    id: "ryan-smith",
    name: "Ryan Smith",
    role: "Alumni Advisor",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
    bio: "Former Mind Mesh president now working at a major tech company. Providing guidance and industry connections to current members.",
    skills: ["Leadership", "Career Development", "Industry Relations", "Mentorship"],
    linkedin: "https://linkedin.com",
    email: "ryan@company.com",
    website: "https://personalsite.com",
    group: 'alumni',
    position: { x: 0.9, y: 0.6 }
  },
];

// Group members by their role type
const groupMembers = (members: TeamMember[]) => {
  return {
    leadership: members.filter(m => m.group === 'leadership'),
    tech: members.filter(m => m.group === 'tech'),
    design: members.filter(m => m.group === 'design'),
    events: members.filter(m => m.group === 'events'),
    alumni: members.filter(m => m.group === 'alumni'),
    all: members
  };
};

// Component for a team member's social links
function MemberSocials({ member }: { member: TeamMember }) {
  return (
    <div className="flex justify-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
      {member.github && (
        <motion.a 
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors"
        >
          <Github className="w-4 h-4" />
        </motion.a>
      )}
      {member.linkedin && (
        <motion.a 
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </motion.a>
      )}
      {member.email && (
        <motion.a 
          href={`mailto:${member.email}`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors"
        >
          <Mail className="w-4 h-4" />
        </motion.a>
      )}
      {member.website && (
        <motion.a 
          href={member.website}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors"
        >
          <Globe className="w-4 h-4" />
        </motion.a>
      )}
    </div>
  );
}

// Member Card Component
function MemberCard({ member, index, isVisible }: { member: TeamMember; index: number; isVisible: boolean }) {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      layout
    >
      <Card 
        className="bg-card border border-border overflow-hidden transition-all duration-300 hover:shadow-xl group-hover:shadow-[#6366F1]/10"
      >
        <div className={`p-6 text-center ${showDetails ? 'pb-0' : ''}`}>
          <div className="relative mb-5">
            <Avatar 
              className="w-28 h-28 mx-auto ring-4 ring-background group-hover:ring-[#6366F1]/20 transition-all"
            >
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {member.featured && (
              <div className="absolute -top-2 -right-2">
                <Badge className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9333EA]">
                  Featured
                </Badge>
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-1 group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#A855F7] group-hover:bg-clip-text group-hover:text-transparent transition-all">
            {member.name}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3">{member.role}</p>

          <MemberSocials member={member} />
          
          <AnimatePresence>
            {showDetails && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-4"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {member.skills.map(skill => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>Show More</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// Network Visualization Component
function MemberNetwork({ activeGroup }: { activeGroup: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Get filtered members based on active group
  const members = activeGroup === 'all' 
    ? team 
    : team.filter(member => member.group === activeGroup);

  // Calculate dimensions on mount and resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Draw the network connections
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections between members
    members.forEach((member1, i) => {
      members.forEach((member2, j) => {
        if (i >= j) return; // Only draw connections once
        
        const p1 = {
          x: member1.position!.x * canvas.width,
          y: member1.position!.y * canvas.height
        };
        
        const p2 = {
          x: member2.position!.x * canvas.width,
          y: member2.position!.y * canvas.height
        };
        
        // Calculate distance
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only draw connections if members are "close enough"
        if (distance < canvas.width * 0.3) {
          // Opacity based on distance
          const opacity = Math.max(0, 1 - distance / (canvas.width * 0.3));
          
          // Check if either member is hovered
          const isHovered = hoveredMember === member1.id || hoveredMember === member2.id;
          
          // Create gradient
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          gradient.addColorStop(0, `rgba(99, 102, 241, ${isHovered ? 0.6 : 0.1 * opacity})`);
          gradient.addColorStop(1, `rgba(168, 85, 247, ${isHovered ? 0.6 : 0.1 * opacity})`);
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = isHovered ? 2 : 1;
          ctx.stroke();
        }
      });
    });
    
    // Draw nodes at member positions
    members.forEach(member => {
      const { x, y } = member.position!;
      const nodeX = x * canvas.width;
      const nodeY = y * canvas.height;
      
      // Draw glow for hovered member
      if (hoveredMember === member.id) {
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.fill();
      }
      
      // Draw node
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 8, 0, Math.PI * 2);
      
      // Create radial gradient
      const gradient = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, 8);
      gradient.addColorStop(0, '#6366F1');
      gradient.addColorStop(1, '#A855F7');
      
      ctx.fillStyle = gradient;
      ctx.fill();
    });
  }, [dimensions, members, hoveredMember]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[500px] relative bg-muted/10 rounded-xl border border-border overflow-hidden mb-16"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Member Avatars */}
      {members.map((member) => {
        if (!member.position) return null;
        
        return (
          <motion.div
            key={member.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${member.position.x * 100}%`,
              top: `${member.position.y * 100}%`
            }}
            whileHover={{ scale: 1.1 }}
            onMouseEnter={() => setHoveredMember(member.id)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div className="relative cursor-pointer">
              <Avatar className="w-16 h-16 ring-4 ring-background hover:ring-[#6366F1]/50 transition-all shadow-lg">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              {/* Tooltip */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-card p-2 rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Main Team Component
export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeGroup, setActiveGroup] = useState<string>('all');
  
  // Group members for filtering
  const groupedMembers = groupMembers(team);
  const filteredMembers = activeGroup === 'all' 
    ? team 
    : team.filter(member => member.group === activeGroup);
  
  return (
    <section id="team" className="py-32 px-6 relative" ref={ref}>
      {/* Background design elements */}
      <div 
        className="absolute inset-0 pointer-events-none bg-no-repeat bg-center opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, ${THEME.colors.primary} 0%, transparent 60%), 
                           radial-gradient(circle at 70% 70%, ${THEME.colors.accent} 0%, transparent 40%)`
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
            Meet the Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The passionate individuals driving Mind Mesh forward. Connect with our team members and join our community.
          </p>
        </motion.div>
        
        {/* Network visualization */}
        <MemberNetwork activeGroup={activeGroup} />
        
        {/* Team filters */}
        <div className="mb-12 flex justify-center">
          <Tabs 
            defaultValue="all" 
            value={activeGroup} 
            onValueChange={setActiveGroup}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="leadership">Leaders</TabsTrigger>
              <TabsTrigger value="tech">Tech</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Team members grid */}
        <motion.div 
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          {filteredMembers.map((member, index) => (
            <MemberCard 
              key={member.id} 
              member={member} 
              index={index} 
              isVisible={isInView} 
            />
          ))}
        </motion.div>
        
        {/* Join the team CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Want to Join Our Team?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join Mind Mesh. Apply now to be part of our growing community.
          </p>
          <Button 
            className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:opacity-90 transition-all rounded-full px-8 shadow-md hover:shadow-lg hover:shadow-[#6366F1]/20"
            size="lg"
          >
            Apply to Join
          </Button>
        </motion.div>
      </div>
    </section>
  );
}