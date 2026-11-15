WEBSITE ULANG TAHUN UNTUK NOVRIA

STRUKTUR
- index.html
- style.css
- script.js
- vercel.json
- assets/photos/foto-utama.jpg
- assets/photos/foto-1.jpg
- assets/photos/foto-2.jpg
- assets/photos/foto-3.jpg
- assets/music/lagu-kita.mp3

SEBELUM DIPAKAI
1. Buka script.js.
2. Ubah BIRTHDAY_DATE menjadi tanggal ulang tahun yang benar.
   Contoh: "2026-12-01T00:00:00"
3. Masukkan foto kalian ke assets/photos dengan nama file yang sama.
4. Masukkan lagu MP3 ke assets/music/lagu-kita.mp3.
5. Ganti teks surat di index.html agar lebih personal.

MENJALANKAN DI VS CODE
1. Ekstrak ZIP.
2. Buka folder novria-birthday di VS Code.
3. Jalankan index.html dengan ekstensi Live Server, atau buka langsung di browser.

DEPLOY KE VERCEL
Cara paling mudah melalui GitHub:
1. Buat repository baru di GitHub.
2. Upload seluruh isi folder ini ke repository (index.html harus di root).
3. Login ke https://vercel.com menggunakan akun GitHub.
4. Klik Add New -> Project.
5. Import repository yang baru dibuat.
6. Framework Preset pilih Other.
7. Build Command dan Output Directory boleh dikosongkan untuk website statis ini.
8. Klik Deploy.
9. Setelah selesai, Vercel memberikan URL website.

CATATAN
- Musik biasanya tidak bisa autoplay sebelum pengunjung menekan tombol karena aturan browser. Website mulai mencoba memutar musik setelah tombol "Buka kejutan" ditekan.
- Jika foto belum diganti, halaman memakai foto contoh dari Unsplash sebagai fallback.
- Pastikan foto dan musik yang digunakan memang boleh dibagikan.
