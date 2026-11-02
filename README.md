# Sistem Katalog Produk UMKM Pertanian

Aplikasi berbasis web modern untuk mengelola dan menampilkan katalog produk hasil tani serta inventaris UMKM Pertanian. Proyek ini dibangun sebagai **Mini Project UTS Mata Kuliah Dasar Pemrograman Frontend** di STIKOM PGRI Banyuwangi.

---

## Informasi Mahasiswa
* **Nama Mahasiswa:** Muchamad Rifky Rachmawan
* **Program Studi:** S1 Teknik Informatika
* **Kampus:** STIKOM PGRI Banyuwangi
* **Tema UTS:** Sistem Katalog Produk UMKM Pertanian (Ketentuan NIM Ganjil)[cite: 2]
* **Dosen Pengampu:** Sony Panca Budiarto, M.Kom[cite: 2]

---

## Fitur Utama

### 🛒 Mode Client (Toko / Pembeli)
1. **Katalog Produk Grid:** Menampilkan 20 data produk hasil tani dengan tampilan kartu (*card view*) yang responsif[cite: 1, 6].
2. **Filter Kategori Dinamis:** Menyaring produk berdasarkan kategori (Beras & Biji-bijian, Sayur Segar, Buah-buahan, Pupuk & Nutrisi) menggunakan Higher-Order Function (`.filter()`)[cite: 1, 6].
3. **Modal Checkout & Pembayaran:** Tombol **Beli Produk** pada kartu membuka modal *checkout*[cite: 3].
4. **Validasi Form Pembayaran:** Form *checkout* dilengkapi input Alamat Email (validasi Regex), Nama, Alamat Pengiriman, dan Pilihan Metode Pembayaran (Transfer Bank, E-Wallet, QRIS, COD).

### 🛠️ Mode Admin (Pengelola / Inventaris)
1. **Form Tambah & Edit Produk:** Form interaktif untuk menambah produk baru atau memperbarui data produk yang sudah ada[cite: 1, 3, 6].
2. **Live Preview Card:** Tampilan kartu produk berubah secara *real-time* saat Admin mengisi form[cite: 3].
3. **Tabel Inventaris Products:** Menampilkan seluruh daftar produk dalam bentuk tabel khusus Admin (lengkap dengan Aksi Edit & Hapus)[cite: 1, 3, 6].
4. **Re-Indexing ID Otomatis:** Ketika suatu produk dihapus dari tabel, ID seluruh produk yang tersisa otomatis diurutkan kembali secara berurutan (1, 2, 3, dst.)[cite: 1, 6].
5. **Kalkulasi Valuasi Stok:** Menghitung total nilai aset inventaris secara otomatis menggunakan Higher-Order Function (`.reduce()`)[cite: 1, 6].

---

## Responsivitas (Mobile-First Design)
Sistem ini menggunakan CSS Modern (Variables, Flexbox, & Grid) tanpa *framework* eksternal[cite: 1, 2]:
* **Mobile (< 768px):** Tampilan grid 1 kolom & elemen navigasi menyesuaikan layar HP[cite: 1].
* **Tablet (768px - 1023px):** Tampilan katalog otomatis menyesuaikan 2 kolom[cite: 1].
* **Desktop (>= 1024px):** Tampilan katalog 3 kolom dan tata letak Admin Form-Preview berdampingan (*3fr 2fr*)[cite: 1, 3, 4].

---

## Teknologi & Arsitektur Kode
Sesuai dengan ketentuan UTS, proyek ini dibangun murni menggunakan **Vanilla Web Stack (Tanpa Library/Framework)**[cite: 2]:

* **HTML5 Semantik:** Penggunaan tag `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, dan `<footer>`[cite: 1, 2, 3].
* **CSS Modern (Vanilla CSS):** Responsive Design (Mobile-First), CSS Custom Properties (`:root`), Flexbox, CSS Grid[cite: 1, 2, 4].
* **JavaScript Modern (ES6+ Modules):** Memecah kode menjadi modul-modul independen (`type="module"`)[cite: 1, 2, 3]:
  * `assets/js/modules/services.js`: Mengelola data mock, manipulasi dataset, dan fungsi kalkulasi[cite: 1, 6].
  * `assets/js/modules/validator.js`: Menangani logika validasi input client-side dan efek status pesan *error/success*[cite: 1].
  * `assets/js/modules/ui.js`: Khusus menangani manipulasi DOM (render katalog client, tabel admin, dan *live preview*)[cite: 1, 3, 4].
  * `assets/js/main.js`: *Entry point* utama yang menghubungkan *event listener* dan alur kerja aplikasi[cite: 1, 3].

---

## Struktur Repositori

```text
katalog-umkm-pertanian/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       └── modules/
│           ├── services.js
│           ├── ui.js
│           └── validator.js
├── index.html
├── README.md
└── .gitignore