import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchTMDB } from '../api/tmdb'

export function useFilms() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query])

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
  }

  const retry = () => fetchFilms(page, query)

  return {
    films,
    loading,
    error,
    page,
    totalPages,
    query,
    handlePageChange,
    retry,
  }
}
