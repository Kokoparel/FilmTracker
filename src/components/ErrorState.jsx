/**
 * ErrorState — ditampilin pas gagal fetch data biar web ga langsung crash
 * Props:
 *   message — string pesan error dari catch block
 *   onRetry  — fungsi callback untuk coba fetch ulang
 */

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl border-2 border-film-red/50"
        style={{ background: 'rgba(192,57,43,0.1)' }}
      >
        ✕
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h2 className="font-display text-2xl text-film-text">Gagal Memuat Data</h2>
        <p className="font-body text-sm text-film-sub leading-relaxed">
          Tidak dapat terhubung ke TMDB API. Pastikan kamu sudah mengisi{' '}
          <code className="font-mono text-film-gold bg-film-dark px-1.5 py-0.5 rounded text-xs">
            VITE_TMDB_API_KEY
          </code>{' '}
          di file <code className="font-mono text-film-gold bg-film-dark px-1.5 py-0.5 rounded text-xs">.env</code>.
        </p>
        {message && (
          <p className="font-mono text-xs text-film-muted mt-1 p-3 rounded-md bg-film-dark border border-film-border text-left break-all">
            {message}
          </p>
        )}
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          id="retry-fetch-btn"
          className="flex items-center gap-2 px-6 py-2.5 rounded-md font-body text-sm font-medium border border-film-gold/50 text-film-gold hover:bg-film-gold/10 transition-all duration-200"
        >
          Coba Lagi
        </button>
      )}
    </div>
  )
}
