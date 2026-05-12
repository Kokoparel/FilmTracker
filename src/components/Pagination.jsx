/**
 * Pagination — Komponen navigasi halaman.
 *
 * Props:
 *   page         — halaman aktif saat ini
 *   totalPages   — total halaman yang tersedia
 *   onPageChange — callback fn(newPage) saat user klik tombol
 */
export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  // Buat range nomor halaman yang ditampilkan di sekitar halaman aktif
  const getPageNumbers = () => {
    const pages = []
    const delta = 2 // berapa halaman di kiri & kanan halaman aktif

    const left = Math.max(2, page - delta)
    const right = Math.min(totalPages - 1, page + delta)

    // Selalu tampilkan halaman pertama
    pages.push(1)

    // Tambah ellipsis kiri jika ada gap
    if (left > 2) pages.push('...')

    // Halaman di sekitar halaman aktif
    for (let i = left; i <= right; i++) {
      pages.push(i)
    }

    // Tambah ellipsis kanan jika ada gap
    if (right < totalPages - 1) pages.push('...')

    // Selalu tampilkan halaman terakhir
    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav
      aria-label="Navigasi halaman"
      className="flex items-center justify-center gap-2 mt-14 flex-wrap"
    >
      {/* Tombol Previous */}
      <button
        id="pagination-prev"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`
          flex items-center gap-1.5 px-4 py-2 rounded-md font-body text-sm
          border transition-all duration-200
          ${page === 1
            ? 'opacity-30 cursor-not-allowed border-film-border text-film-muted'
            : 'border-film-border text-film-sub hover:border-film-gold/50 hover:text-film-gold'
          }
        `}
      >
        ← Prev
      </button>

      {/* Nomor Halaman */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 flex items-center justify-center text-film-muted font-mono text-sm select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              id={`pagination-page-${p}`}
              onClick={() => onPageChange(p)}
              className={`
                w-9 h-9 rounded-md font-mono text-sm font-medium
                border transition-all duration-200
                ${p === page
                  ? 'bg-film-gold text-film-black border-film-gold font-bold'
                  : 'border-film-border text-film-sub hover:border-film-gold/50 hover:text-film-gold'
                }
              `}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Tombol Next */}
      <button
        id="pagination-next"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`
          flex items-center gap-1.5 px-4 py-2 rounded-md font-body text-sm
          border transition-all duration-200
          ${page === totalPages
            ? 'opacity-30 cursor-not-allowed border-film-border text-film-muted'
            : 'border-film-border text-film-sub hover:border-film-gold/50 hover:text-film-gold'
          }
        `}
      >
        Next →
      </button>

      {/* Info total halaman */}
      <p className="w-full text-center font-mono text-xs text-film-muted mt-3 tracking-wider">
        Halaman {page} dari {totalPages.toLocaleString()}
      </p>
    </nav>
  )
}
