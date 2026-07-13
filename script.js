// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

// Page transition effects
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        const pageName = this.getAttribute('data-page');
        const pageElement = document.getElementById(pageName + '-page');

        if (!pageElement) return;

        // Close mobile menu if open
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('mobile-overlay');
        if (sidebar && overlay) {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        }

        // Update navigation
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Smooth page transition
        const currentPage = document.querySelector('.page.active');
        if (currentPage) {
            currentPage.style.opacity = '0';
            currentPage.style.transform = 'translateY(10px)';
            setTimeout(() => {
                pages.forEach(page => page.classList.remove('active'));
                pageElement.classList.add('active');
                pageElement.style.opacity = '1';
                pageElement.style.transform = 'translateY(0)';
                
                // Update user profile display when navigating to Lainnya page
                if (pageName === 'lainnya') {
                    displayUserProfile();
                }
            }, 150);
        } else {
            pages.forEach(page => page.classList.remove('active'));
            pageElement.classList.add('active');
            
            // Update user profile display when navigating to Lainnya page
            if (pageName === 'lainnya') {
                displayUserProfile();
            }
        }
    });
});

    // Search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
        });

        searchBox.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });

        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('Searching for:', this.value);
                // Add search logic here
            }
        });
    }

    // User profile click effect
    const userProfile = document.querySelector('.user-profile i');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            console.log('User profile clicked');
            // Add user menu or profile page here
        });
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

// Utility functions
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> Loading...';
    button.disabled = true;

    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

function getStoredBorrowTransactions() {
    const stored = localStorage.getItem('userBorrowTransactions');
    return stored ? JSON.parse(stored) : [];
}

function saveBorrowTransactions(transactions) {
    localStorage.setItem('userBorrowTransactions', JSON.stringify(transactions));
}

function getAdminBorrowNotifications() {
    const stored = localStorage.getItem('adminBorrowNotifications');
    return stored ? JSON.parse(stored) : [];
}

function saveAdminBorrowNotifications(notifications) {
    localStorage.setItem('adminBorrowNotifications', JSON.stringify(notifications));
}

function addAdminBorrowNotification(message) {
    const notifications = getAdminBorrowNotifications();
    notifications.unshift({
        id: `N${Date.now()}`,
        message: message,
        time: new Date().toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        read: false
    });
    saveAdminBorrowNotifications(notifications);
}

function requestHelp() {
    const userName = localStorage.getItem('userName') || 'Pengguna';
    addAdminBorrowNotification(`Pengguna ${userName} membutuhkan bantuan.`);
    showNotification('Permintaan bantuan berhasil dikirim ke administrator.', 'success', 3000);
}

// Public books persistence (so stock updates survive reloads)
function getPublicBooksData() {
    const stored = localStorage.getItem('publicBooksData');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.warn('Failed to parse publicBooksData:', e);
        }
    }

    // Build from DOM as fallback
    const cards = document.querySelectorAll('.book-card');
    const arr = Array.from(cards).map(card => {
        const id = card.dataset.id || card.getAttribute('data-id') || null;
        const title = card.querySelector('.book-title')?.textContent?.trim() || '';
        const stockText = card.querySelector('.book-stok')?.textContent || 'Stok: 0';
        const stock = parseInt(stockText.replace(/\D/g, '') || '0', 10);
        return { id, title, stock };
    });
    try { localStorage.setItem('publicBooksData', JSON.stringify(arr)); } catch (e) { /* ignore */ }
    return arr;
}

function savePublicBooksData(data) {
    try { localStorage.setItem('publicBooksData', JSON.stringify(data)); } catch (e) { console.warn('Failed to save publicBooksData:', e); }
}

function addLoanToAdmin(bookTitle, borrower, borrowDateISO, returnDateISO) {
    try {
        const stored = localStorage.getItem('adminLoansData');
        const loans = stored ? JSON.parse(stored) : [];
        // Create simple ID
        const id = `L${Date.now()}`;
        const loan = {
            id: id,
            borrower: borrower,
            book: bookTitle,
            borrowDate: borrowDateISO.split('T')[0],
            returnDate: returnDateISO.split('T')[0],
            status: 'Aktif'
        };
        loans.unshift(loan);
        localStorage.setItem('adminLoansData', JSON.stringify(loans));
    } catch (e) {
        console.warn('Failed to add loan to adminLoansData:', e);
    }
}

