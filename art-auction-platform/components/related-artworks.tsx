import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function RelatedArtworks() {
  const relatedArtworks = [
    {
      id: 201,
      title: "Blue Composition #3",
      artist: "Elena Rivera",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 1400,
      endTime: "4d 8h",
    },
    {
      id: 202,
      title: "Ocean Reflections",
      artist: "David Kim",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 950,
      endTime: "2d 15h",
    },
    {
      id: 203,
      title: "Abstract Study in Blue",
      artist: "Maria Chen",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 1200,
      endTime: "5d 10h",
    },
    {
      id: 204,
      title: "Midnight Waves",
      artist: "James Wilson",
      image: "/placeholder.svg?height=400&width=300",
      currentBid: 850,
      endTime: "3d 6h",
    },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <Link href="/browse">
          <Button variant="ghost" className="gap-1">
            View More <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedArtworks.map((artwork) => (
          <Link href={`/artwork/${artwork.id}`} key={artwork.id}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
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
    </section>
  )
}
