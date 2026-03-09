"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Palette, TreePine, UtensilsCrossed, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MapLocation {
  id: string
  name: string
  type: "artwork" | "installation" | "leisure" | "fruit_tree" | "facility"
  lat: number
  lng: number
  artworkId?: string
  description?: string
}

interface ArcaMapProps {
  locations: MapLocation[]
  center?: [number, number]
  zoom?: number
  useCustomImage?: boolean // Se true, usa imagem customizada em vez de mapa
  imageUrl?: string // URL da imagem do desenho/planta
  imageBounds?: [[number, number], [number, number]] // Coordenadas dos cantos da imagem
}

// Componente do mapa que só renderiza no cliente
function MapComponent({ 
  locations, 
  center, 
  zoom, 
  selectedType,
  useCustomImage = false,
  imageUrl,
  imageBounds
}: ArcaMapProps & { selectedType: string | null }) {
  const [MapContainer, setMapContainer] = useState<any>(null)
  const [TileLayer, setTileLayer] = useState<any>(null)
  const [ImageOverlay, setImageOverlay] = useState<any>(null)
  const [Marker, setMarker] = useState<any>(null)
  const [Popup, setPopup] = useState<any>(null)
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    // Carregar Leaflet apenas no cliente
    import("leaflet").then((leaflet) => {
      setL(leaflet.default)
      
      // Fix para ícones do Leaflet
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })
    })

    import("react-leaflet").then((rl) => {
      setMapContainer(() => rl.MapContainer)
      setTileLayer(() => rl.TileLayer)
      setImageOverlay(() => rl.ImageOverlay)
      setMarker(() => rl.Marker)
      setPopup(() => rl.Popup)
    })

    // Importar CSS
    import("leaflet/dist/leaflet.css")
  }, [])

  const filteredLocations = selectedType
    ? locations.filter(loc => loc.type === selectedType)
    : locations

  if (!MapContainer || !Marker || !Popup || !L) {
    return (
      <div className="w-full h-[600px] rounded-xl overflow-hidden border-2 border-border bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Carregando mapa...</p>
      </div>
    )
  }

  // Criar ícones customizados
  const createCustomIcon = (type: MapLocation["type"]) => {
    const colors = {
      artwork: "#8B5CF6",
      installation: "#10B981",
      leisure: "#F59E0B",
      fruit_tree: "#22C55E",
      facility: "#3B82F6",
    }
    
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background-color: ${colors[type]};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })
  }

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border-2 border-border shadow-xl">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        scrollWheelZoom={true}
        bounds={useCustomImage && imageBounds ? imageBounds : undefined}
      >
        {/* Se usar imagem customizada, mostra a planta/desenho */}
        {useCustomImage && imageBounds && ImageOverlay ? (
          <ImageOverlay
            url={imageUrl || "/images/mapa-sitio-arca-placeholder.svg"}
            bounds={imageBounds}
            opacity={imageUrl ? 1 : 0.9}
          />
        ) : (
          /* Senão, usa mapa do OpenStreetMap */
          TileLayer && (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )
        )}
        
        {/* Marcadores (pins) - funcionam igual em ambos os casos */}
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.type)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-foreground mb-1">{location.name}</h3>
                {location.description && (
                  <p className="text-sm text-muted-foreground mb-2">{location.description}</p>
                )}
                {location.artworkId && (
                  <Button asChild size="sm" className="w-full mt-2">
                    <Link href={`/obra/${location.artworkId}`}>
                      Ver obra
                    </Link>
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export function ArcaMap({ 
  locations, 
  center = [-23.5505, -46.6333], 
  zoom = 16,
  useCustomImage = false,
  imageUrl,
  imageBounds
}: ArcaMapProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const types = [
    { value: "artwork", label: "Obras", icon: Palette, count: locations.filter(l => l.type === "artwork").length },
    { value: "facility", label: "Instalações", icon: UtensilsCrossed, count: locations.filter(l => l.type === "facility").length },
    { value: "fruit_tree", label: "Árvores", icon: TreePine, count: locations.filter(l => l.type === "fruit_tree").length },
    { value: "leisure", label: "Lazer", icon: Navigation, count: locations.filter(l => l.type === "leisure").length },
  ]

  if (!isClient) {
    return (
      <div className="w-full h-[600px] rounded-xl overflow-hidden border-2 border-border bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Carregando mapa...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant={selectedType === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType(null)}
          className="gap-2"
        >
          Todos ({locations.length})
        </Button>
        {types.map((type) => (
          <Button
            key={type.value}
            variant={selectedType === type.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(selectedType === type.value ? null : type.value)}
            className="gap-2"
          >
            <type.icon className="h-4 w-4" />
            {type.label} ({type.count})
          </Button>
        ))}
      </div>

      {/* Mapa */}
      <MapComponent 
        locations={locations}
        center={center}
        zoom={zoom}
        selectedType={selectedType}
        useCustomImage={useCustomImage}
        imageUrl={imageUrl}
        imageBounds={imageBounds}
      />

      {/* Nota sobre atualização futura */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          💡 Quando tiverem o desenho/planta do sítio, podemos substituir o mapa base por uma imagem customizada
        </p>
      </div>
    </div>
  )
}
