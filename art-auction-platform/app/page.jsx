"use client"

import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedArtworks from "@/components/featured-artworks"
import ArtCategories from "@/components/art-categories"
import UpcomingAuctions from "@/components/upcoming-auctions"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            ArtBid
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search artworks..." className="pl-8" />
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/browse"
                className="text-sm font-medium hover:underline"
              >
                Browse
              </Link>
              <Link
                href="/auctions"
                className="text-sm font-medium hover:underline"
              >
                Auctions
              </Link>
              <Link
                href="/artists"
                className="text-sm font-medium hover:underline"
              >
                Artists
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Discover and Collect Exceptional Artworks
                </h1>
                <p className="text-lg text-muted-foreground">
                  Bid on unique pieces from emerging and established artists around the world.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/browse">
                    <Button size="lg">
                      Browse Gallery
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link
                    href="/seller/dashboard"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Button variant="outline" size="lg">
                      Sell Your Art
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src="/roman-sculpture.jpg?height=600&width=600"
                  alt="Featured artwork"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <FeaturedArtworks />
        <ArtCategories />
        <UpcomingAuctions />

        <section className="py-12 bg-muted">
          <div className="container">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Join Our Art Community</h2>
              <p className="text-muted-foreground">
                Whether you're an artist looking to showcase your work or a collector seeking your next masterpiece,
                ArtBid connects you with a global community of art enthusiasts.
              </p>
              <div className="pt-4">
                <Link href="/auth/signup">
                  <Button size="lg">Create an Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ArtBid</h3>
              <p className="text-sm text-muted-foreground">
                The premier platform for art auctions and sales.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/how-to-bid"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    How to Bid
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buyer-protection"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Buyer Protection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">For Sellers</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/how-to-sell"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    How to Sell
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller-fees"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Seller Fees
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller-dashboard"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Seller Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms & Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ArtBid. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}