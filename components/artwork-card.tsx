"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Calendar, ShoppingBag, ArrowUpRight } from "lucide-react"

interface ArtworkCardProps {
  id: string
  title: string
  artist: string
  imageUrl: string
  hasVideo?: boolean
  isRentable?: boolean
  isForSale?: boolean
  category?: string
}

export function ArtworkCard({
  id,
  title,
  artist,
  imageUrl,
  hasVideo = false,
  isRentable = false,
  isForSale = false,
  category,
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      href={`/obra/${id}`} 
      className="group block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className={`overflow-hidden bg-card transition-all duration-500 border-2 border-transparent hover:border-accent ${
        parseInt(id) % 2 === 0 ? "card-creative-1" : "card-creative-2"
      }`}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          
          {/* Gradient overlay */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isHovered 
              ? "bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" 
              : "bg-gradient-to-t from-foreground/40 via-transparent to-transparent"
          }`} />
          
          {/* Tags overlay - top left, stacked vertically */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {hasVideo && (
              <span className="inline-flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-foreground rounded-sm">
                <Play className="h-2.5 w-2.5 fill-current" />
                Video
              </span>
            )}
            {isRentable && (
              <span className="inline-flex items-center gap-1 bg-accent/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-accent-foreground rounded-sm">
                <Calendar className="h-2.5 w-2.5" />
                Alugavel
              </span>
            )}
            {isForSale && (
              <span className="inline-flex items-center gap-1 bg-primary/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-primary-foreground rounded-sm">
                <ShoppingBag className="h-2.5 w-2.5" />
                A Venda
              </span>
            )}
          </div>
          
          {/* Category - top right */}
          {category && (
            <div className="absolute top-3 right-3">
              <span className="bg-foreground/30 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-background uppercase tracking-wider rounded-sm">
                {category}
              </span>
            </div>
          )}
          
          {/* Arrow icon on hover */}
          <div className={`absolute top-4 right-4 transition-all duration-300 ${
            isHovered && !category ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}>
            <span className="w-10 h-10 shape-organic bg-background flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-foreground" />
            </span>
          </div>
          
          {/* Content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isHovered ? "text-background/80" : "text-background/70"
            }`}>
              {artist}
            </p>
            <h3 className="font-serif text-xl font-black text-background mt-1 line-clamp-2">
              {title}
            </h3>
            
            {/* View link on hover */}
            <div className={`mt-3 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}>
              <span className="btn-blob inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm text-background text-sm font-bold px-4 py-2">
                Ver obra
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
