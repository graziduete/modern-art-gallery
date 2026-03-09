"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, ShoppingBag, Calendar } from "lucide-react"

// Mock data for featured artworks
const featuredArtworks = [
  {
    id: "1",
    title: "Metamorfose Urbana",
    artist: "Marina Santos",
    imageUrl: "/images/artwork-1.jpg",
    hasVideo: true,
    isRentable: true,
    isForSale: true,
    category: "Escultura",
  },
  {
    id: "2",
    title: "Reflexos do Tempo",
    artist: "Carlos Mendes",
    imageUrl: "/images/artwork-2.jpg",
    hasVideo: false,
    isRentable: true,
    isForSale: false,
    category: "Instalacao",
  },
  {
    id: "3",
    title: "Fragmentos de Memoria",
    artist: "Julia Oliveira",
    imageUrl: "/images/artwork-3.jpg",
    hasVideo: true,
    isRentable: false,
    isForSale: true,
    category: "Mixed Media",
  },
  {
    id: "4",
    title: "Ecossistema Suspenso",
    artist: "Roberto Lima",
    imageUrl: "/images/artwork-4.jpg",
    hasVideo: false,
    isRentable: true,
    isForSale: true,
    category: "Instalacao",
  },
  {
    id: "5",
    title: "Horizonte Invertido",
    artist: "Ana Beatriz Costa",
    imageUrl: "/images/artwork-5.jpg",
    hasVideo: true,
    isRentable: true,
    isForSale: false,
    category: "Pintura",
  },
  {
    id: "6",
    title: "Tecido da Cidade",
    artist: "Pedro Almeida",
    imageUrl: "/images/artwork-6.jpg",
    hasVideo: false,
    isRentable: false,
    isForSale: true,
    category: "Textil",
  },
]

// Gradient frame colors alternating between primary (orange) and secondary (lilac)
const frameStyles = [
  "from-primary via-primary/80 to-secondary",
  "from-secondary via-secondary/80 to-primary",
  "from-primary via-secondary to-primary",
  "from-secondary via-primary to-secondary",
  "from-primary/80 via-accent to-secondary",
  "from-secondary/80 via-accent to-primary",
]

export function FeaturedGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="tag-slant inline-block px-5 py-2 bg-accent text-accent-foreground text-sm font-bold tracking-[0.15em] uppercase">
              <span>Destaques</span>
            </span>
            <h2 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[0.85] tracking-tight">
              obras em<br />evidência
            </h2>
          </div>
          <Button asChild variant="outline" size="lg" className="btn-blob shrink-0 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent px-8">
            <Link href="/galeria">
              Ver todas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Colored Frames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtworks.map((artwork, index) => {
            const isLarge = index === 0 || index === 3
            const isHovered = hoveredId === artwork.id
            const frameGradient = frameStyles[index % frameStyles.length]
            
            return (
              <Link
                key={artwork.id}
                href={`/obra/${artwork.id}`}
                className={`group relative ${isLarge ? "md:row-span-2" : ""}`}
                onMouseEnter={() => setHoveredId(artwork.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Colored gradient frame */}
                <div className={`relative p-2 sm:p-3 bg-gradient-to-br ${frameGradient} transition-all duration-500 ${
                  isHovered ? "p-3 sm:p-4 shadow-2xl" : "shadow-lg"
                }`}>
                  {/* Inner white/cream border */}
                  <div className="bg-background p-1">
                    {/* Image container */}
                    <div className={`relative overflow-hidden ${isLarge ? "aspect-[3/4]" : "aspect-square"}`}>
                      <Image
                        src={artwork.imageUrl || "/placeholder.svg"}
                        alt={artwork.title}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          isHovered ? "scale-110" : "scale-100"
                        }`}
                      />
                      
                      {/* Overlay */}
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isHovered 
                          ? "bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" 
                          : "bg-gradient-to-t from-foreground/60 via-transparent to-transparent"
                      }`} />
                      
                      {/* Tags */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {artwork.hasVideo && (
                          <span className="tag-slant flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-foreground">
                            <span className="flex items-center gap-1.5">
                              <Play className="h-3 w-3 fill-current" />
                              Vídeo
                            </span>
                          </span>
                        )}
                        {artwork.isRentable && (
                          <span className="btn-pill-left flex items-center gap-1.5 bg-accent/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-accent-foreground">
                            <Calendar className="h-3 w-3" />
                            Alugável
                          </span>
                        )}
                        {artwork.isForSale && (
                          <span className="btn-pill-right flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-primary-foreground">
                            <ShoppingBag className="h-3 w-3" />
                            À Venda
                          </span>
                        )}
                      </div>
                      
                      {/* Category tag */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-background/20 backdrop-blur-sm border border-background/30 px-3 py-1.5 text-xs font-bold text-background uppercase tracking-wider">
                          {artwork.category}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-background/70 text-sm font-medium mb-1">
                          {artwork.artist}
                        </p>
                        <h3 className={`font-serif font-bold text-background transition-all duration-300 ${
                          isLarge ? "text-2xl sm:text-3xl" : "text-xl"
                        }`}>
                          {artwork.title}
                        </h3>
                        
                        {/* View button on hover */}
                        <div className={`mt-4 transition-all duration-300 ${
                          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}>
                          <span className="btn-pill-right inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm text-background text-sm font-bold px-4 py-2">
                            Ver detalhes
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
