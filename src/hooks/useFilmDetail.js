import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTMDB, getImageUrl } from '../api/tmdb'

export function useFilmDetail() {
  const { id } = useParams()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Derived values — dihitung dari data film mentah
  const posterUrl = film ? getImageUrl(film.poster_path, 'w500') : null
  const backdropUrl = film ? getImageUrl(film.backdrop_path, 'original') : null
  const director = film?.credits?.crew?.find((c) => c.job === 'Director')?.name
  const cast = film?.credits?.cast?.slice(0, 5).map((c) => c.name).join(', ')
  const genres = film?.genres?.map((g) => g.name).join(' · ')
  const year = film?.release_date?.slice(0, 4)
  const runtime = film?.runtime ? `${film.runtime} menit` : null
  const score = film?.vote_average ? film.vote_average.toFixed(1) : null

  return {
    film,
    loading,
    error,
    retry: fetchDetail,
    posterUrl,
    backdropUrl,
    director,
    cast,
    genres,
    year,
    runtime,
    score,
  }
}
