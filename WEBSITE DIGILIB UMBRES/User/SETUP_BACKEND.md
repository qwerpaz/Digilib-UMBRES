# Panduan Setup & Troubleshooting Backend DIGILIB UMBRES

## 🚀 Quick Start - Setup Backend

### ✅ Step 1: Install MySQL Server
Pastikan MySQL sudah terinstall di komputer:
```bash
# Windows - Download MySQL Community Server dari:
# https://dev.mysql.com/downloads/mysql/

# Atau gunakan XAMPP yang sudah include MySQL
# Download: https://www.apachefriends.org/
```

### ✅ Step 2: Start MySQL Service
```bash
# Windows - Buka Services (services.msc) dan cari "MySQL"
# Pastikan status = "Running"

# Atau buka Command Prompt dan jalankan:
net start MySQL80

# Untuk XAMPP: Buka XAMPP Control Panel → Start MySQL
```

### ✅ Step 3: Buat Database & Import Schema
```bash
# 1. Buka Command Prompt
# 2. Masuk ke folder proyek:
cd C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres

# 3. Login ke MySQL:
mysql -u root

# 4. Buat database:
CREATE DATABASE digilib;
USE digilib;

# 5. Import schema:
source mysql_schema.sql;

# 6. Verifikasi tabel sudah dibuat:
SHOW TABLES;
DESCRIBE users;
```

### ✅ Step 4: Setup Node.js Backend

#### 4.1 Install Node.js
Download dari: https://nodejs.org/
- Pilih versi LTS (Long Term Support)

#### 4.2 Instal Dependencies
```bash
# Di folder proyek, buka Command Prompt:
cd C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres

# Install semua package:
npm install

# Output harusnya:
# npm WARN save peer dep missing for ...
# added X packages in Ys
```

#### 4.3 Buat File .env
Buat file `.env` di folder proyek dengan isi:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=digilib
PORT=3000
```

> **Catatan**: Jika MySQL password Anda bukan kosong, ubah `DB_PASS=password_anda`

#### 4.4 Jalankan Backend
```bash
npm start

# Output yang benar harusnya:
# Server backend DIGILIB UMBRES berjalan pada http://localhost:3000
```

---

## 🔍 Cara Periksa Backend Berjalan

### ✅ Method 1: Cek di Browser
1. Buka browser
2. Ketik di address bar: `http://localhost:3000`
3. Harusnya muncul JSON response:
```json
{
  "message": "DIGILIB UMBRES backend berjalan"
}
```

### ✅ Method 2: Cek di Command Prompt
Buka terminal baru (jangan tutup terminal backend):
```bash
# Menggunakan curl:
curl http://localhost:3000

# Atau menggunakan PowerShell:
Invoke-WebRequest -Uri http://localhost:3000 -Method GET | ConvertTo-Json
```

### ✅ Method 3: Cek Port 3000 Aktif
```bash
# Windows PowerShell:
netstat -ano | findstr :3000

# Output: 
# TCP    127.0.0.1:3000    0.0.0.0:0    LISTENING    12345

# Jika ada output, berarti port 3000 sudah terpakai
```

---

## 🗄️ Verifikasi Database Setup

### ✅ Cek Koneksi Database
```bash
# Login ke MySQL:
mysql -u root -p digilib

# Lihat tabel users:
SELECT * FROM users;

# Harusnya kosong atau berisi data user yang sudah didaftarkan
```

### ✅ Insert Test Data Langsung
```sql
INSERT INTO users (nim, username, password, nama, role) VALUES 
('2021001', 'mahasiswa1', '$2b$12$...hashed_password...', 'Andi Pratama', 'user');
```

> **Penting**: Password harus sudah ter-hash dengan bcrypt, bukan plain text!

---

## 🧪 Test Login dengan Backend

### ✅ Test 1: Register User Baru
```bash
# Buka PowerShell atau Command Prompt:

# Gunakan curl:
curl -X POST http://localhost:3000/register ^
  -H "Content-Type: application/json" ^
  -d "{\"nim\":\"2021001\",\"username\":\"mahasiswa1\",\"password\":\"password123\",\"nama\":\"Andi Pratama\"}"

# Atau gunakan Postman:
# 1. Buka Postman
# 2. POST http://localhost:3000/register
# 3. Body (raw JSON):
{
  "nim": "2021001",
  "username": "mahasiswa1",
  "password": "password123",
  "nama": "Andi Pratama"
}
```

### ✅ Test 2: Login dengan Credential
```bash
# Login test:
curl -X POST http://localhost:3000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"nim\":\"2021001\",\"username\":\"mahasiswa1\",\"password\":\"password123\"}"

# Response sukses:
{
  "message": "Login berhasil.",
  "user": {
    "id": 1,
    "nim": "2021001",
    "username": "mahasiswa1",
    "nama": "Andi Pratama",
    "role": "user"
  }
}
```

---

## 🐛 Troubleshooting

### ❌ Error: "Server tidak merespons"
**Penyebab**: Backend tidak berjalan atau belum di-start