function formatDate(date) {
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function renderBorrowTransactions() {
    const tbody = document.querySelector('#transaksi-page tbody');
    if (!tbody) return;

    // Remove previously generated rows first
    tbody.querySelectorAll('tr.dynamic-transaction').forEach(row => row.remove());

    const transactions = getStoredBorrowTransactions();
    const baseRowCount = tbody.querySelectorAll('tr').length + 1;

    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.className = 'dynamic-transaction';
        row.innerHTML = `
            <td>${baseRowCount + index}</td>
            <td>${transaction.name}</td>
            <td>${transaction.book}</td>
            <td>${transaction.borrowDate}</td>
            <td>${transaction.returnDate}</td>
            <td><span class="badge badge-success">${transaction.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function openBookDetailModal(bookData) {
    const modal = document.getElementById('bookDetailModal');
    if (!modal) return;

    document.getElementById('detailTitle').textContent = bookData.title;
    document.getElementById('detailAuthor').textContent = bookData.author;
    document.getElementById('detailGenre').textContent = bookData.genre;
    document.getElementById('detailYear').textContent = bookData.year;
    document.getElementById('detailDesc').textContent = bookData.description;

    const currentStockText = bookData.card.querySelector('.book-stok')?.textContent || bookData.stockText;
    const currentStatusText = bookData.card.querySelector('.book-status')?.textContent || bookData.statusText;
    document.getElementById('detailStock').textContent = currentStockText;
    document.getElementById('detailStatus').textContent = currentStatusText;

    const pinjamButton = document.getElementById('detailPinjamButton');
    pinjamButton.onclick = function() {
        borrowBook(bookData);
        closeBookDetailModal();
    };

    modal.style.display = 'flex';
    modal.classList.add('active');
}

function closeBookDetailModal() {
    const modal = document.getElementById('bookDetailModal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.style.display = 'none';
}

function borrowBook(bookData) {
    // Load persisted public book data and find matching book by title or id
    const publicBooks = getPublicBooksData();
    const match = publicBooks.find(b => (b.id && bookData.id && String(b.id) === String(bookData.id)) || b.title === bookData.title);
    const currentStock = match ? parseInt(match.stock || 0, 10) : (function(){
        const stockText = bookData.card.querySelector('.book-stok')?.textContent || 'Stok: 0';
        return parseInt(stockText.replace(/\D/g, ''), 10);
    })();

    if (isNaN(currentStock) || currentStock <= 0) {
        showNotification('Maaf, stok buku tidak tersedia.', 'error', 3000);
        return;
    }

    const borrower = localStorage.getItem('userName') || 'Pengunjung';
    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setDate(borrowDate.getDate() + 7);

    const transactions = getStoredBorrowTransactions();
    transactions.unshift({
        name: borrower,
        book: bookData.title,
        borrowDate: formatDate(borrowDate),
        returnDate: formatDate(returnDate),
        status: 'Aktif'
    });
    saveBorrowTransactions(transactions);
    renderBorrowTransactions();
    addAdminBorrowNotification(`Buku "${bookData.title}" dipinjam oleh ${borrower}.`);
    showNotification(`Berhasil meminjam "${bookData.title}"`, 'success', 3000);
    // decrement in persisted publicBooks data
    const newStock = currentStock - 1;
    if (match) {
        match.stock = newStock;
        savePublicBooksData(publicBooks);
    } else {
        // try to persist a new entry
        publicBooks.push({ id: bookData.id || null, title: bookData.title, stock: newStock });
        savePublicBooksData(publicBooks);
    }

    // update DOM
    const stockElement = bookData.card.querySelector('.book-stok');
    const statusElement = bookData.card.querySelector('.book-status');
    if (stockElement) stockElement.textContent = `Stok: ${newStock}`;
    if (statusElement) {
        if (newStock <= 0) {
            statusElement.textContent = 'Habis';
            statusElement.classList.remove('available');
            statusElement.classList.add('unavailable');
        } else {
            statusElement.textContent = 'Tersedia';
            statusElement.classList.remove('unavailable');
            statusElement.classList.add('available');
        }
    }

    // Add loan to admin data so admin Kelola Peminjaman updates
    addLoanToAdmin(bookData.title, borrower, borrowDate.toISOString(), returnDate.toISOString());

    updateCollectionSummary();
}

function updateCollectionSummary() {
    const allCards = document.querySelectorAll('.book-card');
    const totalBooks = allCards.length;
    const availableBooks = Array.from(allCards).filter(card => {
        return card.querySelector('.book-status').textContent.trim().toLowerCase() === 'tersedia';
    }).length;
    const borrowedBooks = totalBooks - availableBooks;
    const footer = document.querySelector('.koleksi-footer p');
    if (footer) {
        footer.innerHTML = `📚 Total Buku: <strong>${totalBooks}</strong> | 🆓 Tersedia: <strong>${availableBooks}</strong> | 🔒 Dipinjam: <strong>${borrowedBooks}</strong>`;
    }
}

// Enhanced button click effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .btn-small');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            // Show notification for demo
            if (this.textContent.includes('Lihat Laporan')) {
                // Buka modal laporan
                const reportType = this.closest('.report-card')?.querySelector('h3')?.textContent.toLowerCase() || 'daily';
                if (reportType.includes('harian')) {
                    openReportModal('daily');
                } else if (reportType.includes('bulanan')) {
                    openReportModal('monthly');
                } else if (reportType.includes('tahunan')) {
                    openReportModal('yearly');
                } else {
                    openReportModal('daily');
                }
            } else if (this.textContent.includes('Edit Profil')) {
                showNotification('Fitur ini sedang dalam pengembangan', 'warning');
            } else if (this.textContent.includes('Backup')) {
                const restoreLoading = showLoading(this);
                setTimeout(() => {
                    restoreLoading();
                    showNotification('Backup berhasil dibuat!', 'success');
                }, 2000);
            }
        });
        });
    });

    // Table row hover effect
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e8f4f8';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Initialize with dashboard page
    const dashboardNav = document.querySelector('[data-page="dashboard"]');
    if (dashboardNav) {
        dashboardNav.click();
    }
});

// Add ripple animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add more interactivity for stat cards
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            // Navigate to relevant page when stat card is clicked
            const pTag = this.querySelector('p');
            if (pTag) {
                const text = pTag.textContent.toLowerCase();
                
                if (text.includes('denda')) {
                    // Click the denda nav item to navigate to denda page
                    const dendaNav = document.querySelector('[data-page="denda"]');
                    if (dendaNav) {
                        dendaNav.click();
                        showNotification('Membuka halaman Denda', 'success', 1500);
                    }
                } else if (text.includes('buku')) {
                    const bukuNav = document.querySelector('[data-page="koleksi"]');
                    if (bukuNav) {
                        bukuNav.click();
                        showNotification('Membuka Koleksi Buku', 'success', 1500);
                    }
                } else if (text.includes('pinjaman')) {
                    const transaksiNav = document.querySelector('[data-page="transaksi"]');
                    if (transaksiNav) {
                        transaksiNav.click();
                        showNotification('Membuka Transaksi Pinjam', 'success', 1500);
                    }
                } else if (text.includes('anggota')) {
                    showNotification('Fitur manajemen anggota sedang dikembangkan', 'warning');
                }
            }
        });
        card.style.cursor = 'pointer';
    });
});

// Dynamic search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Searching for:', searchTerm);

            // Filter table rows if we're on a table page
            const tableRows = document.querySelectorAll('.data-table tbody tr');
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('mobile-overlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    }
}

// Admin Edit Functionality
function createEditModal() {
    // Create modal HTML if not exists
    if (!document.getElementById('edit-modal')) {
        const modalHTML = `
            <div id="edit-modal" class="edit-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Edit Data</h2>
                        <button class="close-btn" onclick="closeEditModal()">&times;</button>
                    </div>
                    <div id="modal-body" class="modal-body"></div>
                    <div class="modal-footer">
                        <button class="btn-secondary" onclick="closeEditModal()">Batal</button>
                        <button class="btn-primary" id="save-btn" onclick="saveEditedData()">Simpan</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

function openEditModal(rowElement, table) {
    createEditModal();
    const modal = document.getElementById('edit-modal');
    const modalBody = document.getElementById('modal-body');
    
    // Get all cells from the row
    const cells = rowElement.querySelectorAll('td');
    const headerCells = table.querySelectorAll('th');
    
    // Store original row data for reference
    modal.dataset.rowIndex = Array.from(rowElement.parentElement.children).indexOf(rowElement);
    modal.dataset.table = table.id || table.className;
    
    // Create form inputs for each cell
    let formHTML = '<div class="edit-form">';
    cells.forEach((cell, index) => {
        const headerText = headerCells[index]?.textContent || 'Field ' + (index + 1);
        const value = cell.textContent;
        
        // Skip No column (usually first column)
        if (headerText.toLowerCase() === 'no' || headerText.toLowerCase() === 'status') {
            return;
        }
        
        formHTML += `
            <div class="form-group">
                <label>${headerText}</label>
                <input type="text" class="form-input" data-index="${index}" value="${value}">
            </div>
        `;
    });
    formHTML += '</div>';
    
    modalBody.innerHTML = formHTML;
    modal.classList.add('active');
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function saveEditedData() {
    const modal = document.getElementById('edit-modal');
    const inputs = modal.querySelectorAll('.form-input');
    const rowIndex = parseInt(modal.dataset.rowIndex);
    
    // Get the correct table and row
    const tableSelector = modal.dataset.table;
    const tables = document.querySelectorAll('.data-table');
    let targetRow = null;
    
    tables.forEach(table => {
        if (table.id === tableSelector || table.className.includes(tableSelector)) {
            targetRow = table.querySelectorAll('tbody tr')[rowIndex];
        }
    });
    
    if (!targetRow) {
        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            if (rowIndex < rows.length) {
                targetRow = rows[rowIndex];
            }
        });
    }
    
    if (targetRow) {
        const cells = targetRow.querySelectorAll('td');
        inputs.forEach(input => {
            const index = parseInt(input.dataset.index);
            if (cells[index] && input.dataset.index !== 'undefined') {
                cells[index].textContent = input.value;
            }
        });
        
        closeEditModal();
        showNotification('Data berhasil diperbarui!', 'success');
    }
}

// Add edit buttons to table rows
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const dataTables = document.querySelectorAll('.data-table');
        
        dataTables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            
            const thead = table.querySelector('thead tr');
            const hasPaymentAction = thead && thead.querySelector('th:last-child')?.textContent.includes('Aksi Pembayaran');
            const isTransaksiTable = table.closest('#transaksi-page') !== null;
            const isLaporanTable = table.closest('#laporan-page') !== null || table.closest('.laporan-content') !== null;
            if (hasPaymentAction || isTransaksiTable || isLaporanTable) {
                return; // skip Denda, Transaksi Pinjam, and Laporan tables
            }
            
            // Add header for actions if not exists
            if (thead && !thead.querySelector('th:last-child')?.textContent.includes('Aksi')) {
                const actionHeader = document.createElement('th');
                actionHeader.textContent = 'Aksi';
                actionHeader.style.textAlign = 'center';
                thead.appendChild(actionHeader);
            }
            
            rows.forEach(row => {
                // Check if edit button already exists
                if (row.querySelector('.edit-btn')) return;
                
                const actionCell = document.createElement('td');
                actionCell.style.textAlign = 'center';
                actionCell.innerHTML = `
                    <button class="edit-btn" title="Edit data">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                `;
                
                const editBtn = actionCell.querySelector('.edit-btn');
                editBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openEditModal(row, table);
                    showNotification('Mode edit aktif - Admin dapat mengubah data', 'info', 2000);
                });
                
                row.appendChild(actionCell);
            });
        });
    }, 500);
});

