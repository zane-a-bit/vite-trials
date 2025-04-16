"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutGrid,
  ListFilter,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Package,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SellerStats from "@/components/seller-stats"

export default function SellerDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // This would normally be fetched from an API
  const listings = [
    {
      id: 1,
      title: "Abstract Harmony",
      image: "/abstract-harmony.jpg?height=400&width=300",
      currentBid: 1200,
      endTime: "2d 5h",
      bids: 8,
      status: "active",
    },
    {
      id: 2,
      title: "Urban Landscape",
      image: "/urban-landscape.jpg?height=400&width=300",
      currentBid: 950,
      endTime: "1d 12h",
      bids: 5,
      status: "active",
    },
    {
      id: 3,
      title: "Serenity in Blue",
      image: "/serenity-in-blue.jpg?height=400&width=300",
      soldPrice: 1800,
      soldDate: "Apr 2, 2025",
      status: "sold",
    },
    {
      id: 4,
      title: "Geometric Dreams",
      image: "/geometric-dreams.jpg?height=400&width=300",
      status: "draft",
      lastEdited: "Mar 28, 2025",
    },
    {
      id: 5,
      title: "Sunset Reflections",
      image: "/sunset-reflections.jpg?height=400&width=300",
      status: "pending",
      submittedDate: "Apr 10, 2025",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "sold":
        return <Badge className="bg-blue-500">Sold</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending Review</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container py-8" style={{margin: "auto"}}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your art listings and track your sales</p>
        </div>
        <Link href="/seller/new-listing">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Listing
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,240</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 ending soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sold Items</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 awaiting shipment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Submitted 2 days ago</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ListFilter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Highest Price</DropdownMenuItem>
                <DropdownMenuItem>Lowest Price</DropdownMenuItem>
                <DropdownMenuItem>Most Bids</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">{getStatusBadge(listing.status)}</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                    {listing.status === "active" && (
                      <>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>Current Bid:</span>
                          <span className="font-medium">${listing.currentBid}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Ends in:</span>
                          <span>{listing.endTime}</span>
                        </div>
                      </>
                    )}
                    {listing.status === "sold" && (
                      <>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>Sold for:</span>
                          <span className="font-medium">${listing.soldPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Sold on:</span>
                          <span>{listing.soldDate}</span>
                        </div>
                      </>
                    )}
                    {listing.status === "draft" && (
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>Last edited:</span>
                        <span>{listing.lastEdited}</span>
                      </div>
                    )}
                    {listing.status === "pending" && (
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>Submitted:</span>
                        <span>{listing.submittedDate}</span>
                      </div>
                    )}
                    <div className="mt-4">
                      <Link href={`/seller/listing/${listing.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          {listing.status === "draft" ? "Edit Draft" : "View Details"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {listings.map((listing) => (
                <div key={listing.id} className="flex items-center border rounded-lg p-3 gap-4">
                  <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{listing.title}</h3>
                      {getStatusBadge(listing.status)}
                    </div>
                    {listing.status === "active" && (
                      <p className="text-sm text-muted-foreground">
                        ${listing.currentBid} current bid · {listing.bids} bids · Ends in {listing.endTime}
                      </p>
                    )}
                    {listing.status === "sold" && (
                      <p className="text-sm text-muted-foreground">
                        Sold for ${listing.soldPrice} on {listing.soldDate}
                      </p>
                    )}
                    {listing.status === "draft" && (
                      <p className="text-sm text-muted-foreground">Last edited on {listing.lastEdited}</p>
                    )}
                    {listing.status === "pending" && (
                      <p className="text-sm text-muted-foreground">Submitted for review on {listing.submittedDate}</p>
                    )}
                  </div>
                  <div>
                    <Link href={`/seller/listing/${listing.id}`}>
                      <Button variant="outline" size="sm">
                        {listing.status === "draft" ? "Edit" : "View"}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="m-0">
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-2"
            }
          >
            {listings
              .filter((l) => l.status === "active")
              .map((listing) => (
                // Similar structure as above, filtered for active listings
                <Card key={listing.id} className="overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>Current Bid:</span>
                      <span className="font-medium">${listing.currentBid}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Ends in:</span>
                      <span>{listing.endTime}</span>
                    </div>
                    <div className="mt-4">
                      <Link href={`/seller/listing/${listing.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Similar TabsContent for "sold" and "drafts" tabs */}
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Your sales performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <SellerStats />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Ship "Ocean Waves" to buyer</h4>
                  <p className="text-sm text-muted-foreground">Due by Apr 15, 2025</p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    View details
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Complete your tax information</h4>
                  <p className="text-sm text-muted-foreground">Required for payouts</p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Complete now
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Review pending comments</h4>
                  <p className="text-sm text-muted-foreground">3 new comments on your listings</p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    View comments
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
