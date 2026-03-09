# 🛠️ Melhorias Técnicas Recomendadas

## 🎥 1. Player de Vídeo para Obras Anamórficas

### Componente Customizado

```typescript
// components/video-player.tsx
"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  showControls?: boolean
  className?: string
}

export function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = true,
  showControls = true,
  className = ""
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const changeSpeed = () => {
    if (videoRef.current) {
      const speeds = [0.5, 0.75, 1, 1.25, 1.5]
      const currentIndex = speeds.indexOf(playbackRate)
      const nextIndex = (currentIndex + 1) % speeds.length
      const nextSpeed = speeds[nextIndex]
      videoRef.current.playbackRate = nextSpeed
      setPlaybackRate(nextSpeed)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        autoPlay={autoPlay}
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {showControls && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="bg-white/90 hover:bg-white text-foreground"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="bg-white/90 hover:bg-white text-foreground"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={changeSpeed}
              className="bg-white/90 hover:bg-white text-foreground"
              title={`Velocidade: ${playbackRate}x`}
            >
              <RotateCw className="h-5 w-5" />
              <span className="ml-1 text-xs">{playbackRate}x</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="bg-white/90 hover:bg-white text-foreground"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## 📤 2. Sistema de Upload com Preview

### Componente de Upload

```typescript
// components/upload-media.tsx
"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Image as ImageIcon, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface UploadMediaProps {
  onUpload: (files: File[]) => Promise<void>
  maxFiles?: number
  accept?: Record<string, string[]>
}

export function UploadMedia({ 
  onUpload, 
  maxFiles = 10,
  accept = {
    'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    'video/*': ['.mp4', '.webm', '.mov']
  }
}: UploadMediaProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
    setFiles(newFiles)
    
    // Criar previews
    newFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreviews(prev => ({
            ...prev,
            [file.name]: reader.result as string
          }))
        }
        reader.readAsDataURL(file)
      }
    })
  }, [files, maxFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles
  })

  const removeFile = (fileName: string) => {
    setFiles(files.filter(f => f.name !== fileName))
    setPreviews(prev => {
      const newPreviews = { ...prev }
      delete newPreviews[fileName]
      return newPreviews
    })
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    
    setUploading(true)
    try {
      await onUpload(files)
      setFiles([])
      setPreviews({})
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors
          ${isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
        </p>
        <p className="text-sm text-muted-foreground">
          Imagens (JPG, PNG, WebP) e Vídeos (MP4, WebM, MOV)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file) => (
              <div key={file.name} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted border-2 border-border">
                  {previews[file.name] ? (
                    <Image
                      src={previews[file.name]}
                      alt={file.name}
                      fill
                      className="object-cover"
                    />
                  ) : file.type.startsWith('video/') ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="mt-2 text-xs text-muted-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ))}
          </div>
          
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? 'Enviando...' : `Enviar ${files.length} arquivo(s)`}
          </Button>
        </div>
      )}
    </div>
  )
}
```

---

## 🗺️ 3. Mapa Interativo da Arca

### Componente do Mapa

```typescript
// components/arca-map.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Artwork, TreePine, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapLocation {
  id: string
  name: string
  type: 'artwork' | 'installation' | 'leisure' | 'fruit_tree' | 'facility'
  lat: number
  lng: number
  artworkId?: string
  description?: string
}

interface ArcaMapProps {
  locations: MapLocation[]
  onLocationClick?: (location: MapLocation) => void
}

export function ArcaMap({ locations, onLocationClick }: ArcaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  useEffect(() => {
    // Inicializar Leaflet aqui
    // import('leaflet').then(L => { ... })
  }, [])

  const getIcon = (type: MapLocation['type']) => {
    switch (type) {
      case 'artwork':
        return <Artwork className="h-5 w-5" />
      case 'fruit_tree':
        return <TreePine className="h-5 w-5" />
      case 'facility':
        return <UtensilsCrossed className="h-5 w-5" />
      default:
        return <MapPin className="h-5 w-5" />
    }
  }

  const filteredLocations = selectedType
    ? locations.filter(loc => loc.type === selectedType)
    : locations

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedType === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType(null)}
        >
          Todos
        </Button>
        <Button
          variant={selectedType === 'artwork' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType('artwork')}
        >
          <Artwork className="h-4 w-4 mr-2" />
          Obras
        </Button>
        <Button
          variant={selectedType === 'facility' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType('facility')}
        >
          <UtensilsCrossed className="h-4 w-4 mr-2" />
          Instalações
        </Button>
        <Button
          variant={selectedType === 'fruit_tree' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType('fruit_tree')}
        >
          <TreePine className="h-4 w-4 mr-2" />
          Frutas
        </Button>
      </div>

      {/* Mapa */}
      <div 
        ref={mapRef} 
        className="w-full h-[600px] rounded-lg border-2 border-border bg-muted"
      >
        {/* Leaflet map será renderizado aqui */}
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          Mapa será renderizado aqui
        </div>
      </div>

      {/* Lista de locais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map(location => (
          <button
            key={location.id}
            onClick={() => onLocationClick?.(location)}
            className="text-left p-4 rounded-lg border-2 border-border hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              {getIcon(location.type)}
              <h3 className="font-semibold">{location.name}</h3>
            </div>
            {location.description && (
              <p className="text-sm text-muted-foreground">{location.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
```

---

## 🔍 4. Busca Funcional com Supabase

### Hook de Busca

```typescript
// hooks/use-search.ts
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function useSearch(query: string) {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchArtworks = async () => {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('artworks')
        .select('*, artists(*)')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('status', 'active')
        .limit(20)

      if (error) {
        console.error('Erro na busca:', error)
      } else {
        setResults(data || [])
      }
      
      setLoading(false)
    }

    const debounceTimer = setTimeout(searchArtworks, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  return { results, loading }
}
```

---

## 📱 5. PWA para Upload Mobile

### Manifest e Service Worker

```json
// public/manifest.json
{
  "name": "Arca - Upload de Obras",
  "short_name": "Arca Upload",
  "description": "Upload rápido de fotos e vídeos para a galeria Arca",
  "start_url": "/upload",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#8B5CF6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker básico

```typescript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('arca-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/galeria',
        '/upload'
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

---

## 🎯 Próximos Passos de Implementação

1. **Instalar dependências necessárias**:
   ```bash
   pnpm add @supabase/supabase-js react-dropzone leaflet
   pnpm add -D @types/leaflet
   ```

2. **Configurar variáveis de ambiente**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

3. **Criar página de upload admin**:
   - `/app/admin/upload/page.tsx`

4. **Implementar autenticação**:
   - Usar Supabase Auth
   - Proteger rotas admin

5. **Testar com dados reais**:
   - Upload de imagens
   - Upload de vídeos
   - Processamento de mídia
