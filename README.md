# Take Home Test - Web Programming React JS

Repository ini memuat hasil pengerjaan Take Home Test Web Programmer dari **PT Nutech Integrasi**. Aplikasi web untuk manajemen saldo dan transaksi pembayaran ini telah diselesaikan sesuai dengan ketentuan dan dokumentasi teknis yang diberikan.

## Detail Developer
* **Nama:** Rayhan Febriyan Saputra
* **Posisi:** Web Programmer

---

## Tech Stack

Untuk membangun aplikasi ini, saya menggunakan kombinasi teknologi berikut demi menjaga performa, kemudahan skalabilitas kode, serta validasi data yang ketat:

* **Framework Utama:** React Vite (v18) dengan TypeScript agar kode lebih terstruktur dan meminimalkan error tipe data.
* **Build Tool:** Vite (untuk proses *bundling* yang cepat dibanding CRA).
* **Styling & UI:** 
  * **Tailwind CSS** untuk menyusun layout responsif tanpa perlu menulis CSS terpisah.
  * **React Icons** sebagai pustaka ikon yang digunakan di navigasi dan form.
  * **Framer Motion** untuk menangani animasi halus pada transisi halaman dan efek membal (*bouncy*) pada modal dialog transaksi.
* **State Management & Fetching Data:** 
   * **Redux Toolkit (RTK) & RTK Query** untuk manajemen global state (seperti status login) sekaligus sebagai *data fetching layer* untuk menghandle *caching* dan sinkronisasi otomatis dengan API Nutech.
* **Form & Validasi:** 
  * **React Hook Form** yang dikombinasikan dengan **Zod Schema** untuk mengunci validasi di sisi klien (dipakai pada form Login, Register, Top Up, dan Edit Profil).
* **Routing & Metadata:** 
  * **React Router DOM v6** (menggunakan `createBrowserRouter` dan proteksi halaman melalui layout guard).

---

## Implementasi FItur

1. **Rute Terproteksi (Auth Guard):**
   * Halaman `/login` dan `/register` tidak bisa dibuka lagi jika pengguna sudah masuk (`PublicRoute`).
   * Halaman utama, Top Up, Transaksi, Riwayat, dan Profil dikunci dan hanya bisa diakses menggunakan token JWT yang valid (`ProtectedRoute`).
2. **Beranda / Dashboard:** Menampilkan informasi profil, saldo (bisa disembunyikan/ditampilkan), daftar 12 service yang ditarik langsung dari API, serta *slider* banner promo yang bergeser otomatis.
3. **Sistem Top Up:** Form pengisian nominal yang langsung divalidasi. Jika tombol ditekan, akan muncul modal konfirmasi sebelum API mutasi ditembak.
4. **Halaman Transaksi Dinamis:** Layout pembayaran akan otomatis menyesuaikan berdasarkan ID layanan yang dipilih dari URL.
5. **Riwayat Transaksi:** Menampilkan daftar pengeluaran dan pemasukan dana secara kronologis menggunakan sistem *load more*.
6. **Edit Profil & Foto:** Pengguna bisa mengubah nama depan/belakang serta mengunggah foto profil baru dengan batasan ukuran file maksimal adalah 100 KB.
7. **Peningkatan UX (User Experience):**
   * **Skeleton Loading:** Dipasang pada menu, banner, dan form profil untuk mencegah elemen melompat (*layout shift*) saat data sedang dimuat.
   * **Halaman 404 Custom:** Menangkap URL salah atau acak di luar sistem router dan menyediakan tombol interaktif untuk kembali ke beranda.

---

## How to run

### Syarat
Pastikan komputer Anda sudah terpasang Node.js (versi 18 ke atas).

### 1. Clone Project dan setup project
```bash
git clone https://github.com/CardinalRPH/SIMS-PPOB-Rayhan-Febriyan-Saputra.git
cd <nama-folder-project>
npm install
```

### 2. Enviroment setup
Buat file enviroment (.env) pada root folder, lalu isikan code berikut, 
```bash
VITE_API_URL=<Your Enviroment URL>
```

### 3. Run dan Build Project
Anda dapat mennjalankan project ini dalam kondisi dev dengan command berikut
```bash
npm run dev
```
atau untuk mem-build project ini menggunakan command berikut. hasil build akan keluar pada folder "dist" pada root folder
```bash
npm run build
```
