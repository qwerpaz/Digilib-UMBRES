@echo off
setlocal enabledelayedexpansion
title DIGILIB UMBRES - Quick Help
color 0F
cls

echo.
echo ================================================================
echo   DIGILIB UMBRES - QUICK HELP
echo ================================================================
echo.
echo Pilih opsi:
echo.
echo [1] Setup awal (setup dependencies + database)
echo [2] Jalankan backend (RUN.bat)
echo [3] Test koneksi (DIAGNOSE.bat)
echo [4] Baca dokumentasi
echo [5] Reset semua (delete node_modules)
echo [6] Exit
echo.

set /p choice="Pilih (1-6): "

if "%choice%"=="1" (
    echo.
    echo Jalankan SETUP.bat...
    start SETUP.bat
)

if "%choice%"=="2" (
    echo.
    echo Jalankan RUN.bat...
    echo.
    echo Note: Jangan tutup window ini saat menggunakan aplikasi
    echo.
    timeout /t 2 /nobreak
    call RUN.bat
)

if "%choice%"=="3" (
    echo.
    echo Jalankan DIAGNOSE.bat...
    start DIAGNOSE.bat
)

if "%choice%"=="4" (
    echo.
    echo Dokumentasi yang tersedia:
    echo.
    echo [A] MULAI_DARI_SINI.md - Baca ini duluan jika error
    echo [B] PANDUAN_SUPER_DETAIL.md - Step-by-step lengkap
    echo [C] PERBAIKAN_TERBARU.md - Apa yang sudah diperbaiki
    echo [D] INDEX_FILE_LENGKAP.md - Daftar semua file
    echo [E] Kembali
    echo.
    set /p doc="Pilih (A-E): "
    
    if /i "%doc%"=="A" start notepad MULAI_DARI_SINI.md
    if /i "%doc%"=="B" start notepad PANDUAN_SUPER_DETAIL.md
    if /i "%doc%"=="C" start notepad PERBAIKAN_TERBARU.md
    if /i "%doc%"=="D" start notepad INDEX_FILE_LENGKAP.md
)

if "%choice%"=="5" (
    echo.
    echo Warning: Ini akan menghapus node_modules (dependencies)
    echo Anda harus jalankan SETUP.bat lagi setelahnya
    echo.
    set /p confirm="Yakin? (Y/N): "
    if /i "%confirm%"=="Y" (
        echo.
        echo Menghapus node_modules...
        rmdir /s /q node_modules
        echo Done!
        echo Jalankan: SETUP.bat
    )
)

if "%choice%"=="6" (
    exit /b 0
)

echo.
pause
