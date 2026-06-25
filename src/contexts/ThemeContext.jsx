import { createContext, useState, useEffect } from 'react';

/**
 * ThemeContext — Context untuk mengelola tema dark/light secara global.
 *
 * Preferensi tersimpan di localStorage agar persisten saat refresh.
 * Class 'light' ditambahkan/dihapus dari <html> sehingga CSS override bisa bekerja.
 */
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ft-theme');
    return saved ?? 'dark';
  });

  useEffect(() => {
    localStorage.setItem('ft-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
