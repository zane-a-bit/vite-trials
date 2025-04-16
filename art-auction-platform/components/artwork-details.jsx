"use client"

import { Check } from "lucide-react"

export default function ArtworkDetails({ artwork }) {
  return (
    <div className="space-y-4">
      <p>{artwork.description}</p>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <h3 className="font-medium">Medium</h3>
          <p className="text-muted-foreground">{artwork.medium}</p>
        </div>
        <div>
          <h3 className="font-medium">Dimensions</h3>
          <p className="text-muted-foreground">{artwork.dimensions}</p>
        </div>
        <div>
          <h3 className="font-medium">Year</h3>
          <p className="text-muted-foreground">{artwork.year}</p>
        </div>
        <div>
          <h3 className="font-medium">Condition</h3>
          <p className="text-muted-foreground">{artwork.condition}</p>
        </div>
      </div>

      <div className="pt-2 space-y-2">
        {artwork.framed && (
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Framed and ready to hang</span>
          </div>
        )}
        {artwork.certificate && (
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Certificate of authenticity included</span>
          </div>
        )}
      </div>
    </div>
  )
}