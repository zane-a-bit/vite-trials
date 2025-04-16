"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function ArtCategories() {
  const categories = [
    {
      name: "Paintings",
      icon: "🖼️",
      count: 1245,
      slug: "paintings",
    },
    {
      name: "Sculptures",
      icon: "🗿",
      count: 867,
      slug: "sculptures",
    },
    {
      name: "Digital Art",
      icon: "💻",
      count: 1532,
      slug: "digital-art",
    },
    {
      name: "Photography",
      icon: "📷",
      count: 978,
      slug: "photography",
    },
    {
      name: "Prints",
      icon: "🖨️",
      count: 1089,
      slug: "prints",
    },
    {
      name: "Mixed Media",
      icon: "🎨",
      count: 654,
      slug: "mixed-media",
    },
  ]

  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.slug}>
              <Card className="h-full transition-all hover:shadow-md hover:bg-accent">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-3">{category.icon}</span>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}