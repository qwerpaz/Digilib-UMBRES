// Admin Dashboard Script

// Check if admin is logged in
function checkAdminSession() {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
        window.location.href = 'admin-login.html';
    } else {
        const sessionData = JSON.parse(adminSession);
        displayAdminInfo(sessionData);
    }
}

// Display admin info
function displayAdminInfo(sessionData) {
    const adminName = document.getElementById('adminName');
    if (adminName) {
        const email = sessionData.email;
        const name = email.split('@')[0].toUpperCase();
        adminName.textContent = name;
    }
}

// Load page
function loadPage(pageName) {
    event.preventDefault();
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const pageId = pageName + '-page';
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }

    // Update active menu item
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    event.target.closest('.menu-item').classList.add('active');

    // Load data for specific pages
    if (pageName === 'books') {
        loadBooksData();
    } else if (pageName === 'users') {
        loadUsersData();
    } else if (pageName === 'loans') {
        loadLoansData();
    }

    // Close sidebar on mobile
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Sample Books Data
const booksData = [
    {
        id: 1,
        code: 'BK001',
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
        category: 'Fiksi',
        stock: 5,
        available: 3
    },
    {
        id: 2,
        code: 'BK002',
        title: 'Anak Semua Bangsa',
        author: 'Pramoedya Ananta Toer',
        category: 'Roman',
        stock: 8,
        available: 6
    },
    {
        id: 3,
        code: 'BK003',
        title: 'Negeri 5 Menara',
        author: 'Ahmad Fuadi',
        category: 'Non-Fiksi',
        stock: 3,
        available: 1
    },
    {
        id: 4,
        code: 'BK004',
        title: 'Bumi manusia',
        author: 'Pramoedya Ananta Toer',
        category: 'Novel',
        stock: 6,
        available: 4
    }
];

// Sample Users Data
const usersData = [
    {
        id: 1,
        nim: '21001',
        name: 'Aldi Pratama',
        email: 'aldi@umbres.ac.id',
        prodi: 'Teknik Informatika',
        status: 'Aktif',
        registered: '2023-01-15'
    },
    {
        id: 2,
        nim: '21002',
        name: 'Siti Nurhaliza',
        email: 'siti@umbres.ac.id',
        prodi: 'Manajemen',
        status: 'Aktif',
        registered: '2023-01-20'
    },
    {
        id: 3,
        nim: '21003',
        name: 'Budi Santoso',
        email: 'budi@umbres.ac.id',
        prodi: 'Teknik Informatika',
        status: 'Non-Aktif',
        registered: '2023-02-05'
    }
];

// Sample Loans Data
const loansData = [
    {
        id: 'L001',
        borrower: 'Aldi Pratama',
        book: 'Laskar Pelangi',
        borrowDate: '2024-05-10',
        returnDate: '2024-05-17',
        status: 'Aktif'
    },
    {
        id: 'L002',
        borrower: 'Siti Nurhaliza',
        book: 'Pemrograman Web dengan JavaScript',
        borrowDate: '2024-05-08',
        returnDate: '2024-05-15',
        status: 'Terlambat'
    },
    {
        id: 'L003',
        borrower: 'Budi Santoso',
        book: 'Clean Code',
        borrowDate: '2024-05-02',
        returnDate: '2024-05-09',
        status: 'Dikembalikan'
    }
];

// Initialize users data from localStorage
function initializeUsersData() {
    const stored = localStorage.getItem('adminUsersData');
    if (stored) {
        try {
            const parsedData = JSON.parse(stored);
            usersData.length = 0;
            usersData.push(...parsedData);
        } catch (e) {
            console.warn('Failed to parse users data:', e);
        }
    } else {
        saveUsersToStorage();
    }
}

// Save users data to localStorage
function saveUsersToStorage() {
    localStorage.setItem('adminUsersData', JSON.stringify(usersData));
}

// Initialize loans data from localStorage
function initializeLoansData() {
    const stored = localStorage.getItem('adminLoansData');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            loansData.length = 0;
            loansData.push(...parsed);
        } catch (e) {
            console.warn('Failed to parse loans data:', e);
        }
    } else {
        saveLoansToStorage();
    }
}

