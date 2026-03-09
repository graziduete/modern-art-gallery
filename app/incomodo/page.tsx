"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Tag, Video, Sofa, ArrowRight, Sparkles } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Mock data for furniture pieces
const furnitureItems = [
  {
    id: "f1",
    title: "Poltrona Aurora",
    artist: "Estudio Arca",
    imageUrl: "/images/furniture-1.jpg",
    type: "assento",
    hasVideo: true,
    isRentable: true,
    isForSale: true,
  },
  {
    id: "f2",
    title: "Mesa Horizonte",
    artist: "Carlos Mendes",
    imageUrl: "/images/furniture-2.jpg",
    type: "mesa",
    hasVideo: false,
    isRentable: true,
    isForSale: false,
  },
  {
    id: "f3",
    title: "Luminária Cosmos",
    artist: "Julia Oliveira",
    imageUrl: "/images/furniture-3.jpg",
    type: "iluminacao",
    hasVideo: true,
    isRentable: true,
    isForSale: true,
  },
  {
    id: "f4",
    title: "Estante Fragmentos",
    artist: "Marina Santos",
    imageUrl: "/images/furniture-4.jpg",
    type: "armazenamento",
    hasVideo: false,
    isRentable: false,
    isForSale: true,
  },
  {
    id: "f5",
    title: "Banco Raízes",
    artist: "Pedro Almeida",
    imageUrl: "/images/furniture-1.jpg",
    type: "assento",
    hasVideo: true,
    isRentable: true,
    isForSale: true,
  },
  {
    id: "f6",
    title: "Aparador Metamorfose",
    artist: "Fernanda Dias",
    imageUrl: "/images/furniture-2.jpg",
    type: "armazenamento",
    hasVideo: false,
    isRentable: true,
    isForSale: false,
  },
  {
    id: "f7",
    title: "Pendente Constelação",
    artist: "Roberto Lima",
    imageUrl: "/images/furniture-3.jpg",
    type: "iluminacao",
    hasVideo: true,
    isRentable: false,
    isForSale: true,
  },
  {
    id: "f8",
    title: "Mesa de Centro Ciclos",
    artist: "Ana Beatriz Costa",
    imageUrl: "/images/furniture-4.jpg",
    type: "mesa",
    hasVideo: false,
    isRentable: true,
    isForSale: true,
  },
]

const furnitureTypes = [
  { value: "all", label: "Todos os tipos" },
  { value: "assento", label: "Assentos" },
  { value: "mesa", label: "Mesas" },
  { value: "iluminacao", label: "Iluminação" },
  { value: "armazenamento", label: "Armazenamento" },
]

export default function InComodoPage() {
  const [search, setSearch] = useState("")
  const [furnitureType, setFurnitureType] = useState("all")
  const [status, setStatus] = useState("all")
  const searchParams = useSearchParams()

  const filteredItems = useMemo(() => {
    return furnitureItems.filter((item) => {
      if (search) {
        const searchLower = search.toLowerCase()
        if (
          !item.title.toLowerCase().includes(searchLower) &&
          !item.artist.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      if (furnitureType !== "all" && item.type !== furnitureType) {
        return false
      }

      if (status === "for-sale" && !item.isForSale) return false
      if (status === "rentable" && !item.isRentable) return false

      return true
    })
  }, [search, furnitureType, status])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-secondary/15 via-background to-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <span className="tag-slant inline-block px-5 py-2 bg-secondary text-secondary-foreground text-sm font-bold tracking-[0.15em] uppercase">
                <span className="flex items-center gap-2">
                  <Sofa className="h-4 w-4" />
                  Mobiliário Artístico
                </span>
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
                In-Comodo
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Peças de mobiliário que transcendem a funcionalidade. Cada item é uma obra de arte sustentável que transforma seu espaço em uma galeria.
              </p>
            </div>
            <Button asChild className="btn-blob bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-bold">
              <Link href="/aluguel">
                Alugar para eventos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-card card-creative-2 border border-border">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar móveis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 btn-pill-right"
              />
            </div>
            <Select value={furnitureType} onValueChange={setFurnitureType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tipo de móvel" />
              </SelectTrigger>
              <SelectContent>
                {furnitureTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="for-sale">A venda</SelectItem>
                <SelectItem value="rentable">Alugável</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="mb-8 flex items-center gap-3">
            <span className="tag-slant inline-block px-4 py-1.5 bg-muted text-muted-foreground text-sm font-bold">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {filteredItems.length} peça{filteredItems.length !== 1 ? "s" : ""}
              </span>
            </span>
          </div>

          {/* Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <Link key={item.id} href={`/obra/${item.id}`} className="group block">
                  <article className={`overflow-hidden bg-card border-2 border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-secondary ${
                    index % 2 === 0 ? "card-creative-1" : "card-creative-2"
                  }`}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {item.hasVideo && (
                          <span className="tag-slant flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-foreground">
                            <span className="flex items-center gap-1.5">
                              <Video className="h-3 w-3" />
                              Vídeo
                            </span>
                          </span>
                        )}
                        {item.isRentable && (
                          <span className="btn-pill-left flex items-center gap-1.5 bg-secondary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-secondary-foreground">
                            <Tag className="h-3 w-3" />
                            Alugável
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold text-card-foreground line-clamp-1 group-hover:text-secondary transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.artist}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center card-creative-1 bg-muted/50 border-2 border-dashed border-border">
              <p className="text-lg text-muted-foreground">
                Nenhuma peça encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
