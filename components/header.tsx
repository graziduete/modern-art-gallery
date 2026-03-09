"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

const navItems = [
  { name: "Sobre a Arca", href: "/sobre" },
  { name: "Galeria", href: "/galeria" },
  { name: "In-Comodo", href: "/incomodo" },
  { name: "Loja", href: "/loja" },
  { name: "Artistas", href: "/artistas" },
  { name: "Aluguel", href: "/aluguel" },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/images/arca-logo-dark.png" 
              alt="Arca" 
              width={100} 
              height={48}
              className="w-24 h-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                  scrolled ? "text-foreground/70" : "text-foreground/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Buscar obras..."
                    className="w-56 h-10 bg-background/80 border-foreground/20 focus:border-accent"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-foreground/70 hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Fechar busca</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-foreground/70 hover:text-foreground"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Abrir busca</span>
                </Button>
              )}
            </div>

            {/* CTA Button */}
            <Button 
              asChild 
              className="btn-blob hidden sm:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-5 font-bold tracking-wide"
            >
              <Link href="/envie-sua-obra">
                Envie sua obra
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 bg-background p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-6 border-b border-border">
                    <SheetTitle className="flex items-center">
                      <Image 
                        src="/images/arca-logo-dark.png" 
                        alt="Arca" 
                        width={100} 
                        height={48}
                        className="w-24 h-auto object-contain"
                      />
                    </SheetTitle>
                  </div>
                  
                  {/* Search */}
                  <div className="p-6">
                    <Input 
                      type="search" 
                      placeholder="Buscar obras..." 
                      className="h-12 bg-muted border-0"
                    />
                  </div>
                  
                  {/* Navigation */}
                  <nav className="flex-1 px-6">
                    <div className="flex flex-col">
                      {navItems.map((item, index) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="py-4 text-xl font-medium text-foreground hover:text-accent transition-colors border-b border-border/50 flex items-center justify-between group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {item.name}
                          <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                        </Link>
                      ))}
                    </div>
                  </nav>
                  
                  {/* Footer CTA */}
                  <div className="p-6 border-t border-border">
                    <Button 
                      asChild 
                      className="btn-blob w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold tracking-wide"
                    >
                      <Link href="/envie-sua-obra">
                        Envie sua obra
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