// Save loans data to localStorage
function saveLoansToStorage() {
    try {
        localStorage.setItem('adminLoansData', JSON.stringify(loansData));
    } catch (e) {
        console.warn('Failed to save loans data:', e);
    }
}

// Notification data
function loadAdminNotifications() {
    const stored = localStorage.getItem('adminBorrowNotifications');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.warn('Failed to parse admin notifications:', e);
        }
    }
    return [
        { id: 'N001', message: 'Peminjaman baru dari Aldi Pratama berhasil dicatat.', time: '5 menit lalu', read: false },
        { id: 'N002', message: 'Siti Nurhaliza terlambat mengembalikan buku.', time: '15 menit lalu', read: false },
        { id: 'N003', message: 'Buku "Clean Code" sudah dikembalikan oleh Budi Santoso.', time: '1 jam lalu', read: false }
    ];
}

function saveAdminNotifications(data) {
    localStorage.setItem('adminBorrowNotifications', JSON.stringify(data));
}

let notifications = loadAdminNotifications();

function getUnreadNotificationCount() {
    return notifications.filter(notification => !notification.read).length;
}

function renderNotificationsDropdown() {
    const badge = document.getElementById('notificationBadge');
    const countLabel = document.getElementById('notificationCount');
    const list = document.getElementById('notificationList');
    if (!badge || !countLabel || !list) return;

    const unreadCount = getUnreadNotificationCount();
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    countLabel.textContent = unreadCount > 0 ? `${unreadCount} Baru` : 'Tidak ada baru';

    if (notifications.length === 0) {
        list.innerHTML = '<p class="notification-item">Tidak ada notifikasi.</p>';
        return;
    }

    list.innerHTML = notifications.map(notification => {
        const itemClass = notification.read ? 'notification-item' : 'notification-item unread';
        return `
            <div class="${itemClass}">
                <p>${notification.message}</p>
                <small>${notification.time}</small>
            </div>
        `;
    }).join('');
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('hidden');
}

function markAllNotificationsRead(event) {
    event.stopPropagation();
    notifications.forEach(notification => notification.read = true);
    saveAdminNotifications(notifications);
    renderNotificationsDropdown();
}

window.addEventListener('click', function(event) {
    const dropdown = document.getElementById('notificationDropdown');
    const notificationIcon = event.target.closest('.notification-icon');
    if (dropdown && !notificationIcon) {
        dropdown.classList.add('hidden');
    }
});

