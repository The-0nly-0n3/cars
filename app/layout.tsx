// Importation des composants de pied de page et de barre de navigation
import { Footer, Navbar } from '@/components'
// Importation des styles globaux
import './globals.css'
// Importation du type Metadata de Next.js
import type { Metadata } from 'next'

// Définition des métadonnées de base pour le site
export const metadata: Metadata = {
  title: 'Car Hub',
  description: 'Discover the best cars',
}

// Composant de mise en page racine
export default function RootLayout({
  children, // Propriété pour les composants enfants à afficher
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar /> {/* Barre de navigation */}
        {children} {/* Contenu spécifique à la page */}
        <Footer /> {/* Pied de page */}
      </body>
    </html>
  )
}
