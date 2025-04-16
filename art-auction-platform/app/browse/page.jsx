"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export default function BrowsePage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [activeFilters, setActiveFilters] = useState([])
  const [sortOption, setSortOption] = useState("ending-soon")

  // Mock data for artworks
  const artworks = [
    {
      id: 1,
      title: "Abstract Harmony",
      artist: "Elena Rivera",
      image: "/abstract-harmony.jpg?height=400&width=300",
      currentBid: 1200,
      endTime: "2d 5h",
      bids: 8,
      category: "Abstract",
    },
    {
      id: 2,
      title: "Urban Landscape",
      artist: "Marcus Chen",
      image: "/urban-landscape.jpg?height=400&width=300",
      currentBid: 950,
      endTime: "1d 12h",
      bids: 5,
      category: "Landscape",
    },
    {
      id: 3,
      title: "Serenity in Blue",
      artist: "Sophia Kim",
      image: "/serenity-in-blue.jpg?height=400&width=300",
      currentBid: 1800,
      endTime: "3d 8h",
      bids: 12,
      category: "Abstract",
    },
    {
      id: 4,
      title: "Geometric Dreams",
      artist: "David Okafor",
      image: "/geometric-dreams.jpg?height=400&width=300",
      currentBid: 750,
      endTime: "6h 30m",
      bids: 15,
      category: "Modern",
    },
    {
      id: 5,
      title: "Sunset Reflections",
      artist: "Aisha Patel",
      image: "/sunset-reflections.jpg?height=400&width=300",
      currentBid: 2200,
      endTime: "4d 3h",
      bids: 7,
      category: "Landscape",
    },
    {
      id: 6,
      title: "Portrait of Silence",
      artist: "Thomas Wright",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 3100,
      endTime: "5d 12h",
      bids: 20,
      category: "Portrait",
    },
    {
      id: 7,
      title: "Vibrant Cityscape",
      artist: "Zoe Chen",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 1650,
      endTime: "2d 18h",
      bids: 10,
      category: "Urban",
    },
    {
      id: 8,
      title: "Tranquil Waters",
      artist: "Michael Johnson",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 890,
      endTime: "1d 5h",
      bids: 6,
      category: "Landscape",
    },
    {
      id: 9,
      title: "Floral Explosion",
      artist: "Lily Zhang",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 1350,
      endTime: "3d 9h",
      bids: 9,
      category: "Still Life",
    },
    {
      id: 10,
      title: "Digital Dreamscape",
      artist: "Alex Rivera",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 780,
      endTime: "2d 4h",
      bids: 4,
      category: "Digital",
    },
    {
      id: 11,
      title: "Sculptural Forms",
      artist: "Natalie Kim",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 4200,
      endTime: "6d 7h",
      bids: 15,
      category: "Sculpture",
    },
    {
      id: 12,
      title: "Minimalist Composition",
      artist: "James Wilson",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 1100,
      endTime: "3d 2h",
      bids: 7,
      category: "Minimalist",
    },
  ]

  const categories = [
    { id: "abstract", label: "Abstract" },
    { id: "landscape", label: "Landscape" },
    { id: "portrait", label: "Portrait" },
    { id: "still-life", label: "Still Life" },
    { id: "modern", label: "Modern" },
    { id: "urban", label: "Urban" },
    { id: "digital", label: "Digital" },
    { id: "sculpture", label: "Sculpture" },
    { id: "minimalist", label: "Minimalist" },
  ]

  const mediums = [
    { id: "oil", label: "Oil" },
    { id: "acrylic", label: "Acrylic" },
    { id: "watercolor", label: "Watercolor" },
    { id: "digital", label: "Digital" },
    { id: "mixed-media", label: "Mixed Media" },
    { id: "sculpture", label: "Sculpture" },
    { id: "photography", label: "Photography" },
  ]

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearFilters = () => {
    setActiveFilters([])
    setPriceRange([0, 5000])
  }

  // In a real app, you would filter the artworks based on the active filters
  // For this demo, we'll just show all artworks
  const filteredArtworks = artworks

  return (
    <div className="container py-8 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Browse Artworks</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search artworks, artists..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search with the following filters
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <Accordion type="multiple" defaultValue={["category", "price", "medium"]}>
                      <AccordionItem value="category">
                        <AccordionTrigger>Category</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 gap-2">
                            {categories.map((category) => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`category-${category.id}`} 
                                  checked={activeFilters.includes(category.id)}
                                  onCheckedChange={() => toggleFilter(category.id)}
                                />
                                <Label htmlFor={`category-${category.id}`} className="font-normal">
                                  {category.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <Slider
                              defaultValue={[0, 5000]}
                              max={5000}
                              step={100}
                              value={priceRange}
                              onValueChange={setPriceRange}
                            />
                            <div className="flex items-center justify-between">
                              <div className="border rounded-md px-3 py-1.5">
                                ${priceRange[0]}
                              </div>
                              <div className="border rounded-md px-3 py-1.5">
                                ${priceRange[1]}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="medium">
                        <AccordionTrigger>Medium</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 gap-2">
                            {mediums.map((medium) => (
                              <div key={medium.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`medium-${medium.id}`} 
                                  checked={activeFilters.includes(medium.id)}
                                  onCheckedChange={() => toggleFilter(medium.id)}
                                />
                                <Label htmlFor={`medium-${medium.id}`} className="font-normal">
                                  {medium.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="status">
                        <AccordionTrigger>Auction Status</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="status-active" 
                                checked={activeFilters.includes("active")}
                                onCheckedChange={() => toggleFilter("active")}
                              />
                              <Label htmlFor="status-active" className="font-normal">
                                Active Auctions
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="status-ending-soon" 
                                checked={activeFilters.includes("ending-soon")}
                                onCheckedChange={() => toggleFilter("ending-soon")}
                              />
                              <Label htmlFor="status-ending-soon" className="font-normal">
                                Ending Soon
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="status-buy-now" 
                                checked={activeFilters.includes("buy-now")}
                                onCheckedChange={() => toggleFilter("buy-now")}
                              />
                              <Label htmlFor="status-buy-now" className="font-normal">
                                Buy Now Available
                              </Label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <SheetFooter className="sm:justify-between">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                    <SheetClose asChild>
                      <Button>Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                  <SelectItem value="recently-added">Recently Added</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="most-bids">Most Bids</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map(filter => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <button onClick={() => toggleFilter(filter)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <Link href={`/artwork/${artwork.id}`} key={artwork.id}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                  {artwork.endTime.includes("h") && (
                    <Badge className="absolute top-2 right-2 bg-red-500">Ending Soon</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">{artwork.title}</h3>
                  <p className="text-sm text-muted-foreground">by {artwork.artist}</p>
                  <Badge variant="outline" className="mt-2">{artwork.category}</Badge>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Bid</p>
                    <p className="font-semibold">${artwork.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Ends in</p>
                    <p className="text-sm">{artwork.endTime}</p>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="gap-2">
            Load More
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}