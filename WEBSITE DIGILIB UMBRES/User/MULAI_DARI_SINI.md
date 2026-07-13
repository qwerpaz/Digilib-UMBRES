# ⚡ MULAI DARI SINI ⚡

Jika mendapat error "Server tidak merespons", ikuti panduan ini.

---

## 🎯 Solusi Cepat (3 Langkah)

### Langkah 1: Run Diagnostic Tool
```
1. Buka folder proyek
2. Double-click: DIAGNOSE.bat
3. Tunggu output
```

**Lihat output yang muncul.**

Jika ada ❌ (error), lanjut ke Langkah 2.
Jika semua ✅ (OK), lanjut ke Langkah 3.

---

### Langkah 2: Perbaiki Error (Pilih sesuai error)

#### ❌ "All files OK" = ERROR

**Masalah:** Anda tidak di folder proyek yang benar

**Solusi:**
1. Buka File Explorer
2. Navigasi ke: `C:\Users\User\Documents\indra\PERPUS UMBRES\umbrees perpuss\Digilib umbres`
3. Double-click: `DIAGNOSE.bat` di sini

---

#### ❌ "NOT INSTALLED" (npm modules)

**Masalah:** Dependencies belum diinstall

**Solusi:**
1. Double-click: `SETUP.bat`
2. Tunggu sampai selesai
3. Double-click: `DIAGNOSE.bat` lagi

---

#### ❌ "Database connection failed"

**Masalah:** MySQL tidak running atau database belum dibuat

**Solusi:**

**Option A: Jika belum setup database**
```
1. Buka Command Prompt
2. Ketik: mysql -u root
3. Copy-paste semua commands dari PANDUAN_SUPER_DETAIL.md STEP 3
4. Jalankan: DIAGNOSE.bat lagi
```

**Option B: Jika MySQL tidak running**
```
1. Buka: services.msc (tekan Windows Key + R, ketik services.msc)
2. Cari: MySQL atau MySQL80
3. Klik kanan: Start
4. Tunggu status = Running
5. Jalankan: DIAGNOSE.bat lagi
```

---

### Langkah 3: Jalankan Backend

Jika DIAGNOSE.bat output semua ✅:

```
1. Double-click: RUN.bat
2. Tunggu sampai lihat: "Server berjalan pada http://localhost:3000"
3. Jangan tutup window ini
```

---

## ✅ Test Login

1. **Buka browser:** `http://localhost:3000`
   - Harusnya ada JSON response

2. **Buka Login.html**
   - NIM: `2021001`
   - Username: `mahasiswa1`
   - Password: `password123`
   - Klik Masuk

3. **Harusnya:**
   - ✅ Login berhasil message
   - ✅ Redirect ke dashboard

---

## 📁 File-File Penting

| File | Fungsi |
|------|--------|
| `DIAGNOSE.bat` | 🔍 Check system (JALANKAN DULUAN!) |
| `SETUP.bat` | 📦 Install dependencies (1x saja) |
| `RUN.bat` | 🚀 Jalankan backend |
| `PANDUAN_SUPER_DETAIL.md` | 📖 Panduan lengkap step-by-step |
| `PERBAIKAN_TERBARU.md` | 📖 Penjelasan perubahan |

---

## 🆘 Masih Error Setelah DIAGNOSE?

Jalankan ini di Command Prompt:

```bash
# Test Node.js
node --version

# Test npm
npm --version

# Test npm modules
npm list

# Test MySQL
mysql -u root -e "SELECT 1"
```

Screenshot hasil dan lihat:
- `PANDUAN_SUPER_DETAIL.md` - TROUBLESHOOTING section
- `SETUP_BACKEND.md` - Penjelasan detail

---

## 🎬 Video Tutorial (Jika ada)

Silakan buka:
- `PANDUAN_SUPER_DETAIL.md` - Panduan step-by-step dengan screenshot

---

**JALANKAN DIAGNOSE.bat DULU UNTUK CHECK SETUP!** ⚡
