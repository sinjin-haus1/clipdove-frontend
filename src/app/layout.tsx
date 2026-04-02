import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeRegistry } from '@/components/ThemeRegistry';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ClipDove — Faceless Highlight Reels',
  description: 'AI-powered highlight reel generator for youth sports leagues',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Layout>{children}</Layout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
