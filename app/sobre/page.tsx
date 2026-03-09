"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { InteractiveSiteMap } from "@/components/interactive-site-map"
import Link from "next/link"

// Dados do mapa - Pins com coordenadas em pixels (relativas à imagem)
// Coordenadas X e Y são em pixels da imagem original (1400x1000)
// Para adicionar novos pins: clique na imagem e anote as coordenadas
const mapLocations = [
  // Casa Principal (canto superior esquerdo)
  {
    id: "1",
    name: "Casa Principal",
    type: "facility" as const,
    x: 290, // Coordenada X em pixels
    y: 220, // Coordenada Y em pixels
    description: "Recepção e ponto de informações",
  },
  {
    id: "2",
    name: "Obra: Metamorfose Urbana",
    type: "artwork" as const,
    x: 350,
    y: 250,
    artworkId: "1",
    description: "Escultura em metal reciclado - Exposição na casa",
  },
  
  // Estacionamento (canto superior direito)
  {
    id: "3",
    name: "Estacionamento Setor 1",
    type: "facility" as const,
    x: 610,
    y: 160,
    description: "Vagas para visitantes",
  },
  {
    id: "4",
    name: "Estacionamento Setor 2",
    type: "facility" as const,
    x: 760,
    y: 160,
    description: "Vagas para visitantes",
  },
  
  // Área de Shows (centro esquerdo)
  {
    id: "5",
    name: "Área de Shows",
    type: "leisure" as const,
    x: 300,
    y: 500,
    description: "Palco e espaço para apresentações",
  },
  {
    id: "6",
    name: "Obra: Reflexos do Tempo",
    type: "artwork" as const,
    x: 320,
    y: 480,
    artworkId: "2",
    description: "Instalação com espelhos - Área de shows",
  },
  
  // Ateliê (centro direito)
  {
    id: "7",
    name: "Ateliê",
    type: "facility" as const,
    x: 1000,
    y: 500,
    description: "Espaço de criação e produção",
  },
  {
    id: "8",
    name: "Obra: Fragmentos de Memória",
    type: "artwork" as const,
    x: 1050,
    y: 535,
    artworkId: "3",
    description: "Colagem tridimensional - Exposição no ateliê",
  },
  
  // Piscina (centro inferior)
  {
    id: "9",
    name: "Piscina",
    type: "leisure" as const,
    x: 700,
    y: 750,
    description: "Área de lazer e relaxamento",
  },
  {
    id: "10",
    name: "Obra: Ecossistema Suspenso",
    type: "artwork" as const,
    x: 680,
    y: 730,
    artworkId: "4",
    description: "Instalação suspensa - Próximo à piscina",
  },
  
  // Espaço Vivência (canto inferior esquerdo)
  {
    id: "11",
    name: "Espaço Vivência",
    type: "leisure" as const,
    x: 270,
    y: 820,
    description: "Área de convivência e descanso",
  },
  {
    id: "12",
    name: "Pé de Manga",
    type: "fruit_tree" as const,
    x: 180,
    y: 820,
    description: "Mangueira centenária - Espaço vivência",
  },
  {
    id: "13",
    name: "Pé de Jabuticaba",
    type: "fruit_tree" as const,
    x: 380,
    y: 840,
    description: "Jabuticabeira nativa",
  },
]

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <span className="tag-slant inline-block px-5 py-2 bg-accent text-accent-foreground text-sm font-bold tracking-[0.15em] uppercase">
              <span>Institucional</span>
            </span>
            <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
              Sobre a Arca
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Um espaço único onde arte, sustentabilidade e natureza se encontram. Conheça nossa história e explore nosso sítio.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre a Arca - Texto */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-xl font-medium text-foreground">
                A <strong className="text-accent">Arca Ateliê Rural</strong> é uma galeria de arte upcycling única, 
                localizada em um sítio que respira sustentabilidade e criatividade.
              </p>
              
              <p>
                Nossa missão é transformar o que muitos consideram lixo em obras de arte extraordinárias, 
                criando um diálogo entre o descartado e o valorizado, entre o passado e o presente.
              </p>
              
              <p>
                Cada obra em nossa galeria conta uma história de transformação. Materiais que foram descartados 
                ganham nova vida através do olhar criativo de nossos artistas, resultando em peças únicas que 
                desafiam perspectivas e inspiram reflexão sobre consumo e sustentabilidade.
              </p>
              
              <p>
                O sítio da Arca não é apenas um espaço de exposição, mas um ecossistema vivo onde arte e natureza 
                coexistem harmoniosamente. Visitantes podem explorar obras ao ar livre, relaxar em áreas de descanso, 
                e até mesmo colher frutas de nossas árvores centenárias.
              </p>
              
              <p className="text-foreground font-medium">
                Venha nos visitar e vivenciar essa experiência única de arte sustentável.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Button asChild className="btn-blob bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6">
                <Link href="/galeria">
                  Explorar Galeria
                </Link>
              </Button>
              <Button
                variant="outline"
                className="btn-pill-right border-2 px-8 py-6"
                onClick={() => window.dispatchEvent(new CustomEvent("abrir-fale-conosco"))}
              >
                Entre em Contato
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa do Sítio */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="tag-slant inline-block px-5 py-2 bg-secondary text-secondary-foreground text-sm font-bold tracking-[0.15em] uppercase mb-4">
              <span>Explorar</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-foreground tracking-tight">
              Mapa do Sítio
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Navegue pelo nosso espaço e descubra onde cada obra está localizada
            </p>
          </div>

          {/* Mapa Interativo com Planta Customizada */}
          <InteractiveSiteMap 
            imageUrl="/images/mapa-sitio-arca.svg"
            locations={mapLocations}
            imageWidth={1400}
            imageHeight={1000}
          />
          
          {/* Nota para apresentação */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground italic">
              * Mapa interativo com pins posicionados. Use zoom e arraste para navegar. Clique nos pins para ver informações.
            </p>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-serif text-5xl sm:text-6xl font-black text-accent">150+</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Obras
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-5xl sm:text-6xl font-black text-accent">40+</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Artistas
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-5xl sm:text-6xl font-black text-accent">8</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Anos
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-5xl sm:text-6xl font-black text-accent">100%</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Sustentável
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
