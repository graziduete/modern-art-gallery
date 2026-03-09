import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight, Instagram, Globe, Palette, Sparkles } from "lucide-react"

// Mock data for artists
const artists = [
  {
    id: "a1",
    name: "Marina Santos",
    specialty: "Escultura & Instalacao",
    bio: "Artista plastica especializada em transformar residuos industriais em esculturas monumentais.",
    imageUrl: "/images/artwork-1.jpg",
    worksCount: 12,
    instagram: "@marina.santos.art",
    website: "marinasantos.art",
  },
  {
    id: "a2",
    name: "Carlos Mendes",
    specialty: "Mixed Media",
    bio: "Criador de obras que mesclam tecnicas tradicionais com materiais reciclados urbanos.",
    imageUrl: "/images/artwork-2.jpg",
    worksCount: 8,
    instagram: "@carlosmendes",
  },
  {
    id: "a3",
    name: "Julia Oliveira",
    specialty: "Instalacao Interativa",
    bio: "Suas obras convidam o espectador a participar ativamente da experiencia artistica.",
    imageUrl: "/images/artwork-3.jpg",
    worksCount: 15,
    instagram: "@juliaoliveira.art",
    website: "juliaoliveira.com",
  },
  {
    id: "a4",
    name: "Roberto Lima",
    specialty: "Arte Suspensa",
    bio: "Especialista em instalacoes aereas que desafiam a gravidade e a percepcao.",
    imageUrl: "/images/artwork-4.jpg",
    worksCount: 6,
    instagram: "@robertolima",
  },
  {
    id: "a5",
    name: "Ana Beatriz Costa",
    specialty: "Pintura Anamórfica",
    bio: "Cria obras que se transformam completamente dependendo do angulo de visao.",
    imageUrl: "/images/artwork-5.jpg",
    worksCount: 10,
    instagram: "@anabeatriz.costa",
    website: "anabeatrizcosta.art",
  },
  {
    id: "a6",
    name: "Pedro Almeida",
    specialty: "Textile Art",
    bio: "Transforma tecidos descartados em tapeçarias e instalacoes texturais.",
    imageUrl: "/images/artwork-6.jpg",
    worksCount: 9,
    instagram: "@pedroalmeida.art",
  },
  {
    id: "a7",
    name: "Fernanda Dias",
    specialty: "Escultura Organica",
    bio: "Suas pecas celebram a conexao entre natureza e materiais reaproveitados.",
    imageUrl: "/images/artwork-7.jpg",
    worksCount: 11,
    instagram: "@fernandadias",
    website: "fernandadias.art",
  },
  {
    id: "a8",
    name: "Lucas Ferreira",
    specialty: "Light Art",
    bio: "Cria instalacoes luminosas usando materiais reciclados e LEDs sustentaveis.",
    imageUrl: "/images/artwork-8.jpg",
    worksCount: 7,
    instagram: "@lucasferreira.light",
  },
]

export default function ArtistasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-accent/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <span className="tag-slant inline-block px-5 py-2 bg-accent text-accent-foreground text-sm font-bold tracking-[0.15em] uppercase">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Criadores
                </span>
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
                Artistas
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Conheca os visionarios por tras das obras. Artistas que transformam o descartado em extraordinario.
              </p>
            </div>
            <Button asChild className="btn-blob bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-bold">
              <Link href="/contato">
                Quero ser artista
                <Palette className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="mb-12 flex flex-wrap gap-4">
            <div className="tag-slant inline-block px-5 py-2 bg-muted text-muted-foreground text-sm font-bold">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {artists.length} artistas parceiros
              </span>
            </div>
            <div className="tag-slant inline-block px-5 py-2 bg-accent/10 text-accent text-sm font-bold">
              <span className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                {artists.reduce((acc, a) => acc + a.worksCount, 0)}+ obras criadas
              </span>
            </div>
          </div>

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists.map((artist, index) => (
              <Link key={artist.id} href={`/artistas/${artist.id}`} className="group block">
                <article className={`overflow-hidden bg-card border-2 border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent ${
                  index % 2 === 0 ? "card-creative-1" : "card-creative-2"
                }`}>
                  {/* Artist Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={artist.imageUrl || "/placeholder.svg"}
                      alt={artist.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                    
                    {/* Works count badge */}
                    <div className="absolute top-3 right-3">
                      <span className="shape-organic bg-background/90 backdrop-blur-sm px-3 py-2 text-xs font-bold text-foreground">
                        {artist.worksCount} obras
                      </span>
                    </div>
                    
                    {/* Name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-xl font-black text-background">
                        {artist.name}
                      </h3>
                      <span className="tag-slant inline-block mt-2 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold">
                        <span>{artist.specialty}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {artist.bio}
                    </p>
                    
                    {/* Social Links */}
                    <div className="mt-4 flex items-center gap-3">
                      {artist.instagram && (
                        <span className="btn-pill-left flex items-center gap-1.5 bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                          <Instagram className="h-3 w-3" />
                          {artist.instagram}
                        </span>
                      )}
                      {artist.website && (
                        <span className="flex items-center gap-1.5 text-xs text-accent">
                          <Globe className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    
                    {/* View Profile */}
                    <div className="mt-4 flex items-center text-sm font-bold text-accent group-hover:text-accent/80 transition-colors">
                      Ver perfil
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-foreground">
            Voce tambem e artista?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Envie seu portfolio e faca parte do nosso coletivo de criadores sustentaveis.
          </p>
          <Button asChild className="btn-blob mt-8 bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg font-bold">
            <Link href="/contato">
              Enviar portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
