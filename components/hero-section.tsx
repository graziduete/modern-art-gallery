"use client"

import React from "react"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, X } from "lucide-react"

const heroImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
]

// Interactive hotspots on the gallery image
const hotspots = [
  { id: 1, x: 75, y: 12, label: "Escultura Principal" },
  { id: 2, x: 82, y: 28, label: "Moldura Reciclada" },
  { id: 3, x: 68, y: 45, label: "Textura Orgânica" },
  { id: 4, x: 55, y: 65, label: "Base Sustentável" },
  { id: 5, x: 40, y: 85, label: "Reflexo Intencional" },
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      })
    }
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-primary"
      onMouseMove={handleMouseMove}
    >
      {/* Diagonal split background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/70" />
        <div 
          className="absolute top-0 right-0 w-1/2 h-full bg-secondary/60 origin-top-right"
          style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 left-[15%] w-20 h-20 border-2 border-white/20 rounded-full animate-pulse" />
      <div className="absolute top-48 left-[10%] w-8 h-8 bg-accent rounded-full opacity-60" />
      <div className="absolute bottom-32 right-[15%] w-16 h-16 border-2 border-white/30 rounded-full" />
      <div className="absolute top-1/4 right-[25%] w-4 h-4 bg-white rounded-full opacity-40" />
      
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center w-full">
          
          {/* Left side - Content */}
          <div 
            className={`relative z-10 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Logo badge */}
            <div className="tag-slant inline-flex items-center gap-3 px-5 py-3 mb-10 bg-accent text-accent-foreground">
              <span className="flex items-center gap-3">
                <Image 
                  src="/images/arca-logo.jpg" 
                  alt="Arca" 
                  width={32} 
                  height={32}
                  className="w-8 h-8 object-contain rounded-full"
                />
                <span className="text-sm font-bold tracking-wider uppercase">Galeria Upcycling</span>
              </span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[0.9] tracking-tight drop-shadow-sm">
              <span className="block text-accent">ARCA</span>
              <span className="block text-accent">ATELIÊ</span>
              <span className="block text-accent">RURAL</span>
            </h1>
            
            <p className="mt-6 text-2xl sm:text-3xl text-white font-medium tracking-wide drop-shadow-sm">
              arte e sustentabilidade
            </p>

            <p className="mt-8 text-base sm:text-lg text-white/80 max-w-md leading-relaxed font-medium">
              Obras que transformam perspectivas. Cada peça é criada a partir de materiais reutilizados, ganhando nova vida e novo significado.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="btn-blob bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-bold uppercase tracking-wider group"
              >
                <Link href="/galeria">
                  Explorar Galeria
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="btn-pill-right border-2 border-white/50 text-white hover:bg-white/10 px-8 py-6 text-base font-bold uppercase tracking-wider bg-transparent"
              >
                <Link href="#video">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Vídeo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 flex gap-12">
              <div>
                <p className="font-serif text-5xl sm:text-6xl font-black text-accent drop-shadow-sm">150+</p>
                <p className="mt-1 text-sm text-white font-semibold uppercase tracking-wider">Obras</p>
              </div>
              <div>
                <p className="font-serif text-5xl sm:text-6xl font-black text-accent drop-shadow-sm">40+</p>
                <p className="mt-1 text-sm text-white font-semibold uppercase tracking-wider">Artistas</p>
              </div>
              <div>
                <p className="font-serif text-5xl sm:text-6xl font-black text-accent drop-shadow-sm">8</p>
                <p className="mt-1 text-sm text-white font-semibold uppercase tracking-wider">Anos</p>
              </div>
            </div>
          </div>

          {/* Right side - Interactive Image with Blob Mask */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.03}deg) rotateX(${-mousePosition.y * 0.03}deg)`,
            }}
          >
            {/* Decorative blob behind */}
            <div className="absolute -inset-4 mask-blob-2 bg-gradient-to-br from-accent/30 to-secondary/30 blur-2xl" />
            
            {/* Main image container with organic blob mask */}
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden shadow-2xl mask-blob-1 mask-blob-hover">
              {heroImages.map((img, index) => (
                <div
                  key={img}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt="Arte em destaque"
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Interactive Hotspots */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  className={`absolute z-20 transition-all duration-300 ${
                    activeHotspot === spot.id ? "scale-125" : "hover:scale-110"
                  }`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  aria-label={spot.label}
                >
                  {/* Outer ring */}
                  <span className="absolute -inset-4 border-2 border-accent rounded-sm" />
                  {/* Inner ring */}
                  <span className="absolute -inset-2 border border-accent rounded-sm" />
                  {/* Center icon */}
                  <span className="relative flex items-center justify-center w-4 h-4 bg-accent text-accent-foreground rounded-sm">
                    <span className="text-xs font-bold">+</span>
                  </span>
                  
                  {/* Label tooltip */}
                  {activeHotspot === spot.id && (
                    <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-2 text-sm font-medium whitespace-nowrap z-30 shadow-lg">
                      {spot.label}
                      <X className="inline-block ml-2 h-3 w-3" />
                    </span>
                  )}
                </button>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Image indicators */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 transition-all duration-300 ${
                    index === currentImage
                      ? "bg-accent w-10 btn-pill-left"
                      : "bg-white/40 hover:bg-white/60 w-6 rounded-full"
                  }`}
                  aria-label={`Ver imagem ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-white/60">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
