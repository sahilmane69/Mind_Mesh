"use client";

import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import Link from "next/link";

export default function Highlights() {
  const items = [
    {
      title: "Hands-on Portfolio",
      desc: "Members build real products and present ship-ready work.",
      cta: { href: "/projects", label: "See projects" },
    },
    {
      title: "Company Showcases",
      desc: "Invite-only demos for recruiters and partners.",
      cta: { href: "/events", label: "Upcoming events" },
    },
    {
      title: "Talent Referrals",
      desc: "We connect top members to roles at partner companies.",
      cta: { href: "/contact", label: "Partner with us" },
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-4xl md:text-5xl mb-8">Highlights</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="bg-card/60 backdrop-blur-sm border-border">
            <CardHeader className="text-xl">{it.title}</CardHeader>
            <CardBody className="text-muted-foreground grid gap-4">
              <p>{it.desc}</p>
              <Button as={Link as any} href={it.cta.href} className="w-fit rounded-full" color="primary">
                {it.cta.label}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}


