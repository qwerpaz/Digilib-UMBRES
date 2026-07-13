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
            }, 150);
        } else {
            pages.forEach(page => page.classList.remove('active'));
            pageElement.classList.add('active');
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
            if (this.textContent.includes('Lihat Laporan') || this.textContent.includes('Edit Profil')) {
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
            console.log('Stat card clicked');
            // Add functionality based on which stat is clicked
        });
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
