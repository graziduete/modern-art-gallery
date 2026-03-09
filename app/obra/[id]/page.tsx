"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RentalModal } from "@/components/rental-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Video, 
  Tag, 
  ShoppingCart, 
  Calendar, 
  Instagram,
  Ruler,
  Palette,
  Eye
} from "lucide-react"

// Mock data - in a real app this would come from a database
const artworksData: Record<string, {
  id: string
  title: string
  artist: string
  description: string
  materials: string
  dimensions: string
  isAnamorphic: boolean
  hasVideo: boolean
  isRentable: boolean
  isForSale: boolean
  price?: string
  images: string[]
  videoUrl?: string
}> = {
  "1": {
    id: "1",
    title: "Metamorfose Urbana",
    artist: "Marina Santos",
    description: "Uma exploração visual da transformação constante das cidades. Esta escultura é composta inteiramente de materiais recolhidos nas ruas de São Paulo - peças de metal descartadas, fragmentos de sinalização urbana e restos de construção civil. A obra convida o espectador a reconsiderar o que chamamos de lixo e a beleza escondida nos restos da vida urbana.",
    materials: "Metal reciclado, sinalização descartada, concreto, vidro reutilizado",
    dimensions: "180 x 120 x 90 cm",
    isAnamorphic: true,
    hasVideo: true,
    isRentable: true,
    isForSale: true,
    price: "R$ 15.000",
    images: ["/images/artwork-1.jpg", "/images/artwork-2.jpg", "/images/artwork-3.jpg", "/images/artwork-4.jpg"],
    videoUrl: "https://example.com/video",
  },
  "2": {
    id: "2",
    title: "Reflexos do Tempo",
    artist: "Carlos Mendes",
    description: "Uma instalação que utiliza espelhos recuperados de edifícios demolidos para criar um jogo de reflexos que representa a passagem do tempo. Cada espelho carrega a história de seu local de origem, criando camadas de memória visual.",
    materials: "Espelhos antigos, estrutura de madeira de demolição, LED",
    dimensions: "200 x 150 x 100 cm",
    isAnamorphic: false,
    hasVideo: false,
    isRentable: true,
    isForSale: false,
    images: ["/images/artwork-2.jpg", "/images/artwork-5.jpg", "/images/artwork-6.jpg"],
  },
  "3": {
    id: "3",
    title: "Fragmentos de Memoria",
    artist: "Julia Oliveira",
    description: "Uma colagem tridimensional que incorpora fotografias antigas resgatadas de bazares e brechós, criando uma narrativa visual sobre memórias coletivas e a passagem do tempo.",
    materials: "Fotografias vintage, madeira reciclada, resina, tecido",
    dimensions: "150 x 100 x 30 cm",
    isAnamorphic: false,
    hasVideo: true,
    isRentable: false,
    isForSale: true,
    price: "R$ 8.500",
    images: ["/images/artwork-3.jpg", "/images/artwork-7.jpg", "/images/artwork-8.jpg"],
  },
  // Mobiliário In-Comodo
  "f1": {
    id: "f1",
    title: "Poltrona Aurora",
    artist: "Estudio Arca",
    description: "Poltrona que une conforto e design sustentável. Criada a partir de madeira de demolição e estrutura metálica reutilizada, a Aurora transforma materiais descartados em um assento que dialoga com a luz e o espaço.",
    materials: "Madeira de demolição, estrutura metálica reciclada, tecido de reúso",
    dimensions: "85 x 95 x 75 cm",
    isAnamorphic: false,
    hasVideo: true,
    isRentable: true,
    isForSale: true,
    price: "R$ 4.200",
    images: ["/images/furniture-1.jpg"],
  },
  "f2": {
    id: "f2",
    title: "Mesa Horizonte",
    artist: "Carlos Mendes",
    description: "Mesa de centro que evoca a linha do horizonte. O tampo em madeira maciça de reaproveitamento repousa sobre base em ferro recuperado, criando um diálogo entre rusticidade e contemporaneidade.",
    materials: "Madeira de demolição, ferro reciclado",
    dimensions: "120 x 60 x 45 cm",
    isAnamorphic: false,
    hasVideo: false,
    isRentable: true,
    isForSale: false,
    images: ["/images/furniture-2.jpg"],
  },
  "f3": {
    id: "f3",
    title: "Luminária Cosmos",
    artist: "Julia Oliveira",
    description: "Pendente que recria o cosmo em materiais terrestres. Vidros e metais descartados compõem uma peça de iluminação que transforma qualquer ambiente em uma experiência sensorial única.",
    materials: "Vidro reciclado, metal de reúso, fiação reaproveitada",
    dimensions: "40 x 40 x 80 cm",
    isAnamorphic: false,
    hasVideo: true,
    isRentable: true,
    isForSale: true,
    price: "R$ 2.800",
    images: ["/images/furniture-3.jpg"],
  },
  "f4": {
    id: "f4",
    title: "Estante Fragmentos",
    artist: "Marina Santos",
    description: "Estante modular feita de portas e janelas recuperadas de demolições. Cada prateleira carrega a história de seu material de origem, oferecendo um armazenamento que é também uma obra de arte.",
    materials: "Portas e janelas de demolição, madeira reaproveitada",
    dimensions: "180 x 90 x 40 cm",
    isAnamorphic: false,
    hasVideo: false,
    isRentable: false,
    isForSale: true,
    price: "R$ 6.500",
    images: ["/images/furniture-4.jpg"],
  },
  "f5": {
    id: "f5",
    title: "Banco Raízes",
    artist: "Pedro Almeida",
    description: "Banco escultural que evoca as raízes das árvores. Criado a partir de troncos e ramos descartados, combinados com elementos metálicos de reúso, é uma peça que conecta natureza e design.",
    materials: "Madeira de raízes e troncos, metal reciclado",
    dimensions: "45 x 100 x 45 cm",
    isAnamorphic: false,
    hasVideo: true,
    isRentable: true,
    isForSale: true,
    price: "R$ 3.900",
    images: ["/images/furniture-1.jpg"],
  },
  "f6": {
    id: "f6",
    title: "Aparador Metamorfose",
    artist: "Fernanda Dias",
    description: "Aparador que nasce da transformação. Portas antigas, gavetas de máquinas de costura e ferragens recuperadas se encontram em uma peça única de armazenamento e exibição.",
    materials: "Portas antigas, madeira de reúso, ferragens recuperadas",
    dimensions: "140 x 85 x 45 cm",
    isAnamorphic: false,
    hasVideo: false,
    isRentable: true,
    isForSale: false,
    images: ["/images/furniture-2.jpg"],
  },
  "f7": {
    id: "f7",
    title: "Pendente Constelação",
    artist: "Roberto Lima",
    description: "Luminária pendente que sugere uma constelação suspensa. Fragmentos de vidro e metal em tons escuros criam um jogo de luz e sombra, iluminando com poesia qualquer ambiente.",
    materials: "Vidro reciclado, metal negro de reúso, cabo reaproveitado",
    dimensions: "35 x 35 x 95 cm",
    isAnamorphic: false,
    hasVideo: true,
    isRentable: false,
    isForSale: true,
    price: "R$ 3.200",
    images: ["/images/furniture-3.jpg"],
  },
  "f8": {
    id: "f8",
    title: "Mesa de Centro Ciclos",
    artist: "Ana Beatriz Costa",
    description: "Mesa de centro que celebra os ciclos da matéria. O tampo em madeira resinada incorpora fragmentos de materiais diversos, criando uma superfície que conta histórias de transformação e reúso.",
    materials: "Madeira de reúso, resina epóxi, metais recuperados",
    dimensions: "110 x 55 x 42 cm",
    isAnamorphic: false,
    hasVideo: false,
    isRentable: true,
    isForSale: true,
    price: "R$ 5.400",
    images: ["/images/furniture-4.jpg"],
  },
}

