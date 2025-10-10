"use client";

import { Card, CardBody, CardHeader, Chip, Input, Button } from "@heroui/react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const SceneBackgroundLite = dynamic(() => import("@/components/SceneBackgroundLite"), { ssr: false, loading: () => null });

const events = [
  { title: "Recruiter AMA", meta: "Thu 7PM", tag: "Careers" },
  { title: "Hack Night", meta: "Sat 1PM", tag: "Build" },
  { title: "Design Crit", meta: "Tue 6PM", tag: "Design" },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen pt-24">
      <SceneBackgroundLite />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h1 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-6xl leading-tight mb-8">
          Events
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((e) => (
            <Card key={e.title} className="bg-card/60 backdrop-blur-sm border-border">
              <CardHeader className="flex items-center justify-between">
                <span className="text-xl">{e.title}</span>
                <Chip size="sm" color="primary" variant="flat">{e.tag}</Chip>
              </CardHeader>
              <CardBody className="text-muted-foreground">{e.meta}</CardBody>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card className="bg-card/60 backdrop-blur-sm border-border">
            <CardHeader className="text-xl">Get event reminders</CardHeader>
            <CardBody>
              <form className="grid md:grid-cols-[1fr_auto] gap-3">
                <Input placeholder="email@company.com" type="email" variant="flat" />
                <Button className="rounded-full" color="primary">Notify me</Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  );
}


