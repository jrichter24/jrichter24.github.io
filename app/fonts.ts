import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

// Self-hosted at build (no runtime CDN). Shared by the locale layout and the
// global 404 so both render in the brand fonts.
export const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['500', '700'],
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const fontVariables = `${display.variable} ${mono.variable}`;
