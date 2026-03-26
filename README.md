Boleh banget! [cite_start]Sebuah *project* GitHub yang rapi itu wajib punya `README.md` yang jelas, apalagi ini untuk tugas GDGoC[cite: 1]. Asisten penilai pasti akan sangat menghargai *project* yang terdokumentasi dengan baik.

[cite_start]Karena kamu membuat **Indonesian Film Synopsis & Rating Tracker**, aku sudah merancang isi `README.md` ini agar menyoroti semua fitur wajib dari penugasan (seperti *toggle*, *counter*, dan *conditional rendering*)[cite: 23, 24, 25]. Aku juga sudah memasukkan namamu di bagian kreator.

Kamu tinggal *copy* teks di dalam kotak di bawah ini, lalu *paste* ke dalam *file* `README.md` yang ada di *folder project*-mu (timpa saja bawaan dari Vite).

***

```markdown
# 🎬 Indonesian Film Synopsis & Rating Tracker

Aplikasi React interaktif untuk melacak film-film Indonesia, membaca sinopsisnya, dan memberikan rating. [cite_start]Project ini dibuat untuk memenuhi **Assignment Meeting 5 - Basic State Management** pada divisi Frontend Development GDGoC 2025/2026[cite: 1, 2].

## ✨ Fitur Utama

Project ini mengimplementasikan penggunaan `useState` pada React dengan fitur-fitur berikut:

* [cite_start]**List Data Rendering:** Menampilkan daftar film Indonesia populer secara dinamis menggunakan *array of objects*[cite: 22].
* [cite_start]**Toggle State:** Tombol "Read Synopsis" untuk memunculkan atau menyembunyikan detail sinopsis dan kata kunci (menggunakan *state boolean*)[cite: 23].
* [cite_start]**Numeric State:** Fitur memberikan rating bintang (0-5) menggunakan tombol interaktif `+` dan `-` (menggunakan *state numerik*)[cite: 24].
* [cite_start]**Conditional Rendering:** Menampilkan *badge* spesial "Masterpiece!" berwarna emas jika sebuah film mendapatkan rating maksimal (5 bintang)[cite: 25].

## 🛠️ Tech Stack

* [cite_start]**Library:** React [cite: 29]
* [cite_start]**Build Tool:** Vite [cite: 30]
* [cite_start]**Language:** JavaScript [cite: 31]
* **Styling:** Tailwind CSS

## 🚀 Cara Menjalankan Project

1. Pastikan kamu sudah menginstal Node.js di komputermu.
2. Clone repository ini:
   ```bash
   git clone <link-repository-kamu>
   ```
3. Masuk ke dalam direktori project:
   ```bash
   cd <nama-folder-project>
   ```
4. Install semua *dependencies*:
   ```bash
   npm install
   ```
5. Jalankan *development server*:
   ```bash
   npm run dev
   ```
6. Buka `http://localhost:5173` di browsermu.

## 👤 Author

* **Farrel Athaillah Wijaya**
```

***

### Langkah Pengumpulan Tugas
[cite_start]Mengingat *deadline* pengumpulannya besok tanggal 27 Maret 2026[cite: 48], pastikan setelah kodenya selesai, kamu melakukan langkah ini secara berurutan:

1. [cite_start]`git add .`, `git commit -m "feat: complete assignment 5"`, lalu `git push` ke repositori GitHub kamu sendiri[cite: 41].
2. [cite_start]Lakukan **Pull Request** ke repositori `gdgoc-frontend`[cite: 42].
3. [cite_start]Jangan lupa tambahkan *link* repositori kamu di *file* `5-basic-state-management/task.txt` dengan format `Nama - Link Repository`[cite: 43, 44, 45].

Apakah aplikasinya sudah berjalan mulus di komputermu, atau ada komponen React yang masih bikin bingung?
