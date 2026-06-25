import { createContext, useState, useEffect } from 'react';

/**
 * FavoritesContext — Context untuk menyimpan dan mengakses daftar film favorit.
 *
 * Data tersimpan di localStorage agar tidak hilang saat refresh.
 * Komponen manapun (HomePage, DetailPage, Navbar, dll) bisa membaca/mengubah data ini.
 */
export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ft-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ft-favorites', JSON.stringify(favorites));
  }, [favorites]);

  /** Tambah jika belum ada, hapus jika sudah ada */
  const toggleFavorite = (film) => {
    setFavorites(prev =>
      prev.find(f => f.id === film.id)
        ? prev.filter(f => f.id !== film.id)
        : [...prev, { id: film.id, title: film.title, poster_path: film.poster_path, vote_average: film.vote_average }]
    );
  };

  /** Cek apakah sebuah film sudah difavoritkan */
  const isFavorite = (filmId) => favorites.some(f => f.id === filmId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
