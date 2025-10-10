"use client";

import { Card, CardBody, CardHeader, Input, Button } from "@heroui/react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const SceneBackgroundLite = dynamic(() => import("@/components/SceneBackgroundLite"), { ssr: false, loading: () => null });

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      <SceneBackgroundLite />
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">
        <motion.h1 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="md:col-span-3 text-6xl leading-tight">
          About Mind Mesh
        </motion.h1>

        <Card className="bg-card/60 backdrop-blur-sm border-border">
          <CardHeader className="text-xl">What we do</CardHeader>
          <CardBody className="text-muted-foreground">
            We run high-signal tech meetups, ship open projects, and help students build compelling portfolios.
          </CardBody>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border">
          <CardHeader className="text-xl">Who we’re for</CardHeader>
          <CardBody className="text-muted-foreground">
            Builders, designers, ML enthusiasts, and product-minded people who love to learn in public.
          </CardBody>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border">
          <CardHeader className="text-xl">Why it matters</CardHeader>
          <CardBody className="text-muted-foreground">
            We help companies discover sharp talent and give members real-world experience shipping to users.
          </CardBody>
        </Card>

        <Card className="md:col-span-3 bg-card/60 backdrop-blur-sm border-border">
          <CardHeader className="text-xl">Stay in the loop</CardHeader>
          <CardBody>
            <form className="grid md:grid-cols-[1fr_auto] gap-3">
              <Input placeholder="teammindmesh@gmail.com" type="email" variant="flat" />
              <Button className="rounded-full" color="primary">Subscribe</Button>
            </form>
          </CardBody>
        </Card>
      </section>
    </main>
  );
}


