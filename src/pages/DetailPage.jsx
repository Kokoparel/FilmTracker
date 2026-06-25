import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useFilmDetail } from '../hooks/useFilmDetail'
import ErrorState from '../components/ErrorState'
import { FavoritesContext } from '../contexts/FavoritesContext'

/** ─── Sub-komponen: Badge Info ──────────────────────── */
function InfoBadge({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] tracking-widest uppercase text-film-muted">
        {label}
      </span>
      <span className="font-body text-sm text-film-text">
        {value}
      </span>
    </div>
  )
}

/** ─── Sub-komponen: Skeleton Loading ────────────────── */
function DetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto animate-pulse">
      <div className="h-8 w-28 rounded bg-film-border mb-10" />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-72 flex-shrink-0 rounded-lg bg-film-border h-[420px]" />
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-10 w-3/4 rounded bg-film-border" />
          <div className="h-4 w-1/2 rounded bg-film-border" />
          <div className="h-4 w-1/3 rounded bg-film-border" />
          <div className="h-32 w-full rounded bg-film-border mt-4" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-12 rounded bg-film-border" />)}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * DetailPage — Halaman detail satu film.
 *
 * Semua state, fetch, dan derived data dikelola oleh `useFilmDetail()`.
 * Data favorit dibaca dari FavoritesContext (global state).
 *
 * Route: /film/:id
 */

export default function DetailPage() {
  const navigate = useNavigate()
  const {
    film,
    loading,
    error,
    retry,
    posterUrl,
    backdropUrl,
    director,
    cast,
    genres,
    year,
    runtime,
    score,
  } = useFilmDetail()

  const { isFavorite, toggleFavorite } = useContext(FavoritesContext)
  const favorited = film ? isFavorite(film.id) : false

  return (
    <main className="min-h-screen">
      {/* Backdrop blur background */}
      {backdropUrl && !loading && !error && (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-10"
          style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(24px)',
          }}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-14">
        {/* Tombol Kembali */}
        <button
          id="back-btn"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-10 font-body text-sm text-film-sub hover:text-film-gold transition-colors duration-200"
        >
          ← Kembali
        </button>

        {loading && <DetailSkeleton />}
        {error && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && film && (
          <div className="flex flex-col md:flex-row gap-10">
            {/* Poster */}
            <div className="flex-shrink-0 w-full md:w-72">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`Poster ${film.title}`}
                  className="w-full rounded-lg shadow-card border border-film-border object-cover"
                />
              ) : (
                <div className="w-full h-[420px] rounded-lg bg-film-dark border border-film-border flex items-center justify-center text-film-muted font-mono text-sm">
                  No Poster
                </div>
              )}
            </div>

            {/* Detail Konten */}
            <div className="flex flex-col gap-6 flex-1">
              {/* Judul, Tagline & Tombol Favorit */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-film-text leading-tight">
                    {film.title}
                  </h1>
                  {/* Tombol Favorit — menggunakan FavoritesContext */}
                  <button
                    id="favorite-btn"
                    onClick={() => toggleFavorite(film)}
                    className="flex-shrink-0 mt-1 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 text-lg"
                    style={{
                      borderColor: favorited ? '#c0392b' : 'rgba(212,168,67,0.3)',
                      color: favorited ? '#c0392b' : '#8a8494',
                    }}
                    aria-label={favorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                    title={favorited ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                  >
                    {favorited ? '♥' : '♡'}
                  </button>
                </div>
                {film.tagline && (
                  <p className="font-body text-film-gold italic text-base opacity-80">
                    "{film.tagline}"
                  </p>
                )}
              </div>

              {/* Skor & Genre */}
              <div className="flex flex-wrap items-center gap-3">
                {score && (
                  <span className="flex items-center gap-1.5 font-mono text-sm font-medium px-3 py-1 rounded-full bg-film-gold/10 border border-film-gold/40 text-film-gold">
                    ★ {score} / 10
                  </span>
                )}
                {genres && (
                  <span className="font-mono text-xs tracking-wider uppercase px-3 py-1 rounded-full bg-film-border text-film-sub border border-film-muted/30">
                    {genres}
                  </span>
                )}
              </div>

              {/* Grid info */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-4 rounded-lg bg-film-card border border-film-border">
                <InfoBadge label="Tahun Rilis" value={year} />
                <InfoBadge label="Durasi" value={runtime} />
                <InfoBadge label="Sutradara" value={director} />
                <InfoBadge label="Bahasa Asli" value={film.original_language?.toUpperCase()} />
              </div>

              {/* Sinopsis */}
              {film.overview && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-film-border" />
                    <span className="font-mono text-[10px] text-film-gold tracking-widest uppercase">Sinopsis</span>
                    <div className="h-px flex-1 bg-film-border" />
                  </div>
                  <p className="font-body text-sm text-film-sub leading-relaxed">
                    {film.overview}
                  </p>
                </div>
              )}

              {/* Pemeran */}
              {cast && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-film-muted">
                    Pemeran Utama
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {film.credits?.cast?.slice(0, 5).map((actor) => (
                      <span
                        key={actor.id}
                        className="keyword-badge"
                      >
                        {actor.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}