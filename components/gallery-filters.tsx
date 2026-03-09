"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface GalleryFiltersProps {
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onStatusChange: (value: string) => void
  onHasVideoChange: (value: boolean) => void
  searchValue: string
  category: string
  status: string
  hasVideo: boolean
}

const categories = [
  { value: "all", label: "Todas as categorias" },
  { value: "escultura", label: "Escultura" },
  { value: "pintura", label: "Pintura" },
  { value: "instalacao", label: "Instalação" },
  { value: "mixed-media", label: "Mixed Media" },
  { value: "fotografia", label: "Fotografia" },
]

const statuses = [
  { value: "all", label: "Todos os status" },
  { value: "for-sale", label: "A venda" },
  { value: "rentable", label: "Alugável" },
  { value: "exposed", label: "Em exposição" },
]

export function GalleryFilters({
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onHasVideoChange,
  searchValue,
  category,
  status,
  hasVideo,
}: GalleryFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const activeFiltersCount = [
    category !== "all",
    status !== "all",
    hasVideo,
  ].filter(Boolean).length

  const clearFilters = () => {
    onCategoryChange("all")
    onStatusChange("all")
    onHasVideoChange(false)
    onSearchChange("")
  }

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-foreground uppercase tracking-wide">Categoria</label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="btn-pill-right">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-foreground uppercase tracking-wide">Status</label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="btn-pill-right">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Has Video */}
      <div className="flex items-center gap-3 p-3 bg-muted/50 card-creative-2">
        <Checkbox
          id="hasVideo"
          checked={hasVideo}
          onCheckedChange={(checked) => onHasVideoChange(checked as boolean)}
          className="border-2"
        />
        <label
          htmlFor="hasVideo"
          className="text-sm font-bold text-foreground cursor-pointer"
        >
          Apenas com vídeo
        </label>
      </div>

      {/* Clear filters */}
      {activeFiltersCount > 0 && (
        <Button variant="ghost" onClick={clearFilters} className="btn-blob w-full border border-border hover:bg-destructive/10 hover:text-destructive">
          <X className="h-4 w-4 mr-2" />
          Limpar filtros
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search and Mobile Filter Toggle */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar obras, artistas..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-11 btn-pill-right border-2 border-border focus:border-accent"
          />
        </div>

        {/* Mobile Filter Button */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" className="btn-pill-left shrink-0 bg-transparent border-2 border-foreground/20 font-bold">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 shape-organic bg-accent text-accent-foreground">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background">
            <SheetHeader>
              <SheetTitle className="font-serif text-2xl font-bold">Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center gap-6 p-6 bg-card card-creative-1 border-2 border-border">
        <div className="flex-1 grid grid-cols-3 gap-6">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="btn-pill-left border-2">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="border-2">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-3 px-4 py-2 bg-muted/50 btn-pill-right">
            <Checkbox
              id="hasVideoDesktop"
              checked={hasVideo}
              onCheckedChange={(checked) => onHasVideoChange(checked as boolean)}
              className="border-2"
            />
            <label
              htmlFor="hasVideoDesktop"
              className="text-sm font-bold text-foreground cursor-pointer"
            >
              Com video
            </label>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="btn-blob hover:bg-destructive/10 hover:text-destructive">
            <X className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        )}
      </div>
    </div>
  )
}
