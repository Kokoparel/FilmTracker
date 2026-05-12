import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilmList from '../components/FilmList'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import Pagination from '../components/Pagination'
import { fetchTMDB } from '../api/tmdb'

/**
 * HomePage — Halaman utama.
 *
 * status:
 *   - Tanpa query (?q=)  → tampilkan film populer via /discover/movie sebagai default
 *   - Dengan query (?q=) → tampilkan hasil pencarian via /search/movie
 *
 * State:
 *   films      — array film dari API
 *   loading    — boolean saat fetch sedang berlangsung
 *   error      — string pesan error jika request gagal
 *   page       — halaman aktif
 *   totalPages — total halaman dari API
 */
export default function HomePage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchFilms = async (pageNumber, searchQuery) => {
    setLoading(true)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    try {
      let data

      if (searchQuery) {
        // Mode pencarian: gunakan endpoint /search/movie
        data = await fetchTMDB('/search/movie', {
          query: searchQuery,
          page: String(pageNumber),
          include_adult: 'false',
        })
      } else {
        // Mode default: tampilkan film populer
        data = await fetchTMDB('/discover/movie', {
          page: String(pageNumber),
          sort_by: 'popularity.desc',
        })
      }

      setFilms(data.results)
      setTotalPages(Math.min(data.total_pages, 500))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset ke halaman 1 setiap kali query berubah
  useEffect(() => {
    setPage(1)
  }, [query])

  // Fetch ulang setiap kali page atau query berubah
  useEffect(() => {
    fetchFilms(page, query)
  }, [page, query])

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-14">
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={() => fetchFilms(page, query)} />}

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
