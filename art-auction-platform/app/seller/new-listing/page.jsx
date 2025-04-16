"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function NewListing() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState([])
  const [listingType, setListingType] = useState("auction")

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload these to a server
      // Here we're just creating object URLs for preview
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of your artwork",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Listing created!",
        description: "Your artwork has been submitted for review",
      })
      router.push("/seller/dashboard")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link
          href="/seller/dashboard"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dashboard
        </Link>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Listing</h1>
          <p className="text-muted-foreground">Add details about your artwork to list it for sale</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Artwork Images */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Artwork Images</h2>
            <p className="text-sm text-muted-foreground">
              Upload high-quality images of your artwork. The first image will be used as the main image.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Artwork preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2 text-center">
                      Main Image
                    </div>
                  )}
                </div>
              ))}
              {images.length < 5 && (
                <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center p-4">
                  <input
                    type="file"
                    id="image-upload"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <Label htmlFor="image-upload" className="cursor-pointer text-center">
                    <span className="font-medium text-primary hover:underline">Upload image</span>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (max 10MB)</p>
                  </Label>
                </div>
              )}
            </div>
          </div>
          <Separator />
          {/* Artwork Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Artwork Details</h2>
            <div className="space-y-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="e.g., Abstract Harmony" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your artwork, including inspiration, techniques used, and any interesting details..."
                className="min-h-[120px]"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="medium">Medium</Label>
                <Select defaultValue="acrylic">
                  <SelectTrigger id="medium">
                    <SelectValue placeholder="Select medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acrylic">Acrylic</SelectItem>
                    <SelectItem value="oil">Oil</SelectItem>
                    <SelectItem value="watercolor">Watercolor</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="mixed">Mixed Media</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="abstract">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="still-life">Still Life</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="width">Width (inches)</Label>
                <Input id="width" type="number" min="0" step="0.1" required />
              </div>
              <div className="space-y-3">
                <Label htmlFor="height">Height (inches)</Label>
                <Input id="height" type="number" min="0" step="0.1" required />
              </div>
              <div className="space-y-3">
                <Label htmlFor="year">Year Created</Label>
                <Input id="year" type="number" max={new Date().getFullYear()} required />
                <p>If the year is before Christ (BC), please enter a negative number.</p>
              </div>
              <div className="space-y-3">
                <Label htmlFor="condition">Condition</Label>
                <Select defaultValue="excellent">
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="very-good">Very Good</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Switch id="framed" />
                <Label htmlFor="framed">Artwork is framed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="certificate" />
                <Label htmlFor="certificate">Certificate of authenticity included</Label>
              </div>
            </div>
          </div>
          <Separator />
          {/* Listing Options */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Listing Options</h2>
            <div className="space-y-3">
              <Label>Listing Type</Label>
              <RadioGroup
                defaultValue="auction"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
                onValueChange={setListingType}
              >
                <Card className={`cursor-pointer ${listingType === "auction" ? "border-primary" : ""}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="auction" id="auction" className="mt-1" />
                      <div>
                        <Label htmlFor="auction" className="font-medium">
                          Auction
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow buyers to bid on your artwork for a set period of time
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className={`cursor-pointer ${listingType === "fixed" ? "border-primary" : ""}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" className="mt-1" />
                      <div>
                        <Label htmlFor="fixed" className="font-medium">
                          Fixed Price
                        </Label>
                        <p className="text-sm text-muted-foreground">Set a specific price for immediate purchase</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
            {listingType === "auction" ? (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="starting-bid">Starting Bid ($)</Label>
                    <Input id="starting-bid" type="number" min="1" step="1" required />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="reserve-price">Reserve Price ($) (Optional)</Label>
                    <Input id="reserve-price" type="number" min="1" step="1" />
                    <p className="text-xs text-muted-foreground">Minimum price you're willing to accept</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="bid-increment">Bid Increment ($)</Label>
                    <Select defaultValue="10">
                      <SelectTrigger id="bid-increment">
                        <SelectValue placeholder="Select increment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">$5</SelectItem>
                        <SelectItem value="10">$10</SelectItem>
                        <SelectItem value="25">$25</SelectItem>
                        <SelectItem value="50">$50</SelectItem>
                        <SelectItem value="100">$100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="duration">Auction Duration</Label>
                    <Select defaultValue="7">
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="5">5 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="10">10 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <Label htmlFor="fixed-price">Price ($)</Label>
                <Input id="fixed-price" type="number" min="1" step="1" required />
              </div>
            )}
          </div>
          <Separator />
          {/* Shipping */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping</h2>
            <div className="space-y-3">
              <Label htmlFor="shipping-from">Shipping From</Label>
              <Input id="shipping-from" placeholder="e.g., New York, NY" required />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="shipping-options">Shipping Options</Label>
                <Button type="button" variant="ghost" size="sm" className="h-8 gap-1">
                  <Plus className="h-4 w-4" /> Add Option
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch id="worldwide" defaultChecked />
                  <Label htmlFor="worldwide">Ship worldwide</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="local-pickup" />
                  <Label htmlFor="local-pickup">Offer local pickup</Label>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Your listing will be reviewed before it goes live</p>
              <p className="text-muted-foreground">
                All new listings are reviewed by our team to ensure they meet our quality standards. This typically
                takes 1-2 business days.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/seller/dashboard")}>
              Save as Draft
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}