**Solusi**:
```bash
# 1. Pastikan sudah di folder proyek:
cd C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres

# 2. Cek apakah npm packages sudah install:
npm list

# 3. Jalankan backend:
npm start

# 4. Lihat di console:
# Output: "Server backend DIGILIB UMBRES berjalan pada http://localhost:3000"
```

### ❌ Error: "connect ECONNREFUSED 127.0.0.1:3000"
**Penyebab**: Koneksi ke backend ditolak, port tidak aktif

**Solusi**:
```bash
# 1. Cek apakah ada proses yang menggunakan port 3000:
netstat -ano | findstr :3000

# 2. Jika ada, kill prosesnya:
taskkill /PID 12345 /F

# 3. Jalankan backend lagi:
npm start
```

### ❌ Error: "connect ECONNREFUSED 127.0.0.1:3306" (MySQL)
**Penyebab**: MySQL service tidak berjalan

**Solusi**:
```bash
# 1. Cek apakah MySQL service aktif:
net start MySQL80

# 2. Atau gunakan XAMPP:
# - Buka XAMPP Control Panel
# - Klik "Start" untuk MySQL

# 3. Verifikasi MySQL berjalan:
mysql -u root
```

### ❌ Error: "Access denied for user 'root'@'localhost'"
**Penyebab**: Password MySQL salah di file `.env`

**Solusi**:
```bash
# 1. Check password MySQL Anda:
# - Jika tidak ada password: DB_PASS=
# - Jika ada password: DB_PASS=password_anda

# 2. Update file .env:
# DB_PASS=password_anda

# 3. Restart backend:
npm start
```

### ❌ Error: "Unknown database 'digilib'"
**Penyebab**: Database belum dibuat

**Solusi**:
```bash
# 1. Login MySQL:
mysql -u root

# 2. Buat database:
CREATE DATABASE digilib;

# 3. Import schema:
USE digilib;
source mysql_schema.sql;

# 4. Restart backend:
npm start
```

### ❌ Error: "Table 'digilib.users' doesn't exist"
**Penyebab**: Schema belum diimport

**Solusi**:
```bash
# 1. Login MySQL:
mysql -u root digilib

# 2. Import schema:
source mysql_schema.sql;

# 3. Verifikasi:
SHOW TABLES;
DESCRIBE users;
```

### ❌ Login gagal dengan error "Login gagal. Coba lagi."
**Penyebab**: Username/NIM/Password tidak sesuai di database

**Solusi**:
```bash
# 1. Cek data di database:
mysql -u root digilib
SELECT * FROM users;

# 2. Jika belum ada user, register baru:
# Gunakan POST /register endpoint

# 3. Atau insert langsung (password harus ter-hash):
# Gunakan online bcrypt generator: https://bcrypt-generator.com/
```

---

## 📋 Checklist Setup Lengkap

- [ ] MySQL Server sudah terinstall
- [ ] MySQL Service sudah running (`net start MySQL80`)
- [ ] Database `digilib` sudah dibuat
- [ ] Schema `mysql_schema.sql` sudah diimport
- [ ] Node.js sudah terinstall
- [ ] Folder proyek dibuka di Command Prompt
- [ ] `npm install` sudah dijalankan (folder `node_modules` ada)
- [ ] File `.env` sudah dibuat dengan konfigurasi benar
- [ ] Backend sudah running dengan `npm start`
- [ ] Test di browser: `http://localhost:3000` → JSON response
- [ ] User sudah dibuat di database (via register atau insert manual)
- [ ] Login di `Login.html` berhasil dan redirect ke dashboard

---

## 🎯 Proses Login Lengkap

```
┌──────────────┐
│  Login.html  │
│   (Frontend) │
└──────┬───────┘
       │
       │ User input: NIM, Username, Password
       │
       ▼
┌─────────────────────────────┐
│  fetch POST /login          │
│  dengan JSON data           │
└──────┬──────────────────────┘
       │
       ▼ (Network Request)
┌─────────────────────────────┐
│     server.js (Port 3000)   │
│     Backend Node.js         │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Query Database MySQL       │
│  SELECT * FROM users       │
│  WHERE username = ?        │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  bcrypt.compare()           │
│  Verifikasi password hash   │
└──────┬──────────────────────┘
       │
  ┌────┴────┐
  │          │
✓ Cocok     ✗ Tidak Cocok
  │          │
  ▼          ▼
┌──────┐   ┌────────────┐
│ OK   │   │   ERROR    │
│JSON  │   │   JSON     │
└──┬───┘   └──────┬─────┘
   │              │
   │ Response     │ Response
   ▼              ▼
┌─────────────────────────────┐
│     Browser                 │
│   localStorage.setItem()    │
│   Redirect index.html       │
└─────────────────────────────┘
```

---

## 📞 Jika Masih Error

1. **Check console backend** - Lihat pesan error di terminal
2. **Check browser console** - F12 → Console → lihat error
3. **Cek network tab** - F12 → Network → lihat response API
4. **Gunakan Postman** - Test API endpoint langsung
5. **Check database** - Pastikan user sudah ada di MySQL

---

**Backend setup selesai! Login sekarang akan terhubung ke MySQL.** 🎉
