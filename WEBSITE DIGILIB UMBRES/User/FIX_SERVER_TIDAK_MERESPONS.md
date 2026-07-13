# 🔴 ERROR: Server tidak merespons

Jika login error seperti gambar, ikuti ini:

---

## SOLUSI CEPAT (Pilih satu)

### ❌ Error: "Server tidak merespons"

**Penyebab:** Backend belum berjalan

**Fix:**

1. **Double-click:** `DIAGNOSE.bat`
   - Lihat output ada error apa?
   - Screenshot jika ada ❌

2. **Jika DIAGNOSE output semua ✅:**
   - Double-click: `RUN.bat`
   - Tunggu sampai lihat: `Server berjalan pada http://localhost:3000`
   - **JANGAN tutup window ini**

3. **Buka Login.html lagi:**
   - Login dengan:
     - NIM: `2021001`
     - Username: `mahasiswa1`
     - Password: `password123`

---

## JIKA MASIH ERROR

Lihat output DIAGNOSE.bat atau RUN.bat, ada error apa?

### Error: "Node modules not found"
```
1. Double-click: SETUP.bat
2. Tunggu sampai selesai
3. Double-click: DIAGNOSE.bat lagi
```

### Error: "Database connection failed"
```
1. Buka Command Prompt: Windows Key + R → cmd
2. Ketik: mysql -u root
3. Ketik: CREATE DATABASE digilib;
4. Ketik: USE digilib;
5. Copy-paste dari PANDUAN_SUPER_DETAIL.md STEP 3
6. Double-click: DIAGNOSE.bat lagi
```

### Error: "MySQL service not running"
```
1. Buka: services.msc (Windows Key + R → services.msc)
2. Cari: MySQL atau MySQL80
3. Klik kanan: Start
4. Double-click: DIAGNOSE.bat lagi
```

---

## QUICK CHECKLIST

Sebelum login, pastikan:
- [ ] Jalankan: DIAGNOSE.bat (lihat output)
- [ ] Jalankan: RUN.bat (lihat "Server berjalan")
- [ ] Buka: http://localhost:3000 (lihat JSON)
- [ ] Buka: Login.html (coba login)

---

## SUPPORT

1. **Screenshot error**
2. **Lihat console output** (DIAGNOSE.bat atau RUN.bat window)
3. **Baca:** PANDUAN_SUPER_DETAIL.md (TROUBLESHOOTING)

---

**Jalankan DIAGNOSE.bat dulu untuk identify masalah!** 🎯
