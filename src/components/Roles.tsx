"use client";

import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";
import Link from "next/link";

export default function Roles() {
  const roles = [
    { title: "Frontend Engineer", tag: "React", href: "/contact" },
    { title: "ML Engineer", tag: "LLM", href: "/contact" },
    { title: "Product Designer", tag: "UI/UX", href: "/contact" },
  ];
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-4xl md:text-5xl mb-8">Opportunities</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {roles.map((r) => (
          <Card key={r.title} className="bg-card/60 backdrop-blur-sm border-border">
            <CardHeader className="flex items-center justify-between">
              <span className="text-xl">{r.title}</span>
              <Chip size="sm" color="primary" variant="flat">{r.tag}</Chip>
            </CardHeader>
            <CardBody>
              <Button as={Link as any} href={r.href} className="rounded-full" color="primary">Refer / Contact</Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}


