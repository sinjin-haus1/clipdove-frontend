import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeRegistry } from '@/components/ThemeRegistry';
import Layout from '@/components/Layout';
import { ApolloProvider } from '@/components/ApolloProvider';

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
          <ApolloProvider>
            <Layout>{children}</Layout>
          </ApolloProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
