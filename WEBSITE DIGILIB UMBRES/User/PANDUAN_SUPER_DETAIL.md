# PANDUAN SUPER DETAIL - STEP BY STEP

Ikuti panduan ini PERSIS seperti video tutorial. Setiap step sangat penting.

---

## 🔴 STEP 0: Persiapan

### Buka File Explorer
1. Klik icon folder di taskbar **ATAU** tekan `Windows Key + E`
2. Navigasi ke:
   ```
   C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres
   ```
3. Harusnya lihat banyak file termasuk:
   - `server.js`
   - `Login.html`
   - `SETUP.bat`
   - `RUN.bat`

---

## 🟢 STEP 1: Install Node.js (JIKA BELUM ADA)

### Check apakah Node.js sudah ada
1. **Buka Command Prompt:**
   - Tekan `Windows Key + R`
   - Ketik: `cmd`
   - Tekan Enter

2. **Check Node.js:**
   ```
   node --version
   ```

**Expected Output:** `v18.X.X` atau lebih tinggi

**Jika error "node is not recognized":**
   - Download Node.js dari: https://nodejs.org/
   - Pilih: LTS (Long Term Support)
   - Klik: Download for Windows
   - Jalankan installer
   - Default settings, Next semua
   - **RESTART COMPUTER** setelah install
   - Coba lagi `node --version`

---

## 🟡 STEP 2: Setup Dependencies (JALANKAN 1X SAJA)

1. **Buka File Explorer** → navigasi ke folder proyek (lihat STEP 0)

2. **Double-click file:** `SETUP.bat`
   
3. **Window Command Prompt akan terbuka:**
   - Lihat text: `[OK] Node.js terinstall`
   - Lihat text: `npm WARN` (warning OK, boleh ignore)
   - Lihat text: `added X packages`
   - Lihat text: `SETUP SELESAI!`

4. **Tunggu sampai ada text:**
   ```
   Langkah selanjutnya:
   1. Pastikan MySQL service sudah berjalan...
   ```

5. **Tekan SEMBARANG TOMBOL** untuk tutup window

✅ **Dependencies sudah terinstall!**

---

## 🔵 STEP 3: Setup Database MySQL

### Check apakah MySQL service running

**Option A: Buka Services**
1. Tekan: `Windows Key + R`
2. Ketik: `services.msc`
3. Tekan: `Enter`
4. Cari: `MySQL` atau `MySQL80`
5. Status harus: `Running` (hijau play icon)
6. Jika tidak running, klik kanan → **Start**
7. Tunggu sampai status = **Running**

**Option B: Gunakan XAMPP (Lebih Mudah)**
1. Download XAMPP dari: https://www.apachefriends.org/
2. Install dengan default settings
3. Buka XAMPP Control Panel
4. Lihat MySQL, klik **Start**
5. Tunggu sampai ada text: `✓` (green checkmark)

---

### Setup Database & User

1. **Buka Command Prompt:**
   - Tekan: `Windows Key + R`
   - Ketik: `cmd`
   - Tekan: `Enter`

2. **Login ke MySQL:**
   ```
   mysql -u root
   ```
   
   **Expected:** 
   ```
   mysql>
   ```
   
   **Jika error "Access denied for user 'root'@'localhost':**
   ```
   mysql -u root -p
   (tekan Enter, jika ada password muncul, ketik password)
   ```

3. **Copy-paste command ini:**
   ```sql
   CREATE DATABASE IF NOT EXISTS digilib;
   USE digilib;
   ```

4. **Tekan Enter**

5. **Copy-paste command ini:**
   ```sql
   CREATE TABLE IF NOT EXISTS users (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
     nim VARCHAR(32) NOT NULL UNIQUE,
     username VARCHAR(64) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     nama VARCHAR(128) NOT NULL,
     role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (id),
     INDEX idx_username (username),
     INDEX idx_nim (nim)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   ```

6. **Tekan Enter**

7. **Copy-paste command ini untuk insert user test:**
   ```sql
   INSERT INTO users (nim, username, password, nama, role) VALUES
   ('2021001', 'mahasiswa1', '$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW', 'Andi Pratama', 'user'),
   ('2021002', 'mahasiswa2', '$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW', 'Siti Nurhaliza', 'user'),
   ('2021003', 'mahasiswa3', '$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW', 'Budi Santoso', 'user'),
   ('ADMIN001', 'admin', '$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW', 'Administrator', 'admin');
   ```

8. **Tekan Enter**

9. **Verifikasi user sudah ada:**
   ```sql
   SELECT * FROM users;
   ```

10. **Tekan Enter**

    **Expected:**
    ```
    | id | nim      | username   | password | nama           | role  |
    | 1  | 2021001  | mahasiswa1 | $2b$... | Andi Pratama   | user  |
    | 2  | 2021002  | mahasiswa2 | $2b$... | Siti Nurhaliza | user  |
    | 3  | 2021003  | mahasiswa3 | $2b$... | Budi Santoso   | user  |
    | 4  | ADMIN001 | admin      | $2b$... | Administrator | admin |
    ```

11. **Ketik:** `exit` → **Enter** (tutup MySQL)

✅ **Database sudah setup!**

---

## 🟣 STEP 4: Jalankan Backend

1. **Buka File Explorer** → navigasi ke folder proyek

2. **Double-click file:** `RUN.bat`

