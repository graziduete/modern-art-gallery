import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  ArrowRight, 
  Building2, 
  PartyPopper, 
  Camera, 
  Briefcase,
  CheckCircle2,
  MessageCircle,
  Sparkles
} from "lucide-react"

const eventTypes = [
  {
    icon: Building2,
    title: "Corporativo",
    description: "Transforme seu escritório ou evento empresarial em uma galeria de arte sustentável.",
  },
  {
    icon: PartyPopper,
    title: "Festas & Eventos",
    description: "Casamentos, aniversários e celebrações com peças únicas que impressionam.",
  },
  {
    icon: Camera,
    title: "Produções",
    description: "Cenografia para filmes, comerciais, ensaios fotográficos e produções audiovisuais.",
  },
  {
    icon: Briefcase,
    title: "Exposições",
    description: "Monte sua própria exposição temporária com curadoria personalizada.",
  },
]

const benefits = [
  "Curadoria personalizada para cada evento",
  "Entrega, montagem e desmontagem inclusa",
  "Seguro completo das obras",
  "Assessoria de ambientação",
  "Preços especiais para eventos recorrentes",
  "Obras exclusivas disponíveis",
]

const featuredRentals = [
  {
    id: "1",
    title: "Metamorfose Urbana",
    artist: "Marina Santos",
    imageUrl: "/images/artwork-1.jpg",
    pricePerDay: "R$ 350/dia",
  },
  {
    id: "4",
    title: "Ecossistema Suspenso",
    artist: "Roberto Lima",
    imageUrl: "/images/artwork-4.jpg",
    pricePerDay: "R$ 500/dia",
  },
  {
    id: "f3",
    title: "Luminária Cosmos",
    artist: "Julia Oliveira",
    imageUrl: "/images/furniture-3.jpg",
    pricePerDay: "R$ 180/dia",
  },
  {
    id: "f1",
    title: "Poltrona Aurora",
    artist: "Estudio Arca",
    imageUrl: "/images/furniture-1.jpg",
    pricePerDay: "R$ 220/dia",
  },
]

export default function AluguelPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 shape-organic bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 shape-organic bg-primary/5 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="py-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <span className="tag-slant inline-block px-5 py-2 bg-primary text-primary-foreground text-sm font-bold tracking-[0.15em] uppercase">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Para Eventos
                </span>
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
                Aluguel de<br />Obras
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Leve arte sustentável para seu evento. Obras e mobiliário artístico disponíveis para aluguel temporário.
              </p>
            </div>
            <Button asChild className="btn-blob bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-bold">
              <a href="#solicitar">
                Solicitar orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="tag-slant inline-block px-5 py-2 bg-muted text-muted-foreground text-sm font-bold tracking-[0.15em] uppercase mb-4">
              <span>Tipos de Evento</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-foreground tracking-tight">
              Para todas as ocasiões
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((event, index) => (
              <div 
                key={event.title}
                className={`p-6 bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  index % 2 === 0 ? "card-creative-1" : "card-creative-2"
                }`}
              >
                <div className="w-14 h-14 shape-organic bg-primary/10 flex items-center justify-center mb-4">
                  <event.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rentals */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="tag-slant inline-block px-5 py-2 bg-accent text-accent-foreground text-sm font-bold tracking-[0.15em] uppercase">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Destaques
                </span>
              </span>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                Peças disponíveis
              </h2>
            </div>
            <Button asChild variant="outline" className="btn-blob border-2 border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent px-6">
              <Link href="/galeria?status=rentable">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRentals.map((item, index) => (
              <Link key={item.id} href={`/obra/${item.id}`} className="group block">
                <article className={`overflow-hidden bg-card border-2 border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent ${
                  index % 2 === 0 ? "card-creative-1" : "card-creative-2"
                }`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="btn-pill-left bg-primary/90 backdrop-blur-sm px-4 py-2 text-sm font-bold text-primary-foreground">
                        {item.pricePerDay}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-card-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.artist}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="tag-slant inline-block px-5 py-2 bg-secondary text-secondary-foreground text-sm font-bold tracking-[0.15em] uppercase">
                <span>Vantagens</span>
              </span>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                Por que alugar<br />com a Arca?
              </h2>
              <div className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-6 h-6 shrink-0 flex items-center justify-center ${
                      index % 2 === 0 ? "btn-pill-left" : "btn-pill-right"
                    } bg-accent/20`}>
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="card-creative-1 overflow-hidden border-2 border-border">
                <Image
                  src="/images/aluguel-evento-arca.png"
                  alt="Fachada da Galeria Arca à noite - evento com público"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 p-6 bg-primary card-creative-2 text-primary-foreground">
                <div className="text-4xl font-black">50+</div>
                <div className="text-sm font-medium opacity-80">eventos realizados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="solicitar" className="py-16 bg-gradient-to-r from-accent via-accent to-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-accent-foreground">
          <h2 className="font-serif text-4xl sm:text-5xl font-black">
            Vamos criar algo<br />incrível juntos?
          </h2>
          <p className="mt-6 text-lg opacity-90 max-w-xl mx-auto">
            Entre em contato para solicitar um orçamento personalizado para seu evento. Responderemos em até 24h.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-blob bg-background text-foreground hover:bg-background/90 px-8 py-6 text-lg font-bold">
              <a href="mailto:aluguel@arca.art">
                <MessageCircle className="mr-2 h-5 w-5" />
                Solicitar orçamento
              </a>
            </Button>
            <Button asChild variant="outline" className="btn-pill-right border-2 border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 px-8 py-6 text-lg font-bold bg-transparent">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
