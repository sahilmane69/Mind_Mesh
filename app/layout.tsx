export const metadata = {
  title: 'Mind Mesh',
  description: 'A community for builders, thinkers, and creators at the intersection of technology and innovation.',
};

import './globals.css';
import '../src/index.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