3. **Command Prompt window akan terbuka, lihat output:**

   **Harusnya muncul:**
   ```
   ✅ Database terkoneksi: digilib
   
   ╔════════════════════════════════════════════╗
   ║  DIGILIB UMBRES - Backend Server          ║
   ╠════════════════════════════════════════════╣
   ║  🚀 Server berjalan pada: http://localhost:3000
   ║  📧 Database: digilib
   ║  👤 Database User: root
   ╚════════════════════════════════════════════╝
   
   Available Endpoints:
     GET  http://localhost:3000/           → Health check
     POST http://localhost:3000/register   → Daftar user baru
     POST http://localhost:3000/login      → Login
   ```

4. **Jangan tutup window ini!** Backend harus terus berjalan

✅ **Backend sudah running!**

---

## 🟠 STEP 5: Test Backend (Optional tapi recommended)

Buka window Command Prompt BARU (jangan tutup RUN.bat window):

```
curl http://localhost:3000
```

**Expected output:**
```json
{
  "message": "DIGILIB UMBRES backend berjalan",
  "timestamp": "2026-05-31T...",
  "port": 3000
}
```

**Jika error "connection refused":**
- Backend RUN.bat window tidak berjalan dengan baik
- Lihat error message di RUN.bat window
- Screenshot error
- Baca troubleshooting di bawah

---

## 🟢 STEP 6: Login Test

1. **Buka Login.html:**
   - File Explorer → double-click `Login.html`
   - Browser akan terbuka

2. **Isi form:**
   - NIM: `2021001`
   - Username: `mahasiswa1`
   - Password: `password123`

3. **Klik tombol:** `Masuk`

4. **Harusnya:**
   - Lihat text hijau: "Login berhasil! Selamat datang, Andi Pratama"
   - Redirect ke dashboard (index.html)

✅ **LOGIN BERHASIL!**

---

## 🆘 TROUBLESHOOTING

### Tidak bisa sampai STEP 1
**Problem:** Node.js error atau tidak bisa dijalankan

**Solusi:**
1. Download Node.js: https://nodejs.org/
2. Install LTS version
3. **RESTART COMPUTER** setelah install
4. Coba lagi

---

### Error saat STEP 2 (SETUP.bat)
**Problem:** SETUP.bat error atau tidak berjalan

**Solusi:**
1. Right-click `SETUP.bat`
2. Klik: `Properties`
3. Di bagian bawah, check box: `✓ Unblock`
4. Klik: `Apply` → `OK`
5. Double-click `SETUP.bat` lagi

---

### Tidak bisa connect ke MySQL
**Problem:** Error "connect ECONNREFUSED 127.0.0.1:3306"

**Solusi:**
1. Cek MySQL service running:
   - Buka: `services.msc`
   - Cari: `MySQL` atau `MySQL80`
   - Status: harus `Running`
   - Jika tidak, klik kanan → `Start`

2. Atau gunakan XAMPP:
   - Buka XAMPP Control Panel
   - Klik Start untuk MySQL
   - Tunggu sampai green checkmark

---

### Backend error "Unknown database 'digilib'"
**Problem:** Database belum dibuat

**Solusi:**
- Jalankan STEP 3 lagi (Setup Database)
- Copy-paste setiap command dengan benar
- Jangan lupa `CREATE DATABASE digilib;` sebelumnya

---

### Backend error "Table 'digilib.users' doesn't exist"
**Problem:** Tabel belum dibuat atau CREATE TABLE error

**Solusi:**
- Buka MySQL: `mysql -u root digilib`
- Jalankan: `source setup.sql;` (jika file ada)
- Atau copy-paste CREATE TABLE command dari STEP 3

---

### Login error "Server tidak merespons"
**Problem:** Backend tidak berjalan

**Solution:**
1. Cek apakah RUN.bat window masih terbuka
2. Cek apakah ada text: "Server berjalan pada http://localhost:3000"
3. Jika tidak, ada error di RUN.bat window?
4. Screenshot error

---

### Login error "NIM, username, atau password salah"
**Problem:** User tidak ditemukan di database

**Solusi:**
1. Buka MySQL: `mysql -u root digilib`
2. Verifikasi user ada: `SELECT * FROM users;`
3. Pastikan NIM dan username PERSIS sama
4. Password: `password123` untuk semua test user

---

## 📋 Checklist Verifikasi

- [ ] Node.js installed (`node --version` = v18+)
- [ ] SETUP.bat sudah dijalankan (dependencies installed)
- [ ] MySQL service running (Services atau XAMPP)
- [ ] Database `digilib` sudah dibuat
- [ ] Tabel `users` sudah dibuat
- [ ] 4 user test sudah diinsert (`SELECT * FROM users;` = 4 rows)
- [ ] RUN.bat berjalan tanpa error
- [ ] http://localhost:3000 = JSON response
- [ ] Login.html bisa login dengan user test
- [ ] Redirect ke index.html berhasil

---

## 🎯 Jika Masih Error Setelah Semua Step

1. **Screenshot error message**
2. **Lihat di RUN.bat window, ada error apa?**
3. **Copy-paste error message**
4. **Baca troubleshooting section**

Jika masih tidak bisa, dokumentasi tersedia:
- `SETUP_BACKEND.md` - Detail penjelasan
- `MANUAL_COMMANDS.md` - Command line manual

---

**IKUTI STEP 1-6 DENGAN PERSIS. SEMUA PASTI LANCAR!** ✅
