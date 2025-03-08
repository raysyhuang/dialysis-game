function updateNavigationLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href)) {
            link.classList.add('active');
            // Add a subtle animation to the active link
            link.style.animation = 'pulse 0.5s ease';
        } else {
            link.classList.remove('active');
            link.style.animation = '';
        }

        // Handle both click and touch events
        link.addEventListener('touchstart', () => {
            link.style.transform = 'scale(0.98)';
        });

        link.addEventListener('touchend', () => {
            link.style.transform = '';
        });

        // Keep existing mouse events for desktop
        if (window.matchMedia('(hover: hover)').matches) {
            link.addEventListener('mouseenter', () => {
                if (!link.classList.contains('active')) {
                    link.style.transform = 'translateY(-2px)';
                }
            });

            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    link.style.transform = '';
                }
            });
        }
    });
}

// Add this to all pages' CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .nav-link {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .nav-link.active {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Update navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', updateNavigationLinks);

// This should be dynamic based on environment
const API_URL = window.location.origin + '/analyze';  // This is better than hardcoding

// When making the fetch request
fetch(API_URL, {
    method: 'POST',
    body: formData,
    // ... other options
}) 