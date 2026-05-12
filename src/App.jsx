import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'

/**
 * App — Root komponen yang mengatur routing dan layout global.
 *
 * Struktur Route:
 *   /          → HomePage  (daftar film populer)
 *   /film/:id  → DetailPage (detail satu film)
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-film-black font-body">
        {/* Grain overlay untuk tekstur sinematik */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Navigasi global */}
        <Navbar />

        {/* Hero Banner — hanya tampil di halaman home via CSS route */}
        <HeroBanner />

        {/* Konten halaman berdasarkan route */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:id" element={<DetailPage />} />
        </Routes>

        {/* Footer */}
        <footer className="border-t border-film-border py-8 text-center">
          <p className="font-mono text-xs text-film-muted tracking-widest uppercase">
            FilmTracker · Powered by{' '}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-film-sub hover:text-film-gold transition-colors duration-200"
            >
              TMDB
            </a>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

/** ─── Sub-komponen: Hero banner ─────────────────────── */
function HeroBanner() {
  return (
    <div className="relative overflow-hidden border-b border-film-border">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,67,0.25) 0%, transparent 70%)',
        }}
      />
      <div className="film-strip h-3 w-full opacity-60" />
      <div className="relative max-w-6xl mx-auto px-6 py-14 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-film-gold uppercase mb-5 opacity-80">
          ✦ Now Showing ✦
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-none mb-4">
          <span className="gold-shimmer">FilmTracker</span>
          <br />
          <span className="text-film-text italic font-normal text-4xl md:text-5xl">
            Film Populer &amp; Sedang Tayang
          </span>
        </h1>
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-film-gold/50" />
          <span className="text-film-gold text-lg">◆</span>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-film-gold/50" />
        </div>
        <p className="mt-5 font-body text-film-sub text-base max-w-lg mx-auto leading-relaxed">
          Jelajahi film yang sedang tayang di bioskop dunia. Klik kartu untuk melihat detail lengkap.
        </p>
      </div>
      <div className="film-strip h-3 w-full opacity-60" />
    </div>
  )
}