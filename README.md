# 🎬 Indonesian Film Tracker

> Aplikasi web untuk menjelajahi, membaca sinopsis, dan memberi rating film-film Indonesia — dari yang niche sampai cult favorite.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## ✨ Fitur

- 🎞️ **Film Cards** — Setiap film ditampilkan dalam kartu sinematik dengan poster, genre, tahun, dan sutradara
- ⭐ **Rating Interaktif** — Beri nilai 0–5 bintang untuk setiap film langsung dari kartu
- 🏆 **Badge Masterpiece** — Film dengan rating penuh (5/5) mendapat animasi badge spesial dan efek gold shimmer
- 📖 **Toggle Sinopsis** — Expand/collapse sinopsis panjang dan kata kunci tematik tiap film
- 🏷️ **Extracted Keywords** — Kata kunci tematik diekstrak dari masing-masing film untuk memudahkan eksplorasi

---

## 🎥 Film yang Tersedia

| Judul | Tahun | Sutradara | Genre |
|---|---|---|---|
| Janji Joni | 2005 | Joko Anwar | Komedi · Drama |
| Fiksi. | 2008 | Mouly Surya | Thriller · Psikologis |
| Pintu Terlarang | 2009 | Joko Anwar | Thriller · Misteri |
| Arisan! | 2003 | Nia Dinata | Drama · Komedi Sosial |

---

## 🗂️ Struktur Proyek

```
film-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── FilmCard.jsx     # Kartu film individual (rating, sinopsis, keywords)
│   │   └── FilmList.jsx     # Grid wrapper untuk semua film cards
│   ├── App.jsx              # Data film & layout utama
│   ├── index.css            # Design system & custom Tailwind utilities
│   └── main.jsx             # Entry point React
├── tailwind.config.js       # Tema kustom (warna, font, animasi)
├── vite.config.js
└── package.json
```

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js v18 atau lebih baru
- npm

### Instalasi & Dev Server

```bash
# Clone repo
git clone https://github.com/kokoparel/film-tracker.git
cd film-tracker

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

### Build Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|---|---|
| [React 18](https://react.dev/) | UI library & state management (`useState`) |
| [Vite 4](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling + custom design tokens |
| [PostCSS + Autoprefixer](https://postcss.org/) | CSS processing |

---

## 🧩 Konsep React yang Diimplementasikan

- **Komponen modular** — `App`, `FilmList`, `FilmCard`, `StarDisplay`, `GenreBadge`
- **`useState` hook** — Untuk mengontrol state rating dan toggle sinopsis per kartu
- **Conditional rendering** — Badge Masterpiece, gold shimmer, dan disabled state pada tombol
- **Props drilling** — Data film diteruskan dari `App` → `FilmList` → `FilmCard`
- **Array methods** — `.map()` untuk merender daftar film dan keyword badges

---

## 📄 Lisensi

[MIT](LICENSE)

