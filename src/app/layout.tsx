import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://umairvisuals.vercel.app'),
  title: 'Umair Portfolio',
  description: 'Video editing, motion graphics, and graphic design by Muhammad Umair. Explore ecommerce campaigns, 3D reels, and creative storytelling.',
  authors: [{ name: 'Muhammad Umair' }],
  creator: 'Muhammad Umair',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_US', url: '/', title: 'Umair Portfolio', description: 'Explore video editing, motion graphics, and creative campaigns by Muhammad Umair.', siteName: 'Umair Portfolio', images: [{url:'/landing-memojis.png'}] },
  twitter: { card:'summary_large_image',title:'Umair Portfolio',description:'Video editing, motion graphics, and creative campaigns.',images:['/landing-memojis.png'] },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}