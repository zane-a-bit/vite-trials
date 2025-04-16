"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function BidHistory({ artworkId }) {
  // This would normally fetch bid history based on the artwork ID
  const bids = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        initials: "AJ",
      },
      amount: 1850,
      time: "2 hours ago",
      isHighest: true,
    },
    {
      id: 2,
      user: {
        name: "Maria Garcia",
        initials: "MG",
      },
      amount: 1800,
      time: "5 hours ago",
    },
    {
      id: 3,
      user: {
        name: "David Kim",
        initials: "DK",
      },
      amount: 1750,
      time: "8 hours ago",
    },
    {
      id: 4,
      user: {
        name: "Sarah Williams",
        initials: "SW",
      },
      amount: 1700,
      time: "12 hours ago",
    },
    {
      id: 5,
      user: {
        name: "James Lee",
        initials: "JL",
      },
      amount: 1650,
      time: "1 day ago",
    },
    {
      id: 6,
      user: {
        name: "Emma Davis",
        initials: "ED",
      },
      amount: 1600,
      time: "1 day ago",
    },
    {
      id: 7,
      user: {
        name: "Michael Brown",
        initials: "MB",
      },
      amount: 1550,
      time: "2 days ago",
    },
    {
      id: 8,
      user: {
        name: "Olivia Wilson",
        initials: "OW",
      },
      amount: 1500,
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{bids.length} bids placed</p>
      <div className="space-y-3">
        {bids.map((bid) => (
          <div
            key={bid.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              bid.isHighest ? "bg-primary/5 border border-primary/20" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{bid.user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{bid.user.name}</p>
                <p className="text-sm text-muted-foreground">{bid.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">${bid.amount}</p>
              {bid.isHighest && <p className="text-xs text-primary">Highest bid</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}