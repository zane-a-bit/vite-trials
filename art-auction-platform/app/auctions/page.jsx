"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, Search, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import AuctionCalendar from "@/components/auction-calendar"

export default function AuctionsPage() {
  const [view, setView] = useState("grid")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState("upcoming")

  // Mock data for auctions
  const auctions = [
    {
      id: 101,
      title: "Modern Masters Collection",
      description: "A curated selection of contemporary masterpieces from renowned artists around the world.",
      date: "April 15, 2025",
      time: "2:00 PM EST",
      image: "/modern-masters-collection.jpg?height=300&width=600",
      itemCount: 45,
      registeredBidders: 128,
      featured: true,
      status: "upcoming",
      categories: ["Contemporary", "Painting", "Sculpture"],
    },
    {
      id: 102,
      title: "Emerging Artists Showcase",
      description: "Discover the next generation of artistic talent in this special showcase auction.",
      date: "April 22, 2025",
      time: "1:00 PM EST",
      image: "/emerging-artists.jpg?height=300&width=600",
      itemCount: 32,
      registeredBidders: 87,
      status: "upcoming",
      categories: ["Emerging Artists", "Mixed Media", "Digital"],
    },
    {
      id: 103,
      title: "Contemporary Sculpture Exhibition",
      description: "An exclusive collection of three-dimensional works from leading sculptors.",
      date: "May 5, 2025",
      time: "3:00 PM EST",
      image: "/contemporary-sculpture.jpg?height=300&width=600",
      itemCount: 28,
      registeredBidders: 64,
      status: "upcoming",
      categories: ["Sculpture", "Contemporary"],
    },
    {
      id: 104,
      title: "Spring Photography Auction",
      description: "Exceptional photographs capturing moments of beauty, history, and human experience.",
      date: "April 18, 2025",
      time: "12:00 PM EST",
      image: "/placeholder.svg?height=300&width=600",
      itemCount: 50,
      registeredBidders: 112,
      status: "upcoming",
      categories: ["Photography", "Documentary", "Fine Art"],
    },
    {
      id: 105,
      title: "Abstract Expressions",
      description: "Bold and innovative abstract works that challenge conventional artistic boundaries.",
      date: "April 14, 2025",
      time: "11:00 AM EST",
      image: "/placeholder.svg?height=300&width=600",
      itemCount: 38,
      registeredBidders: 95,
      status: "live",
      categories: ["Abstract", "Painting", "Contemporary"],
    },
    {
      id: 106,
      title: "Classical European Art",
      description: "Timeless masterpieces from the European tradition spanning the 17th to 19th centuries.",
      date: "April 13, 2025",
      time: "10:00 AM EST",
      image: "/placeholder.svg?height=300&width=600",
      itemCount: 25,
      registeredBidders: 150,
      status: "live",
      categories: ["Classical", "European", "Painting"],
    },
    {
      id: 107,
      title: "Asian Art & Antiquities",
      description: "A diverse collection of art and artifacts from across the Asian continent.",
      date: "April 30, 2025",
      time: "9:00 AM EST",
      image: "/placeholder.svg?height=300&width=600",
      itemCount: 60,
      registeredBidders: 200,
      status: "upcoming",
      categories: ["Asian", "Antiquities", "Traditional"],
    },
    {
      id: 108,
      title: "Digital Art & NFTs",
      description: "Cutting-edge digital creations at the intersection of art and technology.",
      date: "May 10, 2025",
      time: "4:00 PM EST",
      image: "/placeholder.svg?height=300&width=600",
      itemCount: 40,
      registeredBidders: 175,
      status: "upcoming",
      categories: ["Digital", "NFT", "Contemporary"],
    },
  ]

  // Filter auctions based on tab selection
  const getFilteredAuctions = (status) => {
    if (status === "all") return auctions
    return auctions.filter((auction) => auction.status === status)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Auctions</h1>
          <p className="text-muted-foreground">
            Browse upcoming and live auctions featuring exceptional artworks from around the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search auctions..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Categories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Contemporary",
                        "Classical",
                        "Photography",
                        "Sculpture",
                        "Digital",
                        "Painting",
                        "Mixed Media",
                        "Emerging Artists",
                      ].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={`category-${category}`} />
                          <Label htmlFor={`category-${category}`} className="font-normal text-sm">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Date Range</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="date-from" className="text-xs">
                            From
                          </Label>
                          <Input id="date-from" type="date" className="h-8" />
                        </div>
                        <div>
                          <Label htmlFor="date-to" className="text-xs">
                            To
                          </Label>
                          <Input id="date-to" type="date" className="h-8" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between">
                      <Button variant="outline" size="sm">
                        Reset
                      </Button>
                      <Button size="sm">Apply Filters</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming First</SelectItem>
                  <SelectItem value="live">Live Now</SelectItem>
                  <SelectItem value="items-high">Most Items</SelectItem>
                  <SelectItem value="items-low">Fewest Items</SelectItem>
                  <SelectItem value="bidders">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={view === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setView("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-grid-2x2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 12h18" />
                    <path d="M12 3v18" />
                  </svg>
                </Button>
                <Button
                  variant={view === "calendar" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setView("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
            <TabsTrigger value="all">All Auctions</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          {view === "grid" ? (
            <>
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredAuctions("all").map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="live" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredAuctions("live").map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredAuctions("upcoming").map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              </TabsContent>
            </>
          ) : (
            <TabsContent value="all" className="mt-6">
              <AuctionCalendar auctions={auctions} />
            </TabsContent>
          )}
        </Tabs>

        <div className="flex justify-center mt-4 gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="px-4">
            1
          </Button>
          <Button variant="outline" className="px-4">
            2
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function AuctionCard({ auction }) {
  return (
    <Link href={`/auction/${auction.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={auction.image || "/placeholder.svg"}
            alt={auction.title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">{getStatusBadge(auction.status)}</div>
          {auction.featured && <Badge className="absolute top-2 left-2 bg-purple-500">Featured</Badge>}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{auction.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{auction.description}</p>
          <div className="flex items-center gap-1 mt-3 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <p className="text-sm">
              {auction.date} at {auction.time}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center gap-1 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-image"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span>{auction.itemCount} items</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Users className="h-4 w-4" />
            <span>{auction.registeredBidders} bidders</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function getStatusBadge(status) {
  switch (status) {
    case "live":
      return <Badge className="bg-red-500">Live Now</Badge>
    case "upcoming":
      return <Badge variant="outline">Upcoming</Badge>
    default:
      return null
  }
}