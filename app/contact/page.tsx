"use client";

import { motion } from "motion/react";
import { Input, Textarea, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";
import dynamic from "next/dynamic";

const SceneBackgroundLite = dynamic(() => import("@/components/SceneBackgroundLite"), { ssr: false, loading: () => null });

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      setSubmitting(true);
      setStatus(null);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      setStatus({ type: "success", message: "Thanks! We’ll get back to you shortly." });
      form.reset();
    } catch (err: any) {
      setStatus({ type: "error", message: err?.message || "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main className="min-h-screen pt-24">
      <SceneBackgroundLite />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h1 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-6xl leading-tight mb-8">
          Contact
        </motion.h1>
        <Card className="max-w-3xl bg-card/60 backdrop-blur-sm border-border">
          <CardHeader className="text-xl">Tell us about your company</CardHeader>
          <CardBody>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Input name="name" isRequired label="Name" placeholder="Your name" variant="flat" />
              <Input name="email" isRequired type="email" label="Email" placeholder="email@company.com" variant="flat" />
              <Input name="subject" isRequired label="Subject" placeholder="Partnership or hiring" variant="flat" />
              <Textarea name="message" isRequired label="Message" placeholder="How can we collaborate?" variant="flat" minRows={4} />
              {status && (
                <div className={status.type === "success" ? "text-primary" : "text-destructive"}>{status.message}</div>
              )}
              <Button type="submit" isDisabled={submitting} className="rounded-full w-fit" color="primary">
                {submitting ? "Sending..." : "Send"}
              </Button>
            </form>
          </CardBody>
        </Card>
      </section>
    </main>
  );
}