// Styling for edit buttons
const editStyles = document.createElement('style');
editStyles.textContent = `
    .edit-btn {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
    }
    
    .edit-btn:hover {
        background-color: #2980b9;
    }
    
    .edit-btn i {
        margin-right: 5px;
    }
    
    .edit-modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s;
    }
    
    .edit-modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        width: 90%;
        max-width: 500px;
        animation: slideUp 0.3s;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #ddd;
    }
    
    .modal-header h2 {
        margin: 0;
        color: #1a2a4e;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
    }
    
    .close-btn:hover {
        color: #000;
    }
    
    .modal-body {
        padding: 20px;
        max-height: 400px;
        overflow-y: auto;
    }
    
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 20px;
        border-top: 1px solid #ddd;
    }
    
    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
    }
    
    .form-group label {
        font-weight: 600;
        margin-bottom: 5px;
        color: #1a2a4e;
        font-size: 14px;
    }
    
    .form-input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
    }
    
    .form-input:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
    
    .btn-primary, .btn-secondary {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s;
    }
    
    .btn-primary {
        background-color: #27ae60;
        color: white;
    }
    
    .btn-primary:hover {
        background-color: #229954;
    }
    
    .btn-secondary {
        background-color: #95a5a6;
        color: white;
    }
    
    .btn-secondary:hover {
        background-color: #7f8c8d;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(editStyles);

// ===== KOLEKSI BUKU SEARCH & FILTER =====
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const searchInput = document.getElementById('search-buku');
        const filterGenre = document.getElementById('filter-genre');
        const bookCards = document.querySelectorAll('.book-card');

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                filterBooks(searchTerm, filterGenre.value);
            });
        }

        // Genre filter functionality
        if (filterGenre) {
            filterGenre.addEventListener('change', function() {
                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                filterBooks(searchTerm, this.value);
            });
        }

        // Detail and Pinjam button functionality
        bookCards.forEach(card => {
            const detailBtn = card.querySelector('.btn-detail-book');
            const pinjamBtn = card.querySelector('.btn-pinjam-book');
            const title = card.querySelector('.book-title').textContent;
            const author = card.querySelector('.book-author').textContent;
            const genre = card.dataset.genre || 'N/A';
            const year = card.querySelector('.meta-year')?.textContent || 'N/A';
            const description = card.querySelector('.book-desc')?.textContent || '-';
            const stockText = card.querySelector('.book-stok')?.textContent || 'Stok: 0';
            const statusText = card.querySelector('.book-status')?.textContent || 'Tidak tersedia';

            const bookData = {
                card,
                title,
                author,
                genre,
                year,
                description,
                stockText,
                statusText
            };

            if (detailBtn) {
                detailBtn.addEventListener('click', function() {
                    openBookDetailModal(bookData);
                });
            }

            if (pinjamBtn) {
                pinjamBtn.addEventListener('click', function() {
                    borrowBook(bookData);
                });
            }
        });

        renderBorrowTransactions();
        updateCollectionSummary();
    }, 300);
});

function filterBooks(searchTerm, genre) {
    const bookCards = document.querySelectorAll('.book-card');
    let visibleCount = 0;

    bookCards.forEach(card => {
        const title = card.querySelector('.book-title').textContent.toLowerCase();
        const author = card.querySelector('.book-author').textContent.toLowerCase();
        const cardGenre = card.dataset.genre;

        const matchesSearch = title.includes(searchTerm) || author.includes(searchTerm);
        const matchesGenre = genre === '' || cardGenre === genre;

        if (matchesSearch && matchesGenre) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show message if no books found
    const koleksiGrid = document.querySelector('.koleksi-grid');
    if (visibleCount === 0) {
        if (!document.querySelector('.no-books-found')) {
            const noBooks = document.createElement('div');
            noBooks.className = 'no-books-found';
            noBooks.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px;
                color: #999;
                font-size: 16px;
            `;
            noBooks.textContent = '📚 Buku tidak ditemukan. Coba cari dengan kata kunci lain.';
            koleksiGrid.appendChild(noBooks);
        }
    } else {
        const noBooks = document.querySelector('.no-books-found');
        if (noBooks) noBooks.remove();
    }
}

