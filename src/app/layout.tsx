import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AdSense from "@/components/AdSense";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthInfo Blog",
  description: "Your trusted source for health information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdSense pId="ca-pub-XXXXXXXXXXXXXXXX" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen font-sans`}
      >
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              HealthInfo
            </Link>
            <ul className="flex space-x-6 text-gray-600 font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main className="flex-grow bg-gray-50">
          {children}
        </main>

        <footer className="bg-gray-800 text-gray-300 py-12 mt-auto">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">HealthInfo</h3>
              <p className="text-sm leading-relaxed">
                Providing accurate and reliable health information to help you live a better life. We are committed to your well-being.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            &copy; {new Date().getFullYear()} HealthInfo. All rights reserved.
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}
