import FilmCard from './FilmCard'

/**
 * FilmList
 * Props:
 *   films      — array film dari TMDB API
 *   page       — nomor halaman aktif
 *   totalPages — total halaman tersedia
 *   query      — kata kunci pencarian (kosong = mode browse)
 */
export default function FilmList({ films, page, totalPages, query }) {
  const isSearchMode = Boolean(query)

  return (
    <section>

      <div className="flex items-center gap-4 mb-10">
        <h2 className="font-display text-2xl text-film-text">
          {isSearchMode ? (
            <>
              Hasil untuk{' '}
              <span className="text-film-gold italic">"{query}"</span>
            </>
          ) : (
            'Film Populer'
          )}
        </h2>
        <div className="h-px flex-1 bg-film-border" />
        <span className="font-mono text-xs text-film-sub tracking-widest uppercase">
          {films.length} Judul · Hal. {page}/{totalPages?.toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  )
}