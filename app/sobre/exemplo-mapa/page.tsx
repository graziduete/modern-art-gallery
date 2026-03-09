"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArcaMap } from "@/components/arca-map"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"

// Exemplo de dados do mapa com coordenadas simuladas
const exemploMapLocations = [
  {
    id: "1",
    name: "Entrada Principal",
    type: "facility" as const,
    lat: -23.5505,
    lng: -46.6333,
    description: "Recepção e informações",
  },
  {
    id: "2",
    name: "Obra: Metamorfose Urbana",
    type: "artwork" as const,
    lat: -23.5506,
    lng: -46.6334,
    artworkId: "1",
    description: "Escultura em metal reciclado",
  },
  {
    id: "3",
    name: "Área de Descanso",
    type: "leisure" as const,
    lat: -23.5504,
    lng: -46.6332,
    description: "Espaço para contemplação",
  },
  {
    id: "4",
    name: "Pé de Manga",
    type: "fruit_tree" as const,
    lat: -23.5507,
    lng: -46.6335,
    description: "Mangueira centenária",
  },
  {
    id: "5",
    name: "Obra: Reflexos do Tempo",
    type: "artwork" as const,
    lat: -23.5503,
    lng: -46.6331,
    artworkId: "2",
    description: "Instalação com espelhos",
  },
  {
    id: "6",
    name: "Banheiros",
    type: "facility" as const,
    lat: -23.5502,
    lng: -46.6330,
    description: "Instalações sanitárias",
  },
  {
    id: "7",
    name: "Pé de Jabuticaba",
    type: "fruit_tree" as const,
    lat: -23.5508,
    lng: -46.6336,
    description: "Jabuticabeira nativa",
  },
  {
    id: "8",
    name: "Obra: Fragmentos de Memória",
    type: "artwork" as const,
    lat: -23.5509,
    lng: -46.6337,
    artworkId: "3",
    description: "Colagem tridimensional",
  },
]

export default function ExemploMapaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <Link 
              href="/sobre" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Sobre a Arca
            </Link>
            
            <span className="tag-slant inline-block px-5 py-2 bg-accent text-accent-foreground text-sm font-bold tracking-[0.15em] uppercase">
              <span>Exemplo Visual</span>
            </span>
            <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
              Mapa com Planta do Sítio
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Veja como ficaria o mapa interativo usando uma planta/desenho do sítio como base.
            </p>
          </div>
        </div>
      </section>

      {/* Explicação */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-accent/10 border-2 border-accent/20 rounded-xl p-6 card-creative-1">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-accent/20">
                <Info className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  Como Funciona
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>A <strong>planta/desenho do sítio</strong> aparece como imagem de fundo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Os <strong>pins coloridos</strong> são sobrepostos nas posições reais das obras e pontos de interesse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Ao <strong>clicar em um pin</strong>, abre um popup com informações</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Os <strong>filtros</strong> permitem mostrar/ocultar tipos de pontos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>É possível <strong>dar zoom</strong> e navegar pela planta</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa Atual (OpenStreetMap) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-4">
              Mapa Atual (OpenStreetMap)
            </h2>
            <p className="text-muted-foreground">
              Atualmente usando mapa de satélite/ruas. Quando tiverem a planta, será substituído.
            </p>
          </div>

          <ArcaMap 
            locations={exemploMapLocations}
            center={[-23.5505, -46.6333]}
            zoom={16}
          />
        </div>
      </section>

      {/* Exemplo com Imagem Customizada (quando tiverem) */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-4">
              Como Ficaria com Planta Customizada
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quando tiverem o desenho/planta do sítio, o mapa ficará assim:
            </p>
          </div>

          {/* Visualização de exemplo */}
          <div className="relative w-full h-[600px] rounded-xl overflow-hidden border-2 border-border bg-muted shadow-xl">
            {/* Simulação visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
              <div className="text-center max-w-md px-4">
                <div className="mb-6">
                  <div className="inline-block p-6 rounded-xl bg-background border-2 border-border shadow-lg">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="w-16 h-16 bg-primary/20 rounded"></div>
                      <div className="w-16 h-16 bg-secondary/20 rounded"></div>
                      <div className="w-16 h-16 bg-accent/20 rounded"></div>
                      <div className="w-16 h-16 bg-muted rounded"></div>
                      <div className="w-16 h-16 bg-primary/10 rounded relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                      <div className="w-16 h-16 bg-secondary/10 rounded"></div>
                      <div className="w-16 h-16 bg-muted rounded"></div>
                      <div className="w-16 h-16 bg-accent/10 rounded relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                      <div className="w-16 h-16 bg-primary/10 rounded"></div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      [Planta do Sítio da Arca apareceria aqui]
                    </p>
                  </div>
                </div>
                
                {/* Pins de exemplo */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-foreground">Pin de Obra</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-foreground">Pin de Árvore</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-foreground">Pin de Instalação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legenda */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-background border border-border">
              <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-white shadow-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <p className="text-sm font-semibold text-foreground">Obras</p>
              <p className="text-xs text-muted-foreground mt-1">Arte exposta</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background border border-border">
              <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white shadow-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <p className="text-sm font-semibold text-foreground">Árvores</p>
              <p className="text-xs text-muted-foreground mt-1">Pés de fruta</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background border border-border">
              <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white shadow-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <p className="text-sm font-semibold text-foreground">Instalações</p>
              <p className="text-xs text-muted-foreground mt-1">Banheiros, etc</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background border border-border">
              <div className="w-10 h-10 bg-orange-500 rounded-full border-2 border-white shadow-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <p className="text-sm font-semibold text-foreground">Lazer</p>
              <p className="text-xs text-muted-foreground mt-1">Áreas de descanso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instruções */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card border-2 border-border rounded-xl p-8 card-creative-2">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              Como Implementar quando Tiverem a Planta
            </h3>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">1</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">Fazer upload da imagem</p>
                  <p>Salvar a planta/desenho como <code className="bg-muted px-1 rounded">/public/images/mapa-sitio-arca.jpg</code></p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">2</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">Definir coordenadas dos cantos</p>
                  <p>Usar GPS para marcar os 4 cantos da planta (superior esquerdo, superior direito, inferior esquerdo, inferior direito)</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">3</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">Mapear pontos de interesse</p>
                  <p>Usar GPS para marcar cada obra, árvore, instalação no sítio e adicionar no array de locations</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">4</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">Ativar modo customizado</p>
                  <p>Na página <code className="bg-muted px-1 rounded">/sobre</code>, descomentar e configurar as props do ArcaMap</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
