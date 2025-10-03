import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { AuthProvider } from '@/components/auth/auth-provider';
import { Belleza, Alegreya } from 'next/font/google';
import { cn } from '@/lib/utils';

const belleza = Belleza({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-headline',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'TuneShare - Music Lovers Social Media',
  description: 'Share and discover music with a community of music lovers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", belleza.variable, alegreya.variable)}>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
