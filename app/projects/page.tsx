"use client";

import { Card, CardBody, CardFooter, CardHeader, Button } from "@heroui/react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const SceneBackgroundLite = dynamic(() => import("@/components/SceneBackgroundLite"), { ssr: false, loading: () => null });

const demo = [
  { title: "Campus Navigator", desc: "Wayfinding app with 3D maps.", href: "#" },
  { title: "Resume AI", desc: "LLM résumé critique tool.", href: "#" },
  { title: "Club CMS", desc: "Content system for student orgs.", href: "#" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24">
      <SceneBackgroundLite />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h1 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-6xl leading-tight mb-8">
          Projects
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-3">
          {demo.map((p) => (
            <Card key={p.title} className="bg-card/60 backdrop-blur-sm border-border">
              <CardHeader className="text-xl">{p.title}</CardHeader>
              <CardBody className="text-muted-foreground">{p.desc}</CardBody>
              <CardFooter>
                <Button as={"a" as any} href={p.href} className="rounded-full">View</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}


