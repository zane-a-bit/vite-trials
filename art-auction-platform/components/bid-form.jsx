"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function BidForm({ currentBid, bidIncrement }) {
  const { toast } = useToast()
  const [bidAmount, setBidAmount] = useState(currentBid + bidIncrement)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBidSubmit = (e) => {
    e.preventDefault()

    if (bidAmount < currentBid + bidIncrement) {
      toast({
        title: "Bid too low",
        description: `Your bid must be at least $${currentBid + bidIncrement}`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate bid submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Bid placed successfully!",
        description: `You are now the highest bidder at $${bidAmount}`,
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleBidSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="pl-7"
            min={currentBid + bidIncrement}
            step={bidIncrement}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing Bid..." : "Place Bid"}
        </Button>
      </form>
      <div className="flex justify-between text-sm">
        <p>Suggested bids:</p>
        <div className="space-x-2">
          {[1, 2, 3].map((multiplier) => (
            <Button
              key={multiplier}
              variant="outline"
              size="sm"
              onClick={() => setBidAmount(currentBid + bidIncrement * multiplier)}
            >
              ${currentBid + bidIncrement * multiplier}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}