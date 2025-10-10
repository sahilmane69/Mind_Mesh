export const metadata = {
  title: 'Mind Mesh',
  description: 'A community for builders, thinkers, and creators at the intersection of technology and innovation.',
};

export const dynamic = 'force-dynamic';

import './globals.css';
import '../src/index.css';
import type { ReactNode } from 'react';
import Providers from './providers';
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


