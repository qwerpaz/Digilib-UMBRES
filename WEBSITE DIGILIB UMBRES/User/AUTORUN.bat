@echo off
setlocal enabledelayedexpansion
color 0A
cls

echo.
echo ════════════════════════════════════════════════════════════════
echo            DIGILIB UMBRES - AUTORUN SETUP
echo ════════════════════════════════════════════════════════════════
echo.

REM Check if Node.js installed
echo [1/4] Cek Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Node.js belum installed!
    echo.
    echo SOLUSI:
    echo 1. Buka: https://nodejs.org/
    echo 2. Download: LTS version
    echo 3. Install dengan default settings
    echo 4. RESTART COMPUTER
    echo 5. Jalankan script ini lagi
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js OK
echo.

REM Check if npm installed
echo [2/4] Cek NPM...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: NPM belum installed!
    pause
    exit /b 1
)
echo ✅ NPM OK
echo.

REM Check if node_modules exists
echo [3/4] Cek dependencies...
if not exist node_modules (
    echo ⏳ Install dependencies (ini butuh 2-5 menit)...
    call npm install
    if errorlevel 1 (
        echo ❌ ERROR: Gagal install dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies sudah ada
)
echo.

REM Create .env if not exists
echo [4/4] Setup config...
if not exist .env (
    echo ⏳ Buat .env file...
    (
        echo DB_HOST=localhost
        echo DB_USER=root
        echo DB_PASS=
        echo DB_NAME=digilib
        echo PORT=3000
        echo NODE_ENV=development
    ) > .env
    echo ✅ .env file dibuat
) else (
    echo ✅ .env sudah ada
)
echo.

echo ════════════════════════════════════════════════════════════════
echo                    SETUP SELESAI!
echo ════════════════════════════════════════════════════════════════
echo.
echo LANGKAH SELANJUTNYA:
echo.
echo 1. PASTIKAN MYSQL RUNNING:
echo    - Buka: Services (Windows Key+R, ketik services.msc)
echo    - Cari: MySQL80 atau MySQL
echo    - Status harus: Running
echo    - Jika belum, klik kanan: Start
echo.
echo 2. SETUP DATABASE (copy-paste ke MySQL Command Line):
echo.
echo    mysql -u root
echo.
echo    CREATE DATABASE digilib;
echo    USE digilib;
echo.
echo    CREATE TABLE users (
echo      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
echo      nim VARCHAR(32) NOT NULL UNIQUE,
echo      username VARCHAR(64) NOT NULL UNIQUE,
echo      password VARCHAR(255) NOT NULL,
echo      nama VARCHAR(128) NOT NULL,
echo      role ENUM('user','admin') NOT NULL DEFAULT 'user',
echo      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
echo      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
echo      PRIMARY KEY (id)
echo    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
echo.
echo    INSERT INTO users VALUES
echo    (1,'2021001','mahasiswa1','$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW','Andi Pratama','user','2026-05-31 00:00:00','2026-05-31 00:00:00'),
echo    (2,'2021002','mahasiswa2','$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW','Siti Nurhaliza','user','2026-05-31 00:00:00','2026-05-31 00:00:00'),
echo    (3,'2021003','mahasiswa3','$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW','Budi Santoso','user','2026-05-31 00:00:00','2026-05-31 00:00:00'),
echo    (4,'ADMIN001','admin','$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW','Administrator','admin','2026-05-31 00:00:00','2026-05-31 00:00:00');
echo.
echo    SELECT * FROM users;
echo    exit
echo.
echo 3. SETELAH DATABASE SETUP, JALANKAN:
echo    Double-click: START.bat (di folder proyek)
echo.
echo 4. TEST DI BROWSER:
echo    http://localhost:3000
echo.
pause
