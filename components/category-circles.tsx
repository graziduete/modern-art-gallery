"use client"

import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: 1,
    title: "Sugestao do Curador",
    image: "/images/artwork-1.jpg",
    href: "/galeria?curadoria=true",
    borderColors: ["#D4A574", "#8B7355", "#F5DEB3", "#CD853F", "#E8D5B7", "#A0785A"],
  },
  {
    id: 2,
    title: "Entrevistas",
    image: "/images/artwork-3.jpg",
    href: "/entrevistas",
    borderColors: ["#E8B4B8", "#D4A5A5", "#C19A6B", "#8B4513", "#DDA0DD", "#BA55D3"],
  },
  {
    id: 3,
    title: "Noticias",
    image: "/images/artwork-5.jpg",
    href: "/noticias",
    borderColors: ["#87CEEB", "#4682B4", "#708090", "#2F4F4F", "#5F9EA0", "#20B2AA"],
  },
]

export function CategoryCircles() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="tag-slant inline-block px-5 py-2 bg-secondary text-secondary-foreground text-sm font-bold tracking-[0.15em] uppercase mb-4">
            <span>Conteudo</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            Explore a Arca
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Descubra mais sobre nosso universo de arte sustentavel
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Outer decorative ring with mosaic pattern */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
                {/* Mosaic border effect */}
                <svg 
                  className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:rotate-[15deg]"
                  viewBox="0 0 200 200"
                >
                  {/* Outer ring segments - colorful mosaic */}
                  {[...Array(36)].map((_, i) => {
                    const angle = (i * 10 * Math.PI) / 180
                    const nextAngle = ((i + 1) * 10 * Math.PI) / 180
                    const innerR = 82
                    const outerR = 99
                    // Arredondar valores para evitar hydration mismatch
                    const round = (n: number) => Math.round(n * 100) / 100
                    const x1 = round(100 + innerR * Math.cos(angle))
                    const y1 = round(100 + innerR * Math.sin(angle))
                    const x2 = round(100 + outerR * Math.cos(angle))
                    const y2 = round(100 + outerR * Math.sin(angle))
                    const x3 = round(100 + outerR * Math.cos(nextAngle))
                    const y3 = round(100 + outerR * Math.sin(nextAngle))
                    const x4 = round(100 + innerR * Math.cos(nextAngle))
                    const y4 = round(100 + innerR * Math.sin(nextAngle))
                    return (
                      <path
                        key={i}
                        d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`}
                        fill={category.borderColors[i % category.borderColors.length]}
                        className="transition-all duration-500"
                        style={{ 
                          opacity: 0.7 + (i % 4) * 0.08,
                        }}
                      />
                    )
                  })}
                </svg>
                
                {/* Inner white ring */}
                <div className="absolute inset-[14px] rounded-full bg-background shadow-inner" />
                
                {/* Image container */}
                <div className="absolute inset-[22px] rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
                </div>
                
                {/* Label - centered with slant */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <span className="tag-slant bg-accent text-accent-foreground px-5 py-2.5 text-sm font-bold tracking-wide shadow-xl">
                    <span>{category.title}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
