import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mic2, ArrowLeft, Calendar } from "lucide-react"

const entrevistas = [
  {
    id: "1",
    title: "A arte que transforma o descarte",
    artist: "Marina Santos",
    excerpt: "Conversamos com Marina sobre seu processo criativo e como os resíduos urbanos se tornam esculturas que questionam nosso consumo.",
    imageUrl: "/images/artwork-1.jpg",
    date: "Mar 2025",
  },
  {
    id: "2",
    title: "Sustentabilidade e inclusão no ateliê",
    artist: "Edu Capello",
    excerpt: "O fundador da Arca fala sobre a missão de unir arte, cultura e práticas regenerativas no território de São Roque.",
    imageUrl: "/images/artwork-3.jpg",
    date: "Fev 2025",
  },
  {
    id: "3",
    title: "Do reúso à obra: o caminho dos materiais",
    artist: "Julia Oliveira",
    excerpt: "Como materiais descartados ganham nova vida nas mãos dos artistas da galeria.",
    imageUrl: "/images/artwork-5.jpg",
    date: "Jan 2025",
  },
]

export default function EntrevistasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-secondary/15 via-background to-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <span className="tag-slant inline-block px-5 py-2 bg-secondary text-secondary-foreground text-sm font-bold tracking-[0.15em] uppercase">
              <span className="flex items-center gap-2">
                <Mic2 className="h-4 w-4" />
                Conteúdo
              </span>
            </span>
            <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
              Entrevistas
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Conversas com artistas e criadores que transformam o descartado em arte extraordinária.
            </p>
          </div>
        </div>
      </section>

      {/* Lista de entrevistas */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {entrevistas.map((item, index) => (
              <article
                key={item.id}
                className={`overflow-hidden bg-card border-2 border-border p-6 sm:p-8 transition-all hover:shadow-xl hover:border-accent ${
                  index % 2 === 0 ? "card-creative-1" : "card-creative-2"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative aspect-video sm:aspect-square sm:w-48 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="tag-slant inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-bold uppercase mb-3">
                      <span>{item.date}</span>
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      {item.artist}
                    </p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Button asChild variant="outline" className="btn-pill-right border-2">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
