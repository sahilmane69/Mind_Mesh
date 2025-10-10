"use client";

import type { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import CustomCursor from "@/components/CustomCursor";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <HeroUIProvider>
        <CustomCursor />
        {children}
      </HeroUIProvider>
    </ErrorBoundary>
  );
}
