import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FeaturedArtworks() {
  const featuredArtworks = [
    {
      id: 1,
      title: "Abstract Harmony",
      artist: "Elena Rivera",
      image: "/abstract-harmony.jpg?height=400&width=300",
      currentBid: 1200,
      endTime: "2d 5h",
      bids: 8,
    },
    {
      id: 2,
      title: "Urban Landscape",
      artist: "Marcus Chen",
      image: "/urban-landscape.jpg?height=400&width=300",
      currentBid: 950,
      endTime: "1d 12h",
      bids: 5,
    },
    {
      id: 3,
      title: "Serenity in Blue",
      artist: "Sophia Kim",
      image: "/serenity-in-blue.jpg?height=400&width=300",
      currentBid: 1800,
      endTime: "3d 8h",
      bids: 12,
    },
    {
      id: 4,
      title: "Geometric Dreams",
      artist: "David Okafor",
      image: "/geometric-dreams.jpg?height=400&width=300",
      currentBid: 750,
      endTime: "6h 30m",
      bids: 15,
    },
  ]

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Artworks</h2>
          <Link href="/browse">
            <Button variant="ghost" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtworks.map((artwork) => (
            <Link href={`/artwork/${artwork.id}`} key={artwork.id}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={artwork.image}
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
      </div>
    </section>
  )
}
