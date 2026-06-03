// konfigurasi API biar ga hardcode
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

/**
 * @param {string} path  - path poster dari API 
 * @param {string} size  - size gambar
 */

export function getImageUrl(path, size = 'w500') { // default size 
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

/**
 * @param {string} endpoint - Endpoint TMDB tanpa base URL (contoh: "/movie/popular")
 * @param {Record<string,string>} params
 */

export async function fetchTMDB(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', TMDB_API_KEY)
  url.searchParams.set('language', 'en-US')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`TMDB API Error ${res.status}: ${res.statusText}`)
  }
  return res.json()
}
