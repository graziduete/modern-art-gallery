"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Palette, User, Mail, Phone, FileText, ArrowLeft, CheckCircle2 } from "lucide-react"

const categorias = [
  { value: "escultura", label: "Escultura" },
  { value: "pintura", label: "Pintura" },
  { value: "instalacao", label: "Instalação" },
  { value: "mixed-media", label: "Mixed Media" },
  { value: "textil", label: "Têxtil" },
  { value: "outro", label: "Outro" },
]

export default function EnvieSuaObraPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio - em produção integraria com API/email
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-24 px-4">
          <div className="mx-auto max-w-lg text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-foreground mb-4">
              Proposta enviada!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Obrigado pelo interesse em fazer parte da Arca. Nossa equipe entrará em contato em até 5 dias úteis.
            </p>
            <Button asChild className="btn-blob bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6">
              <Link href="/galeria">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar para a galeria
              </Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>

          <div className="mb-10">
            <span className="tag-slant inline-block px-5 py-2 bg-accent text-accent-foreground text-sm font-bold tracking-[0.15em] uppercase">
              <span className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Seja um artista
              </span>
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-black text-foreground tracking-tight">
              Envie sua obra
            </h1>
            <p className="mt-4 text-muted-foreground">
              Proponha sua criação para a galeria. Trabalhamos com arte sustentável e upcycling.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card border-2 border-border card-creative-1">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Nome completo *
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  placeholder="Seu nome ou nome artístico"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Telefone (opcional)
              </Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="titulo" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Título da obra *
              </Label>
              <Input
                id="titulo"
                name="titulo"
                placeholder="Ex: Metamorfose Urbana"
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <select
                id="categoria"
                name="categoria"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Selecione a categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição da obra *</Label>
              <Textarea
                id="descricao"
                name="descricao"
                placeholder="Conte sobre sua obra, conceito e processo criativo..."
                rows={4}
                required
                className="bg-background resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="materiais">Materiais utilizados</Label>
              <Textarea
                id="materiais"
                name="materiais"
                placeholder="Ex: metal reciclado, madeira de demolição, tecidos..."
                rows={2}
                className="bg-background resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem adicional (opcional)</Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                placeholder="Algo mais que gostaria de compartilhar?"
                rows={2}
                className="bg-background resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-blob bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 font-bold"
              >
                {isSubmitting ? "Enviando..." : "Enviar proposta"}
              </Button>
              <Button asChild type="button" variant="outline" className="btn-pill-right border-2">
                <Link href="/galeria">Cancelar</Link>
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
