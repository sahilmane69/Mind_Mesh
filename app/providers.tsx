"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Dynamically import GlobalBackground to avoid SSR issues with GSAP
const GlobalBackground = dynamic(() => import("@/components/GlobalBackground"), {
  ssr: false,
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <GlobalBackground />
      <CustomCursor />
      {children}
    </ErrorBoundary>
  );
}
