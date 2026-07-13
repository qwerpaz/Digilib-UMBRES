# PANDUAN KEAMANAN PASSWORD - DIGILIB UMBRES

## 📋 Daftar Isi
1. [Best Practice Password](#best-practice-password)
2. [Kebijakan Password](#kebijakan-password)
3. [Cara Aman Mengelola Akun](#cara-aman-mengelola-akun)
4. [Enkripsi & Hashing](#enkripsi--hashing)
5. [Implementasi 2FA](#implementasi-2fa)

---

## 🔐 Best Practice Password

### Standar Password Yang Aman:
```
✓ Minimal 12 karakter (lebih panjang = lebih aman)
✓ Kombinasi huruf besar (A-Z)
✓ Kombinasi huruf kecil (a-z)
✓ Kombinasi angka (0-9)
✓ Kombinasi simbol khusus (!@#$%^&*)
✗ Jangan gunakan nama/tanggal lahir
✗ Jangan gunakan username
✗ Jangan gunakan kata yang ada di kamus
✗ Jangan ulangi password di berbagai akun
```

### Contoh Password Yang Aman:
```
❌ Buruk:
   - password123
   - qwerty
   - 12345678
   - username
   - tanggal lahir

✅ Baik:
   - P@ssw0rd2024!Umbres
   - DiGiLib#2024@Secure
   - Umbres$LibraryPass123
   - Secure^Password!2024
```

---

## 👥 Kebijakan Password

### Untuk Mahasiswa:
```
Format: [NIM atau Username]@UmbresLibrary[Tahun]
Contoh: 2021001@UmbresLibrary2024

Atau: [Nama Inisial]_[Bulan Lahir]_[Tahun]_[Kota]
Contoh: AP_03_2003_Bandung
```

### Untuk Administrator:
```
Format: UMBRES_ADMIN_[TanggalBuat]_[KodeUnik]
Contoh: UMBRES_ADMIN_300524_K7X9N

Minimal: 16 karakter dengan kompleksitas tinggi
```

### Kebijakan Pergantian:
- Ganti password setiap 90 hari
- Jangan gunakan 5 password terakhir
- Wajib ubah password saat login pertama kali
- Lock akun setelah 5 percobaan gagal

---

## 🛡️ Cara Aman Mengelola Akun

### Do's (BOLEH):
```
✓ Gunakan password manager (1Password, Bitwarden, KeePass)
✓ Gunakan password yang unik untuk setiap akun
✓ Aktifkan 2FA/MFA (Two-Factor Authentication)
✓ Logout setelah selesai menggunakan
✓ Update password secara berkala
✓ Gunakan HTTPS untuk koneksi
✓ Cek browser sebelum login (pastikan URL benar)
✓ Catat recovery code jika ada
✓ Aktifkan notification untuk login baru
```

### Dont's (JANGAN):
```
✗ Jangan share password dengan orang lain
✗ Jangan tulis password di kertas/sticky note
✗ Jangan simpan password di file text
✗ Jangan gunakan password yang sama di berbagai situs
✗ Jangan login di komputer orang lain
✗ Jangan login di WiFi publik tanpa VPN
✗ Jangan klik link login dari email (bisa phishing)
✗ Jangan izinkan "Remember password" di browser
✗ Jangan buka email/SMS berisi password saat login
```

---

## 🔒 Enkripsi & Hashing

### Perbedaan Enkripsi vs Hashing:
```
ENKRIPSI:
- Input → [Proses] → Output (bisa di-decrypt)
- Dua arah (reversible)
- Contoh: AES-256, RSA

HASHING:
- Input → [Proses] → Output (tidak bisa di-decrypt)
- Satu arah (irreversible)
- Contoh: SHA-256, bcrypt, scrypt
```

### Implementasi Password Hashing (Node.js + bcrypt):

#### Install bcrypt:
```bash
npm install bcrypt dotenv express mysql2
```

> File backend yang sudah dibuat: `server.js`, `db.js`, dan `mysql_schema.sql`.

#### Hash password saat registrasi:
```javascript
const bcrypt = require('bcrypt');

// Hash password
async function hashPassword(password) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Simpan ke database MySQL:
// const hashedPassword = await hashPassword(inputPassword);
// INSERT INTO users (nim, username, password, nama, role) VALUES (..., hashedPassword, ...);
```

#### Verifikasi saat login:
```javascript
// Saat login, bandingkan password input dengan hash di database
async function verifyPassword(inputPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
}

// Gunakan:
if (await verifyPassword(inputPassword, storedHashedPassword)) {
    console.log('Login berhasil!');
} else {
    console.log('Password salah!');
}
```

#### Contoh Database User dengan Hash:
```json
{
    "users": [
        {
            "id": 1,
            "nim": "2021001",
            "username": "mahasiswa1",
            "password": "$2b$10$xyz.hashed.password.here",
            "email": "mahasiswa1@umbres.ac.id",
            "role": "user",
            "nama": "Andi Pratama"
        }
    ]
}
```

### Algoritma Hashing Terbaik (Ranking):
1. **bcrypt** ⭐⭐⭐⭐⭐ - Paling aman, adaptif
2. **scrypt** ⭐⭐⭐⭐ - Sangat aman, memory-intensive
3. **argon2** ⭐⭐⭐⭐⭐ - Modern, sangat aman
4. **PBKDF2** ⭐⭐⭐ - Cukup aman, standard
5. **SHA-256** ⭐ - Tidak boleh untuk password (sudah deprecated)

---

## 🔑 Implementasi 2FA (Two-Factor Authentication)

### Metode 2FA:

#### 1. OTP (One-Time Password) via Authenticator App:
```javascript
// Menggunakan library speakeasy
npm install speakeasy qrcode

const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate secret untuk user
function generate2FASecret(userEmail) {
    const secret = speakeasy.generateSecret({
        name: `DIGILIB UMBRES (${userEmail})`,
        issuer: 'DIGILIB UMBRES',
        length: 32
    });
    
    return secret;
}

// Generate QR Code
async function generateQRCode(secret) {
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    return qrCodeUrl;
}

// Verifikasi OTP saat login
function verifyOTP(userSecret, inputOTP) {
    const verified = speakeasy.totp.verify({
        secret: userSecret,
        encoding: 'base32',
        token: inputOTP,
        window: 2
    });
    
    return verified;
}
```

#### 2. OTP via SMS:
```javascript
// Menggunakan Twilio
const twilio = require('twilio');

const accountSid = 'your_twilio_sid';
const authToken = 'your_twilio_token';
const client = twilio(accountSid, authToken);

// Generate random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Kirim OTP via SMS
async function sendOTPviaSMS(phoneNumber, otp) {
    try {
        const message = await client.messages.create({
            body: `Kode verifikasi DIGILIB UMBRES: ${otp}. Berlaku 5 menit.`,
            from: '+1234567890',
            to: phoneNumber
        });
        return message.sid;
    } catch (error) {
        console.error('Gagal mengirim SMS:', error);
    }
}

// Verifikasi OTP dari SMS
function verifyOTPfromSMS(inputOTP, storedOTP, expiryTime) {
    const now = Date.now();
    
    if (now > expiryTime) {
        return { success: false, message: 'OTP sudah kadaluarsa' };
    }
    
    if (inputOTP === storedOTP) {
        return { success: true, message: 'OTP valid' };
    }
    
    return { success: false, message: 'OTP salah' };
}
```

#### 3. Email OTP:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_app_password'
    }
});

async function sendOTPviaEmail(email, otp) {
    const mailOptions = {
        from: 'noreply@digilib-umbres.ac.id',
        to: email,
        subject: 'Kode Verifikasi DIGILIB UMBRES',
        html: `
            <h2>Verifikasi Login Anda</h2>
            <p>Gunakan kode berikut untuk login:</p>
            <h3 style="color: #001f3f;">${otp}</h3>
            <p>Kode berlaku selama 10 menit.</p>
            <p><small>Jika ini bukan permintaan Anda, abaikan email ini.</small></p>
        `
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}
```

### Flow Login dengan 2FA:
```
┌─────────────────────────────────────────┐
│  User buka Login.html                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Input: NIM, Username, Password         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Sistem verifikasi NIM + Username +     │
│  Password                               │
└──────────────┬──────────────────────────┘
               │
          ┌────┴────┐
          │          │
         ✓           ✗
         │           │
         ▼           ▼
    ┌────────┐    ┌──────────┐
    │ Step 2 │    │  ERROR   │
    │ 2FA    │    │ Kembali  │
    │        │    │ Login    │
    └────┬───┘    └──────────┘
         │
         ▼
    ┌────────────────┐
    │ Input OTP dari │
    │ Authenticator/ │
    │ SMS/Email      │
    └────┬───────────┘
         │
         ▼
    ┌────────────────┐
    │ Verifikasi OTP │
    └────┬───────────┘
         │
    ┌────┴────┐
    │          │
   ✓           ✗
   │           │
   ▼           ▼
┌──────┐   ┌──────────┐
│LOGIN │   │ ERROR: OTP│
│ OK   │   │ salah    │
└──────┘   └──────────┘
```

---

## 📊 Rekomendasi Implementasi

### Fase 1 (Sekarang):
- ✅ Validasi NIM + Username + Password
- ✅ Password hashing dengan bcrypt
- ✅ Session management
- ✅ HTTPS enforcement

### Fase 2 (Segera):
- ⏳ Implementasi 2FA (OTP Authenticator)
- ⏳ Rate limiting untuk login attempts
- ⏳ Audit log untuk semua login/logout
- ⏳ Email verification untuk forgot password

### Fase 3 (Jangka Panjang):
- 📋 Biometric authentication (fingerprint)
- 📋 Single Sign-On (SSO) dengan LDAP/AD
- 📋 WebAuthn/FIDO2
- 📋 Risk-based authentication

---

## 🚨 Respons Jika Password Terkompromi

1. **Segera ganti password**
2. **Check aktivitas login** - Cek dari perangkat apa saja password digunakan
3. **Logout semua session** - Hapus session dari perangkat lain
4. **Hubungi administrator** - Report jika ada akses tidak sah
5. **Periksa email pemulihan** - Pastikan email recovery masih aman
6. **Aktifkan 2FA** - Tambah lapisan keamanan

---

## 📞 Kontak Security

Jika menemukan vulnerability atau masalah keamanan:
- Email: security@digilib-umbres.ac.id
- Report ke administrator Digilib Umbres

---

**Keamanan adalah tanggung jawab kita bersama!** 🔐
