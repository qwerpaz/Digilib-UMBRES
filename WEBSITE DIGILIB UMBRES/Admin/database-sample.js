// Database Sample Data - DIGILIB UMBRES

// Data Buku
const booksDatabase = [
    {
        id: 1,
        code: 'BK001',
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
        publisher: 'Bentang Pustaka',
        category: 'Fiksi',
        year: 2005,
        stock: 5,
        available: 3,
        location: 'Rak A1',
        isbn: '978-979-8969-10-6'
    },
    {
        id: 2,
        code: 'BK002',
        title: 'Pemrograman Web dengan JavaScript',
        author: 'Kyle Simpson',
        publisher: 'O\'Reilly Media',
        category: 'Teknik',
        year: 2020,
        stock: 8,
        available: 6,
        location: 'Rak B3',
        isbn: '978-1-491-95281-8'
    },
    {
        id: 3,
        code: 'BK003',
        title: 'Sang Pencuri Buku',
        author: 'Markus Zusak',
        publisher: 'Random House',
        category: 'Fiksi',
        year: 2005,
        stock: 3,
        available: 1,
        location: 'Rak A2',
        isbn: '978-0-375-83472-0'
    },
    {
        id: 4,
        code: 'BK004',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publisher: 'Prentice Hall',
        category: 'Referensi',
        year: 2008,
        stock: 6,
        available: 4,
        location: 'Rak C2',
        isbn: '978-0-13-235088-4'
    },
    {
        id: 5,
        code: 'BK005',
        title: 'Database Design Manual',
        author: 'Shirley Pressman',
        publisher: 'Springer',
        category: 'Teknik',
        year: 2019,
        stock: 4,
        available: 2,
        location: 'Rak C4',
        isbn: '978-3-030-25897-5'
    }
];

// Data Pengguna/Anggota
const usersDatabase = [
    {
        id: 1,
        nim: '21001',
        name: 'Aldi Pratama',
        email: 'aldi@umbres.ac.id',
        phone: '081234567890',
        prodi: 'Teknik Informatika',
        faculty: 'Teknik',
        status: 'Aktif',
        registered: '2023-01-15',
        joinYear: 2021,
        limitBooks: 5,
        currentLoans: 2
    },
    {
        id: 2,
        nim: '21002',
        name: 'Siti Nurhaliza',
        email: 'siti@umbres.ac.id',
        phone: '081345678901',
        prodi: 'Manajemen',
        faculty: 'Ekonomi',
        status: 'Aktif',
        registered: '2023-01-20',
        joinYear: 2021,
        limitBooks: 5,
        currentLoans: 1
    },
    {
        id: 3,
        nim: '21003',
        name: 'Budi Santoso',
        email: 'budi@umbres.ac.id',
        phone: '081456789012',
        prodi: 'Teknik Informatika',
        faculty: 'Teknik',
        status: 'Non-Aktif',
        registered: '2023-02-05',
        joinYear: 2021,
        limitBooks: 5,
        currentLoans: 0
    },
    {
        id: 4,
        nim: '22001',
        name: 'Dewi Lestari',
        email: 'dewi@umbres.ac.id',
        phone: '081567890123',
        prodi: 'Sistem Informasi',
        faculty: 'Teknik',
        status: 'Aktif',
        registered: '2023-09-10',
        joinYear: 2022,
        limitBooks: 5,
        currentLoans: 3
    },
    {
        id: 5,
        nim: '22002',
        name: 'Ahmad Hidayat',
        email: 'ahmad@umbres.ac.id',
        phone: '081678901234',
        prodi: 'Akuntansi',
        faculty: 'Ekonomi',
        status: 'Aktif',
        registered: '2023-09-15',
        joinYear: 2022,
        limitBooks: 5,
        currentLoans: 0
    }
];

