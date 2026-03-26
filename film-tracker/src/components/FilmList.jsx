import FilmCard from './FilmCard'

/**
 * FilmList
 * Props:
 *   films — array of film objects dari App.jsx
 *
 * Bertanggung jawab hanya untuk me-render grid dan memetakan
 * setiap film ke komponen FilmCard.
 */
export default function FilmList({ films }) {
  return (
    <section>
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="font-display text-2xl text-film-text">
          Film Pilihan
        </h2>
        <div className="h-px flex-1 bg-film-border" />
        <span className="font-mono text-xs text-film-sub tracking-widest uppercase">
          {films.length} Judul
        </span>
      </div>

      {/* Responsive grid — 1 col on mobile, 2 on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  )
}