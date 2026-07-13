@echo off
color 0A
cls
echo.
echo ================================================================
echo   SETUP DIGILIB UMBRES - BACKEND NODE.JS + MySQL
echo ================================================================
echo.
timeout /t 2 /nobreak

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js belum terinstall!
    echo Silakan download dari: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js terinstall: 
node --version
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] NPM belum terinstall!
    pause
    exit /b 1
)

echo [OK] NPM terinstall:
npm --version
echo.

REM Check if package.json exists
if not exist package.json (
    echo [ERROR] package.json tidak ditemukan!
    echo Pastikan Anda berada di folder proyek yang benar.
    pause
    exit /b 1
)

echo [OK] package.json ditemukan
echo.

REM Install dependencies
echo ================================================================
echo   STEP 1: Install Dependencies
echo ================================================================
echo.
call npm install

if errorlevel 1 (
    echo.
    echo [ERROR] Gagal install dependencies!
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies berhasil diinstall
echo.

REM Check if .env exists
if not exist .env (
    echo [WARNING] File .env tidak ditemukan
    echo Membuat file .env baru...
    (
        echo DB_HOST=localhost
        echo DB_USER=root
        echo DB_PASS=
        echo DB_NAME=digilib
        echo PORT=3000
        echo NODE_ENV=development
    ) > .env
    echo [OK] File .env sudah dibuat
    echo.
)

echo ================================================================
echo   SETUP SELESAI!
echo ================================================================
echo.
echo Langkah selanjutnya:
echo.
echo 1. Pastikan MySQL service sudah berjalan:
echo    - Buka Services (services.msc^)
echo    - Cari "MySQL" dan pastikan status = Running
echo.
echo 2. Buat database (jika belum ada^):
echo    - Buka Command Prompt
echo    - Ketik: mysql -u root
echo    - Ketik: CREATE DATABASE digilib;
echo    - Ketik: USE digilib;
echo    - Ketik: source mysql_schema.sql;
echo    - Ketik: exit
echo.
echo 3. Jalankan backend:
echo    - Ketik: npm start
echo.
echo 4. Test di browser:
echo    - Buka: http://localhost:3000
echo    - Harusnya ada JSON response
echo.
pause
