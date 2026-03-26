import { useState } from 'react'

const MAX_RATING = 5
const MIN_RATING = 0

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

function GenreBadge({ genre }) {
  return (
    <span className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm bg-film-border text-film-sub border border-film-muted/30">
      {genre}
    </span>
  )
}

export default function FilmCard({ film }) {
  const { title, genre, year, director, synopsis, extractedKeywords, imageUrl } = film

  const [showSynopsis, setShowSynopsis] = useState(false)
  const [rating, setRating] = useState(0)

  const isMasterpiece = rating === MAX_RATING

  const handleIncrease = () => setRating((prev) => Math.min(prev + 1, MAX_RATING))
  const handleDecrease = () => setRating((prev) => Math.max(prev - 1, MIN_RATING))
  const handleToggleSynopsis = () => setShowSynopsis((prev) => !prev)

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

      <div className="relative h-52 overflow-hidden bg-film-dark">
        <img
          src={imageUrl}
          alt={`Poster ${title}`}
          className="w-full h-full object-cover opacity-70 transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-film-card via-transparent to-transparent" />

        <div className="absolute bottom-3 left-4">
          <span className="font-mono text-xs text-film-gold bg-film-black/70 px-2 py-0.5 rounded-sm border border-film-gold/30">
            {year}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-4">

        <div>
          <h3
            className={`font-display text-2xl font-bold leading-tight mb-2 transition-all duration-300 ${isMasterpiece ? 'gold-shimmer' : 'text-film-text'
              }`}
          >
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <GenreBadge genre={genre} />
            <span className="text-film-muted text-xs font-mono">·</span>
            <span className="text-film-sub text-xs font-body">Dir. {director}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 px-4 rounded-md bg-film-dark border border-film-border">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] tracking-widest uppercase text-film-sub">
              Rating Anda
            </span>
            <div className="flex items-center gap-2">
              <StarDisplay rating={rating} isMasterpiece={isMasterpiece} />
              <span
                className={`font-mono text-sm font-medium transition-colors duration-300 ${isMasterpiece ? 'text-film-gold' : 'text-film-text'
                  }`}
              >
                {rating}/{MAX_RATING}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={rating === MIN_RATING}
              aria-label="Kurangi rating"
              className={`star-btn ${rating === MIN_RATING ? 'opacity-30 cursor-not-allowed' : ''
                }`}
            >
              −
            </button>
            <button
              onClick={handleIncrease}
              disabled={rating === MAX_RATING}
              aria-label="Tambah rating"
              className={`star-btn ${rating === MAX_RATING
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-film-gold/10'
                }`}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleToggleSynopsis}
          className={`
            w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md
            font-body text-sm font-medium tracking-wide
            border transition-all duration-250
            ${showSynopsis
              ? 'bg-film-gold/10 border-film-gold/50 text-film-gold'
              : 'bg-film-dark border-film-border text-film-sub hover:border-film-gold/40 hover:text-film-text'
            }
          `}
        >
          <span
            className={`inline-block transition-transform duration-300 text-xs ${showSynopsis ? 'rotate-90' : 'rotate-0'
              }`}
          >
            ▶
          </span>
          {showSynopsis ? 'Sembunyikan Sinopsis' : 'Baca Sinopsis & Kata Kunci'}
        </button>

        {showSynopsis && (
          <div className="animate-fade-in flex flex-col gap-4 pt-1">

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-film-border" />
              <span className="font-mono text-[10px] text-film-gold tracking-widest uppercase">Sinopsis</span>
              <div className="h-px flex-1 bg-film-border" />
            </div>


            <p className="font-body text-sm text-film-sub leading-relaxed">
              {synopsis}
            </p>

            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-film-muted mb-2">
                Kata Kunci
              </p>
              <div className="flex flex-wrap gap-2">
                {extractedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="keyword-badge"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    # {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}