import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

/**
 * Navbar — Header navigasi global dengan search bar.
 *
 * Search bar submit ke /?q=query menggunakan URL search params
 */
export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isHome = location.pathname === '/'

  // Sinkronkan input dengan query di URL saat halaman dimuat
  const [query, setQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/?q=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/')
    }
  }

  const handleClear = () => {
    setQuery('')
    navigate('/')
  }

  return (
    <header className="relative overflow-hidden border-b border-film-border sticky top-0 z-50 bg-film-black/90 backdrop-blur-sm">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 120% at 50% 0%, rgba(212,168,67,0.15) 0%, transparent 70%)',
        }}
      />
      <div className="film-strip h-1.5 w-full opacity-50" />

      <div className="relative max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
        {/* judul */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0" id="nav-logo" onClick={handleClear}>
          <span className="font-mono text-[10px] tracking-[0.3em] text-film-gold uppercase opacity-80">✦</span>
          <span className="font-display text-xl font-bold gold-shimmer">FilmTracker</span>
        </Link>

        {/* Search Bar — mengambil ruang fleksibel di tengah */}
        <form
          onSubmit={handleSubmit}
          role="search"
          className="flex-1 flex items-center gap-2 max-w-xl"
        >
          <div className="relative flex-1">
            {/* Ikon kaca pembesar */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-film-muted pointer-events-none text-sm">
              ⌕
            </span>
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul film..."
              autoComplete="off"
              className="w-full bg-film-dark border border-film-border rounded-md pl-9 pr-10 py-2 font-body text-sm text-film-text placeholder:text-film-muted focus:outline-none focus:border-film-gold/60 focus:ring-1 focus:ring-film-gold/30 transition-all duration-200"
            />
            {/* Tombol clear (×) */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                id="search-clear-btn"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-film-muted hover:text-film-text transition-colors text-xs"
                aria-label="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            id="search-submit-btn"
            className="flex-shrink-0 px-4 py-2 rounded-md font-body text-sm font-medium border border-film-gold/50 text-film-gold hover:bg-film-gold/10 transition-all duration-200"
          >
            Cari
          </button>
        </form>

        {/* Nav link Home */}
        <Link
          to="/"
          id="nav-home"
          onClick={handleClear}
          className="flex-shrink-0 font-body text-sm font-bold gold-shimmer transition-colors duration-200"
        >
          Home
        </Link>
      </div>

      <div className="film-strip h-1.5 w-full opacity-50" />
    </header>
  )
}
