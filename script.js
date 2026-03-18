/* ===================================================
   FOROS ADVISORY LLP GROUP - JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------- Loader Injection & Logic ----------
    const loaderHTML = `
        <div class="loader-wrapper" id="loader">
            <div class="loader"></div>
            <div class="loader-text">Foros Advisory LLP</div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);

    const loader = document.getElementById('loader');
    
    // Hide loader after full window load
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('fade-out');
                // Remove from DOM after transition
                setTimeout(() => loader.remove(), 600);
            }
        }, 1000); // 1 second delay purely for aesthetics
    });

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

    // ---------- Search Overlay & Logic ----------
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-overlay__btn');
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
            // Clear results
            const resultsDiv = document.getElementById('search-results');
            if (resultsDiv) resultsDiv.innerHTML = '';
        }
    }

    if (searchToggle) searchToggle.addEventListener('click', openSearch);
    if (subnavSearch) subnavSearch.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    // Basic Search Logic
    const searchData = [
        { title: "Home", url: "index.html", content: "premier boutique investment bank financial M&A transaction advice" },
        { title: "Who We Are", url: "who-we-are.html", content: "senior experienced strategic M&A advisors Jean Manas" },
        // { title: "Knowledge", url: "knowledge.html", content: "Insights industry trends M&A capital markets corporate initiatives news" },
        // { title: "Join Foros", url: "join-foros.html", content: "Career Analyst Program Associate Track Growth dedicated excellence" },
        { title: "Contact Us", url: "contact-us.html", content: "Reach out New York headquarters info email contact" },
        // { title: "Our Core Values", url: "our-core-values.html", content: "Integrity Excellence Client focus Independence Respect" },
        // { title: "Our Approach", url: "our-approach.html", content: "Differentiated creative solutions senior-led honest advice" },
        { title: "Our Services", url: "our-services.html", content: "M&A Strategic Advisory Defense Raid Capital Markets expertise" },
        { title: "Our Team", url: "our-team.html", content: "Leadership Jean Manas Bankers Collaboration precision" }
    ];

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );

        displayResults(results);
    }

    function displayResults(results) {
        let resultsDiv = document.getElementById('search-results');
        if (!resultsDiv) {
            resultsDiv = document.createElement('div');
            resultsDiv.id = 'search-results';
            resultsDiv.className = 'search-overlay__results';
            searchOverlay.querySelector('.search-overlay__inner').appendChild(resultsDiv);
        }

        if (results.length === 0) {
            resultsDiv.innerHTML = '<p class="search-overlay__no-results">No results found.</p>';
        } else {
            resultsDiv.innerHTML = results.map(r => `
                <a href="${r.url}" class="search-overlay__result-item">
                    <h3>${r.title}</h3>
                    <p>${r.url}</p>
                </a>
            `).join('');
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

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
    const dropdownLinks = document.querySelectorAll('.subnav__link--dropdown, .subnav__sec-link--dropdown');
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
