# 🎬 FilmTracker

A modern movie discovery web app built with **React + Vite**, powered by the [TMDB API](https://www.themoviedb.org/). Browse popular films, search by title, and explore detailed information about each movie.

🔗 **Live Demo:** [filmtracker on Vercel](https://film-tracker-theta.vercel.app/)

---

## ✨ Features

- 🎥 Browse popular movies fetched from TMDB API
- 🔍 Search movies by title in real-time
- 📄 Detailed film page with cast, genres, and backdrop
- ⏳ Skeleton loading state while data is being fetched
- ❌ Error state with retry button when API request fails
- 📑 Pagination with smart page number display
- 📱 Fully responsive layout (mobile, tablet, desktop)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool & dev server |
| React Router v7 | Client-side routing (multi-page) |
| Tailwind CSS | Styling & responsive design |
| TMDB API | Movie data source |

---

## 📁 Project Structure

```
src/
├── api/
│   └── tmdb.js           # TMDB API configuration & fetch helper
├── components/
│   ├── Navbar.jsx         # Navigation bar with search
│   ├── FilmList.jsx       # Movie grid list
│   ├── FilmCard.jsx       # Single movie card
│   ├── Pagination.jsx     # Prev/next page navigation
│   ├── LoadingState.jsx   # Skeleton loading UI
│   └── ErrorState.jsx     # Error display with retry
├── pages/
│   ├── HomePage.jsx       # Main page (popular + search)
│   └── DetailPage.jsx     # Film detail page
├── App.jsx                # Root component & routing
└── main.jsx               # App entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- TMDB API Key → [Get it here](https://www.themoviedb.org/settings/api)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kokoparel/FilmTracker.git
cd FilmTracker

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Then fill in your TMDB API key in .env

# 4. Run the development server
npm run dev
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 📸 Pages

| Route | Description |
|---|---|
| `/` | Home page — popular movies & search results |
| `/film/:id` | Detail page — full info about a specific film |

---

## 🌐 Deployment

This project is deployed on **Vercel**. A `vercel.json` is included to handle client-side routing correctly (prevents 404 on page refresh).

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📝 License

This project was built as an assignment for **GDGoC Frontend Development Learning — Session 8: Side Effects & Data Fetching**.