// ===== LAPORAN (REPORT) FUNCTIONALITY =====
// Data struktur laporan
const reportData = {
    daily: {
        type: 'Laporan Harian',
        date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        totalPeminjaman: 15,
        totalPengembalian: 12,
        totalDenda: 3,
        nominalDenda: 'Rp 45.000',
        anggotaBaru: 5,
        bukuBaru: 8,
        keterangan: 'Laporan aktivitas perpustakaan hari ini menunjukkan aktivitas yang tinggi dengan banyak peminjaman dan pengembalian buku.'
    },
    monthly: {
        type: 'Laporan Bulanan',
        date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long' }),
        totalPeminjaman: 320,
        totalPengembalian: 315,
        totalDenda: 45,
        nominalDenda: 'Rp 675.000',
        anggotaBaru: 85,
        bukuBaru: 120,
        keterangan: 'Laporan bulan ini menunjukkan pertumbuhan yang positif dalam aktivitas perpustakaan dengan peningkatan jumlah anggota dan koleksi buku.'
    },
    yearly: {
        type: 'Laporan Tahunan',
        date: new Date().getFullYear().toString(),
        totalPeminjaman: 3850,
        totalPengembalian: 3820,
        totalDenda: 520,
        nominalDenda: 'Rp 7.800.000',
        anggotaBaru: 950,
        bukuBaru: 1450,
        keterangan: 'Laporan tahun ' + new Date().getFullYear() + ' menunjukkan pertumbuhan yang signifikan dalam semua aspek operasional perpustakaan.'
    }
};

