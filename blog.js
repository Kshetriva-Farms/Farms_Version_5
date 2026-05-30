// Language Translation Dictionary (Matching index.html shared translations)
const translations = {
    en: {
        logoText: "Kshetriva Farms",
        navHome: "Home",
        navAbout: "About Us",
        navHow: "How It Works",
        navProducts: "Products",
        navFarmers: "Our Farmers",
        navGallery: "Gallery",
        navReviews: "Reviews",
        footerDesc: "From Farm to Home — Directly. Empowering farmers and bringing health to families.",
        footerLinks: "Quick Links",
        footerContact: "Contact Us",
        footerFollow: "Follow Us",
        footerCopyright: "© 2026 Kshetriva Farms. All rights reserved.",
        emailCopied: "Email copied to clipboard!"
    },
    te: {
        logoText: "క్షేత్రీవ ఫార్మ్స్",
        navHome: "హోమ్",
        navAbout: "మా గురించి",
        navHow: "ఇది ఎలా పనిచేస్తుంది",
        navProducts: "ఉత్పత్తులు",
        navFarmers: "మా రైతులు",
        navGallery: "గ్యాలరీ",
        navReviews: "సమీక్షలు",
        footerDesc: "పొలం నుండి నేరుగా ఇంటికి. రైతుల సబలీకరణ మరియు కుటుంబాల ఆరోగ్యం.",
        footerLinks: "త్వరిత లింకులు",
        footerContact: "మమ్మల్ని సంప్రదించండి",
        footerFollow: "మమ్మల్ని అనుసరించండి",
        footerCopyright: "© 2026 క్షేత్రీవ ఫార్మ్స్. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",
        emailCopied: "ఈమెయిల్ క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!"
    }
};

// Retrieve language selection from localStorage or fallback to English
let currentLang = localStorage.getItem('kshetriva_lang') || 'en';

// Apply translations dynamically to common header/footer layouts
function applyLanguage() {
    const dict = translations[currentLang];

    // 1. Update Lang Selector sliding toggle states
    const langToggle = document.getElementById('langToggle');
    const langOptEn = document.getElementById('langOptEn');
    const langOptTe = document.getElementById('langOptTe');
    if (langToggle && langOptEn && langOptTe) {
        if (currentLang === 'te') {
            langToggle.classList.add('te-active');
            langOptTe.classList.add('active');
            langOptEn.classList.remove('active');
        } else {
            langToggle.classList.remove('te-active');
            langOptTe.classList.remove('active');
            langOptEn.classList.add('active');
        }
    }

    // 2. Translate Logo
    document.querySelectorAll('.logo span').forEach(el => el.textContent = dict.logoText);

    // 3. Translate Header Navigation Links
    const homeLink = document.querySelector('.nav-links a[href="index.html#home"]');
    if (homeLink) homeLink.textContent = dict.navHome;
    const aboutLink = document.querySelector('.nav-links a[href="index.html#about"]');
    if (aboutLink) aboutLink.textContent = dict.navAbout;
    const howLink = document.querySelector('.nav-links a[href="index.html#how-it-works"]');
    if (howLink) howLink.textContent = dict.navHow;
    const productsLink = document.querySelector('.nav-links a[href="index.html#products"]');
    if (productsLink) productsLink.textContent = dict.navProducts;
    const farmersLink = document.querySelector('.nav-links a[href="index.html#farmers"]');
    if (farmersLink) farmersLink.textContent = dict.navFarmers;
    const galleryLink = document.querySelector('.nav-links a[href="index.html#gallery"]');
    if (galleryLink) galleryLink.textContent = dict.navGallery;
    const reviewsLink = document.querySelector('.nav-links a[href="index.html#reviews"]');
    if (reviewsLink) reviewsLink.textContent = dict.navReviews;

    // 4. Translate Footer Slogan & Column Titles
    const footerDesc = document.querySelector('footer .footer-col:nth-child(1) p');
    if (footerDesc) footerDesc.textContent = dict.footerDesc;

    const footerHeaders = document.querySelectorAll('footer .footer-col h4');
    if (footerHeaders.length >= 3) {
        footerHeaders[0].textContent = dict.footerLinks;
        footerHeaders[1].textContent = dict.footerContact;
        footerHeaders[2].textContent = dict.footerFollow;
    }

    // 5. Translate Footer Copyright Label
    const footerCopyright = document.getElementById('copyrightText');
    if (footerCopyright) footerCopyright.textContent = dict.footerCopyright;
}

// Mobile Navigation Toggle Bindings
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu automatically on item click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Navbar Box-shadow state on scroll
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            } else {
                navbar.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
            }
        });
    }
}

// Clipboard copy action and elegant Toast helper for Email addresses
function setupClipboardCopy(btnId) {
    const btn = document.getElementById(btnId);
    const toast = document.getElementById('toastNotification');
    if (btn && toast) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('farm@kshetrivafarms.com').then(() => {
                const dict = translations[currentLang];
                toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${dict.emailCopied}`;
                toast.style.transform = "translateX(-50%) translateY(0)";
                setTimeout(() => {
                    toast.style.transform = "translateX(-50%) translateY(100px)";
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy email address: ', err);
            });
        });
    }
}

// Initialize Page Modules on Dom Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle listener
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'te' : 'en';
            localStorage.setItem('kshetriva_lang', currentLang);
            applyLanguage();
        });
    }

    // Apply active translations dictionary on load
    applyLanguage();

    // 2. Initialize Scroll effect & Mobile Toggle
    initNavbarScroll();
    initMobileMenu();

    // 3. Setup Clipboard Copies
    setupClipboardCopy('emailContactBtn');
    setupClipboardCopy('footerEmailBtn');
});
