import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function useNavSearch() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')

  // Sinkronkan input dengan query di URL saat URL berubah dari luar
  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/?q=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/')
    }
  }

  const handleClear = () => {
    setQuery('')
    navigate('/')
  }

  return {
    query,
    setQuery,
    handleSubmit,
    handleClear,
  }
}