// Data Peminjaman
const loansDatabase = [
    {
        id: 'L001',
        userId: 1,
        borrower: 'Aldi Pratama',
        bookId: 1,
        book: 'Laskar Pelangi',
        borrowDate: '2024-05-10',
        dueDate: '2024-05-17',
        returnDate: null,
        status: 'Aktif',
        fine: 0,
        notes: ''
    },
    {
        id: 'L002',
        userId: 2,
        borrower: 'Siti Nurhaliza',
        bookId: 2,
        book: 'Pemrograman Web dengan JavaScript',
        borrowDate: '2024-05-08',
        dueDate: '2024-05-15',
        returnDate: null,
        status: 'Terlambat',
        fine: 35000,
        notes: 'Terlambat 9 hari'
    },
    {
        id: 'L003',
        userId: 3,
        borrower: 'Budi Santoso',
        bookId: 4,
        book: 'Clean Code',
        borrowDate: '2024-05-02',
        dueDate: '2024-05-09',
        returnDate: '2024-05-22',
        status: 'Dikembalikan',
        fine: 65000,
        notes: 'Dikembalikan dengan terlambat 13 hari'
    },
    {
        id: 'L004',
        userId: 4,
        borrower: 'Dewi Lestari',
        bookId: 3,
        book: 'Sang Pencuri Buku',
        borrowDate: '2024-05-15',
        dueDate: '2024-05-22',
        returnDate: null,
        status: 'Aktif',
        fine: 0,
        notes: ''
    },
    {
        id: 'L005',
        userId: 1,
        borrower: 'Aldi Pratama',
        bookId: 5,
        book: 'Database Design Manual',
        borrowDate: '2024-05-16',
        dueDate: '2024-05-23',
        returnDate: null,
        status: 'Aktif',
        fine: 0,
        notes: ''
    }
];

// Data Pengembalian
const returnsDatabase = [
    {
        id: 'R001',
        loanId: 'L003',
        userId: 3,
        borrower: 'Budi Santoso',
        bookId: 4,
        book: 'Clean Code',
        dueDate: '2024-05-09',
        returnDate: '2024-05-22',
        daysLate: 13,
        fine: 65000,
        fineStatus: 'Lunas',
        notes: 'Dikembalikan dengan kondisi baik'
    }
];

// Data Kategori
const categoriesDatabase = [
    {
        id: 1,
        name: 'Fiksi',
        description: 'Buku cerita fiksi dan novel',
        bookCount: 45,
        location: 'Rak A'
    },
    {
        id: 2,
        name: 'Non-Fiksi',
        description: 'Buku pengetahuan dan biografi',
        bookCount: 38,
        location: 'Rak B'
    },
    {
        id: 3,
        name: 'Referensi',
        description: 'Kamus, ensiklopedia, dan buku acuan',
        bookCount: 72,
        location: 'Rak C'
    },
    {
        id: 4,
        name: 'Teknik',
        description: 'Buku teknik dan informatika',
        bookCount: 56,
        location: 'Rak D'
    },
    {
        id: 5,
        name: 'Ilmu Sosial',
        description: 'Buku sosiologi, psikologi, dan ekonomi',
        bookCount: 42,
        location: 'Rak E'
    }
];

// Data Admin
const adminsDatabase = [
    {
        id: 1,
        name: 'Admin Master',
        email: 'admin@umbres.ac.id',
        password: 'admin123456', // HASHED dalam praktik nyata
        role: 'Super Admin',
        status: 'Aktif',
        lastLogin: '2024-05-24 10:30:00',
        permissions: ['all']
    }
];

// Data Statistik
const statisticsDatabase = {
    totalBooks: 6,
    totalUsers: 4,
    activeLoans: 342,
    overdueBooks: 18,
    totalFine: 1250000,
    fineCollected: 450000,
    averageBookPerUser: 3.5,
    busyMonth: 'Mei'
};

// Data Aktivitas Sistem
const activityLogDatabase = [
    {
        id: 1,
        admin: 'admin@umbres.ac.id',
        action: 'Tambah Buku',
        details: 'Buku "Pemrograman Web dengan JavaScript" ditambahkan',
        timestamp: '2024-05-24 09:30:00',
        ipAddress: '192.168.1.100'
    },
    {
        id: 2,
        admin: 'admin@umbres.ac.id',
        action: 'Edit Buku',
        details: 'Stok buku "Laskar Pelangi" diubah dari 4 menjadi 5',
        timestamp: '2024-05-24 10:15:00',
        ipAddress: '192.168.1.100'
    },
    {
        id: 3,
        admin: 'admin@umbres.ac.id',
        action: 'Tambah Peminjaman',
        details: 'Peminjaman baru dari Aldi Pratama untuk buku "Laskar Pelangi"',
        timestamp: '2024-05-24 10:45:00',
        ipAddress: '192.168.1.100'
    }
];

// Export data untuk digunakan di script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        booksDatabase,
        usersDatabase,
        loansDatabase,
        returnsDatabase,
        categoriesDatabase,
        adminsDatabase,
        statisticsDatabase,
        activityLogDatabase
    };
}
