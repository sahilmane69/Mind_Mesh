"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomCursor from "@/components/CustomCursor";
import { Header } from "@/components/Header";

const joinSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  interest: z.string().min(10, "Please describe your interests (minimum 10 characters)"),
});

type JoinFormData = z.infer<typeof joinSchema>;

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
  });

  const onSubmit = async (data: JoinFormData) => {
    try {
      // TODO: Send data to backend API
      console.log("Form data:", data);
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#A855F7] mb-4 shadow-lg shadow-indigo-500/25">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent mb-2">
            Mind Mesh
          </h1>
          <p className="text-sm text-muted-foreground">Innovation & Technology Club</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {submitted ? (
            <div className="text-center space-y-4 py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10 mb-2">
                <svg className="w-8 h-8 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Welcome Aboard! 🎉</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Thank you for your interest in Mind Mesh. We'll review your application and contact you within 48 hours.
              </p>
              <Button 
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="mt-4"
              >
                Submit Another
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Join Our Community</h2>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and we'll get in touch with next steps.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input 
                    {...register("name")}
                    id="name" 
                    placeholder="John Doe" 
                    className="h-11"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input 
                    {...register("email")}
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="h-11"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Input 
                    {...register("phone")}
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest" className="text-sm font-medium">
                    Areas of Interest
                  </Label>
                  <Input 
                    {...register("interest")}
                    id="interest" 
                    placeholder="AI, Web Development, Robotics..." 
                    className="h-11"
                  />
                  {errors.interest && (
                    <p className="text-sm text-red-500">{errors.interest.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-11 bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9333EA] text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>

                <p className="text-xs text-center text-muted-foreground pt-2">
                  By submitting, you agree to our terms and privacy policy.
                </p>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Already a member? <a href="#" className="text-[#6366F1] hover:text-[#A855F7] font-medium">Sign in</a></p>
        </div>
      </div>
    </main>
  );
}