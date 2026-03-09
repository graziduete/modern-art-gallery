"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Recycle, Eye, Sparkles } from "lucide-react"

const hotspots = [
  { id: 1, x: 85, y: 15, feature: "recycled" },
  { id: 2, x: 78, y: 35, feature: "anamorphic" },
  { id: 3, x: 70, y: 55, feature: "unique" },
  { id: 4, x: 60, y: 75, feature: "texture" },
  { id: 5, x: 45, y: 88, feature: "materials" },
]

const features = {
  recycled: { icon: Recycle, title: "100% Reciclado", description: "Materiais reutilizados" },
  anamorphic: { icon: Eye, title: "Arte Anamórfica", description: "Muda com seu olhar" },
  unique: { icon: Sparkles, title: "Peça Única", description: "Impossível replicar" },
  texture: { icon: Recycle, title: "Textura Natural", description: "Acabamento orgânico" },
  materials: { icon: Recycle, title: "Origem Rastreável", description: "De onde veio cada peça" },
}

export function AboutSection() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side with interactive hotspots */}
          <div className="relative">
            {/* Decorative shape behind */}
            <div className="absolute -inset-4 mask-rect-organic-2 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
            
            <div className="relative aspect-[4/5] overflow-hidden bg-muted mask-rect-organic-1 mask-rect-organic-hover shadow-xl">
              <Image
                src="/images/about-gallery.jpg"
                alt="Interior da galeria Arca"
                fill
                className="object-cover"
              />
              
              {/* Interactive Hotspots */}
              {hotspots.map((spot) => {
                const feature = features[spot.feature as keyof typeof features]
                const isActive = activeHotspot === spot.feature
                
                return (
                  <button
                    key={spot.id}
                    className="absolute z-20 group"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    onMouseEnter={() => setActiveHotspot(spot.feature)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    onClick={() => setActiveHotspot(isActive ? null : spot.feature)}
                    aria-label={feature.title}
                  >
                    {/* Outer ring */}
                    <span className={`absolute -inset-4 border-2 rounded-sm transition-all duration-300 ${
                      isActive ? "border-accent scale-110" : "border-accent/50"
                    }`} />
                    {/* Middle ring */}
                    <span className={`absolute -inset-2 border rounded-sm transition-all duration-300 ${
                      isActive ? "border-accent" : "border-accent/30"
                    }`} />
                    {/* Center */}
                    <span className="relative flex items-center justify-center w-5 h-5 bg-accent text-accent-foreground rounded-sm">
                      <Plus className="h-3 w-3" />
                    </span>
                    
                    {/* Tooltip */}
                    {isActive && (
                      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-card border border-border shadow-xl p-4 min-w-48 z-30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                            <feature.icon className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{feature.title}</p>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="tag-slant inline-block px-5 py-2 bg-accent/10 text-accent text-sm font-bold tracking-[0.2em] uppercase">
              <span>sobre a</span>
            </span>
            <h2 className="mt-4 font-serif text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-[0.85] tracking-tight">
              galeria
            </h2>
            
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              A <strong className="text-foreground">ARCA</strong> é uma inovadora galeria de arte sustentável dedicada a transformar materiais descartados em obras que inspiram novos pontos de vista.
            </p>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Trabalhamos com artistas visionários que enxergam potencial onde outros veem descarte, criando peças únicas que contam histórias de transformação e renascimento.
            </p>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Nossa missão é conectar colecionadores, empresas e amantes da arte com obras que fazem a diferença.
            </p>

            <Button 
              asChild 
              size="lg"
              className="btn-blob mt-10 bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6"
            >
              <Link href="/sobre">
                <Plus className="mr-2 h-5 w-5" />
                Saiba mais
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