// Get next loan ID like L001, L002
function getNextLoanId() {
    if (loansData.length === 0) return 'L001';
    const maxNumber = loansData.reduce((max, loan) => {
        const num = parseInt(loan.id.replace(/\D/g, ''), 10);
        return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    return `L${String(maxNumber + 1).padStart(3, '0')}`;
}

// Get next user ID
function getNextUserId() {
    if (usersData.length === 0) return 1;
    return Math.max(...usersData.map(u => u.id)) + 1;
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Load Books Data
function loadBooksData() {
    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = '';

    booksData.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.code}</td>
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td><span class="badge">${book.category}</span></td>
            <td>${book.stock}</td>
            <td><span class="badge badge-success">${book.available}</span></td>
            <td>
                <button class="btn btn-small" onclick="openBookModal('edit', ${book.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteBook(${book.id})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add badge styles
    addBadgeStyles();
}

// Load Users Data
function loadUsersData() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    usersData.forEach(user => {
        const row = document.createElement('tr');
        const statusClass = user.status === 'Aktif' ? 'badge-success' : 'badge-danger';
        row.innerHTML = `
            <td><strong>${user.nim}</strong></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.prodi}</td>
            <td><span class="badge ${statusClass}">${user.status}</span></td>
            <td>${user.registered}</td>
            <td>
                <button class="btn btn-small" onclick="openUserModal('edit', ${user.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    addBadgeStyles();
}

// Load Loans Data
function loadLoansData() {
    const tbody = document.getElementById('loansTableBody');
    tbody.innerHTML = '';

    loansData.forEach(loan => {
        const row = document.createElement('tr');
        let statusClass = 'badge-success';
        if (loan.status === 'Terlambat') statusClass = 'badge-danger';
        if (loan.status === 'Dikembalikan') statusClass = 'badge-secondary';

        row.innerHTML = `
            <td><strong>${loan.id}</strong></td>
            <td>${loan.borrower}</td>
            <td>${loan.book}</td>
            <td>${loan.borrowDate}</td>
            <td>${loan.returnDate}</td>
            <td><span class="badge ${statusClass}">${loan.status}</span></td>
            <td>
                <button class="btn btn-small" onclick="openLoanModal('edit', '${loan.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteLoan('${loan.id}')">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    addBadgeStyles();
}

// Add Badge Styles
function addBadgeStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            background: #e0e0e0;
            color: #666;
        }
        .badge-success {
            background: #d4edda;
            color: #155724;
        }
        .badge-danger {
            background: #f8d7da;
            color: #721c24;
        }
        .badge-secondary {
            background: #e2e3e5;
            color: #383d41;
        }
    `;
    if (!document.querySelector('style[data-badge-styles]')) {
        style.setAttribute('data-badge-styles', 'true');
        document.head.appendChild(style);
    }
}

// Modal Functions
function openBookModal(mode, id = null) {
    const modal = document.getElementById('bookModal');
    const title = document.getElementById('bookModalTitle');
    const form = document.getElementById('bookForm');

    title.textContent = mode === 'add' ? 'Tambah Buku' : 'Edit Buku';
    form.reset();

    if (mode === 'edit' && id) {
        const book = booksData.find(b => b.id === id);
        if (book) {
            form.elements[0].value = book.code;
            form.elements[1].value = book.title;
            form.elements[2].value = book.author;
            form.elements[3].value = book.category;
            form.elements[4].value = book.stock;
        }
    }

    modal.classList.add('show');
}

function openUserModal(mode, id = null) {
    const modal = document.getElementById('userModal');
    const title = document.getElementById('userModalTitle');
    const form = document.getElementById('userForm');

    title.textContent = mode === 'add' ? 'Tambah Pengguna' : 'Edit Pengguna';
    form.reset();
    
    // Store mode in data attribute for later use
    modal.dataset.mode = mode;
    modal.dataset.editId = id || '';

    if (mode === 'edit' && id) {
        const user = usersData.find(u => u.id === id);
        if (user) {
            document.getElementById('userNim').value = user.nim;
            document.getElementById('userName').value = user.name;
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userProdi').value = user.prodi;
            document.getElementById('userStatus').value = user.status;
        }
    }

    modal.classList.add('show');
}

function openLoanModal(mode, id = null) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('loanModal');
    if (!modal) {
        const modalHTML = `
            <div id="loanModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="loanModalTitle">Catat Peminjaman</h2>
                        <button class="close-btn" onclick="closeModal('loanModal')">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="loanForm">
                            <div class="form-group">
                                <label>Peminjam</label>
                                <input type="text" placeholder="Masukkan nama peminjam" required>
                            </div>
                            <div class="form-group">
                                <label>Buku</label>
                                <input type="text" placeholder="Masukkan judul buku" required>
                            </div>
                            <div class="form-group">
                                <label>Tanggal Pinjam</label>
                                <input type="date" required>
                            </div>
                            <div class="form-group">
                                <label>Tanggal Kembali</label>
                                <input type="date" required>
                            </div>
                            <div class="form-group">
                                <label>Status</label>
                                <select required>
                                    <option value="aktif">Aktif</option>
                                    <option value="terlambat">Terlambat</option>
                                    <option value="dikembalikan">Dikembalikan</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="closeModal('loanModal')">Batal</button>
                        <button class="btn btn-primary" onclick="saveLoan()">Simpan</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('loanModal');
    }

    modal.dataset.mode = mode;
    modal.dataset.editId = id || '';

    const title = document.getElementById('loanModalTitle');
    const form = document.getElementById('loanForm');

    title.textContent = mode === 'add' ? 'Catat Peminjaman' : 'Edit Peminjaman';
    form.reset();

    if (mode === 'edit' && id) {
        const loan = loansData.find(l => l.id === id);
        if (loan) {
            form.elements[0].value = loan.borrower;
            form.elements[1].value = loan.book;
            form.elements[2].value = loan.borrowDate;
            form.elements[3].value = loan.returnDate;
            form.elements[4].value = loan.status.toLowerCase();
        }
    }

    modal.classList.add('show');
}

