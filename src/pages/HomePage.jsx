import { useFilms } from '../hooks/useFilms'
import FilmList from '../components/FilmList'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import Pagination from '../components/Pagination'

/**
 * HomePage — Halaman utama.
 *
 * Semua state dan logic dikelola oleh `useFilms()`.
 * Komponen ini hanya bertanggung jawab atas rendering UI.
 *
 * status:
 *   - Tanpa query (?q=)  → tampilkan film populer via /discover/movie
 *   - Dengan query (?q=) → tampilkan hasil pencarian via /search/movie
 */

export default function HomePage() {
  const { films, loading, error, page, totalPages, query, handlePageChange, retry } = useFilms()

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-14">
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {!loading && !error && (
        <>
          {/* Pesan khusus jika hasil pencarian kosong */}
          {films.length === 0 ? (
            <EmptySearchResult query={query} />
          ) : (
            <>
              <FilmList films={films} page={page} totalPages={totalPages} query={query} />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </main>
  )
}

/** ─── Sub-komponen: Tampilan saat hasil pencarian kosong ─── */
function EmptySearchResult({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="text-4xl">🎬</div>
      <h2 className="font-display text-2xl text-film-text">Tidak Ada Hasil</h2>
      <p className="font-body text-sm text-film-sub max-w-sm leading-relaxed">
        Tidak ditemukan film dengan judul{' '}
        <span className="text-film-gold font-medium">"{query}"</span>.
        Coba kata kunci yang berbeda.
      </p>
    </div>
  )
}
