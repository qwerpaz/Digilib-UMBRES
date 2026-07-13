# QUICK START WINDOWS - DIGILIB UMBRES Backend

## 🚀 Setup Tercepat (5 Menit)

### Step 1: Download & Install Node.js
```
1. Buka: https://nodejs.org/
2. Download LTS version
3. Install dengan klik Next sampai selesai
```

### Step 2: Setup Backend (Double-Click)
```
1. Buka File Explorer
2. Navigasi ke: C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres
3. Double-click file: SETUP.bat
4. Tunggu sampai selesai (akan install npm packages)
```

### Step 3: Setup Database
```
1. Buka MySQL Command Line atau XAMPP Control Panel
2. Jalankan perintah:
   mysql -u root
   (tekan Enter jika tidak ada password)

3. Copy-paste command berikut di MySQL:
   source C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres\setup.sql

4. Ketik: exit

SELESAI! Database sudah setup dengan 4 user test.
```

**User Test yang Tersedia:**
```
NIM: 2021001  | Username: mahasiswa1 | Password: password123
NIM: 2021002  | Username: mahasiswa2 | Password: password123
NIM: 2021003  | Username: mahasiswa3 | Password: password123
NIM: ADMIN001 | Username: admin      | Password: password123
```

### Step 4: Jalankan Backend (Double-Click)
```
1. Double-click file: RUN.bat
2. Output di console harusnya:
   ╔════════════════════════════════════════════╗
   ║  DIGILIB UMBRES - Backend Server          ║
   ╠════════════════════════════════════════════╣
   ║  🚀 Server berjalan pada: http://localhost:3000
   ║  📧 Database: digilib
   ║  👤 Database User: root
   ╚════════════════════════════════════════════╝
```

### Step 5: Test Backend
```
1. Buka browser
2. Ketik: http://localhost:3000
3. Harusnya muncul JSON:
   {
     "message": "DIGILIB UMBRES backend berjalan",
     "timestamp": "...",
     "port": 3000
   }

✅ Backend berjalan!
```

### Step 6: Test Login
```
1. Buka Login.html
2. Masukkan:
   NIM: 2021001
   Username: mahasiswa1
   Password: password123
3. Klik Masuk
4. Seharusnya login berhasil dan redirect ke dashboard

✅ MySQL Connected!
```

---

## 🔧 Jika Ada Error

### Error: "Server tidak merespons"
```
1. Pastikan RUN.bat sedang berjalan
2. Cek console RUN.bat, ada error apa?
3. Buka http://localhost:3000 di browser
```

### Error: "Gagal melakukan login"
```
1. Check apakah database sudah setup
2. Buka MySQL Command Line:
   mysql -u root digilib
   SELECT * FROM users;
3. Lihat apakah ada 4 user yang terinsert
```

### Error: "npm not found"
```
Node.js belum terinstall
Download dan install dari: https://nodejs.org/
Restart computer setelah install
```

### Error: MySQL connection failed
```
1. Check apakah MySQL service running
2. Buka Services (services.msc)
3. Cari "MySQL" dan pastikan status = "Running"
4. Jika pakai XAMPP: Buka XAMPP → Click Start MySQL
```

---

## 📝 File-File Penting

- `.env` — Konfigurasi database (sudah dibuat)
- `server.js` — Backend API utama
- `db.js` — Koneksi MySQL
- `SETUP.bat` — Setup dependencies (jalankan 1x)
- `RUN.bat` — Jalankan backend (jalankan setiap ingin start server)
- `setup.sql` — Database setup (jalankan di MySQL)

---

## ✅ Checklist Setup

- [ ] Node.js terinstall
- [ ] SETUP.bat sudah dijalankan
- [ ] MySQL service running
- [ ] setup.sql sudah dijalankan di MySQL
- [ ] RUN.bat berjalan tanpa error
- [ ] Browser http://localhost:3000 = JSON response
- [ ] Login berhasil dengan user test

---

## 🎯 Proses Login Lengkap

```
Login.html (Frontend)
  ↓ (User input NIM, Username, Password)
  ↓
API Call: POST http://localhost:3000/login
  ↓
server.js (Backend)
  ↓ (Query MySQL)
  ↓
Database (MySQL)
  ↓ (Return user data + hashed password)
  ↓
bcrypt.compare() (Verify password)
  ↓
  ├─ ✓ Match → Return user profile
  └─ ✗ No match → Return error
  ↓
Browser (localStorage + Redirect)
  ↓
Dashboard (index.html)
```

---

Selesai! Backend sudah siap digunakan! 🎉
