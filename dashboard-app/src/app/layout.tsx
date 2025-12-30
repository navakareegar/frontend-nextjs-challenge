import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../layout/Navbar';
import Providers from '@/layout/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'User Management Dashboard',
  description: 'A dashboard for managing users',
};

interface IRootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout(props: Readonly<IRootLayoutProps>) {
  const { children } = props;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
