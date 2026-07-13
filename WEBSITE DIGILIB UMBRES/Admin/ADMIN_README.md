# Admin Panel DIGILIB UMBRES - Dokumentasi

## 📋 Daftar Isi
1. [Fitur Admin Panel](#fitur-admin-panel)
2. [Cara Akses](#cara-akses)
3. [Kredensial Default](#kredensial-default)
4. [Fitur-Fitur](#fitur-fitur)
5. [Panduan Penggunaan](#panduan-penggunaan)

---

## 🎯 Fitur Admin Panel

Admin panel DIGILIB UMBRES menyediakan solusi manajemen lengkap untuk perpustakaan digital dengan fitur-fitur berikut:

### ✅ Fitur Utama:
- **Dashboard** - Ringkasan statistik dan aktivitas terbaru
- **Kelola Buku** - Tambah, edit, dan hapus data buku
- **Kelola Pengguna** - Manajemen data anggota perpustakaan
- **Kelola Peminjaman** - Pencatatan dan monitoring peminjaman
- **Kelola Pengembalian** - Manajemen pengembalian buku
- **Kategori Buku** - Organisasi kategori buku
- **Laporan** - Generate berbagai laporan perpustakaan
- **Pengaturan** - Konfigurasi sistem dan keamanan

---

## 🔐 Cara Akses

### URL Admin Panel:
```
admin-login.html
```

Atau buka di browser:
```
file:///c:/Users/User/Documents/indra/PERPUS UMBRES/umbrees perpuss/Digilib umbres/Halaman Uatama Website/admin-login.html
```

---

## 🔑 Kredensial Default

> **⚠️ PENTING**: Ubah password default segera setelah login pertama kali!

```
Email:    admin@umbres.ac.id
Password: admin123456
```

---

## 📊 Fitur-Fitur Lengkap

### 1. Dashboard
**Menampilkan:**
- Total Buku
- Total Pengguna
- Peminjaman Aktif
- Buku Terlambat Dikembalikan
- Grafik peminjaman per bulan
- Aktivitas terbaru

**Fungsi:**
- Ringkasan statistik real-time
- Monitoring kesehatan sistem perpustakaan
- Akses cepat ke menu lain

---

### 2. Kelola Buku
**Operasi CRUD:**
- ✅ Tambah Buku Baru
- ✏️ Edit Data Buku
- ❌ Hapus Buku
- 🔍 Cari Buku

**Data Buku:**
- Kode Buku
- Judul
- Penulis
- Penerbit
- Kategori
- Stok Total
- Stok Tersedia

**Filter:**
- Pencarian berdasarkan judul/penulis
- Filter berdasarkan kategori

---

### 3. Kelola Pengguna
**Operasi CRUD:**
- ✅ Tambah Pengguna Baru
- ✏️ Edit Data Pengguna
- ❌ Hapus Pengguna
- 🔍 Cari Pengguna

**Data Pengguna:**
- NIM (Nomor Identitas Mahasiswa)
- Nama Lengkap
- Email
- Program Studi
- Status (Aktif/Non-Aktif)
- Tanggal Terdaftar

**Filter:**
- Pencarian nama/NIM
- Filter berdasarkan status

---

### 4. Kelola Peminjaman
**Operasi CRUD:**
- ✅ Catat Peminjaman Baru
- ✏️ Edit Data Peminjaman
- ❌ Hapus Data Peminjaman
- 🔍 Cari Peminjaman

**Data Peminjaman:**
- ID Peminjaman
- Nama Peminjam
- Judul Buku
- Tanggal Peminjaman
- Tanggal Kembali Target
- Status (Aktif/Terlambat/Dikembalikan)

**Fitur:**
- Pencatatan otomatis tanggal peminjaman
- Monitoring pengembalian tepat waktu
- Tracking buku yang terlambat

---

### 5. Kategori Buku
**Manajemen Kategori:**
- ✅ Tambah Kategori Baru
- ✏️ Edit Kategori
- ❌ Hapus Kategori

**Kategori Default:**
- Fiksi
- Non-Fiksi
- Sains
- Referensi
- Teknologi (dapat ditambahkan)

---

### 6. Laporan
**Jenis Laporan yang Tersedia:**

1. **Laporan Peminjaman**
   - Data peminjaman per periode
   - Format: Excel/PDF

2. **Laporan Stok Buku**
   - Status ketersediaan buku
   - Buku yang habis terjual
   - Format: Excel/PDF

3. **Laporan Keterlambatan**
   - Data peminjam yang terlambat
   - Perhitungan denda
   - Format: Excel/PDF

4. **Laporan Pengguna**
   - Statistik pengguna aktif/non-aktif
   - Riwayat keanggotaan
   - Format: Excel/PDF

---

### 7. Pengaturan Sistem
**Konfigurasi Umum:**
- Nama Perpustakaan
- Email Sistem
- Durasi Peminjaman (default: 7 hari)
- Denda per Hari (default: Rp 10.000)

**Manajemen Admin:**
- Tambah Admin Baru
- Kelola Hak Akses
- Lihat Daftar Admin

**Keamanan:**
- Ubah Password
- Logout Semua Sesi
- Riwayat Login

---

## 📖 Panduan Penggunaan

### A. Menambah Buku Baru

1. Login dengan kredensial admin
2. Klik menu "Kelola Buku"
3. Klik tombol "Tambah Buku"
4. Isi form dengan data:
   - Kode Buku (cth: BK001)
   - Judul Buku
   - Penulis
   - Penerbit
   - Kategori
   - Stok
5. Klik "Simpan"

---

### B. Menambah Pengguna Baru

1. Klik menu "Kelola Pengguna"
2. Klik tombol "Tambah Pengguna"
3. Isi form dengan data:
   - NIM
   - Nama Lengkap
   - Email
   - Program Studi
   - Status
4. Klik "Simpan"

---

### C. Mencatat Peminjaman Baru

1. Klik menu "Kelola Peminjaman"
2. Klik tombol "Catat Peminjaman"
3. Isi form dengan data:
   - Peminjam
   - Buku
   - Tanggal Peminjaman
   - Tanggal Kembali Target
   - Status
4. Klik "Simpan"

---

### D. Generate Laporan

1. Klik menu "Laporan"
2. Pilih jenis laporan yang diinginkan
3. Klik tombol "Unduh"
4. File akan diunduh secara otomatis

---

## 🔧 Fitur Tambahan

### Pencarian & Filter
- Tersedia di setiap halaman kelola data
- Real-time search
- Filter berdasarkan kategori/status

### Notifikasi
- Konfirmasi setiap aksi (tambah/edit/hapus)
- Alert untuk error
- Pesan sukses untuk operasi berhasil

### Responsive Design
- Fully responsive untuk mobile
- Sidebar toggle untuk mobile
- Tabel scroll untuk data besar

### Keamanan
- Session management
- Auto logout
- Password protection
- Remember me option

---

## 🛠️ Instalasi & Setup

### Langkah 1: Copy Files
Pastikan semua file berikut ada di folder yang sama:
- `admin-login.html`
- `admin-dashboard.html`
- `admin-styles.css`
- `admin-script.js`

### Langkah 2: Akses Admin Login
Buka file `admin-login.html` di browser

### Langkah 3: Login
Gunakan kredensial default:
- Email: `admin@umbres.ac.id`
- Password: `admin123456`

### Langkah 4: Ubah Password
Segera ubah password di menu Pengaturan → Keamanan

---

## 💾 Backup & Restore

### Backup Data:
Semua data saat ini disimpan di localStorage browser
Untuk backup manual:
1. Buka Dev Tools (F12)
2. Buka Console
3. Jalankan: `localStorage.getItem('adminSession')`

### Tips Keamanan:
- Ubah password secara berkala
- Gunakan password yang kuat
- Logout setiap selesai bekerja
- Jangan bagikan akun ke orang lain

---

## 📞 Support & Troubleshooting

### Lupa Password?
Hubungi administrator sistem untuk reset password

### Tidak Bisa Login?
1. Pastikan email dan password benar
2. Clear browser cache (Ctrl+Shift+Delete)
3. Coba di browser lain
4. Hubungi IT Support

### Data Tidak Tampil?
1. Refresh halaman (F5)
2. Clear localStorage: `localStorage.clear()`
3. Login kembali

---

## 📝 Changelog

### Versi 1.0 (Current)
- ✅ Sistem login admin
- ✅ Dashboard dengan statistik
- ✅ CRUD untuk Buku, Pengguna, Peminjaman
- ✅ Manajemen Kategori
- ✅ Generate Laporan
- ✅ Pengaturan Sistem
- ✅ Responsive Design

### Fitur yang akan datang:
- 📅 Integrasi database backend
- 📊 Chart/Grafik real-time
- 📧 Email notifikasi
- 🔔 SMS notifikasi
- 📱 Mobile app

---

## 📄 Lisensi & Disclaimer

Sistem admin panel ini adalah bagian dari DIGILIB UMBRES untuk internal use.

**Disclaimer:**
- Hanya untuk administrator terdaftar
- Akses yang tidak sah adalah tindakan ilegal
- Semua aktivitas tercatat dalam sistem logging
- Pengguna bertanggung jawab atas tindakan mereka

---

**Dibuat untuk: Universitas Muhammadiyah Brebes**
**Versi: 1.0**
**Last Updated: 24 Mei 2024**

---

Untuk pertanyaan lebih lanjut, hubungi tim IT Support.
