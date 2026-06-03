import { useState } from 'react'

const MAX_RATING = 5
const MIN_RATING = 0

export function useFilmRating() {
  const [rating, setRating] = useState(0)

  const isMasterpiece = rating === MAX_RATING

  const handleIncrease = () => setRating((prev) => Math.min(prev + 1, MAX_RATING))
  const handleDecrease = () => setRating((prev) => Math.max(prev - 1, MIN_RATING))

  return {
    rating,
    isMasterpiece,
    handleIncrease,
    handleDecrease,
    MAX_RATING,
    MIN_RATING,
  }
}
