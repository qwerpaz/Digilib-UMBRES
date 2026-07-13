# Manual Command Line Setup (Alternative)

Jika SETUP.bat atau RUN.bat tidak bekerja, gunakan command line manual.

## Step 1: Install Dependencies

**Buka Command Prompt atau PowerShell:**

```bash
# Navigasi ke folder proyek
cd "C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres"

# Install dependencies
npm install

# Tunggu selesai (2-5 menit)
```

---

## Step 2: Setup Database MySQL

**Buka MySQL Command Line:**

```bash
# Login ke MySQL (tanpa password jika default)
mysql -u root

# Atau jika ada password:
mysql -u root -p
(masukkan password)

# Buat database dan import schema:
CREATE DATABASE digilib;
USE digilib;
source setup.sql;

# Verifikasi
SELECT * FROM users;
DESCRIBE users;

# Keluar
exit
```

**Atau gunakan tools grafis (phpMyAdmin/MySQL Workbench):**
1. Buat database baru: `digilib`
2. Import file: `setup.sql`
3. Verifikasi 4 user sudah ada di tabel `users`

---

## Step 3: Jalankan Backend

**Command Prompt / PowerShell:**

```bash
# Pastikan berada di folder proyek
cd "C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres"

# Jalankan server
npm start

# Output yang benar:
# ╔════════════════════════════════════════════╗
# ║  DIGILIB UMBRES - Backend Server          ║
# ╠════════════════════════════════════════════╣
# ║  🚀 Server berjalan pada: http://localhost:3000
# ...
```

**Jangan tutup window ini selama menggunakan aplikasi!**

---

## Step 4: Test Backend

**Buka terminal/PowerShell baru** (jangan tutup backend):

```bash
# Test endpoint /
curl http://localhost:3000

# Test register
curl -X POST http://localhost:3000/register ^
  -H "Content-Type: application/json" ^
  -d "{\"nim\":\"2021004\",\"username\":\"test\",\"password\":\"test123\",\"nama\":\"Test User\"}"

# Test login
curl -X POST http://localhost:3000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"nim\":\"2021001\",\"username\":\"mahasiswa1\",\"password\":\"password123\"}"

# Response yang benar untuk login:
# {"success":true,"message":"Login berhasil.","user":{...}}
```

---

## Troubleshooting Command Line

### "mysql command not found"
```
MySQL belum di-add ke PATH
Solusi:
1. Gunakan full path: C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql
2. Atau cari direktori MySQL dan add ke PATH
3. Restart Command Prompt
```

### "npm not found"
```
Node.js belum terinstall atau belum di-restart setelah install
Solusi:
1. Download Node.js dari https://nodejs.org/
2. Install dan restart computer
3. Cek: node --version
```

### "Cannot find module 'mysql2'"
```
Dependencies belum terinstall
Solusi:
1. Pastikan di folder proyek: cd "C:\Users\..."
2. Jalankan: npm install
3. Tunggu selesai
```

### "connect ECONNREFUSED" (Port 3000)
```
Backend sudah berjalan di port lain atau error
Solusi:
1. Check apakah sudah ada proses di port 3000:
   netstat -ano | findstr :3000
   
2. Jika ada, kill prosesnya:
   taskkill /PID <PID> /F
   
3. Jalankan backend lagi:
   npm start
```

### "connect ECONNREFUSED 127.0.0.1:3306" (MySQL)
```
MySQL service tidak running
Solusi:
1. Cek service: net start MySQL80
2. Atau gunakan XAMPP Control Panel
3. Atau buka Services (services.msc) dan start MySQL
```

---

## Verifikasi Setup Lengkap

Jalankan perintah ini untuk check semua dependencies:

```bash
node --version
npm --version
npm list --depth=0

# Harusnya ada:
# ├── bcrypt
# ├── dotenv
# ├── express
# └── mysql2
```

---

## Folder Structure

```
Digilib umbres/
├── server.js            ← Backend API utama
├── db.js                ← MySQL connection
├── Login.html           ← Frontend login
├── index.html           ← Dashboard
├── package.json         ← Dependencies list
├── .env                 ← Database config (sudah ada)
├── setup.sql            ← Database schema
├── SETUP.bat            ← Batch file setup (Windows)
├── RUN.bat              ← Batch file run (Windows)
├── QUICKSTART_WINDOWS.md ← Quick start guide
└── MANUAL_COMMANDS.md   ← File ini
```

---

**Jika masih error, screenshot error message dan tanyakan!** 🎯
