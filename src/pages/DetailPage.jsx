import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchTMDB, getImageUrl } from '../api/tmdb'
import ErrorState from '../components/ErrorState'

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
 * Mengambil ID dari URL params, lalu fetch detail ke TMDB API.
 *
 * Route: /film/:id
 */
export default function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDetail = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTMDB(`/movie/${id}`, { append_to_response: 'credits' })
      setFilm(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetail()
    // Scroll ke atas saat halaman berganti
    window.scrollTo(0, 0)
  }, [id])

  const posterUrl = film ? getImageUrl(film.poster_path, 'w500') : null
  const backdropUrl = film ? getImageUrl(film.backdrop_path, 'original') : null

  // Ambil data sutradara dari credits
  const director = film?.credits?.crew?.find((c) => c.job === 'Director')?.name
  const cast = film?.credits?.cast?.slice(0, 5).map((c) => c.name).join(', ')
  const genres = film?.genres?.map((g) => g.name).join(' · ')
  const year = film?.release_date?.slice(0, 4)
  const runtime = film?.runtime ? `${film.runtime} menit` : null
  const score = film?.vote_average ? film.vote_average.toFixed(1) : null

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
        {error && <ErrorState message={error} onRetry={fetchDetail} />}

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
              {/* Judul & Tagline */}
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-film-text leading-tight mb-2">
                  {film.title}
                </h1>
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
