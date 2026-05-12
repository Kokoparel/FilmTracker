/**
 * LoadingState — tampil saat data dari API sedang dimuat.
 * Menampilkan skeleton grid yang menyerupai tata letak FilmList.
 */
export default function LoadingState() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-10">
        <div className="h-7 w-52 rounded bg-film-border animate-pulse" />
        <div className="h-px flex-1 bg-film-border" />
        <div className="h-4 w-16 rounded bg-film-border animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-film-card border border-film-border overflow-hidden shadow-card animate-pulse"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {/* Skeleton poster */}
            <div className="h-52 bg-film-dark" />
            {/* Skeleton konten */}
            <div className="p-5 flex flex-col gap-3">
              <div className="h-6 w-3/4 rounded bg-film-border" />
              <div className="h-4 w-1/3 rounded bg-film-border" />
              <div className="h-16 w-full rounded bg-film-border" />
              <div className="h-14 w-full rounded bg-film-dark border border-film-border" />
              <div className="h-10 w-full rounded bg-film-dark border border-film-border" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
