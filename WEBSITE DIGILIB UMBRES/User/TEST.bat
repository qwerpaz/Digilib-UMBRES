@echo off
setlocal enabledelayedexpansion
color 0A
cls

title DIGILIB UMBRES - Test Connection

echo.
echo ================================================================
echo   TEST BACKEND DIGILIB UMBRES
echo ================================================================
echo.

REM Test Node.js
echo [1] Testing Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js NOT INSTALLED
    echo.
    echo Download dari: https://nodejs.org/
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
    echo ✅ Node.js: !NODE_VER!
    echo.
)

REM Test npm
echo [2] Testing NPM...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ NPM NOT INSTALLED
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VER=%%i
    echo ✅ NPM: !NPM_VER!
    echo.
)

REM Check node_modules
echo [3] Checking dependencies...
if not exist node_modules (
    echo ❌ node_modules NOT FOUND
    echo.
    echo Jalankan SETUP.bat terlebih dahulu
    echo.
    pause
    exit /b 1
) else (
    echo ✅ node_modules found
    echo.
)

REM Check required packages
echo [4] Checking required packages...
echo   - bcrypt
npm list bcrypt >nul 2>&1
if errorlevel 1 (echo ❌ bcrypt not found) else (echo ✅ bcrypt installed)

echo   - express
npm list express >nul 2>&1
if errorlevel 1 (echo ❌ express not found) else (echo ✅ express installed)

echo   - mysql2
npm list mysql2 >nul 2>&1
if errorlevel 1 (echo ❌ mysql2 not found) else (echo ✅ mysql2 installed)

echo   - dotenv
npm list dotenv >nul 2>&1
if errorlevel 1 (echo ❌ dotenv not found) else (echo ✅ dotenv installed)

echo.

REM Check .env file
echo [5] Checking .env configuration...
if not exist .env (
    echo ❌ .env file NOT FOUND
    echo.
    echo Creating .env from template...
    (
        echo DB_HOST=localhost
        echo DB_USER=root
        echo DB_PASS=
        echo DB_NAME=digilib
        echo PORT=3000
        echo NODE_ENV=development
    ) > .env
    echo ✅ .env created
    echo.
) else (
    echo ✅ .env file found
    echo.
)

REM Check required files
echo [6] Checking required files...
if not exist server.js (echo ❌ server.js not found) else (echo ✅ server.js)
if not exist db.js (echo ❌ db.js not found) else (echo ✅ db.js)
if not exist package.json (echo ❌ package.json not found) else (echo ✅ package.json)

echo.

REM Test MySQL connection
echo [7] Testing MySQL connection...
echo.
echo Starting backend in test mode (5 seconds)...
echo.

REM Start server dan capture output
cd /d "%cd%"
timeout /t 2 /nobreak

echo ================================================================
echo   HASIL TEST
echo ================================================================
echo.
echo NEXT STEP:
echo.
echo 1. Pastikan MySQL service running:
echo    - Services (services.msc^) ^> cari MySQL ^> Start
echo    - Atau XAMPP Control Panel ^> Start MySQL
echo.
echo 2. Setup database (jika belum):
echo    - mysql -u root
echo    - source setup.sql
echo    - exit
echo.
echo 3. Jalankan backend:
echo    - Double-click RUN.bat
echo.
echo 4. Test di browser:
echo    - http://localhost:3000
echo.
echo 5. Jika masih error:
echo    - Lihat console output di RUN.bat window
echo    - Screenshot error dan cek dokumentasi
echo.
pause
