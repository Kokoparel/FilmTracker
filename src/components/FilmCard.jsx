import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../api/tmdb'

const MAX_RATING = 5
const MIN_RATING = 0

/** ─── Sub-komponen: Tampilan bintang ─────────────────── */
function StarDisplay({ rating, isMasterpiece }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: MAX_RATING }).map((_, i) => {
        const filled = i < rating
        return (
          <svg
            key={i}
            className={`w-4 h-4 transition-all duration-300 ${filled
              ? isMasterpiece
                ? 'text-film-gold-lt drop-shadow-[0_0_4px_rgba(212,168,67,0.8)]'
                : 'text-film-gold'
              : 'text-film-muted'
              }`}
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={filled ? 0 : 1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        )
      })}
    </div>
  )
}

/** ─── Sub-komponen: Badge genre ──────────────────────── */
function GenreBadge({ genre }) {
  return (
    <span className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm bg-film-border text-film-sub border border-film-muted/30">
      {genre}
    </span>
  )
}

/** ─── Komponen Utama: FilmCard ───────────────────────── */
export default function FilmCard({ film }) {
  const navigate = useNavigate()

  const {
    id,
    title,
    genre_ids,
    release_date,
    overview,
    poster_path,
    vote_average,
  } = film

  const year = release_date ? release_date.slice(0, 4) : '—'
  const tmdbScore = vote_average ? vote_average.toFixed(1) : '—'
  const posterUrl = getImageUrl(poster_path, 'w500')

  const [rating, setRating] = useState(0)
  const isMasterpiece = rating === MAX_RATING

  const handleIncrease = () => setRating((prev) => Math.min(prev + 1, MAX_RATING))
  const handleDecrease = () => setRating((prev) => Math.max(prev - 1, MIN_RATING))
  const handleDetailClick = () => navigate(`/film/${id}`)

  return (
    <article
      className={`
        film-card-enter relative flex flex-col overflow-hidden rounded-lg
        bg-film-card border transition-all duration-500
        ${isMasterpiece
          ? 'border-film-gold animate-masterpiece shadow-gold'
          : 'border-film-border shadow-card hover:border-film-muted'
        }
      `}
    >
      {/* Badge Masterpiece */}
      {isMasterpiece && (
        <div className="absolute top-3 right-3 z-10 animate-badge-pop">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase"
            style={{
              background: 'linear-gradient(135deg, #d4a843, #f0c96b)',
              color: '#0a0a0b',
              boxShadow: '0 2px 12px rgba(212,168,67,0.5)',
            }}
          >
            ✦ Masterpiece!
          </span>
        </div>
      )}

      {/* Poster */}
      <div className="relative h-52 overflow-hidden bg-film-dark">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster ${title}`}
            className="w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-film-muted text-sm font-mono">
            No Poster
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-film-card via-transparent to-transparent" />

        {/* Tahun & Skor TMDB */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="font-mono text-xs text-film-gold bg-film-black/70 px-2 py-0.5 rounded-sm border border-film-gold/30">
            {year}
          </span>
          {tmdbScore !== '—' && (
            <span className="font-mono text-xs text-film-cream bg-film-black/70 px-2 py-0.5 rounded-sm border border-film-muted/40">
              ★ {tmdbScore}
            </span>
          )}
        </div>
      </div>

      {/* Konten Kartu */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Judul & Genre */}
        <div>
          <h3
            className={`font-display text-xl font-bold leading-tight mb-2 transition-all duration-300 ${isMasterpiece ? 'gold-shimmer' : 'text-film-text'}`}
          >
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <GenreBadge genre={`${genre_ids?.[0] ? 'Populer' : 'Film'}`} />
          </div>
        </div>

        {/* Overview singkat */}
        <p className="font-body text-sm text-film-sub leading-relaxed line-clamp-3">
          {overview || 'Sinopsis belum tersedia.'}
        </p>

        {/* Rating personal */}
        <div className="flex items-center justify-between py-3 px-4 rounded-md bg-film-dark border border-film-border">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] tracking-widest uppercase text-film-sub">
              Rating Anda
            </span>
            <div className="flex items-center gap-2">
              <StarDisplay rating={rating} isMasterpiece={isMasterpiece} />
              <span className={`font-mono text-sm font-medium transition-colors duration-300 ${isMasterpiece ? 'text-film-gold' : 'text-film-text'}`}>
                {rating}/{MAX_RATING}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={rating === MIN_RATING}
              aria-label="Kurangi rating"
              id={`decrease-rating-${id}`}
              className={`star-btn ${rating === MIN_RATING ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              −
            </button>
            <button
              onClick={handleIncrease}
              disabled={rating === MAX_RATING}
              aria-label="Tambah rating"
              id={`increase-rating-${id}`}
              className={`star-btn ${rating === MAX_RATING ? 'opacity-30 cursor-not-allowed' : 'hover:bg-film-gold/10'}`}
            >
              +
            </button>
          </div>
        </div>

        {/* Tombol Detail */}
        <button
          id={`detail-btn-${id}`}
          onClick={handleDetailClick}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-body text-sm font-medium tracking-wide border transition-all duration-250 bg-film-dark border-film-border text-film-sub hover:border-film-gold/40 hover:text-film-text"
        >
          <span className="inline-block text-xs">▶</span>
          Lihat Detail Film
        </button>
      </div>
    </article>
  )
}