"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header with creative tag */}
        <div className="text-center mb-16">
          <span className="tag-slant inline-block px-6 py-3 bg-accent text-accent-foreground text-sm font-bold tracking-[0.15em] uppercase">
            <span>Como podemos ajudar?</span>
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Buy Art Card - Organic shape */}
          <Link 
            href="/galeria"
            className="group relative bg-card card-creative-1 p-10 lg:p-14 border-4 border-primary hover:bg-primary hover-lift transition-all duration-500 overflow-hidden"
          >
            {/* Decorative circle */}
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-primary/10 shape-organic group-hover:bg-primary-foreground/10 transition-colors duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <p className="text-muted-foreground group-hover:text-primary-foreground/80 text-lg font-light tracking-wider transition-colors duration-500">
                quero comprar
              </p>
              <p className="font-serif text-5xl lg:text-6xl text-foreground group-hover:text-primary-foreground font-black mt-2 tracking-tight transition-colors duration-500">
                arte
              </p>
              
              {/* Blob button */}
              <div className="mt-10">
                <span className="btn-blob inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary text-sm font-bold uppercase tracking-wide transition-colors duration-500">
                  Explorar galeria
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>

          {/* Sell Art Card - Inverse organic shape */}
          <Link 
            href="/envie-sua-obra"
            className="group relative bg-card card-creative-2 p-10 lg:p-14 border-4 border-secondary hover:bg-secondary hover-lift transition-all duration-500 overflow-hidden"
          >
            {/* Decorative circle */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary/20 shape-organic group-hover:bg-secondary-foreground/10 transition-colors duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <p className="text-muted-foreground group-hover:text-secondary-foreground/80 text-lg font-light tracking-wider transition-colors duration-500">
                quero vender
              </p>
              <p className="font-serif text-5xl lg:text-6xl text-foreground group-hover:text-secondary-foreground font-black mt-2 tracking-tight transition-colors duration-500">
                arte
              </p>
              
              {/* Blob button */}
              <div className="mt-10">
                <span className="btn-blob inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground group-hover:bg-secondary-foreground group-hover:text-secondary text-sm font-bold uppercase tracking-wide transition-colors duration-500">
                  Enviar proposta
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
