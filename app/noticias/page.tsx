import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Newspaper, ArrowLeft, Calendar } from "lucide-react"

const noticias = [
  {
    id: "1",
    title: "Sustentáculo 2025: arte, sustentabilidade e inclusão em São Roque",
    excerpt: "O evento reuniu mais de 700 visitantes e mostrou que transformação nasce do reúso criativo e da colaboração.",
    imageUrl: "/images/artwork-4.jpg",
    date: "Nov 2025",
  },
  {
    id: "2",
    title: "ARCA inaugura espaço de formação em comunicação inclusiva",
    excerpt: "Parceria com Integra Diversidade leva formação em DEIP para empresas e comunidades no território.",
    imageUrl: "/images/artwork-6.jpg",
    date: "Out 2025",
  },
  {
    id: "3",
    title: "Galeria construída com portas e janelas de demolição",
    excerpt: "Materiais doados pelo Hotel Villa Rossa ganham nova vida no espaço de exposições da Arca.",
    imageUrl: "/images/artwork-2.jpg",
    date: "Set 2025",
  },
]

export default function NoticiasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <span className="tag-slant inline-block px-5 py-2 bg-primary text-primary-foreground text-sm font-bold tracking-[0.15em] uppercase">
              <span className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                Conteúdo
              </span>
            </span>
            <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
              Notícias
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Acompanhe os acontecimentos, eventos e novidades da Galeria Arca.
            </p>
          </div>
        </div>
      </section>

      {/* Lista de notícias */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {noticias.map((item, index) => (
              <article
                key={item.id}
                className={`overflow-hidden bg-card border-2 border-border p-6 sm:p-8 transition-all hover:shadow-xl hover:border-primary ${
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
                    <span className="tag-slant inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                      {item.title}
                    </h2>
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