function createReportModal() {
    if (!document.getElementById('report-modal')) {
        const modalHTML = `
            <div id="report-modal" class="report-modal">
                <div class="report-modal-content">
                    <div class="report-modal-header">
                        <h2 id="report-title">Laporan</h2>
                        <button class="report-close-btn" onclick="closeReportModal()">&times;</button>
                    </div>
                    <div class="report-modal-body">
                        <div class="report-view" id="report-view">
                            <!-- Report view content -->
                        </div>
                        <div class="report-edit-form" id="report-edit-form" style="display: none;">
                            <!-- Report edit form -->
                        </div>
                    </div>
                    <div class="report-modal-footer">
                        <button class="btn-secondary" id="edit-toggle-btn" onclick="toggleReportEdit()">Edit Laporan</button>
                        <button class="btn-secondary" id="save-report-btn" style="display: none;" onclick="saveReportData()">Simpan Laporan</button>
                        <button class="btn-secondary" onclick="closeReportModal()">Tutup</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

function openReportModal(reportType) {
    createReportModal();
    const modal = document.getElementById('report-modal');
    const data = reportData[reportType];
    
    modal.dataset.reportType = reportType;
    
    // Display report view
    const reportView = document.getElementById('report-view');
    reportView.innerHTML = `
        <div class="report-details">
            <div class="report-header">
                <h3>${data.type}</h3>
                <span class="report-date">Tanggal: ${data.date}</span>
            </div>
            
            <div class="report-stats-grid">
                <div class="report-stat">
                    <span class="stat-label">Total Peminjaman</span>
                    <span class="stat-value">${data.totalPeminjaman}</span>
                </div>
                <div class="report-stat">
                    <span class="stat-label">Total Pengembalian</span>
                    <span class="stat-value">${data.totalPengembalian}</span>
                </div>
                <div class="report-stat">
                    <span class="stat-label">Denda Tertunda</span>
                    <span class="stat-value">${data.totalDenda}</span>
                </div>
                <div class="report-stat">
                    <span class="stat-label">Nominal Denda</span>
                    <span class="stat-value">${data.nominalDenda}</span>
                </div>
                <div class="report-stat">
                    <span class="stat-label">Anggota Baru</span>
                    <span class="stat-value">${data.anggotaBaru}</span>
                </div>
                <div class="report-stat">
                    <span class="stat-label">Buku Baru</span>
                    <span class="stat-value">${data.bukuBaru}</span>
                </div>
            </div>
            
            <div class="report-keterangan">
                <h4>Keterangan:</h4>
                <p>${data.keterangan}</p>
            </div>
        </div>
    `;
    
    // Reset edit button
    document.getElementById('edit-toggle-btn').textContent = 'Edit Laporan';
    document.getElementById('save-report-btn').style.display = 'none';
    
    modal.classList.add('active');
}

function toggleReportEdit() {
    const reportView = document.getElementById('report-view');
    const reportEditForm = document.getElementById('report-edit-form');
    const editBtn = document.getElementById('edit-toggle-btn');
    const saveBtn = document.getElementById('save-report-btn');
    const reportType = document.getElementById('report-modal').dataset.reportType;
    const data = reportData[reportType];
    
    if (reportEditForm.style.display === 'none') {
        // Show edit form
        reportView.style.display = 'none';
        
        reportEditForm.innerHTML = `
            <div class="report-form">
                <div class="form-group">
                    <label>Total Peminjaman</label>
                    <input type="number" id="edit-totalPeminjaman" class="form-input" value="${data.totalPeminjaman}">
                </div>
                <div class="form-group">
                    <label>Total Pengembalian</label>
                    <input type="number" id="edit-totalPengembalian" class="form-input" value="${data.totalPengembalian}">
                </div>
                <div class="form-group">
                    <label>Denda Tertunda</label>
                    <input type="number" id="edit-totalDenda" class="form-input" value="${data.totalDenda}">
                </div>
                <div class="form-group">
                    <label>Nominal Denda (Format: Rp X.XXX)</label>
                    <input type="text" id="edit-nominalDenda" class="form-input" value="${data.nominalDenda}">
                </div>
                <div class="form-group">
                    <label>Anggota Baru</label>
                    <input type="number" id="edit-anggotaBaru" class="form-input" value="${data.anggotaBaru}">
                </div>
                <div class="form-group">
                    <label>Buku Baru</label>
                    <input type="number" id="edit-bukuBaru" class="form-input" value="${data.bukuBaru}">
                </div>
                <div class="form-group">
                    <label>Keterangan</label>
                    <textarea id="edit-keterangan" class="form-input form-textarea" rows="4">${data.keterangan}</textarea>
                </div>
            </div>
        `;
        
        reportEditForm.style.display = 'block';
        editBtn.textContent = 'Batal Edit';
        saveBtn.style.display = 'block';
        showNotification('Mode edit aktif - Ubah data laporan sesuai kebutuhan', 'info', 2000);
    } else {
        // Cancel edit
        reportView.style.display = 'block';
        reportEditForm.style.display = 'none';
        editBtn.textContent = 'Edit Laporan';
        saveBtn.style.display = 'none';
        showNotification('Membatalkan edit laporan', 'warning', 1500);
    }
}

function saveReportData() {
    const reportType = document.getElementById('report-modal').dataset.reportType;
    
    reportData[reportType].totalPeminjaman = parseInt(document.getElementById('edit-totalPeminjaman').value);
    reportData[reportType].totalPengembalian = parseInt(document.getElementById('edit-totalPengembalian').value);
    reportData[reportType].totalDenda = parseInt(document.getElementById('edit-totalDenda').value);
    reportData[reportType].nominalDenda = document.getElementById('edit-nominalDenda').value;
    reportData[reportType].anggotaBaru = parseInt(document.getElementById('edit-anggotaBaru').value);
    reportData[reportType].bukuBaru = parseInt(document.getElementById('edit-bukuBaru').value);
    reportData[reportType].keterangan = document.getElementById('edit-keterangan').value;
    
    // Toggle back to view mode
    document.getElementById('report-view').style.display = 'block';
    document.getElementById('report-edit-form').style.display = 'none';
    document.getElementById('edit-toggle-btn').textContent = 'Edit Laporan';
    document.getElementById('save-report-btn').style.display = 'none';
    
    // Refresh the view
    openReportModal(reportType);
    showNotification('Laporan berhasil diperbarui!', 'success', 2000);
}

function closeReportModal() {
    const modal = document.getElementById('report-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Add Report Styling
const reportStyles = document.createElement('style');
reportStyles.textContent = `
    .report-modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s;
    }
    
    .report-modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .report-modal-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        width: 90%;
        max-width: 700px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        animation: slideUp 0.3s;
    }
    
    .report-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;
        border-bottom: 2px solid #3498db;
        background: linear-gradient(135deg, #1a2a4e 0%, #2c3e50 100%);
        color: white;
        border-radius: 8px 8px 0 0;
    }
    
    .report-modal-header h2 {
        margin: 0;
        font-size: 24px;
    }
    
    .report-close-btn {
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        color: white;
    }
    
    .report-close-btn:hover {
        color: #f39c12;
    }
    
    .report-modal-body {
        padding: 25px;
        overflow-y: auto;
        flex: 1;
    }
    
    .report-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 20px 25px;
        border-top: 1px solid #ddd;
        background-color: #f8f9fa;
        border-radius: 0 0 8px 8px;
    }
    
    .report-details {
        animation: slideUp 0.3s;
    }
    
    .report-header {
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid #3498db;
    }
    
    .report-header h3 {
        color: #1a2a4e;
        margin: 0 0 10px 0;
        font-size: 22px;
    }
    
    .report-date {
        color: #7f8c8d;
        font-size: 14px;
        font-weight: 500;
    }
    
    .report-stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }
    
    .report-stat {
        background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
        padding: 20px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-left: 4px solid #3498db;
    }
    
    .stat-label {
        color: #7f8c8d;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .stat-value {
        color: #1a2a4e;
        font-size: 28px;
        font-weight: bold;
    }
    
    .report-keterangan {
        margin-top: 25px;
        padding: 20px;
        background-color: #f0f9ff;
        border-left: 4px solid #27ae60;
        border-radius: 4px;
    }
    
    .report-keterangan h4 {
        color: #1a2a4e;
        margin: 0 0 10px 0;
    }
    
    .report-keterangan p {
        color: #2c3e50;
        line-height: 1.6;
        margin: 0;
    }
    
    .report-form {
        display: flex;
        flex-direction: column;
        gap: 18px;
        animation: fadeIn 0.3s;
    }
    
    .form-textarea {
        resize: vertical;
        min-height: 100px;
        font-family: inherit;
    }
