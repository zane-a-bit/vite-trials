import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UpcomingAuctions() {
  const upcomingAuctions = [
    {
      id: 101,
      title: "Modern Masters Collection",
      date: "April 15, 2025",
      time: "2:00 PM EST",
      image: "/modern-masters-collection.jpg?height=300&width=600",
      itemCount: 45,
      featured: true,
    },
    {
      id: 102,
      title: "Emerging Artists Showcase",
      date: "April 22, 2025",
      time: "1:00 PM EST",
      image: "/emerging-artists.jpg?height=300&width=600",
      itemCount: 32,
    },
    {
      id: 103,
      title: "Contemporary Sculpture Exhibition",
      date: "May 5, 2025",
      time: "3:00 PM EST",
      image: "/contemporary-sculpture.jpg?height=300&width=600",
      itemCount: 28,
    },
  ]

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Upcoming Auctions</h2>
          <Link href="/auctions">
            <Button variant="ghost" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingAuctions.map((auction) => (
            <Link href={`/auction/${auction.id}`} key={auction.id}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={auction.image || "/placeholder.svg"}
                    alt={auction.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                  {auction.featured && <Badge className="absolute top-2 right-2 bg-purple-500">Featured</Badge>}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{auction.title}</h3>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <p className="text-sm">
                      {auction.date} at {auction.time}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{auction.itemCount} items available</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
