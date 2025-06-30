// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    let lastScrollTop = 0;

    // Handle scroll behavior
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class based on scroll position
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar based on scroll direction (only when mobile menu is closed)
        if (!navbarCollapse.classList.contains('show')) {
            if (scrollTop > lastScrollTop && scrollTop > 500) {
                // Scrolling down & past 500px
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up or near top
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScrollTop = scrollTop;
    });

    // Handle mobile menu toggle
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Reset navbar position when opening mobile menu
            navbar.style.transform = 'translateY(0)';
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.add('collapsed');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbar.contains(event.target);
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.add('collapsed');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.add('collapsed');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    }
}); 