"use client"

import { useEffect, useRef } from "react"

export default function SellerStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Sample data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const sales = [1200, 1900, 1500, 2200, 1800, 2500]

    // Chart settings
    const padding = 40
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2
    const maxValue = Math.max(...sales) * 1.2

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    const numGridLines = 5
    for (let i = 0; i <= numGridLines; i++) {
      const y = padding + (chartHeight / numGridLines) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + chartWidth, y)
      ctx.stroke()

      // Y-axis labels
      const value = Math.round(maxValue - (maxValue / numGridLines) * i)
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`$${value}`, padding - 10, y + 4)
    }

    // Draw x-axis labels
    months.forEach((month, i) => {
      const x = padding + (chartWidth / (months.length - 1)) * i
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(month, x, rect.height - padding / 2)
    })

    // Draw line chart
    ctx.strokeStyle = "#8b5cf6"
    ctx.lineWidth = 3
    ctx.beginPath()

    sales.forEach((sale, i) => {
      const x = padding + (chartWidth / (sales.length - 1)) * i
      const y = padding + chartHeight - (sale / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw points
    sales.forEach((sale, i) => {
      const x = padding + (chartWidth / (sales.length - 1)) * i
      const y = padding + chartHeight - (sale / maxValue) * chartHeight

      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.stroke()
    })

    // Draw area under the line
    ctx.beginPath()

    // Start from bottom left
    ctx.moveTo(padding, padding + chartHeight)

    // Draw line to each data point
    sales.forEach((sale, i) => {
      const x = padding + (chartWidth / (sales.length - 1)) * i
      const y = padding + chartHeight - (sale / maxValue) * chartHeight
      ctx.lineTo(x, y)
    })

    // Complete the path to bottom right
    ctx.lineTo(padding + chartWidth, padding + chartHeight)
    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.2)")
    gradient.addColorStop(1, "rgba(139, 92, 246, 0)")
    ctx.fillStyle = gradient
    ctx.fill()
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
