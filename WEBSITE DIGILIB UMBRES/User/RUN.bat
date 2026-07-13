@echo off
color 0A
cls
title DIGILIB UMBRES - Backend Server
echo.
echo ================================================================
echo   DIGILIB UMBRES - Backend Server
echo ================================================================
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo [ERROR] Dependencies belum diinstall!
    echo Jalankan SETUP.bat terlebih dahulu
    echo.
    pause
    exit /b 1
)

REM Check if .env exists
if not exist .env (
    echo [WARNING] File .env tidak ditemukan, menggunakan default config
    echo.
)

echo Memulai server...
echo.
npm start