function openCategoryModal(mode, id = null) {
    let modal = document.getElementById('categoryModal');
    if (!modal) {
        const modalHTML = `
            <div id="categoryModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="categoryModalTitle">Tambah Kategori</h2>
                        <button class="close-btn" onclick="closeModal('categoryModal')">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="categoryForm">
                            <div class="form-group">
                                <label>Nama Kategori</label>
                                <input type="text" placeholder="Masukkan nama kategori" required>
                            </div>
                            <div class="form-group">
                                <label>Deskripsi</label>
                                <textarea placeholder="Masukkan deskripsi kategori" rows="4"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="closeModal('categoryModal')">Batal</button>
                        <button class="btn btn-primary" onclick="saveCategory()">Simpan</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('categoryModal');
    }

    modal.classList.add('show');
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Save Functions
function saveBook() {
    const form = document.getElementById('bookForm');
    if (form.checkValidity()) {
        showNotification('Buku berhasil disimpan', 'success');
        closeModal('bookModal');
        loadBooksData();
    }
}

function saveUser() {
    const form = document.getElementById('userForm');
    if (form.checkValidity()) {
        const nim = document.getElementById('userNim').value.trim();
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const prodi = document.getElementById('userProdi').value.trim();
        const status = document.getElementById('userStatus').value;
        
        const modal = document.getElementById('userModal');
        const mode = modal.dataset.mode;
        const editId = modal.dataset.editId ? parseInt(modal.dataset.editId) : null;
        
        if (mode === 'add') {
            // Create new user
            const newUser = {
                id: getNextUserId(),
                nim: nim,
                name: name,
                email: email,
                prodi: prodi,
                status: status,
                registered: getTodayDate()
            };
            
            usersData.push(newUser);
            showNotification('Pengguna berhasil ditambahkan', 'success');
        } else if (mode === 'edit' && editId) {
            // Edit existing user
            const userIndex = usersData.findIndex(u => u.id === editId);
            if (userIndex !== -1) {
                usersData[userIndex].nim = nim;
                usersData[userIndex].name = name;
                usersData[userIndex].email = email;
                usersData[userIndex].prodi = prodi;
                usersData[userIndex].status = status;
                showNotification('Pengguna berhasil diperbarui', 'success');
            }
        }
        
        // Save to localStorage
        saveUsersToStorage();
        closeModal('userModal');
        loadUsersData();
    }
}

function saveLoan() {
    const form = document.getElementById('loanForm');
    if (form.checkValidity()) {
        const borrower = form.elements[0].value.trim();
        const book = form.elements[1].value.trim();
        const borrowDate = form.elements[2].value;
        const returnDate = form.elements[3].value;
        const statusValue = form.elements[4].value;
        const status = statusValue.charAt(0).toUpperCase() + statusValue.slice(1).toLowerCase();

        const modal = document.getElementById('loanModal');
        const mode = modal.dataset.mode;
        const editId = modal.dataset.editId || null;

        if (mode === 'add') {
            loansData.push({
                id: getNextLoanId(),
                borrower: borrower,
                book: book,
                borrowDate: borrowDate,
                returnDate: returnDate,
                status: status
            });
            showNotification('Peminjaman berhasil ditambahkan', 'success');
        } else if (mode === 'edit' && editId) {
            const loanIndex = loansData.findIndex(l => l.id === editId);
            if (loanIndex !== -1) {
                loansData[loanIndex].borrower = borrower;
                loansData[loanIndex].book = book;
                loansData[loanIndex].borrowDate = borrowDate;
                loansData[loanIndex].returnDate = returnDate;
                loansData[loanIndex].status = status;
                showNotification('Peminjaman berhasil diperbarui', 'success');
            }
        }

        // create admin notification about this action
        try {
            const now = new Date();
            const timeStr = now.toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            const action = mode === 'add' ? 'ditambahkan' : 'diperbarui';
            const note = { id: `N${Date.now()}`, message: `Peminjaman untuk buku "${book}" oleh ${borrower} ${action}.`, time: timeStr, read: false };
            notifications.unshift(note);
            saveAdminNotifications(notifications);
            renderNotificationsDropdown();
        } catch (e) {
            console.warn('Gagal menambahkan notifikasi admin:', e);
        }

        saveLoansToStorage();
        closeModal('loanModal');
        loadLoansData();
    }
}

function saveCategory() {
    const form = document.getElementById('categoryForm');
    if (form.checkValidity()) {
        showNotification('Kategori berhasil disimpan', 'success');
        closeModal('categoryModal');
    }
}

// Delete Functions
function deleteBook(id) {
    if (confirm('Yakin ingin menghapus buku ini?')) {
        showNotification('Buku berhasil dihapus', 'success');
        loadBooksData();
    }
}

function deleteUser(id) {
    if (confirm('Yakin ingin menghapus pengguna ini?')) {
        const userIndex = usersData.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            usersData.splice(userIndex, 1);
            saveUsersToStorage();
            showNotification('Pengguna berhasil dihapus', 'success');
            loadUsersData();
        }
    }
}

function deleteLoan(id) {
    if (confirm('Yakin ingin menghapus data peminjaman ini?')) {
        const loanIndex = loansData.findIndex(l => l.id === id);
        if (loanIndex !== -1) {
            const removed = loansData.splice(loanIndex, 1)[0];
            saveLoansToStorage();

            // add admin notification about deletion
            try {
                const now = new Date();
                const timeStr = now.toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                const note = { id: `N${Date.now()}`, message: `Data peminjaman untuk buku "${removed.book}" oleh ${removed.borrower} dihapus.`, time: timeStr, read: false };
                notifications.unshift(note);
                saveAdminNotifications(notifications);
                renderNotificationsDropdown();
            } catch (e) {
                console.warn('Gagal menambahkan notifikasi admin:', e);
            }

            showNotification('Data peminjaman berhasil dihapus', 'success');
            loadLoansData();
        }
    }
}

function deleteCategory(id) {
    if (confirm('Yakin ingin menghapus kategori ini?')) {
        showNotification('Kategori berhasil dihapus', 'success');
    }
}

// Other Functions
function editCategory(id) {
    openCategoryModal('edit', id);
}

function generateReport(type) {
    const reportNames = {
        loans: 'Laporan Peminjaman',
        stocks: 'Laporan Stok Buku',
        overdue: 'Laporan Keterlambatan',
        users: 'Laporan Pengguna'
    };

    showNotification(`${reportNames[type]} sedang diunduh...`, 'success');
    // Simulate download
    setTimeout(() => {
        showNotification(`${reportNames[type]} berhasil diunduh`, 'success');
    }, 2000);
}

function saveSettings() {
    showNotification('Pengaturan berhasil disimpan', 'success');
}

function changePassword() {
    alert('Fitur ubah password akan dikembangkan lebih lanjut');
}

function clearSessions() {
    if (confirm('Semua sesi akan dihapus. Lanjutkan?')) {
        showNotification('Semua sesi berhasil dihapus', 'success');
    }
}

function openAdminModal() {
    alert('Fitur manajemen admin akan dikembangkan lebih lanjut');
}

// Logout
function logout() {
    if (confirm('Yakin ingin keluar dari admin panel?')) {
        localStorage.removeItem('adminSession');
        window.location.href = 'admin-login.html';
    }
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: #27ae60;
            color: white;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease-out;
            z-index: 9999;
        }
        .notification.error {
            background: #e74c3c;
        }
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// Listen to storage events so admin page updates when other pages modify data
window.addEventListener('storage', function(e) {
    if (!e.key) return;
    try {
        if (e.key === 'adminBorrowNotifications' || e.key === 'adminLoansData') {
            // reload notifications and loans from storage
            notifications = loadAdminNotifications();
            renderNotificationsDropdown();
        }

        if (e.key === 'adminLoansData') {
            initializeLoansData();
            loadLoansData();
        }
    } catch (err) {
        console.warn('Error handling storage event:', err);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAdminSession();
    initializeUsersData();
    initializeLoansData();
    loadBooksData();
    loadUsersData();
    loadLoansData();
    renderNotificationsDropdown();
});
