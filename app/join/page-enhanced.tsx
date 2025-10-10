"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { FooterEnhanced } from "@/components/FooterEnhanced";
import { 
  ArrowRight, ArrowLeft, User, Mail, Phone, Briefcase, 
  Github, Linkedin, Twitter, CheckCircle2, Sparkles
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/ui/utils";

// Extended schema for multi-step form
const joinSchema = z.object({
  // Step 1: Basic Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  
  // Step 2: Background & Interests
  role: z.enum(["student", "professional", "educator", "other"]),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  background: z.string().min(10, "Please tell us more about yourself (minimum 10 characters)"),
  
  // Step 3: Additional Information
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  referral: z.string().optional(),
  
  // Step 4: Terms & Agreements
  termsAgreed: z.boolean().refine(val => val === true, "You must agree to the terms"),
  newsletterOpt: z.boolean().optional(),
});

type JoinFormData = z.infer<typeof joinSchema>;

// Interest options
const INTERESTS = [
  { id: "ai", label: "Artificial Intelligence" },
  { id: "web", label: "Web Development" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "data", label: "Data Science" },
  { id: "design", label: "UI/UX Design" },
  { id: "iot", label: "Internet of Things" },
  { id: "ar_vr", label: "AR/VR" },
  { id: "blockchain", label: "Blockchain" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "robotics", label: "Robotics" },
];

// Form step interface
interface FormStep {
  title: string;
  description: string;
  fields: string[];
}

// Define steps
const FORM_STEPS: FormStep[] = [
  {
    title: "Personal Details",
    description: "Let's start with the basics",
    fields: ["name", "email", "phone"],
  },
  {
    title: "Background & Interests",
    description: "Tell us more about yourself",
    fields: ["role", "experience", "interests", "background"],
  },
  {
    title: "Additional Info",
    description: "Connect your profiles (optional)",
    fields: ["github", "linkedin", "twitter", "referral"],
  },
  {
    title: "Complete",
    description: "Terms and submission",
    fields: ["termsAgreed", "newsletterOpt"],
  },
];

// Progress indicator component
const ProgressIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center justify-between mb-8 w-full max-w-sm mx-auto">
      {FORM_STEPS.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full border-2 z-10",
              currentStep === index 
                ? "border-[#6366F1] text-[#6366F1]" 
                : currentStep > index 
                  ? "border-[#6366F1] bg-[#6366F1] text-white"
                  : "border-slate-300 dark:border-slate-600 text-slate-300 dark:text-slate-600"
            )}
          >
            {currentStep > index ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}
          </div>
          
          {index < FORM_STEPS.length - 1 && (
            <div 
              className={cn(
                "h-[2px] w-16 -mt-5",
                currentStep > index 
                  ? "bg-[#6366F1]" 
                  : "bg-slate-300 dark:bg-slate-600"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Step indicator animations
const stepVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: (direction: number) => ({
    opacity: 0, 
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.2 }
  })
};

export default function JoinPageEnhanced() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Reset scroll position when changing steps
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollTop = 0;
    }
  }, [currentStep]);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      role: "student",
      experience: "beginner",
      interests: [],
      termsAgreed: false,
      newsletterOpt: true,
    }
  });

  const watchedInterests = watch("interests", []);
  const watchedTerms = watch("termsAgreed", false);
  
  // Handle interest toggle
  const handleInterestToggle = (id: string) => {
    const currentInterests = watchedInterests;
    const updatedInterests = currentInterests.includes(id)
      ? currentInterests.filter(i => i !== id)
      : [...currentInterests, id];
    
    setValue("interests", updatedInterests);
    trigger("interests");
  };

  // Handle next step
  const handleNext = async () => {
    const currentFields = FORM_STEPS[currentStep].fields;
    const isValid = await trigger(currentFields as any);
    
    if (isValid) {
      setDirection(1);
      setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1));
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Form submission handler
  const onSubmit = async (data: JoinFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Reset form and state
  const resetForm = () => {
    reset();
    setCurrentStep(0);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#A855F7] mb-4 shadow-lg shadow-indigo-500/25"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.2
            }}
          >
            <motion.svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </motion.svg>
          </motion.div>
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Mind Mesh
          </motion.h1>
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Innovation & Technology Club
          </motion.p>
        </div>

        {/* Main Card */}
        <motion.div 
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {submitted ? (
            // Success state
            <motion.div 
              className="p-8 sm:p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center justify-center space-y-6 py-8">
                <motion.div 
                  className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10 flex items-center justify-center"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(99, 102, 241, 0.3)", "0 0 20px rgba(99, 102, 241, 0.7)", "0 0 0px rgba(99, 102, 241, 0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      border: ["2px solid rgba(99, 102, 241, 0.2)", "2px solid rgba(99, 102, 241, 0.8)", "2px solid rgba(99, 102, 241, 0.2)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    animate={{ scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#6366F1]" />
                  </motion.div>
                </motion.div>
                
                <div>
                  <motion.h2 
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Welcome to Mind Mesh! <Sparkles className="inline-block w-6 h-6 text-[#A855F7]" />
                  </motion.h2>
                  <motion.p 
                    className="text-muted-foreground max-w-sm mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Thank you for your interest in Mind Mesh! We'll review your application and contact you within 48 hours.
                  </motion.p>
                </div>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-xs mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button 
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1"
                  >
                    Submit Another
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="flex-1 bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9333EA]"
                  >
                    Return Home
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            // Multi-step form
            <>
              {/* Progress indicator */}
              <div className="pt-8 px-6 sm:px-10">
                <ProgressIndicator currentStep={currentStep} />
              </div>
              
              {/* Form content */}
              <div ref={formRef} className="p-6 sm:p-10">
                <div className="mb-8">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h2 className="text-2xl font-semibold mb-1">
                        {FORM_STEPS[currentStep].title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {FORM_STEPS[currentStep].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      {/* Step 1: Basic Information */}
                      {currentStep === 0 && (
                        <>
                          <div className="space-y-3">
                            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                              <User size={16} /> Full Name
                            </Label>
                            <Input 
                              {...register("name")}
                              id="name" 
                              placeholder="John Doe" 
                              className="h-11"
                            />
                            {errors.name && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-500"
                              >
                                {errors.name.message}
                              </motion.p>
                            )}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                              <Mail size={16} /> Email Address
                            </Label>
                            <Input 
                              {...register("email")}
                              id="email" 
                              type="email" 
                              placeholder="john@example.com" 
                              className="h-11"
                            />
                            {errors.email && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-500"
                              >
                                {errors.email.message}
                              </motion.p>
                            )}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                              <Phone size={16} /> Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
                            </Label>
                            <Input 
                              {...register("phone")}
                              id="phone" 
                              type="tel" 
                              placeholder="+1 (555) 000-0000" 
                              className="h-11"
                            />
                          </div>
                        </>
                      )}

                      {/* Step 2: Background & Interests */}
                      {currentStep === 1 && (
                        <>
                          <div className="space-y-3">
                            <Label className="text-sm font-medium flex items-center gap-2">
                              <Briefcase size={16} /> Your Role
                            </Label>
                            <RadioGroup 
                              defaultValue="student"
                              className="grid grid-cols-2 gap-3"
                              onValueChange={(value) => setValue("role", value as any)}
                            >
                              {[
                                { value: "student", label: "Student" },
                                { value: "professional", label: "Professional" },
                                { value: "educator", label: "Educator" },
                                { value: "other", label: "Other" }
                              ].map((item) => (
                                <div key={item.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={item.value} id={`role-${item.value}`} />
                                  <Label htmlFor={`role-${item.value}`}>{item.label}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Experience Level</Label>
                            <RadioGroup 
                              defaultValue="beginner"
                              onValueChange={(value) => setValue("experience", value as any)}
                            >
                              <div className="flex space-x-4">
                                {[
                                  { value: "beginner", label: "Beginner" },
                                  { value: "intermediate", label: "Intermediate" },
                                  { value: "advanced", label: "Advanced" }
                                ].map((item) => (
                                  <div key={item.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={item.value} id={`exp-${item.value}`} />
                                    <Label htmlFor={`exp-${item.value}`}>{item.label}</Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Areas of Interest</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {INTERESTS.map((interest) => (
                                <div key={interest.id} className="flex items-start space-x-2">
                                  <Checkbox 
                                    id={`interest-${interest.id}`} 
                                    checked={watchedInterests.includes(interest.id)}
                                    onCheckedChange={() => handleInterestToggle(interest.id)}
                                  />
                                  <Label htmlFor={`interest-${interest.id}`} className="text-sm">
                                    {interest.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                            {errors.interests && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-500"
                              >
                                {errors.interests.message}
                              </motion.p>
                            )}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="background" className="text-sm font-medium">
                              Tell us about yourself
                            </Label>
                            <Textarea 
                              {...register("background")}
                              id="background"
                              placeholder="Share your background, goals, and what you hope to achieve by joining Mind Mesh..."
                              className="min-h-[120px]"
                            />
                            {errors.background && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-500"
                              >
                                {errors.background.message}
                              </motion.p>
                            )}
                          </div>
                        </>
                      )}

                      {/* Step 3: Additional Information */}
                      {currentStep === 2 && (
                        <>
                          <div className="space-y-3">
                            <Label htmlFor="github" className="text-sm font-medium flex items-center gap-2">
                              <Github size={16} /> GitHub Profile <span className="text-muted-foreground font-normal">(Optional)</span>
                            </Label>
                            <Input 
                              {...register("github")}
                              id="github" 
                              placeholder="github.com/username" 
                              className="h-11"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
                              <Linkedin size={16} /> LinkedIn Profile <span className="text-muted-foreground font-normal">(Optional)</span>
                            </Label>
                            <Input 
                              {...register("linkedin")}
                              id="linkedin" 
                              placeholder="linkedin.com/in/username" 
                              className="h-11"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="twitter" className="text-sm font-medium flex items-center gap-2">
                              <Twitter size={16} /> Twitter/X Handle <span className="text-muted-foreground font-normal">(Optional)</span>
                            </Label>
                            <Input 
                              {...register("twitter")}
                              id="twitter" 
                              placeholder="@username" 
                              className="h-11"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="referral" className="text-sm font-medium">
                              How did you hear about us? <span className="text-muted-foreground font-normal">(Optional)</span>
                            </Label>
                            <Input 
                              {...register("referral")}
                              id="referral" 
                              placeholder="Friend, social media, event..." 
                              className="h-11"
                            />
                          </div>
                        </>
                      )}

                      {/* Step 4: Terms & Agreements */}
                      {currentStep === 3 && (
                        <>
                          <div className="space-y-6">
                            <div className="p-5 bg-muted/40 border border-muted rounded-lg">
                              <h3 className="font-medium mb-2">Community Guidelines</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                By joining Mind Mesh, you agree to abide by our community guidelines which promote respect,
                                collaboration, and learning. We expect all members to:
                              </p>
                              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5 mb-4">
                                <li>Treat all members with respect and courtesy</li>
                                <li>Share knowledge and help others grow</li>
                                <li>Participate actively in community discussions and events</li>
                                <li>Provide constructive feedback</li>
                                <li>Adhere to intellectual property rights</li>
                              </ul>
                            </div>

                            <div className="flex items-start space-x-3">
                              <Checkbox 
                                id="terms" 
                                checked={watchedTerms}
                                onCheckedChange={(checked) => setValue("termsAgreed", checked === true)}
                              />
                              <div className="grid gap-1.5">
                                <Label htmlFor="terms" className="text-sm font-medium">
                                  I agree to the <a href="#" className="text-[#6366F1] hover:text-[#A855F7] underline">Terms of Service</a> and <a href="#" className="text-[#6366F1] hover:text-[#A855F7] underline">Privacy Policy</a>
                                </Label>
                                {errors.termsAgreed && (
                                  <motion.p 
                                    initial={{ opacity: 0, y: -10 }} 
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-red-500"
                                  >
                                    {errors.termsAgreed.message}
                                  </motion.p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <Checkbox 
                                id="newsletter" 
                                defaultChecked={true}
                                onCheckedChange={(checked) => setValue("newsletterOpt", checked === true)}
                              />
                              <div className="grid gap-1.5">
                                <Label htmlFor="newsletter" className="text-sm">
                                  Subscribe to our newsletter for updates (you can unsubscribe anytime)
                                </Label>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation buttons */}
                  <div className="flex justify-between pt-4 border-t border-muted">
                    {currentStep > 0 ? (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handlePrevious}
                        className="flex items-center gap-1"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                    ) : (
                      <div></div> 
                    )}
                    
                    {currentStep < FORM_STEPS.length - 1 ? (
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9333EA] flex items-center gap-1"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !watchedTerms}
                        className={cn(
                          "bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9333EA] relative",
                          "disabled:opacity-70 disabled:cursor-not-allowed"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="opacity-0">Submit Application</span>
                            <motion.div 
                              className="absolute inset-0 flex items-center justify-center"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                            </motion.div>
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </motion.div>

        {/* Sign in link */}
        <motion.div 
          className="text-center mt-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p>Already a member? <a href="#" className="text-[#6366F1] hover:text-[#A855F7] font-medium">Sign in</a></p>
        </motion.div>
      </div>
      <FooterEnhanced />
    </div>
  );
}