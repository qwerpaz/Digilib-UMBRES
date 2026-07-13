# Dokumentasi Sistem Login & Keamanan - DIGILIB UMBRES

## 📋 Daftar Isi
1. [Cara Kerja Sistem](#cara-kerja-sistem)
2. [Struktur File](#struktur-file)
3. [Akun Test](#akun-test)
4. [Fitur Keamanan](#fitur-keamanan)
5. [Troubleshooting](#troubleshooting)

---

## 🔄 Cara Kerja Sistem

### Alur Login:
```
1. User mengakses Login.html
   ↓
2. Form login meminta: NIM, Username, Password
   ↓
3. System validasi kredensial
   ↓
4. Jika valid → Simpan session ke localStorage → Redirect ke index.html
   Jika tidak valid → Tampilkan pesan error
   ↓
5. Di index.html, auth.js mengecek session
   ↓
6. Jika ada session → Tampilkan dashboard
   Jika tidak ada → Redirect ke Login.html
   ↓
7. User bisa logout dengan tombol di header
```

---

## 📁 Struktur File

```
Digilib umbres/
├── Login.html           ← Halaman login utama
├── Login.css            ← Styling halaman login
├── index.html           ← Dashboard (halaman utama)
├── auth.js              ← File utama untuk authentikasi & session management
├── styles.css           ← Styling dashboard
└── README.md            ← File dokumentasi ini
```

### File Penting:
- **Login.html**: Halaman login dengan form NIM, Username, Password
- **auth.js**: Menghandle session, cek login, logout, timeout
- **localStorage**: Menyimpan data user saat login

---

## 🧪 Akun Test

Gunakan salah satu akun berikut untuk testing:

### Akun Mahasiswa:
```
Akun 1:
  NIM:      2021001
  Username: mahasiswa1
  Password: password123
  Nama:     Andi Pratama

Akun 2:
  NIM:      2021002
  Username: mahasiswa2
  Password: password456
  Nama:     Siti Nurhaliza

Akun 3:
  NIM:      2021003
  Username: mahasiswa3
  Password: password789
  Nama:     Budi Santoso
```

### Akun Administrator:
```
  NIM:      ADMIN001
  Username: admin
  Password: admin123
  Nama:     Administrator
```

---

## 🔐 Fitur Keamanan

### 1. **Validasi NIM, Username & Password**
   - Semua tiga field harus diisi sebelum login
   - Sistem cek ketiga field sekaligus
   - Password otomatis dihapus saat error

### 2. **Session Management**
   - Data user disimpan di localStorage
   - Session timestamp dicatat
   - Session check dilakukan saat page load

### 3. **Proteksi Dashboard**
   - auth.js mengecek session saat index.html dimuat
   - Jika tidak ada session valid → Redirect ke Login.html
   - Tidak bisa mengakses dashboard tanpa login

### 4. **Session Timeout**
   - Auto logout setelah 30 menit tidak aktif
   - Activity events: mousedown, keydown, scroll, touchstart, click
   - Timeout reset setiap kali ada aktivitas

### 5. **Tombol Logout**
   - Tombol logout muncul di header
   - Konfirmasi sebelum logout
   - Hapus semua session data saat logout

### 6. **Cegah Back Button**
   - Setelah logout, tidak bisa kembali ke dashboard dengan back button
   - Browser akan redirect ke Login.html

### 7. **Update Nama User**
   - Nama user ditampilkan di header (mengganti "nyong")
   - Title menampilkan NIM dan Role user

---

## 🚀 Cara Implementasi

### 1. Setup Awal:
```bash
1. Pastikan file-file berada di folder yang sama:
   - Login.html
   - Login.css
   - index.html
   - auth.js
   - Logo.svg (logo digilib umbres)

2. Buka Login.html di browser
```

### 2. Testing Login:
```
1. Buka Login.html
2. Isi form:
   - NIM: 2021001
   - Username: mahasiswa1
   - Password: password123
3. Klik tombol "Masuk"
4. Akan redirect ke dashboard (index.html)
```

### 3. Testing Logout:
```
1. Di dashboard, cari tombol "Logout" (warna merah) di header sebelah kanan
2. Klik tombol Logout
3. Konfirmasi logout
4. Akan redirect ke Login.html
```

### 4. Testing Proteksi:
```
1. Logout atau clear browser cache
2. Coba akses index.html langsung
3. System otomatis redirect ke Login.html
```

---

## 🛠️ Cara Menambah/Edit Akun User

Edit file **Login.html**, cari bagian:
```javascript
const users = [
    { 
        nim: '2021001', 
        username: 'mahasiswa1', 
        password: 'password123', 
        role: 'user', 
        nama: 'Andi Pratama' 
    },
    // ... akun lainnya
];
```

Tambahkan akun baru:
```javascript
{ 
    nim: '2021004', 
    username: 'mahasiswa4', 
    password: 'password999', 
    role: 'user', 
    nama: 'Nama Lengkap User' 
}
```

---

## ⚙️ Konfigurasi Session

### Ubah Session Timeout:
Buka **auth.js**, cari baris:
```javascript
// Set timeout 30 menit (1800000 ms)
sessionTimeoutId = setTimeout(function() {
    alert('Session Anda telah berakhir. Silakan login kembali.');
    logout();
}, 1800000);  // ← Ubah value di sini
```

Rumus: 1 menit = 60000 ms
- 15 menit = 900000
- 30 menit = 1800000 (default)
- 60 menit = 3600000
- 2 jam = 7200000

---

## 🐛 Troubleshooting

### Problem: "Login fail terus menerus"
**Solusi:**
1. Pastikan NIM, Username, Password benar (case-sensitive untuk username)
2. Pastikan tidak ada spasi di awal/akhir input
3. Clear browser cache (Ctrl+Shift+Delete)
4. Coba akun test yang sudah tersedia

### Problem: "Tidak bisa logout"
**Solusi:**
1. Cek apakah tombol Logout muncul di header
2. Buka browser console (F12 → Console)
3. Ketik: `logout()` dan enter
4. Atau clear localStorage: `localStorage.clear()`

### Problem: "Session timeout tidak berfungsi"
**Solusi:**
1. Pastikan ada aktivitas di halaman (mouse, keyboard, dll)
2. Jika browser di-minimize, timeout mungkin tidak jalan di background
3. Check browser settings untuk background activity

### Problem: "localStorage error"
**Solusi:**
1. Cek apakah browser support localStorage
2. Pastikan tidak dalam private/incognito mode
3. Bersihkan cache browser
4. Coba browser lain

### Problem: "Nama user di header masih 'nyong'"
**Solusi:**
1. Tunggu halaman load sempurna (3-5 detik)
2. Refresh halaman (F5)
3. Cek browser console untuk error
4. Pastikan auth.js ter-load dengan benar

---

## 📝 Best Practice

### Saat Production:
1. **Gunakan HTTPS** (bukan HTTP) - Aktifkan HSTS
2. **Ganti password akun** - Jangan gunakan default
3. **Jangan simpan password di localStorage** - Gunakan secure session cookie
4. **Implementasi rate limiting** - Cegah brute force attack
5. **Audit log** - Catat semua aktivitas login/logout
6. **Enkripsi password** - Gunakan hash algorithm (bcrypt, scrypt)
7. **2FA (Two-Factor Auth)** - Tambah OTP/SMS verification
8. **CORS protection** - Batasi akses dari domain tertentu

### Security Headers (Di Nginx/Apache):
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

Referensi: Lihat file **Nginx_HTTPS_HSTS_Configuration.conf**

---

## 📞 Kontak & Support

Jika ada pertanyaan atau masalah:
1. Cek file dokumentasi ini
2. Lihat browser console (F12) untuk error
3. Bersihkan cache browser
4. Coba di browser berbeda

---

## 📅 Version History

| Versi | Tanggal | Perubahan |
|-------|---------|----------|
| 1.0   | 30/05/2026 | Initial release - Login system dengan NIM validation |

---

**Selamat menggunakan Sistem Login DIGILIB UMBRES!** 🎉
