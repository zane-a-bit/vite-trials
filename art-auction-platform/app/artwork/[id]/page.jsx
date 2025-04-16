import Link from "next/link"
import { ArrowLeft, Clock, Eye, Heart, Share2, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import BidForm from "@/components/bid-form"
import ArtworkDetails from "@/components/artwork-details"
import BidHistory from "@/components/bid-history"
import RelatedArtworks from "@/components/related-artworks"

export default function ArtworkPage({ params }) {
  // This would normally fetch data based on the ID
  const artwork = {
    id: Number.parseInt(params.id),
    title: "Abstract Harmony in Blue",
    artist: "Elena Rivera",
    artistId: "elena-rivera",
    description:
      "A stunning abstract piece that explores the harmony between form and color. The blue tones create a sense of calm and tranquility, while the dynamic brushstrokes add movement and energy to the composition.",
    medium: "Acrylic on Canvas",
    dimensions: "36 × 48 inches",
    year: 2024,
    condition: "Excellent",
    framed: true,
    certificate: true,
    location: "New York, NY",
    shipping: "Worldwide",
    startingBid: 1200,
    currentBid: 1850,
    bidIncrement: 50,
    bids: 8,
    watchers: 24,
    endTime: "2d 5h 32m",
    images: ["/abstract-harmony.jpg?height=400&width=300"],
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          href="/browse"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to browse
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Artwork Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden border">
            <img
              src={artwork.images[0] || "/placeholder.svg"}
              alt={artwork.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {artwork.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden border">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${artwork.title} - View ${index + 2}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Artwork Info and Bidding */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="mb-2">
                Auction
              </Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Flag className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            <Link href={`/artist/${artwork.artistId}`} className="text-lg hover:underline">
              by {artwork.artist}
            </Link>
          </div>

          <div className="flex items-center justify-between py-4 border-y">
            <div>
              <p className="text-sm text-muted-foreground">Current Bid</p>
              <p className="text-2xl font-bold">${artwork.currentBid}</p>
              <p className="text-sm text-muted-foreground">
                {artwork.bids} bids · ${artwork.bidIncrement} minimum increment
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-amber-500">
                <Clock className="h-4 w-4" />
                <p className="font-medium">Ends in {artwork.endTime}</p>
              </div>
              <p className="text-sm text-muted-foreground flex items-center justify-end gap-1 mt-1">
                <Eye className="h-4 w-4" /> {artwork.watchers} people watching
              </p>
            </div>
          </div>

          <BidForm currentBid={artwork.currentBid} bidIncrement={artwork.bidIncrement} />

          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="bids">Bid History</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <ArtworkDetails artwork={artwork} />
            </TabsContent>
            <TabsContent value="bids" className="pt-4">
              <BidHistory artworkId={artwork.id} />
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Shipping from</h3>
                  <p className="text-muted-foreground">{artwork.location}</p>
                </div>
                <div>
                  <h3 className="font-medium">Shipping options</h3>
                  <p className="text-muted-foreground">
                    This artwork can be shipped worldwide. The seller will arrange professional art shipping. Shipping
                    costs will be calculated based on the delivery address and artwork dimensions.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Estimated delivery</h3>
                  <p className="text-muted-foreground">7-14 business days after payment clearance</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="my-12" />

      <RelatedArtworks />
    </div>
  )
}