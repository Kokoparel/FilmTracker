import FilmList from './components/FilmList'

// film elitis wok
const FILMS = [
  {
    id: 1,
    title: 'Janji Joni',
    genre: 'Komedi · Drama',
    year: 2005,
    director: 'Joko Anwar',
    synopsis:
      'Joni adalah seorang pengantar rol film bioskop antar bioskop di Jakarta yang punya satu pantangan: tidak boleh terlambat. Tapi satu misi antar film hari itu berubah menjadi petualangan kota yang absurd — karena ia terpikat gadis misterius di bioskop. Film debut Joko Anwar ini merayakan kecintaan pada sinema dengan gaya segar, jenaka, dan penuh referensi budaya pop yang terasa seperti surat cinta untuk Jakarta era 2000-an.',
    extractedKeywords: ['Joko Anwar', 'Jakarta', 'Bioskop', 'Komedi Absurd', 'Sinema', 'Misi', 'Debut'],
    imageUrl: 'https://image.tmdb.org/t/p/original/lkOyXON47is0r9GKAeQNhSuAbyP.jpg',
  },
  {
    id: 2,
    title: 'Fiksi.',
    genre: 'Thriller · Psikologis',
    year: 2008,
    director: 'Mouly Surya',
    synopsis:
      'Seorang penulis muda bernama Alisha tinggal sendirian di sebuah apartemen dan mulai terobsesi dengan tetangganya yang misterius. Film debut Mouly Surya ini adalah thriller psikologis yang intens dan sunyi — membangun ketegangan bukan lewat jump scare, melainkan dari ambigüitas realitas dan paranoia yang perlahan merasuki pikiran. Sinematografi gelapnya menjadikan ruang sempit sebagai karakter tersendiri.',
    extractedKeywords: ['Mouly Surya', 'Apartemen', 'Obsesi', 'Debut', 'Paranoia', 'Psikologis', 'Sunyi'],
    imageUrl: 'https://image.tmdb.org/t/p/original/69WXSgNTP4e1Aq9WufWMrlEafK8.jpg',
  },
  {
    id: 3,
    title: 'Pintu Terlarang',
    genre: 'Thriller · Misteri',
    year: 2009,
    director: 'Joko Anwar',
    synopsis:
      'Gambir, seorang pematung sukses, mulai menerima pesan-pesan misterius dari seorang anak kecil yang mengaku terkurung di balik dinding. Thriller gelap nan surrealis ini membawa penonton ke labirin psikologis yang menantang persepsi antara nyata dan ilusi. Joko Anwar membangun atmosfer mencekam yang konsisten, dan film ini menjadi salah satu karya paling otentik dalam sejarah thriller Indonesia.',
    extractedKeywords: ['Joko Anwar', 'Surrealis', 'Misteri', 'Psikologis', 'Pesan Tersembunyi', 'Labirin', 'Gelap'],
    imageUrl: 'https://image.tmdb.org/t/p/original/k5FTrpHKxi9OjGnf9lRNXHvg4vJ.jpg',
  },
  {
    id: 4,
    title: 'Arisan!',
    genre: 'Drama · Komedi Sosial',
    year: 2003,
    director: 'Nia Dinata',
    synopsis:
      'Di balik pertemuan arisan bulanan para perempuan kelas atas Jakarta, tersimpan rahasia-rahasia yang saling terkait: perselingkuhan, identitas tersembunyi, dan kehidupan ganda yang rapi dibalut kemewahan. Film Nia Dinata ini adalah satir sosial yang berani — salah satu film Indonesia pertama yang menampilkan karakter gay secara lugas dan simpatik — sekaligus potret kehidupan urban Jakarta yang jenaka namun menusuk.',
    extractedKeywords: ['Nia Dinata', 'Jakarta', 'Satir', 'Kelas Atas', 'LGBTQ', 'Rahasia', 'Urban'],
    imageUrl: 'https://image.tmdb.org/t/p/original/n8ggRKDXqfklMimofadhYTkxaPs.jpg',
  },
]

//  komponen 
export default function App() {
  return (
    <div className="min-h-screen bg-film-black font-body">

      <div className="grain-overlay" aria-hidden="true" />

      {/*  header  */}
      <header className="relative overflow-hidden border-b border-film-border">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,67,0.25) 0%, transparent 70%)',
          }}
        />


        <div className="film-strip h-3 w-full opacity-60" />
        <div className="relative max-w-6xl mx-auto px-6 py-14 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-film-gold uppercase mb-5 opacity-80">
            ✦ Sinema Nusantara ✦
          </p>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-none mb-4">
            <span className="gold-shimmer">Indonesian Film</span>
            <br />
            <span className="text-film-text italic font-normal text-4xl md:text-5xl">
              Synopsis & Rating Tracker
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-film-gold/50" />
            <span className="text-film-gold text-lg">◆</span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-film-gold/50" />
          </div>

          <p className="mt-5 font-body text-film-sub text-base max-w-lg mx-auto leading-relaxed">
            Temukan sinopsis, kata kunci, dan berikan penilaian
            untuk{' '}
            <span className="text-film-text">{FILMS.length} film Indonesia</span>{' '}
            pilihan terbaik.
          </p>
        </div>

        <div className="film-strip h-3 w-full opacity-60" />
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <FilmList films={FILMS} />
      </main>

      {/* footer  */}
      <footer className="border-t border-film-border py-8 text-center">
        <p className="font-mono text-xs text-film-muted tracking-widest uppercase">
          Indonesian Film Tracker
        </p>
      </footer>
    </div>
  )
}