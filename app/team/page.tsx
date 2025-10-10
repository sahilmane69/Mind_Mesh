"use client";

import { Card, CardBody, CardHeader, Avatar, Input, Button } from "@heroui/react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const SceneBackgroundLite = dynamic(() => import("@/components/SceneBackgroundLite"), { ssr: false, loading: () => null });

const people = [
  { name: "Sahil Mane", role: "Lead", img: undefined },
  { name: "Alex Chen", role: "Engineering", img: undefined },
  { name: "Maya Patel", role: "Design", img: undefined },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen pt-24">
      <SceneBackgroundLite />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h1 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-6xl leading-tight mb-8">
          Team
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-3">
          {people.map((p) => (
            <Card key={p.name} className="bg-card/60 backdrop-blur-sm border-border">
              <CardHeader className="flex items-center gap-3">
                <Avatar name={p.name} />
                <div>
                  <div className="text-xl">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.role}</div>
                </div>
              </CardHeader>
              <CardBody className="text-muted-foreground">Focused on impactful projects and great member experience.</CardBody>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card className="bg-card/60 backdrop-blur-sm border-border">
            <CardHeader className="text-xl">Refer a candidate</CardHeader>
            <CardBody>
              <form className="grid md:grid-cols-3 gap-3">
                <Input label="Name" placeholder="Candidate name" variant="flat" />
                <Input label="Email" type="email" placeholder="email@company.com" variant="flat" />
                <Button className="rounded-full" color="primary">Submit</Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  );
}


