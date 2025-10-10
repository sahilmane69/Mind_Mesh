export const metadata = {
  title: 'Mind Mesh',
  description: 'A community for builders, thinkers, and creators at the intersection of technology and innovation.',
};

import './globals.css';
import '../src/index.css';
import type { ReactNode } from 'react';
import GlobalBackground from "@/components/GlobalBackground";
import { HeroUIProvider } from "@heroui/react";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";

// We will mount three.js only on interior pages, not on hero/home (moved into pages)

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Corben:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <HeroUIProvider>
          <CustomCursor />
          <GlobalBackground />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}