// Default artwork for IDs not in our mock data
const defaultArtwork = {
  id: "default",
  title: "Obra da Galeria",
  artist: "Artista Arca",
  description: "Uma obra única criada com materiais sustentáveis, representando a visão da galeria Arca de transformar o descartado em arte extraordinária.",
  materials: "Materiais reciclados diversos",
  dimensions: "Dimensões variáveis",
  isAnamorphic: false,
  hasVideo: false,
  isRentable: true,
  isForSale: true,
  images: ["/images/artwork-1.jpg"],
}

export default function ArtworkPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const artwork = artworksData[id] || { ...defaultArtwork, id }
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 py-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted">
                <Image
                  src={artwork.images[selectedImage] || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  priority
                />
                {artwork.hasVideo && selectedImage === artwork.images.length - 1 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-accent/50">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <Video className="h-8 w-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {artwork.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? "border-primary" 
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${artwork.title} - imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
                {artwork.hasVideo && (
                  <button
                    onClick={() => setSelectedImage(artwork.images.length - 1)}
                    className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-muted-foreground/50 bg-accent flex items-center justify-center"
                  >
                    <Video className="h-6 w-6 text-accent-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Artwork Info */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {artwork.hasVideo && (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    <Video className="h-3 w-3 mr-1" />
                    Vídeo
                  </Badge>
                )}
                {artwork.isRentable && (
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    <Tag className="h-3 w-3 mr-1" />
                    Alugável
                  </Badge>
                )}
                {artwork.isForSale && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    A venda
                  </Badge>
                )}
                {artwork.isAnamorphic && (
                  <Badge variant="outline" className="border-primary text-primary">
                    <Eye className="h-3 w-3 mr-1" />
                    Anamorfica
                  </Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {artwork.title}
              </h1>
              <p className="mt-2 text-xl text-muted-foreground">
                por {artwork.artist}
              </p>

              {artwork.price && (
                <p className="mt-4 text-2xl font-semibold text-primary">
                  {artwork.price}
                </p>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {artwork.isRentable && (
                  <Button 
                    onClick={() => setIsRentalModalOpen(true)}
                    className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Solicitar aluguel
                  </Button>
                )}
                {artwork.isForSale && (
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {artwork.price ? "Comprar" : "Solicitar orcamento"}
                  </Button>
                )}
              </div>

              <Button 
                variant="outline" 
                className="mt-4 w-full bg-transparent"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 mr-2" />
                  Ver no Instagram
                </a>
              </Button>

              {/* Description */}
              <div className="mt-10 pt-8 border-t border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Sobre a obra
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Details */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Palette className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Materiais</p>
                    <p className="text-sm text-muted-foreground">{artwork.materials}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Dimensoes</p>
                    <p className="text-sm text-muted-foreground">{artwork.dimensions}</p>
                  </div>
                </div>
                {artwork.isAnamorphic && (
                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Obra Anamórfica</p>
                      <p className="text-sm text-muted-foreground">
                        Esta obra muda de aparência conforme o ângulo de visão do observador.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Rental Modal */}
      <RentalModal
        isOpen={isRentalModalOpen}
        onClose={() => setIsRentalModalOpen(false)}
        artworkTitle={artwork.title}
      />
    </main>
  )
}
