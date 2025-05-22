import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'

// Import Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'] })

// Dynamically import Chatbot with no SSR
const Chatbot = dynamic(() => import('./components/Chatbot'), {
  ssr: false
})

// Metadata for the website
export const metadata: Metadata = {
  title: 'Fishing Scotland - Experience Unforgettable Adventures',
  description: 'Come to Scotland and fish in one of the most scenic lochs in the world. Book your fishing adventure today!',
}

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="text-2xl font-bold text-primary">FishingScotland</a>
              <div className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-600 hover:text-primary">Home</a>
                <a href="/our-offer" className="text-gray-600 hover:text-primary">Our Offer</a>
                <a href="/accommodation" className="text-gray-600 hover:text-primary">Accommodation</a>
                <a href="/gallery" className="text-gray-600 hover:text-primary">Gallery</a>
                <a href="/about-us" className="text-gray-600 hover:text-primary">About Us</a>
              </div>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <p>Email: info@fishing-scot.co.uk</p>
                <p>Phone: +44 (0)123 456 7890</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/terms" className="hover:text-accent">Terms of Service</a></li>
                  <li><a href="/privacy" className="hover:text-accent">Privacy Policy</a></li>
                  <li><a href="/faq" className="hover:text-accent">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-accent">Facebook</a>
                  <a href="#" className="hover:text-accent">Instagram</a>
                  <a href="#" className="hover:text-accent">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Chatbot />
      </body>
    </html>
  )
} 