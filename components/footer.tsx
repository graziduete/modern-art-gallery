"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Instagram, Facebook, Linkedin, Mail, ArrowRight, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navigationColumns = [
  {
    title: "galeria",
    links: [
      { label: "Todas as Obras", href: "/galeria" },
      { label: "Novidades", href: "/galeria?novo=true" },
      { label: "Alugavel", href: "/galeria?alugavel=true" },
      { label: "A Venda", href: "/galeria?venda=true" },
    ],
  },
  {
    title: "categorias",
    links: [
      { label: "Esculturas", href: "/galeria?categoria=esculturas" },
      { label: "Pinturas", href: "/galeria?categoria=pinturas" },
      { label: "Instalacoes", href: "/galeria?categoria=instalacoes" },
      { label: "Mixed Media", href: "/galeria?categoria=mixed-media" },
      { label: "Mobiliario", href: "/incomodo" },
    ],
  },
  {
    title: "servicos",
    links: [
      { label: "Aluguel para Eventos", href: "/aluguel" },
      { label: "Curadoria", href: "/curadoria" },
      { label: "Consultoria", href: "/consultoria" },
    ],
  },
  {
    title: "institucional",
    links: [
      { label: "Sobre a Arca", href: "/sobre" },
      { label: "Artistas", href: "/artistas" },
      { label: "Contato", href: "/contato" },
    ],
  },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="relative overflow-hidden">
      {/* Colorful top section with diagonal split */}
      <div className="relative">
        {/* Split background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-primary" />
          <div className="w-1/2 bg-secondary" />
        </div>
        
        {/* Diagonal overlay */}
        <div 
          className="absolute inset-0 bg-secondary"
          style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 60% 100%)" }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Newsletter */}
            <div className="text-primary-foreground">
              <span className="tag-slant inline-block px-4 py-2 bg-accent text-accent-foreground text-sm font-bold tracking-wider uppercase">
                <span>Newsletter</span>
              </span>
              <h3 className="mt-4 font-serif text-4xl sm:text-5xl font-black leading-tight">
                fique por<br />dentro
              </h3>
              <p className="mt-4 text-primary-foreground/80 max-w-md">
                Receba novidades sobre novas obras, artistas e eventos exclusivos da Arca.
              </p>
              
              <div className="mt-6 flex gap-3 max-w-md">
                <Input 
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="btn-pill-left bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-white/30"
                />
                <Button className="btn-pill-right bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right - CTA */}
            <div className="text-secondary-foreground lg:text-right">
              <p className="text-secondary-foreground/70 text-lg">como podemos</p>
              <p className="font-serif text-5xl sm:text-6xl font-black mt-1">ajudar?</p>
              
              <div className="mt-6 flex flex-wrap gap-4 lg:justify-end">
                <Button 
                  asChild
                  className="btn-blob bg-foreground text-background hover:bg-foreground/90 px-8"
                >
                  <Link href="/contato">
                    Fale Conosco
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="btn-pill-right border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 bg-transparent px-6"
                >
                  <Link href="/artistas">
                    Seja um Artista
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer with lighter background */}
      <div className="relative" style={{ backgroundColor: "#E8D8C1" }}>
        {/* Art background */}
        <div className="absolute inset-0">
          <Image
            src="/images/artwork-6.jpg"
            alt="Arte de fundo"
            fill
            className="object-cover opacity-10"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-16">
          {/* Logo and social */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-foreground/10">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl scale-150 group-hover:bg-accent/50 transition-colors" />
                <Image 
                  src="/images/arca-logo.jpg" 
                  alt="Arca" 
                  width={64} 
                  height={64}
                  className="relative w-16 h-16 object-contain rounded-full border-2 border-foreground/20"
                />
              </div>
              <div>
                <span className="font-serif text-3xl font-black text-foreground uppercase tracking-wide">arca</span>
                <span className="block text-sm text-foreground/60">galeria de arte upcycling</span>
              </div>
            </Link>

            {/* Social links */}
            <div className="flex items-center gap-6">
              <span className="text-foreground/50 text-sm hidden sm:block">Siga-nos</span>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                      index === 0 
                        ? "card-creative-1 bg-primary/30 hover:bg-primary" 
                        : index === 1 
                        ? "shape-organic bg-secondary/30 hover:bg-secondary" 
                        : "card-creative-2 bg-accent/30 hover:bg-accent"
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-foreground transition-transform group-hover:scale-110 group-hover:text-background" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12">
            {navigationColumns.map((column, colIndex) => (
              <div key={column.title}>
                <h3 className={`tag-slant inline-block px-3 py-1 text-sm font-bold uppercase tracking-wider mb-6 ${
                  colIndex % 2 === 0 ? "bg-primary/40 text-foreground" : "bg-secondary/40 text-foreground"
                }`}>
                  <span>{column.title}</span>
                </h3>
                <nav className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-foreground/60 hover:text-foreground hover:translate-x-2 transition-all text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap items-center justify-center gap-8 py-8 border-t border-foreground/10">
            <a 
              href="mailto:contato@arca.art" 
              className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors group"
            >
              <span className="btn-pill-left w-10 h-10 bg-primary/30 group-hover:bg-primary flex items-center justify-center transition-colors">
                <Mail className="h-4 w-4 text-foreground group-hover:text-background" />
              </span>
              <span className="text-sm">contato@arca.art</span>
            </a>
            <a 
              href="tel:+5511999999999" 
              className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors group"
            >
              <span className="shape-organic w-10 h-10 bg-secondary/30 group-hover:bg-secondary flex items-center justify-center transition-colors">
                <Phone className="h-4 w-4 text-foreground group-hover:text-background" />
              </span>
              <span className="text-sm">+55 11 99999-9999</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors group"
            >
              <span className="btn-pill-right w-10 h-10 bg-accent/30 group-hover:bg-accent flex items-center justify-center transition-colors">
                <MapPin className="h-4 w-4 text-foreground group-hover:text-background" />
              </span>
              <span className="text-sm">Sao Paulo, SP</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 border-t border-foreground/10" style={{ backgroundColor: "#D9C9B1" }}>
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-foreground/50">
                2025 ARCA | Todos os direitos reservados
              </p>
              <div className="flex gap-6 text-sm text-foreground/50">
                <Link href="/privacidade" className="hover:text-foreground transition-colors">
                  Privacidade
                </Link>
                <Link href="/termos" className="hover:text-foreground transition-colors">
                  Termos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
