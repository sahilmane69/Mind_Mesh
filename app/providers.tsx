"use client";

import type { ReactNode } from "react";
import CustomCursor from "@/components/CustomCursor";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <CustomCursor />
      {children}
    </ErrorBoundary>
  );
}
