"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Auction {
  id: number
  title: string
  date: string
  time: string
  status: "upcoming" | "live" | "ended"
  image?: string
  [key: string]: any
}

interface AuctionCalendarProps {
  auctions: Auction[]
}

interface CalendarDay {
  day: number | null
  isCurrentMonth: boolean
}

export default function AuctionCalendar({ auctions }: AuctionCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<number>(3) // April (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(2025)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Get days in month
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Create calendar days array
  const calendarDays: CalendarDay[] = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: null, isCurrentMonth: false })
  }

  // Add days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ day, isCurrentMonth: true })
  }

  // Parse auction dates to find which days have auctions
  const auctionsByDay: { [key: number]: Auction[] } = {}

  auctions.forEach((auction) => {
    const dateParts = auction.date.split(" ")
    const month = monthNames.findIndex((m) => m.toLowerCase() === dateParts[0].toLowerCase())
    const day = Number.parseInt(dateParts[1].replace(",", ""))
    const year = Number.parseInt(dateParts[2])

    if (month === currentMonth && year === currentYear) {
      if (!auctionsByDay[day]) {
        auctionsByDay[day] = []
      }
      auctionsByDay[day].push(auction)
    }
  })

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-medium text-sm mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div key={index} className={`min-h-24 border rounded-md p-1 ${!day.isCurrentMonth ? "bg-muted/30" : ""}`}>
            {day.day && (
              <>
                <div className="text-sm font-medium p-1">{day.day}</div>
                {auctionsByDay[day.day] && (
                  <div className="space-y-1">
                    {auctionsByDay[day.day].map((auction, idx) => (
                      <Link href={`/auction/${auction.id}`} key={idx}>
                        <Card className="hover:bg-accent transition-colors">
                          <CardContent className="p-2">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium truncate">{auction.title}</p>
                              {auction.status === "live" && <Badge className="bg-red-500 text-[10px] h-4">Live</Badge>}
                            </div>
                            <p className="text-[10px] text-muted-foreground">{auction.time}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

