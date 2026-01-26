(function () {
    "use strict";

    // Scrolling
    const navLinks = document.querySelectorAll('.nav-menu a, .back-to-top');
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;

    const smoothScroll = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - headerHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                event.preventDefault();
                
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScroll(targetId);
                }

                if (document.body.classList.contains('mobile-nav-active')) {
                    toggleMobileNav();
                }
            }
        });
    });

    // Mobile Nav
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('nav-menu');
    
    const mobileOverlay = document.createElement('div');
    mobileOverlay.id = 'mobile-body-overly';
    document.body.appendChild(mobileOverlay);

    const toggleMobileNav = () => {
        document.body.classList.toggle('mobile-nav-active');
        const icon = mobileNavToggle.querySelector('i');
        if (document.body.classList.contains('mobile-nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileOverlay.style.display = 'block';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileOverlay.style.display = 'none';
        }
    };

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', toggleMobileNav);
    }

    mobileOverlay.addEventListener('click', toggleMobileNav);

    // Back to Top
    const backToTop = document.querySelector('.back-to-top');

    const toggleBackToTop = () => {
        if (backToTop) {
            if (window.scrollY > 100) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        }
    };

    window.addEventListener('scroll', toggleBackToTop);
    window.addEventListener('load', toggleBackToTop);

    // Active State
    const updateActiveMenu = () => {
        let current = '';
        const scrollPosition = window.scrollY + headerHeight + 1;

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('menu-active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('menu-active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveMenu);
    window.addEventListener('load', updateActiveMenu);

})();