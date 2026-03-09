"use client"

import React from "react"

import { useState } from "react"
import { Calendar, MapPin, User, Mail, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface RentalModalProps {
  isOpen: boolean
  onClose: () => void
  artworkTitle: string
}

export function RentalModal({ isOpen, onClose, artworkTitle }: RentalModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Solicitar Aluguel</DialogTitle>
          <DialogDescription>
            Preencha o formulario para solicitar o aluguel da obra &quot;{artworkTitle}&quot;
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
              <Mail className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Solicitacao enviada!
            </h3>
            <p className="mt-2 text-muted-foreground">
              Entraremos em contato em ate 48 horas com mais informacoes.
            </p>
            <Button onClick={handleClose} className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Nome completo
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email ou telefone
              </Label>
              <Input
                id="contact"
                name="contact"
                placeholder="Como podemos contata-lo?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Data do evento
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Cidade
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="Onde sera o evento?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Mensagem (opcional)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Conte-nos mais sobre seu evento..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 bg-transparent"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? "Enviando..." : "Enviar solicitacao"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
