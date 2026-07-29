# Website KKN Desa Ciharashas 2026

Website statis, responsif, dan siap dipublikasikan tanpa proses build.

## Halaman
- `index.html` — beranda lengkap
- `profile.html` — sejarah, demografi, geografi, potensi, dan lokasi

## Mengganti logo sponsor
Website menyediakan tepat dua tempat logo:
1. Sponsor Utama: `assets/sponsor-utama.svg`
2. Supporter: `assets/supporter.svg`

Cara paling mudah:
- Siapkan logo PNG/SVG berlatar transparan.
- Ganti file placeholder dengan nama yang sama.
- Bila memakai PNG, ubah referensi gambar di `index.html`, misalnya:
  `assets/sponsor-utama.png`

Ukuran yang disarankan:
- Rasio mendatar sekitar 2.5:1 sampai 3:1
- PNG transparan minimal 1200 px lebar, atau SVG

## Mengubah kontak
Buka `config.js`, lalu ubah:
- nomor WhatsApp (format 628...)
- email
- Instagram
- TikTok
- Google Maps
- alamat desa

## Mengubah anggota tim dan program
Semua konten utama berada di `index.html`.
Cari nama anggota atau judul program, lalu ganti teksnya.

## Deployment termudah

### Netlify
1. Ekstrak ZIP.
2. Masuk ke Netlify.
3. Buka halaman Sites.
4. Seret folder `kkn-ciharashas-web` ke area deploy.
5. Website langsung mendapat alamat publik.

### Vercel
1. Ekstrak ZIP dan unggah folder ke repositori GitHub.
2. Di Vercel pilih Add New Project.
3. Impor repositori.
4. Framework Preset: Other.
5. Build Command: kosong.
6. Output Directory: `.`
7. Deploy.

### cPanel/shared hosting
1. Buka File Manager → `public_html`.
2. Unggah seluruh isi folder.
3. Pastikan `index.html` berada langsung di `public_html`.

## Catatan
- Foto pada website diambil dari desain PDF yang diberikan.
- Font menggunakan Google Fonts; fallback tetap tersedia jika font eksternal tidak termuat.
- Form kontak membuka WhatsApp dan tidak membutuhkan backend.
