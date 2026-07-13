// ============================================================================
// FILE: auth.js
// FUNGSI: Mengelola authentikasi dan session pengguna
// ============================================================================

// ============================================================================
// 1. CEK SESSION SAAT HALAMAN DIMUAT
// ============================================================================
function checkUserSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginUser = localStorage.getItem('loginUser');
    
    // Jika belum login, redirect ke halaman login
    if (isLoggedIn !== 'true' || !loginUser) {
        window.location.href = 'Login.html';
        return false;
    }
    
    return true;
}

// ============================================================================
// 2. DAPATKAN DATA USER YANG LOGIN
// ============================================================================
function getCurrentUser() {
    const loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
        try {
            return JSON.parse(loginUser);
        } catch (e) {
            console.error('Error parsing user data:', e);
            logout();
            return null;
        }
    }
    return null;
}

// ============================================================================
// 3. UPDATE TAMPILAN NAMA USER DI HEADER
// ============================================================================
function updateUserProfile() {
    const user = getCurrentUser();
    if (user) {
        const userTagElement = document.querySelector('.user-tag');
        if (userTagElement) {
            userTagElement.textContent = user.nama || user.username;
            userTagElement.title = 'NIM: ' + user.nim + ' | Role: ' + user.role;
        }
    }
}

// ============================================================================
// 4. FUNGSI LOGOUT
// ============================================================================
function logout() {
    // Hapus semua session data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('loginTimestamp');
    
    // Redirect ke halaman login
    window.location.href = 'Login.html';
}

// ============================================================================
// 5. TAMBAHKAN TOMBOL LOGOUT DI HEADER
// ============================================================================
function addLogoutButton() {
    const userProfile = document.querySelector('.user-profile');
    if (userProfile && !document.getElementById('logoutBtn')) {
        // Buat tombol logout
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logoutBtn';
        logoutBtn.textContent = 'Logout';
        logoutBtn.style.cssText = `
            background-color: #d32f2f;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 15px;
            font-weight: 500;
            transition: background-color 0.3s;
        `;
        
        logoutBtn.onmouseover = function() {
            this.style.backgroundColor = '#b71c1c';
        };
        
        logoutBtn.onmouseout = function() {
            this.style.backgroundColor = '#d32f2f';
        };
        
        logoutBtn.onclick = function() {
            if (confirm('Apakah Anda yakin ingin logout?')) {
                logout();
            }
        };
        
        userProfile.appendChild(logoutBtn);
    }
}

// ============================================================================
// 6. CEK ROLE USER (ADMIN atau USER BIASA)
// ============================================================================
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function isRegularUser() {
    const user = getCurrentUser();
    return user && user.role === 'user';
}

// ============================================================================
// 7. SESSION TIMEOUT (LOGOUT OTOMATIS SETELAH 30 MENIT TIDAK AKTIF)
// ============================================================================
let sessionTimeoutId;

function resetSessionTimeout() {
    // Clear timeout sebelumnya
    if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
    }
    
    // Set timeout 30 menit (1800000 ms)
    sessionTimeoutId = setTimeout(function() {
        alert('Session Anda telah berakhir. Silakan login kembali.');
        logout();
    }, 1800000);
}

// Activity listener untuk reset timeout
function setupSessionActivity() {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    events.forEach(function(event) {
        document.addEventListener(event, function() {
            resetSessionTimeout();
        }, true);
    });
    
    // Initialize timeout saat halaman dimuat
    resetSessionTimeout();
}

// ============================================================================
// 8. INIT AUTHENTICATION SAAT DOCUMENT READY
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Cek session
    if (checkUserSession()) {
        // Update profile user
        updateUserProfile();
        
        // Tambahkan tombol logout
        addLogoutButton();
        
        // Setup session activity timeout
        setupSessionActivity();
    }
});

// ============================================================================
// 9. PREVENT HISTORY BACK SETELAH LOGOUT
// ============================================================================
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Cek session jika browser back button digunakan
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'Login.html';
        }
    }
});
