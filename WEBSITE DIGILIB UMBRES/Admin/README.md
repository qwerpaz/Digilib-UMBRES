# DIGILIB UMBRES - Perpustakaan Digital

Website perpustakaan digital yang responsif dan modern, dibuat dengan HTML, CSS, dan JavaScript murni.

## ✨ Fitur Utama

✅ **Dashboard** - Halaman utama dengan statistik perpustakaan
✅ **Koleksi Buku** - Daftar semua buku di perpustakaan
✅ **Transaksi Pinjam** - Riwayat peminjaman buku
✅ **Denda** - Kelola denda keterlambatan
✅ **Laporan** - Laporan harian, bulanan, tahunan
✅ **Pengaturan** - Pengaturan umum perpustakaan
✅ **Sidebar Navigasi** - Navigasi yang mudah dan intuitif
✅ **Responsive Design** - Cocok untuk desktop, tablet, dan mobile
✅ **Search Box** - Pencarian buku dan data
✅ **User Profile** - Tampilan profil user
✅ **Mobile Menu** - Menu hamburger untuk mobile
✅ **Smooth Animations** - Transisi halus antar halaman
✅ **Notification System** - Sistem notifikasi interaktif
✅ **Loading States** - Indikator loading untuk actions

## 🎨 Desain

- **Warna Utama**: Navy Blue (#1a2a4e) untuk sidebar
- **Warna Aksen**: Blue (#3498db) untuk tombol dan highlight
- **Typography**: Segoe UI untuk tampilan modern
- **Animasi**: Smooth transitions dan hover effects
- **Shadow & Depth**: Material Design principles

## 🚀 Cara Menjalankan

### 🟢 **Cara 1: Buka Langsung di Browser (Tercepat)**
1. Buka **File Explorer** (Windows + E)
2. Navigasi ke: `C:\Users\User\Documents\indra\perpustakaan`
3. Double-click file **`index.html`**
4. Website akan langsung terbuka di browser Anda ✨

---

### 🟡 **Cara 2: Gunakan Live Server (Recommended)**
Keuntungan: Auto refresh saat edit file

**Langkah:**
1. Buka folder `perpustakaan` di VS Code
2. Install extension **"Live Server"** (atau buka VS Code → Ctrl+Shift+X → cari "Live Server" → Install)
3. Klik kanan pada `index.html`
4. Pilih **"Open with Live Server"**
5. Browser akan otomatis terbuka di `http://localhost:5500`

---

### 🔵 **Cara 3: Gunakan Python Server**
**Command di Terminal:**

```powershell
# Navigasi ke folder
cd C:\Users\User\Documents\indra\perpustakaan

# Jalankan server (Python 3)
python -m http.server 8000
```

Lalu buka browser: **`http://localhost:8000`**

---

### ✅ **Rekomendasi Saya:**
- **Untuk development**: Gunakan **Live Server** (Cara 2) ← Paling nyaman!
- **Untuk testing cepat**: Cara 1 (buka langsung)
- **Untuk deploy**: Cara 3 (Python server)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔧 Customization

### Mengubah Warna
Buka `styles.css` dan edit CSS variables:
```css
:root {
    --primary-color: #1a2a4e;    /* Warna sidebar */
    --accent-color: #3498db;      /* Warna tombol */
    --success: #27ae60;           /* Warna hijau */
    --warning: #f39c12;           /* Warna kuning */
    --danger: #e74c3c;            /* Warna merah */
}
```

### Menambah Menu Sidebar
1. Buka `index.html`
2. Di section `<nav class="nav-menu">`, tambahkan:
```html
<a href="#nama-halaman" class="nav-item" data-page="nama-halaman">
    <i class="fas fa-icon-name"></i>
    <span>Nama Menu</span>
</a>
```

3. Tambahkan halaman baru:
```html
<div id="nama-halaman-page" class="page">
    <h2>Konten Anda</h2>
    <!-- Isi konten di sini -->
</div>
```

## 📂 File Descriptions

### index.html
- Struktur HTML halaman
- Sidebar navigasi
- Header dengan search
- 6 halaman utama (Dashboard, Koleksi, Transaksi, Denda, Laporan, Lainnya)
- Menggunakan Font Awesome untuk ikon

### styles.css
- CSS variables untuk konsistensi warna
- Flexbox dan CSS Grid layout
- Media queries untuk responsive design
- Animasi dan transitions
- Styling tabel, button, badge, card

### script.js
- Navigasi antar halaman dengan smooth transitions
- Search functionality
- Mobile menu dengan overlay
- Notification system
- Loading states
- Event listeners untuk interaktivitas

## 🎯 Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

## 📝 Fitur untuk Dikembangkan ke Depan

- [ ] Database integration
- [ ] User authentication
- [ ] Real-time data updates
- [ ] Export laporan (PDF, Excel)
- [ ] QR Code untuk book scanning
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Book reservation system

## 📚 Resources

- Icons: [Font Awesome 6.4](https://fontawesome.com/)
- Images: [Unsplash](https://unsplash.com/)
- Fonts: [Segoe UI System Font](https://en.wikipedia.org/wiki/Segoe_UI)

## 🐛 Troubleshooting

### Website tidak bisa dibuka?
1. Pastikan file `index.html` ada di folder
2. Coba buka langsung dengan double-click
3. Atau gunakan Live Server extension

### Mobile menu tidak muncul?
1. Resize browser window ke < 768px
2. Atau buka di device mobile

### Navigasi tidak berfungsi?
1. Pastikan file `script.js` ter-load dengan benar
2. Check console browser untuk error messages

## 📧 Support

Untuk pertanyaan atau bantuan, hubungi tim development.

---

Dibuat dengan ❤️ untuk DIGILIB UMBRES
**Status**: ✅ **READY TO USE**