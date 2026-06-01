import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashLogo from "@/components/SplashLogo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digital Universe",
  description: "A modular digital universe with registration, navigation, AI, terminal, and simulation flows.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-black text-white antialiased">
        <SplashLogo />
        {children}
      </body>
    </html>
  );
}