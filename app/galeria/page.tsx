"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtworkCard } from "@/components/artwork-card"
import { GalleryFilters } from "@/components/gallery-filters"
import { Sparkles } from "lucide-react"

// Mock data - in a real app this would come from a database
const allArtworks = [
  {
    id: "1",
    title: "Metamorfose Urbana",
    artist: "Marina Santos",
    imageUrl: "/images/artwork-1.jpg",
    hasVideo: true,
    isRentable: true,
    isForSale: true,
    category: "escultura",
  },
  {
    id: "2",
    title: "Reflexos do Tempo",
    artist: "Carlos Mendes",
    imageUrl: "/images/artwork-2.jpg",
    hasVideo: false,
    isRentable: true,
    isForSale: false,
    category: "instalacao",
  },
  {
    id: "3",
    title: "Fragmentos de Memoria",
    artist: "Julia Oliveira",
    imageUrl: "/images/artwork-3.jpg",
    hasVideo: true,
    isRentable: false,
    isForSale: true,
    category: "mixed-media",
  },
  {
    id: "4",
    title: "Ecossistema Suspenso",
    artist: "Roberto Lima",
    imageUrl: "/images/artwork-4.jpg",
    hasVideo: false,
    isRentable: true,
    isForSale: true,
    category: "instalacao",
  },
  {
    id: "5",
    title: "Horizonte Invertido",
    artist: "Ana Beatriz Costa",
    imageUrl: "/images/artwork-5.jpg",
    hasVideo: true,
    isRentable: true,
    isForSale: false,
    category: "pintura",
  },
  {
    id: "6",
    title: "Tecido da Cidade",
    artist: "Pedro Almeida",
    imageUrl: "/images/artwork-6.jpg",
    hasVideo: false,
    isRentable: false,
    isForSale: true,
    category: "mixed-media",
  },
  {
    id: "7",
    title: "Natureza Reconstruida",
    artist: "Fernanda Dias",
    imageUrl: "/images/artwork-7.jpg",
    hasVideo: true,
    isRentable: true,
    isForSale: true,
    category: "escultura",
  },
  {
    id: "8",
    title: "Janelas do Amanha",
    artist: "Lucas Ferreira",
    imageUrl: "/images/artwork-8.jpg",
    hasVideo: false,
    isRentable: true,
    isForSale: false,
    category: "instalacao",
  },
  {
    id: "9",
    title: "Ciclos Infinitos",
    artist: "Camila Rocha",
    imageUrl: "/images/artwork-1.jpg",
    hasVideo: true,
    isRentable: false,
    isForSale: true,
    category: "escultura",
  },
  {
    id: "10",
    title: "Dialogo Silencioso",
    artist: "Rafael Souza",
    imageUrl: "/images/artwork-2.jpg",
    hasVideo: false,
    isRentable: true,
    isForSale: true,
    category: "pintura",
  },
  {
    id: "11",
    title: "Raizes Aereas",
    artist: "Isabela Martins",
    imageUrl: "/images/artwork-3.jpg",
    hasVideo: true,
    isRentable: true,
    isForSale: false,
    category: "instalacao",
  },
  {
    id: "12",
    title: "Espelhos Quebrados",
    artist: "Thiago Nunes",
    imageUrl: "/images/artwork-4.jpg",
    hasVideo: false,
    isRentable: false,
    isForSale: true,
    category: "mixed-media",
  },
]

export default function GalleryPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [hasVideo, setHasVideo] = useState(false)

  const filteredArtworks = useMemo(() => {
    return allArtworks.filter((artwork) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        if (
          !artwork.title.toLowerCase().includes(searchLower) &&
          !artwork.artist.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      // Category filter
      if (category !== "all" && artwork.category !== category) {
        return false
      }

      // Status filter
      if (status === "for-sale" && !artwork.isForSale) return false
      if (status === "rentable" && !artwork.isRentable) return false
      if (status === "exposed" && (artwork.isForSale || artwork.isRentable)) return false

      // Video filter
      if (hasVideo && !artwork.hasVideo) return false

      return true
    })
  }, [search, category, status, hasVideo])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <span className="tag-slant inline-block px-5 py-2 bg-accent text-accent-foreground text-sm font-bold tracking-[0.15em] uppercase">
              <span>Colecao</span>
            </span>
            <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
              Galeria
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Explore nossa colecao completa de obras sustentaveis. Cada peca conta uma historia unica de transformacao e arte consciente.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <GalleryFilters
            searchValue={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            status={status}
            onStatusChange={setStatus}
            hasVideo={hasVideo}
            onHasVideoChange={setHasVideo}
          />

          {/* Results count */}
          <div className="mt-8 mb-8 flex items-center gap-3">
            <span className="tag-slant inline-block px-4 py-1.5 bg-muted text-muted-foreground text-sm font-bold">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {filteredArtworks.length} obra{filteredArtworks.length !== 1 ? "s" : ""}
              </span>
            </span>
          </div>

          {/* Grid */}
          {filteredArtworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} {...artwork} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center card-creative-1 bg-muted/50 border-2 border-dashed border-border">
              <p className="text-lg text-muted-foreground">
                Nenhuma obra encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
