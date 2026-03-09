import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Envie sua obra | Arca",
  description: "Proponha sua criação para a galeria Arca. Trabalhamos com arte sustentável e upcycling.",
}

export default function EnvieSuaObraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