`;
document.head.appendChild(reportStyles);

// Add event listeners to "Lihat Laporan" buttons
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const reportCards = document.querySelectorAll('.report-cards .report-card');
        
        reportCards.forEach((card, index) => {
            const button = card.querySelector('.btn');
            const title = card.querySelector('h3').textContent;
            let reportType = 'daily';
            
            if (title.includes('Harian')) {
                reportType = 'daily';
            } else if (title.includes('Bulanan')) {
                reportType = 'monthly';
            } else if (title.includes('Tahunan')) {
                reportType = 'yearly';
            }
            
            if (button) {
                button.onclick = function(e) {
                    e.stopPropagation();
                    openReportModal(reportType);
                    showNotification('Membuka ' + title, 'success', 1500);
                };
                button.style.cursor = 'pointer';
            }
        });
    }, 500);
});

// Add mobile responsiveness
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Add mobile menu button if it doesn't exist
        const header = document.querySelector('.header');
        if (header && !document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileBtn.onclick = toggleMobileMenu;
            header.insertBefore(mobileBtn, header.firstChild);
        }

        // Close mobile menu when clicking overlay
        const overlay = document.getElementById('mobile-overlay');
        if (overlay) {
            overlay.addEventListener('click', toggleMobileMenu);
        }
    }
});

// ===== FUNGSI LAPORAN DI INDEX.HTML =====
function gantiLaporan() {
    const jenis = document.getElementById('jenis-laporan').value;
    document.getElementById('laporan-harian').style.display = 'none';
    document.getElementById('laporan-bulanan').style.display = 'none';
    document.getElementById('laporan-tahunan').style.display = 'none';
    document.getElementById('laporan-' + jenis).style.display = 'block';
}

function cetakLaporan() {
    const jenis = document.getElementById('jenis-laporan').value;
    const tanggal = document.getElementById('tanggal-laporan').value;
    let namaLaporan = '';
    
    if (jenis === 'harian') namaLaporan = 'Laporan Harian';
    else if (jenis === 'bulanan') namaLaporan = 'Laporan Bulanan';
    else namaLaporan = 'Laporan Tahunan';
    
    alert('Mencetak ' + namaLaporan + (tanggal ? ' Tanggal: ' + tanggal : ''));
    window.print();
}

// ===== PAYMENT FUNCTIONALITY =====
let selectedPaymentMethod = null;
let selectedPaymentAccount = null;
let currentPaymentData = {
    id: null,
    name: null,
    amount: null
};

function openPaymentModal(id, name, amount, buttonElement) {
    const modal = document.getElementById('paymentModal');
    document.getElementById('paymentName').textContent = name;
    document.getElementById('paymentAmount').textContent = amount.toLocaleString('id-ID');
    
    const paymentRow = buttonElement ? buttonElement.closest('tr') : null;
    currentPaymentData = { id: id, name: name, amount: amount, row: paymentRow };
    selectedPaymentMethod = null;
    selectedPaymentAccount = null;
    
    // Reset all payment options
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Reset submit button
    document.getElementById('paymentSubmitBtn').disabled = true;
    document.getElementById('paymentSubmitBtn').style.opacity = '0.5';
    document.getElementById('paymentSubmitBtn').style.cursor = 'not-allowed';
    
    modal.style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    selectedPaymentMethod = null;
    selectedPaymentAccount = null;
}

function closeConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function selectPaymentMethod(method, account) {
    // Remove selection dari semua option
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Set metode pembayaran baru
    selectedPaymentMethod = method;
    selectedPaymentAccount = account;
    
    // Add selected class to clicked option
    const methodLower = method.toLowerCase();
    const optionElement = document.getElementById(`${methodLower}-select`)?.parentElement;
    
    if (optionElement) {
        optionElement.classList.add('selected');
    } else {
        // Fallback: select by method name in parent
        document.querySelectorAll('.payment-option').forEach(option => {
            const text = option.textContent.toLowerCase();
            if (text.includes(methodLower)) {
                option.classList.add('selected');
            }
        });
    }
    
    // Enable submit button
    document.getElementById('paymentSubmitBtn').disabled = false;
    document.getElementById('paymentSubmitBtn').style.opacity = '1';
    document.getElementById('paymentSubmitBtn').style.cursor = 'pointer';
    
    showNotification(`Metode pembayaran ${method.toUpperCase()} dipilih`, 'success', 1500);
}

function processPayment() {
    if (!selectedPaymentMethod || !selectedPaymentAccount) {
        showNotification('Pilih metode pembayaran terlebih dahulu', 'error');
        return;
    }
    
    // Close payment modal
    closePaymentModal();
    
    // Update laporan otomatis untuk pembayaran denda
    updateReportForPayment(currentPaymentData.amount);

    // Show payment confirmation
    const methodNames = {
        'bri': 'BRI',
        'bca': 'BCA',
        'dana': 'Dana',
        'ovo': 'OVO'
    };
    
    document.getElementById('confirmAmount').textContent = currentPaymentData.amount.toLocaleString('id-ID');
    document.getElementById('confirmMethod').textContent = methodNames[selectedPaymentMethod];
    
    // Update tabel denda secara langsung
    if (currentPaymentData.row) {
        const statusCell = currentPaymentData.row.querySelector('td:nth-child(6)');
        if (statusCell) {
            statusCell.innerHTML = '<span class="badge badge-success">Sudah Lunas</span>';
        }
        const actionCell = currentPaymentData.row.querySelector('td:nth-child(7)');
        if (actionCell) {
            const btn = actionCell.querySelector('button');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Sudah Dibayar';
                btn.style.opacity = '0.6';
                btn.style.cursor = 'not-allowed';
            }
        }
    }
    
    // Show confirmation modal
    document.getElementById('confirmationModal').style.display = 'flex';
    
    // Log pembayaran
    console.log('Pembayaran diproses:');
    console.log('- Nama: ' + currentPaymentData.name);
    console.log('- Nominal: Rp ' + currentPaymentData.amount);
    console.log('- Metode: ' + methodNames[selectedPaymentMethod]);
    console.log('- Rekening/Nomor: ' + selectedPaymentAccount);
}

function updateReportForPayment(amount) {
    const reportTypes = ['daily', 'monthly', 'yearly'];
    reportTypes.forEach(type => {
        const data = reportData[type];
        data.totalDenda = (data.totalDenda || 0) + 1;
        data.nominalDenda = formatCurrency(parseCurrency(data.nominalDenda) + amount, 'Rp ');
    });

    // Refresh current report modal view if open
    const modal = document.getElementById('report-modal');
    if (modal && modal.classList.contains('active')) {
        const currentType = modal.dataset.reportType;
        if (currentType) {
            openReportModal(currentType);
        }
    }
}

function addNewMemberToReport() {
    const reportTypes = ['daily', 'monthly', 'yearly'];
    reportTypes.forEach(type => {
        const data = reportData[type];
        data.anggotaBaru = (data.anggotaBaru || 0) + 1;
    });
    showNotification('Anggota baru terdeteksi dan dicatat di laporan', 'success', 2000);

    // Refresh current report modal view if open
    const modal = document.getElementById('report-modal');
    if (modal && modal.classList.contains('active')) {
        const currentType = modal.dataset.reportType;
        if (currentType) {
            openReportModal(currentType);
        }
    }
}

function parseCurrency(value) {
    if (typeof value === 'number') return value;
    return Number(String(value).replace(/[^0-9]/g, '')) || 0;
}

function formatCurrency(amount, prefix = '') {
    return prefix + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function completePayment() {
    closeConfirmationModal();
    
    // Update status di tabel
    const table = document.querySelector('.data-table tbody');
    if (table) {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            if (row.textContent.includes(currentPaymentData.name)) {
                const statusCell = row.querySelector('td:nth-child(6)');
                if (statusCell) {
                    statusCell.innerHTML = '<span class="badge badge-success">Sudah Lunas</span>';
                }
                
                // Disable button
                const actionCell = row.querySelector('td:nth-child(7)');
                if (actionCell) {
                    const btn = actionCell.querySelector('button');
                    if (btn) {
                        btn.disabled = true;
                        btn.textContent = 'Sudah Dibayar';
                        btn.style.opacity = '0.6';
                        btn.style.cursor = 'not-allowed';
                    }
                }
            }
        });
    }
    
    // Tampilkan notifikasi sukses
    showNotification(`Pembayaran sebesar Rp ${currentPaymentData.amount.toLocaleString('id-ID')} berhasil diproses! Terima kasih.`, 'success', 3000);
}

const defaultUsers = [
    { nim: '2021001', username: 'mahasiswa1', password: 'password123', nama: 'Andi Pratama', role: 'user' },
    { nim: '2021002', username: 'mahasiswa2', password: 'password123', nama: 'Budi Santoso', role: 'user' },
    { nim: '2021003', username: 'mahasiswa3', password: 'password456', nama: 'Putri Yansih', role: 'user' }
];

function openChangePasswordModal() {
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('passwordModal').style.display = 'flex';
}

function closeChangePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
}

function initializeStoredUsers() {
    const stored = localStorage.getItem('libraryUsers');
    if (!stored) {
        localStorage.setItem('libraryUsers', JSON.stringify(defaultUsers));
        return;
    }

    try {
        JSON.parse(stored);
    } catch (e) {
        console.warn('libraryUsers parse error, resetting store:', e);
        localStorage.setItem('libraryUsers', JSON.stringify(defaultUsers));
    }
}

function getStoredUsers() {
    const stored = localStorage.getItem('libraryUsers');
    if (!stored) {
        localStorage.setItem('libraryUsers', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    try {
        return JSON.parse(stored) || [];
    } catch (e) {
        console.warn('libraryUsers parse error, resetting store:', e);
        localStorage.setItem('libraryUsers', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
}

function saveStoredUsers(users) {
    localStorage.setItem('libraryUsers', JSON.stringify(users));
}

function submitChangePassword() {
    const oldPassword = document.getElementById('oldPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
        showNotification('Semua field harus diisi.', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showNotification('Password baru tidak cocok.', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showNotification('Password baru minimal 6 karakter.', 'error');
        return;
    }

    const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}');
    if (!loginUser || !loginUser.username) {
        showNotification('Tidak ada pengguna yang sedang login.', 'error');
        return;
    }

    const users = getStoredUsers();
    const currentUser = users.find(user => user.username.toLowerCase() === loginUser.username.toLowerCase());
    if (!currentUser) {
        showNotification('Akun tidak ditemukan.', 'error');
        return;
    }

    if (currentUser.password !== oldPassword) {
        showNotification('Password lama salah.', 'error');
        return;
    }

    currentUser.password = newPassword;
    saveStoredUsers(users);

    const updatedLoginUser = { ...loginUser, password: newPassword };
    localStorage.setItem('loginUser', JSON.stringify(updatedLoginUser));

    showNotification('Password berhasil diganti.', 'success');
    closeChangePasswordModal();
}

function displayUserProfile() {
    const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}');
    
    if (loginUser && loginUser.nama) {
        // Update header user tag
        const headerUserName = document.getElementById('headerUserName');
        if (headerUserName) {
            headerUserName.textContent = loginUser.nama.split(' ')[0] || loginUser.nama;
        }
        
        // Update Lainnya page user profile section
        const profileUserName = document.getElementById('profileUserName');
        if (profileUserName) {
            profileUserName.textContent = loginUser.nama;
        }
        
        const profileUserRole = document.getElementById('profileUserRole');
        if (profileUserRole) {
            const roleText = loginUser.role === 'admin' ? 'Administrator' : 'Pengguna Biasa';
            profileUserRole.textContent = roleText;
        }
    } else {
        // Default display jika tidak ada user login
        const headerUserName = document.getElementById('headerUserName');
        if (headerUserName) {
            headerUserName.textContent = 'Guest';
        }
    }
}

initializeStoredUsers();
displayUserProfile();

// Update user profile display ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    displayUserProfile();
});

// Edit Profile Modal Handlers
function openEditProfileModal() {
    const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}');
    const nameInput = document.getElementById('editProfileName');
    const roleSelect = document.getElementById('editProfileRole');
    if (nameInput) nameInput.value = loginUser.nama || localStorage.getItem('userName') || '';
    if (roleSelect) roleSelect.value = loginUser.role || 'user';
    const modal = document.getElementById('editProfileModal');
    if (modal) modal.style.display = 'flex';
}

function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) modal.style.display = 'none';
}

function saveProfileChanges() {
    const name = (document.getElementById('editProfileName')?.value || '').trim();
    const role = (document.getElementById('editProfileRole')?.value || 'user');
    if (!name) {
        showNotification('Nama tidak boleh kosong.', 'error');
        return;
    }

    const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}');
    if (loginUser && loginUser.username) {
        loginUser.nama = name;
        loginUser.role = role;
        localStorage.setItem('loginUser', JSON.stringify(loginUser));

        // Update stored users list if exists
        try {
            const users = getStoredUsers();
            const idx = users.findIndex(u => u.username && loginUser.username && u.username.toLowerCase() === loginUser.username.toLowerCase());
            if (idx !== -1) {
                users[idx].nama = name;
                users[idx].role = role;
                saveStoredUsers(users);
            }
        } catch (e) {
            console.warn('Failed to update stored users:', e);
        }

        // Keep backward-compatible key for other scripts
        localStorage.setItem('userName', name);

        displayUserProfile();
        closeEditProfileModal();
        showNotification('Profil berhasil diperbarui.', 'success');
    } else {
        // No loginUser: just save name to userName
        localStorage.setItem('userName', name);
        displayUserProfile();
        closeEditProfileModal();
        showNotification('Nama pengguna diperbarui untuk sesi ini.', 'success');
    }
}
