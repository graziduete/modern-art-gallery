import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedGrid } from "@/components/featured-grid"
import { CategoryCircles } from "@/components/category-circles"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CTASection />
      <FeaturedGrid />
      <CategoryCircles />
      <AboutSection />
      <Footer />
    </main>
  )
}
