"use client"

import { useState, useRef, useEffect } from "react"
import { Palette, TreePine, UtensilsCrossed, Navigation, MapPin, ZoomIn, ZoomOut, Maximize2, Minimize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface PinLocation {
  id: string
  name: string
  type: "artwork" | "installation" | "leisure" | "fruit_tree" | "facility"
  x: number // Coordenada X em pixels (relativa à imagem)
  y: number // Coordenada Y em pixels (relativa à imagem)
  artworkId?: string
  description?: string
}

interface InteractiveSiteMapProps {
  imageUrl: string
  locations: PinLocation[]
  imageWidth?: number // Largura original da imagem
  imageHeight?: number // Altura original da imagem
}

export function InteractiveSiteMap({ 
  imageUrl, 
  locations,
  imageWidth = 1400,
  imageHeight = 1000
}: InteractiveSiteMapProps) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedPin, setSelectedPin] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Calcular dimensões da imagem baseado no zoom
  const imageDisplayWidth = imageWidth * zoom
  const imageDisplayHeight = imageHeight * zoom

  // Ajustar pan para manter imagem centralizada quando zoom muda
  useEffect(() => {
    if (containerRef.current && imageRef.current) {
      const container = containerRef.current
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      
      // Centralizar imagem
      setPan({
        x: (containerWidth - imageDisplayWidth) / 2,
        y: (containerHeight - imageDisplayHeight) / 2
      })
    }
  }, [zoom, imageDisplayWidth, imageDisplayHeight])

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Botão esquerdo
      setIsDragging(true)
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const getIconColor = (type: PinLocation["type"]) => {
    const colors = {
      artwork: "#8B5CF6",
      installation: "#10B981",
      leisure: "#F59E0B",
      fruit_tree: "#22C55E",
      facility: "#3B82F6",
    }
    return colors[type]
  }

  const getIcon = (type: PinLocation["type"]) => {
    const Icon = 
      type === "artwork" ? Palette :
      type === "fruit_tree" ? TreePine :
      type === "facility" ? UtensilsCrossed :
      Navigation
    return Icon
  }

  // Filtrar locais por tipo
  const filteredLocations = selectedType
    ? locations.filter(loc => loc.type === selectedType)
    : locations

  // Contar por tipo
  const typeCounts = {
    artwork: locations.filter(l => l.type === "artwork").length,
    facility: locations.filter(l => l.type === "facility").length,
    fruit_tree: locations.filter(l => l.type === "fruit_tree").length,
    leisure: locations.filter(l => l.type === "leisure").length,
    installation: locations.filter(l => l.type === "installation").length,
  }

  return (
    <div className="space-y-4">
      {/* Filtros/Legenda como Botões */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant={selectedType === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType(null)}
          className="gap-2"
        >
          Todos ({locations.length})
        </Button>
        <Button
          variant={selectedType === "artwork" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType(selectedType === "artwork" ? null : "artwork")}
          className="gap-2"
        >
          <Palette className="h-4 w-4" />
          Obras ({typeCounts.artwork})
        </Button>
        <Button
          variant={selectedType === "facility" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType(selectedType === "facility" ? null : "facility")}
          className="gap-2"
        >
          <UtensilsCrossed className="h-4 w-4" />
          Instalações ({typeCounts.facility})
        </Button>
        <Button
          variant={selectedType === "fruit_tree" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType(selectedType === "fruit_tree" ? null : "fruit_tree")}
          className="gap-2"
        >
          <TreePine className="h-4 w-4" />
          Árvores ({typeCounts.fruit_tree})
        </Button>
        <Button
          variant={selectedType === "leisure" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType(selectedType === "leisure" ? null : "leisure")}
          className="gap-2"
        >
          <Navigation className="h-4 w-4" />
          Lazer ({typeCounts.leisure})
        </Button>
      </div>

      {/* Controles de Zoom */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            Resetar
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="h-4 w-4 mr-2" />
              Sair
            </>
          ) : (
            <>
              <Maximize2 className="h-4 w-4 mr-2" />
              Tela Cheia
            </>
          )}
        </Button>
      </div>

      {/* Container do Mapa */}
      <div
        ref={containerRef}
        className="relative w-full h-[600px] rounded-xl overflow-hidden border-2 border-border bg-muted shadow-xl cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={(e) => {
          e.preventDefault()
          const delta = e.deltaY > 0 ? -0.1 : 0.1
          setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)))
        }}
      >
        {/* Imagem da Planta */}
        <div
          style={{
            position: "absolute",
            left: `${pan.x}px`,
            top: `${pan.y}px`,
            width: `${imageDisplayWidth}px`,
            height: `${imageDisplayHeight}px`,
            transition: isDragging ? "none" : "transform 0.2s",
          }}
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Planta do Sítio da Arca"
            className="w-full h-full object-contain"
            draggable={false}
          />

          {/* Pins sobrepostos */}
          {filteredLocations.map((location) => {
            const Icon = getIcon(location.type)
            const color = getIconColor(location.type)
            const pinX = (location.x / imageWidth) * imageDisplayWidth
            const pinY = (location.y / imageHeight) * imageDisplayHeight

            return (
              <div
                key={location.id}
                style={{
                  position: "absolute",
                  left: `${pinX}px`,
                  top: `${pinY}px`,
                  transform: "translate(-50%, -100%)",
                  cursor: "pointer",
                  zIndex: selectedPin === location.id ? 30 : 20,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPin(selectedPin === location.id ? null : location.id)
                }}
              >
                {/* Pin */}
                <div
                  className="relative group"
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: color,
                      border: "3px solid white",
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s",
                    }}
                    className="group-hover:scale-125"
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  {/* Popup */}
                  {selectedPin === location.id && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-background border-2 border-border rounded-lg shadow-xl p-3 min-w-[200px] z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-foreground text-sm">{location.name}</h3>
                        <button
                          onClick={() => setSelectedPin(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {location.description && (
                        <p className="text-xs text-muted-foreground mb-2">{location.description}</p>
                      )}
                      {location.artworkId && (
                        <Button asChild size="sm" className="w-full">
                          <Link href={`/obra/${location.artworkId}`}>
                            Ver obra
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Instruções de uso */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs text-muted-foreground">
          <p>🖱️ Arraste para mover • 🔍 Scroll para zoom • Clique nos pins para informações</p>
        </div>
      </div>
    </div>
  )
}
