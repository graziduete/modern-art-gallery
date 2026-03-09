import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Instagram, ShoppingBag, MessageCircle, Leaf, ArrowRight } from "lucide-react"

// Mock data for shop products
const products = [
  {
    id: "p1",
    name: "Print Metamorfose",
    description: "Impressao em papel reciclado A3",
    price: "R$ 89,00",
    imageUrl: "/images/product-1.jpg",
    category: "prints",
  },
  {
    id: "p2",
    name: "Pack Adesivos Arca",
    description: "Kit com 12 adesivos sustentaveis",
    price: "R$ 35,00",
    imageUrl: "/images/product-2.jpg",
    category: "adesivos",
  },
  {
    id: "p3",
    name: "Plaquinha Decorativa",
    description: "Peca artesanal em madeira reciclada",
    price: "R$ 120,00",
    imageUrl: "/images/product-3.jpg",
    category: "plaquinhas",
  },
  {
    id: "p4",
    name: "Ecobag Arca",
    description: "Sacola de algodao organico",
    price: "R$ 65,00",
    imageUrl: "/images/product-4.jpg",
    category: "acessorios",
  },
  {
    id: "p5",
    name: "Print Horizonte Invertido",
    description: "Impressao em papel reciclado A2",
    price: "R$ 129,00",
    imageUrl: "/images/product-1.jpg",
    category: "prints",
  },
  {
    id: "p6",
    name: "Lambe-Lambe Colecao",
    description: "Kit com 6 posters colantes",
    price: "R$ 45,00",
    imageUrl: "/images/product-2.jpg",
    category: "lambes",
  },
  {
    id: "p7",
    name: "Plaquinha Natureza",
    description: "Peca artesanal em madeira de reflorestamento",
    price: "R$ 95,00",
    imageUrl: "/images/product-3.jpg",
    category: "plaquinhas",
  },
  {
    id: "p8",
    name: "Camiseta Arca",
    description: "100% algodao organico",
    price: "R$ 89,00",
    imageUrl: "/images/product-4.jpg",
    category: "acessorios",
  },
]

export default function LojaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <span className="tag-slant inline-block px-5 py-2 bg-primary text-primary-foreground text-sm font-bold tracking-[0.15em] uppercase">
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Produtos
              </span>
            </span>
            <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
              Loja
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Leve um pedaco da Arca para casa. Prints, adesivos, plaquinhas e mais - todos feitos com materiais sustentaveis.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Instagram Notice */}
          <div className="mb-12 p-6 card-creative-1 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 shape-organic bg-primary/20 flex items-center justify-center shrink-0">
              <Instagram className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-foreground">Compras via Instagram</h3>
              <p className="mt-2 text-muted-foreground">
                Todas as compras sao realizadas atraves do nosso Instagram. Clique no botao do produto para ser direcionado ao DM.
              </p>
            </div>
            <Button asChild className="btn-blob bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-5 font-bold shrink-0">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 mr-2" />
                Seguir @arca.galeria
              </a>
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <article 
                key={product.id} 
                className={`overflow-hidden bg-card border-2 border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary group ${
                  index % 2 === 0 ? "card-creative-1" : "card-creative-2"
                }`}
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 tag-slant bg-card/90 text-card-foreground backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase">
                    <span>{product.category}</span>
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="mt-4 text-2xl font-black text-primary">
                    {product.price}
                  </p>
                  <Button 
                    asChild 
                    className="btn-pill-right mt-4 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                  >
                    <a 
                      href={`https://instagram.com/direct/t/arca.galeria?text=Ola! Tenho interesse no produto: ${product.name}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comprar no Instagram
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-accent/10 card-creative-2 text-muted-foreground">
              <Leaf className="h-5 w-5 text-accent" />
              <span className="font-medium">Todos os produtos sao feitos sob demanda com materiais sustentaveis</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
