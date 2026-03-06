/* ===================================================
   FOROS ADVISORS LLP GROUP - JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Header Scroll Effect ----------
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ---------- Hamburger Menu ----------
    const hamburger = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        // Close on link click
        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- Search Overlay ----------
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    // Also check for subnav search buttons
    const subnavSearch = document.querySelector('.subnav__search');

    function openSearch() {
        if (searchOverlay) {
            searchOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 300);
            }
        }
    }

    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('open');
            document.body.style.overflow = '';
            if (searchInput) searchInput.value = '';
        }
    }

    if (searchToggle) searchToggle.addEventListener('click', openSearch);
    if (subnavSearch) subnavSearch.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
    });

    // Close on overlay click
    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearch();
        });
    }

    // ---------- Dropdown Toggle (Subpage nav) ----------
    const dropdownLinks = document.querySelectorAll('.subnav__link--dropdown');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            link.classList.toggle('open');
        });
    });

    // ---------- Scroll Animations ----------
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // ---------- Number Counter Animation ----------
    const statNumbers = document.querySelectorAll('.stat__number[data-count]');

    if (statNumbers.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    const prefix = target.getAttribute('data-prefix') || '';
                    const suffix = target.getAttribute('data-suffix') || '';
                    let current = 0;
                    const increment = countTo / 60;
                    const duration = 1500;
                    const stepTime = duration / 60;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= countTo) {
                            current = countTo;
                            clearInterval(timer);
                        }
                        target.textContent = prefix + Math.floor(current) + suffix;
                    }, stepTime);

                    countObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(el => countObserver.observe(el));
    }

    // ---------- Smooth Parallax on Hero ----------
    const hero = document.querySelector('.hero__bg-img');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

});
