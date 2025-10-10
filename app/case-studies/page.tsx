"use client";

import { Card, CardBody, CardHeader, Chip } from "@heroui/react";

const studies = [
  { title: "Resume AI", metrics: ["+38% recruiter replies", "+2.4x time-on-page"], desc: "LLM-powered resume feedback tool used by 300+ students." },
  { title: "Campus Navigator", metrics: ["<1s search latency", "+1.8x session length"], desc: "Geospatial campus app with 3D positions and shortcuts." },
  { title: "Club CMS", metrics: ["-60% ops time", "+22% event RSVP"], desc: "Content management for clubs with automated workflows." },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-6xl leading-tight mb-8">Case Studies</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {studies.map((s) => (
            <Card key={s.title} className="bg-card/60 backdrop-blur-sm border-border">
              <CardHeader className="text-xl">{s.title}</CardHeader>
              <CardBody className="grid gap-3">
                <p className="text-muted-foreground">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.metrics.map((m) => (
                    <Chip key={m} size="sm" color="primary" variant="flat">{m}</Chip>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}


