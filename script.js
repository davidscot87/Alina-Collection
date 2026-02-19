/**
 * ALINA COLLECTION - SHARED LAYOUT SYSTEM
 * Centralized Header, Footer, and Navigation components to avoid code duplication.
 */

const CONFIG = {
    brandName: "Alina Collection",
    logoPath: "image/Logo/logo.png",
    phone: "+977 970-5978322",
    email: "hello@alinacollection.com",
    address: "Ithari BP Chowk, Nepal",
};

const LayoutManager = {
    init() {
        // 1. Core Layout Rendering
        this.renderHeader();
        this.renderFooter();
        this.renderMobileDrawer();
        this.renderSearchPopup();
        this.setActiveLinks();
        this.attachGlobalListeners();

        // 2. Auth & Core State
        if (typeof initLoader === 'function') initLoader();
        if (typeof updateNavbarAuth === 'function') updateNavbarAuth();
        if (typeof handleAuth === 'function') handleAuth();

        // 3. Page-Specific Dynamic Content
        const params = new URLSearchParams(window.location.search);
        if (typeof renderProducts === 'function') {
            renderProducts('dynamic-featured-pro', 8);
            renderProducts('dynamic-new-pro', 4);
            renderProducts('dynamic-all-pro', null, params.get('cat'), params.get('search'));
            renderProducts('dynamic-flash-mini', 6);
        }
        if (typeof renderHomeCategories === 'function') renderHomeCategories();
        if (typeof renderSProduct === 'function') renderSProduct();
        if (typeof renderCart === 'function') renderCart();
        if (typeof renderAdminDashboard === 'function') renderAdminDashboard();

        // 4. Effects & Utilities
        if (typeof startCountdown === 'function') startCountdown();
        if (typeof initTiltEffect === 'function') initTiltEffect();
        if (typeof initPremiumEffects === 'function') initPremiumEffects();
        if (typeof initFAQ === 'function') initFAQ();
        if (typeof initLiveSearch === 'function') initLiveSearch();

        // 5. Shared Features (Guarded against duplicates)
        if (typeof initDarkMode === 'function') initDarkMode();
        if (typeof initCustomDropdowns === 'function') initCustomDropdowns();
        if (typeof initSideCart === 'function') initSideCart();
        if (typeof initScrollTop === 'function') initScrollTop();
        if (typeof initNewsletterPopup === 'function') initNewsletterPopup();

        this.initContactForm();
        this.updateCartBadge();
        this.renderSupportWidget();
    },

    initContactForm() {
        const contactForm = document.querySelector('#form-details form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Message sent successfully! We will get back to you soon.');
                contactForm.reset();
            });
        }
    },


    renderSupportWidget() {
        if (document.querySelector('.whatsapp-float')) return;
        const wa = document.createElement('a');
        wa.href = "https://wa.me/9779705978322";
        wa.className = "whatsapp-float";
        wa.target = "_blank";
        wa.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
        document.body.appendChild(wa);
    },



    updateCartBadge() {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cartData.reduce((acc, item) => acc + (parseInt(item.quantity) || 1), 0);
        document.querySelectorAll('.cart-badge').forEach(badge => {
            badge.innerText = totalCount;
            badge.style.display = totalCount > 0 ? 'flex' : 'none';
        });
    },



    renderHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        header.innerHTML = `
            <a href="index.html"><img src="${CONFIG.logoPath}" class="logo" alt="${CONFIG.brandName}" /></a>
            <div class="header-search">
                <input type="text" placeholder="Search premium fashion..." id="header-search-input">
                <button type="button" id="header-search-btn"><i class="fas fa-search"></i></button>
            </div>
            <div>
                <ul id="navbar">
                    <li><a href="index.html">Home</a></li>
                    <li>
                        <a href="shop.html">Shop <i class="fas fa-angle-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="shop.html?cat=Tops">Tops & Shirts</a></li>
                            <li><a href="shop.html?cat=Bottoms">Pants & Bottoms</a></li>
                            <li><a href="shop.html?cat=Dresses">Dresses</a></li>
                            <li><a href="shop.html?cat=Outerwear">Outerwear</a></li>
                            <li><a href="shop.html?cat=Footwear">Footwear</a></li>
                            <li><a href="shop.html?cat=Accessories">Accessories</a></li>
                        </ul>
                    </li>
                    <li><a href="about.html">Our Story</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li>
                    <a href="cart.html" class="cart-link">
                        <i class="fa-solid fa-bag-shopping"></i> 
                        <span class="cart-badge">0</span>
                        <span>My Cart</span>
                    </a>
                    </li>
                    <li class="nav-select">
                        <select name="currency" id="currency-select">
                            <option value="NPR">NPR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </li>
                    <a href="#" id="close"><i class="far fa-times"></i></a>
                </ul>
            </div>
            <div id="mobile">
                <i class="fas fa-search" id="mobile-search-btn"></i>
                <a href="cart.html" class="cart-link">
                    <i class="fa-solid fa-bag-shopping"></i> 
                    <span class="cart-badge">0</span>
                    <span>My Cart</span>
                </a>
                <div id="bar" class="hamburger-btn" aria-label="Toggle Menu">
                    <span class="ham-line ham-line-1"></span>
                    <span class="ham-line ham-line-2"></span>
                    <span class="ham-line ham-line-3"></span>
                </div>
            </div>
        `;
    },

    renderFooter() {
        let footer = document.querySelector('footer');
        if (!footer) return;

        footer.className = 'section-p1';
        footer.innerHTML = `
            <div class="footer-container">
                <div class="col footer-brand">
                    <img src="${CONFIG.logoPath}" class="logo" alt="${CONFIG.brandName}" />
                    <p>Elevating everyday style with curated premium fashion. Experience the blend of tradition and contemporary elegance.</p>
                    <div class="follow">
                        <h4>Connect With Us</h4>
                        <div class="icon">
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                            <a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>

                <div class="footer-links-grid">
                    <div class="col">
                        <h4>The Company</h4>
                        <a href="about.html">Our Story</a>
                        <a href="shop.html">The Collection</a>
                        <a href="flash-sale.html">Exclusive Deals</a>
                        <a href="contact.html">Contact Us</a>
                    </div>

                    <div class="col">
                        <h4>Store Policies</h4>
                        <p style="font-size: 13px; line-height: 1.8; color: var(--text-muted); margin: 10px 0;">
                            <i class="fas fa-calendar-week" style="color: var(--primary-color); margin-right: 8px;"></i> New arrivals every week<br>
                            <i class="fas fa-money-bill-wave" style="color: var(--primary-color); margin-right: 8px;"></i> Cash on Delivery available<br>
                            <i class="fas fa-ban" style="color: var(--primary-color); margin-right: 8px;"></i> No returns or exchanges
                        </p>
                    </div>

                    <div class="col">
                        <h4>My Account</h4>
                        <a href="login.html">Sign In / Register</a>
                        <a href="cart.html">View My Cart</a>
                        <a href="user-dashboard.html">Order History</a>
                        <a href="shop.html?cat=nepali">Nepali Heritage</a>
                    </div>

                    <div class="col footer-contact">
                        <h4>Get In Touch</h4>
                        <p><i class="fas fa-map-marker-alt"></i> ${CONFIG.address}</p>
                        <p><i class="fas fa-phone-alt"></i> ${CONFIG.phone}</p>
                        <p><i class="fas fa-envelope"></i> ${CONFIG.email}</p>
                        <p><i class="fas fa-clock"></i> 8:00 AM - 6:00 PM, Sun-Fri</p>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="divider"></div>
                <div class="footer-bottom-content">
                    <p>© ${new Date().getFullYear()} ${CONFIG.brandName}. Crafted for Elegance.</p>
                </div>
            </div>
        `;
    },

    renderMobileDrawer() {
        if (document.getElementById('mobile-drawer')) return;

        const overlay = document.createElement('div');
        overlay.id = 'mobile-nav-overlay';
        overlay.className = 'mob-overlay';
        document.body.appendChild(overlay);

        const drawer = document.createElement('nav');
        drawer.id = 'mobile-drawer';
        drawer.className = 'mob-drawer';
        drawer.innerHTML = `
            <div class="mob-drawer-header">
                <a href="index.html"><img src="${CONFIG.logoPath}" class="mob-drawer-logo" alt="${CONFIG.brandName}" /></a>
                <button id="mob-drawer-close" class="mob-drawer-close-btn" aria-label="Close Menu">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mob-drawer-tagline">Premium Fashion &bull; Curated Style</div>

            <ul class="mob-drawer-links">
                <li class="mob-link-item" style="--i:1"><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                <li class="mob-link-item mob-has-sub" style="--i:2">
                    <a href="shop.html" class="mob-shop-link"><i class="fas fa-shopping-bag"></i> Shop</a>
                    <button class="mob-sub-toggle" aria-label="Toggle shop categories"><i class="fas fa-chevron-down mob-chevron"></i></button>
                    <ul class="mob-sub-menu">
                        <li><a href="shop.html?cat=Tops"><i class="fas fa-tshirt"></i> Tops & Shirts</a></li>
                        <li><a href="shop.html?cat=Bottoms"><i class="fas fa-socks"></i> Pants & Bottoms</a></li>
                        <li><a href="shop.html?cat=Dresses"><i class="fas fa-vest"></i> Dresses</a></li>
                        <li><a href="shop.html?cat=Outerwear"><i class="fas fa-mitten"></i> Outerwear</a></li>
                        <li><a href="shop.html?cat=Footwear"><i class="fas fa-shoe-prints"></i> Footwear</a></li>
                        <li><a href="shop.html?cat=Accessories"><i class="fas fa-gem"></i> Accessories</a></li>
                    </ul>
                </li>
                <li class="mob-link-item" style="--i:3"><a href="about.html"><i class="fas fa-book-open"></i> Our Story</a></li>
                <li class="mob-link-item" style="--i:4"><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                <li class="mob-link-item" style="--i:5">
                    <a href="cart.html"><i class="fas fa-bag-shopping"></i> My Cart <span class="cart-badge" style="margin-left: 10px; position: static;">0</span></a>
                </li>
                <li class="mob-link-item" style="--i:6"><a href="login.html"><i class="fas fa-user"></i> Account</a></li>
            </ul>

            <div class="mob-drawer-divider"></div>

            <div class="mob-drawer-currency">
                <label for="mob-currency-select"><i class="fas fa-globe"></i> Currency</label>
                <select id="mob-currency-select">
                    <option value="NPR">NPR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>

            <div class="mob-drawer-footer">
                <div class="mob-drawer-social">
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                    <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                </div>
                <div class="mob-drawer-contact">
                    <p><i class="fas fa-phone-alt"></i> ${CONFIG.phone}</p>
                    <p><i class="fas fa-envelope"></i> ${CONFIG.email}</p>
                </div>
            </div>
        `;
        document.body.appendChild(drawer);
    },

    renderSearchPopup() {
        if (document.getElementById('search-popup')) return;

        const popup = document.createElement('div');
        popup.id = 'search-popup';
        popup.innerHTML = `
            <div class="search-box">
                <input type="text" placeholder="Search premium fashion..." id="popup-search-input">
                <button type="button" id="popup-search-btn"><i class="fas fa-search"></i></button>
                <i class="fas fa-times" id="close-search" aria-label="Close Search"></i>
            </div>
        `;
        document.body.appendChild(popup);
    },

    setActiveLinks() {
        const path = window.location.pathname.split("/").pop() || 'index.html';
        const navLinks = document.querySelectorAll('#navbar li a, .mob-link-item a');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === path) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    attachGlobalListeners() {
        const hamburger = document.getElementById('bar');
        const drawer = document.getElementById('mobile-drawer');
        const overlay = document.getElementById('mobile-nav-overlay');
        const mobClose = document.getElementById('mob-drawer-close');

        const openDrawer = () => {
            if (drawer) drawer.classList.add('open');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (hamburger) hamburger.classList.add('active');
        };

        const closeDrawer = () => {
            if (drawer) drawer.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
            if (hamburger) hamburger.classList.remove('active');
        };

        if (hamburger) hamburger.addEventListener('click', openDrawer);
        if (mobClose) mobClose.addEventListener('click', closeDrawer);
        if (overlay) overlay.addEventListener('click', closeDrawer);

        // Mobile accordion - Updated to work with button toggle
        document.querySelectorAll('.mob-sub-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const parent = toggle.closest('.mob-has-sub');
                if (parent) parent.classList.toggle('sub-open');
            });
        });

        // Search Popup
        const searchBtns = document.querySelectorAll('#header-search-btn, #mobile-search-btn');
        const searchPopup = document.getElementById('search-popup');
        const closeSearch = document.getElementById('close-search');

        searchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (searchPopup) {
                    searchPopup.classList.add('active');
                    const scrollY = window.scrollY;
                    document.body.style.position = 'fixed';
                    document.body.style.top = `-${scrollY}px`;
                    document.body.style.width = '100%';
                    const input = document.getElementById('popup-search-input');
                    if (input) input.focus();
                }
            });
        });

        if (closeSearch) {
            closeSearch.addEventListener('click', () => {
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
                if (searchPopup) searchPopup.classList.remove('active');
            });
        }

        // Search Execution
        const executeSearch = (query) => {
            if (query.trim()) {
                window.location.href = `shop.html?search=${encodeURIComponent(query.trim())}`;
            }
        };

        const popupSearchBtn = document.getElementById('popup-search-btn');
        const popupSearchInput = document.getElementById('popup-search-input');
        const headerSearchBtn = document.getElementById('header-search-btn');
        const headerSearchInput = document.getElementById('header-search-input');

        if (popupSearchBtn && popupSearchInput) {
            popupSearchBtn.addEventListener('click', () => executeSearch(popupSearchInput.value));
            popupSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') executeSearch(popupSearchInput.value);
            });
        }

        if (headerSearchBtn && headerSearchInput) {
            headerSearchBtn.addEventListener('click', () => executeSearch(headerSearchInput.value));
            headerSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') executeSearch(headerSearchInput.value);
            });
        }

        // Currency Sync
        const updateCurrency = (val) => {
            localStorage.setItem('selectedCurrency', val);
            const mainSelect = document.getElementById('currency-select');
            const mobSelect = document.getElementById('mob-currency-select');
            if (mainSelect) mainSelect.value = val;
            if (mobSelect) mobSelect.value = val;
            if (typeof renderProducts === 'function') {
                const params = new URLSearchParams(window.location.search);
                const containers = ['dynamic-featured-pro', 'dynamic-new-pro', 'dynamic-all-pro', 'dynamic-flash-mini'];
                containers.forEach(c => {
                    const el = document.getElementById(c);
                    if (el) renderProducts(c, c.includes('featured') || c.includes('new') ? 8 : null, params.get('cat'), params.get('search'));
                });
            }
        };

        const mainCurrSelect = document.getElementById('currency-select');
        const mobCurrSelect = document.getElementById('mob-currency-select');

        if (mainCurrSelect) {
            mainCurrSelect.value = localStorage.getItem('selectedCurrency') || 'NPR';
            mainCurrSelect.addEventListener('change', (e) => updateCurrency(e.target.value));
        }
        if (mobCurrSelect) {
            mobCurrSelect.value = localStorage.getItem('selectedCurrency') || 'NPR';
            mobCurrSelect.addEventListener('change', (e) => {
                updateCurrency(e.target.value);
                closeDrawer();
            });
        }

        // Escape to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (drawer && drawer.classList.contains('open')) closeDrawer();
                if (searchPopup && searchPopup.classList.contains('active')) closeSearch.click();
            }
        });

        // Product Page Handlers (Buy Now / Add to Cart)
        const buyNowBtn = document.getElementById('buy-now-btn');
        if (buyNowBtn) {
            buyNowBtn.onclick = () => {
                const params = new URLSearchParams(window.location.search);
                const productId = parseInt(params.get('id'));
                const qty = parseInt(document.getElementById('pro-quantity')?.value || 1);
                if (productId && typeof buyNow === 'function') buyNow(productId, qty);
            };
        }

        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.onclick = () => {
                const params = new URLSearchParams(window.location.search);
                const productId = parseInt(params.get('id'));
                const qty = parseInt(document.getElementById('pro-quantity')?.value || 1);
                if (productId && typeof addToCart === 'function') addToCart(productId, qty);
            };
        }
    }

};


// Exit LayoutManager definition




// === 1. State Management & Data ===
const PRODUCT_VERSION = "4.0"; // FIXED: Unique image URLs per product with verification

const categoriesList = [
    "Signature Blouses", "Ethereal Maxi Dresses", "Artisan Sundresses", "Vanguard Evening Gowns",
    "Refined Cocktail Dresses", "Minimalist Midi Skirts", "Structured Pencil Skirts", "Architectural High-Waist Jeans",
    "Essential Silk Camisoles", "Heritage Cashmere Sweaters", "Iconic Tailored Blazers", "Urban Denim Jackets",
    "Artisan Leather Handbags", "Signature Stiletto Heels", "Refined Ankle Boots", "Ethereal Silk Scarves",
    "Statement Jewelry Sets", "Premium Lace Lingerie", "Minimalist Silk Pajamas", "Vanguard Activewear Sets"
];

const premiumBrands = [
    "Nike", "Adidas", "Zara", "H&M", "Shein", "Levi’s", "Alo Yoga", "Halara", "KTM CTY", "Black Horse"
];

// Broad Category Mapping
const categoryGroups = {
    "Tops": ["Signature Blouses", "Essential Silk Camisoles", "Heritage Cashmere Sweaters"],
    "Bottoms": ["Architectural High-Waist Jeans", "Minimalist Midi Skirts", "Structured Pencil Skirts"],
    "Dresses": ["Ethereal Maxi Dresses", "Artisan Sundresses", "Vanguard Evening Gowns", "Refined Cocktail Dresses"],
    "Outerwear": ["Iconic Tailored Blazers", "Urban Denim Jackets"],
    "Activewear": ["Vanguard Activewear Sets"],
    "Sleepwear": ["Minimalist Silk Pajamas", "Premium Lace Lingerie"],
    "Footwear": ["Signature Stiletto Heels", "Refined Ankle Boots"],
    "Accessories": ["Artisan Leather Handbags", "Ethereal Silk Scarves", "Statement Jewelry Sets"],
    "Formal": ["Vanguard Evening Gowns", "Iconic Tailored Blazers"],
    "Seasonal": ["Artisan Sundresses", "Heritage Cashmere Sweaters"]
};

// Granular Category-Specific Image Pools (Verified Fashion IDs)
const categoryImagePools = {
    "Signature Blouses": ["1551488831-00ddcb6c6bd3", "1515886657613-9f3515b0c78f", "159463331230a-4a69f29649fe"],
    "Ethereal Maxi Dresses": ["1496747611176-843222e1e57c", "1539109136881-3be0616bc469", "1566174053879-31528523f8ae"],
    "Artisan Sundresses": ["1490481651871-ab68624d5e17", "1572804013427-4d7ca7268217", "1511130558046-d215b1554967"],
    "Vanguard Evening Gowns": ["1518506305744-8a07913c2786", "1537274944060-e824de5150af", "1520006403909-8387bd192c1d"],
    "Refined Cocktail Dresses": ["1539109136881-3be0616bc469", "1512436991641-6745cdb1723f", "1550614000-4895a10e1eb3"],
    "Minimalist Midi Skirts": ["1581067720543-af581447bd63", "1523381235312-dad5941f5f9a", "1526170315870-ef0dec4c661e"],
    "Structured Pencil Skirts": ["1541099649-141ac249c691", "1523359346387-0bff818b3d41", "1523381235312-dad5941f5f9a"],
    "Architectural High-Waist Jeans": ["1541099649-141ac249c691", "1523381235312-dad5941f5f9a", "1526170315870-ef0dec4c661e"],
    "Essential Silk Camisoles": ["1551488831-00ddcb6c6bd3", "159463331230a-4a69f29649fe", "1515886657613-9f3515b0c78f"],
    "Heritage Cashmere Sweaters": ["1529139513055-119ec08e673e", "1533443905161-da28aaad1192", "1533103133809-1bb0c8c2e443"],
    "Iconic Tailored Blazers": ["1591084726923-2f2f28cb5044", "1550614000-4895a10e1eb3", "1520006403909-8387bd192c1d"],
    "Urban Denim Jackets": ["1541099649-141ac249c691", "1581067720543-af581447bd63", "1523381235312-dad5941f5f9a"],
    "Artisan Leather Handbags": ["1584917865442-de89df764f7a", "1523293182036-711dad1f6ee5", "1605247740412-ce27fa0cccbb"],
    "Signature Stiletto Heels": ["1543163521224-1d7d8001d910", "1560343775-9a835582512a", "1595950613125-118755e75a6b"],
    "Refined Ankle Boots": ["1612817288481-902405793d9f", "1614252235316-ee5ec0cc0dd9", "1614499016216-1d692ee3b82d"],
    "Ethereal Silk Scarves": ["1607313219902-36e7fd07c0fb", "1609505848912-f1a3f1f65bb9", "1611914730619-af45049c1aad"],
    "Statement Jewelry Sets": ["1535632069311-8f53ef585093", "1515562141207-7a88fb7ce338", "1599643411212-1b9f15819d72"],
    "Premium Lace Lingerie": ["1525507119028-ed4c629a60a3", "1556905055-8f358a7a47b2", "1516762689617-e1cffcef479d"],
    "Minimalist Silk Pajamas": ["1529139513055-119ec08e673e", "1516762689617-e1cffcef479d", "1556905055-8f358a7a47b2"],
    "Vanguard Activewear Sets": ["1518611012837-fd758737578c", "1506634572416-48cdfe530110", "1518506305744-8a07913c2786"]
};

const UNIVERSAL_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=800&q=80";

function generateDefaultProducts() {
    const adjectives = ["Essential", "Vanguard", "Architectural", "Heritage", "Artisan", "Refined", "Signature", "Iconic", "Ethereal", "Structured", "Urban", "Classic", "Avant-Garde", "Timeless", "Modernist", "Luxury", "Tailored", "Sovereign", "Zenith", "Minimalist"];
    const materials = ["Premium Cotton", "Raw Silk", "Distressed Denim", "Merino Wool", "Organic Linen", "Nappa Leather", "Crushed Velvet", "Pure Cashmere", "Italian Satin", "Heavy Jersey"];
    const styles = ["Edition", "Series", "Silhouette", "Draft", "Collective", "Edit", "Archive", "Manifesto", "Concept", "Ensemble"];

    let products = [];
    let id = 1;
    categoriesList.forEach((cat) => {
        const pool = categoryImagePools[cat] || categoryImagePools["Signature Blouses"];
        const baseCat = cat.split(" ").pop().replace(/s$/, "");

        for (let i = 1; i <= 20; i++) {
            const adj = adjectives[(i + id) % adjectives.length];
            const mat = materials[(i + id) % materials.length];
            const style = styles[(i * id) % styles.length];

            // FIXED: Ensure 100% unique image per product using multiple uniqueness factors
            // Use product ID, category index, and item index to create unique combinations
            const poolIndex = (i - 1) % pool.length;
            const photoId = pool[poolIndex];
            
            // Create truly unique URL with multiple unique parameters
            const uniqueImageURL = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=600&h=800&q=80&seed=${id}&v=${i}&cat=${cat.replace(/\s/g, '')}`;

            const brand = premiumBrands[(i + id) % premiumBrands.length];

            products.push({
                id: id++,
                name: `${adj} ${cat}`,
                brand: brand,
                price: 1200 + (Math.floor(Math.random() * 150) * 100),
                image: uniqueImageURL,
                cat: cat,
                stock: 5 + (i % 25),
                isFlash: Math.random() > 0.8,
                rating: (4 + Math.random()).toFixed(1),
                reviewCount: Math.floor(Math.random() * 200) + 10
            });
        }
    });
    
    // VERIFICATION: Log unique image count
    const uniqueImages = new Set(products.map(p => p.image));
    console.log(`✅ Generated ${products.length} products with ${uniqueImages.size} unique image URLs`);
    
    return products;
}

const defaultProducts = generateDefaultProducts();

// DIAGNOSTIC FUNCTION: Check product image uniqueness
function verifyProductImageUniqueness() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const imageMap = new Map();
    
    products.forEach(p => {
        if (!imageMap.has(p.image)) {
            imageMap.set(p.image, []);
        }
        imageMap.get(p.image).push({ id: p.id, name: p.name });
    });
    
    const duplicates = Array.from(imageMap.entries()).filter(([img, products]) => products.length > 1);
    
    if (duplicates.length > 0) {
        console.error(`🔴 CRITICAL: Found ${duplicates.length} duplicate images!`);
        duplicates.forEach(([img, products]) => {
            console.error(`   Image: ${img.substring(0, 60)}...`);
            console.error(`   Used by ${products.length} products:`, products.map(p => `#${p.id} ${p.name}`).join(', '));
        });
        return false;
    } else {
        console.log(`✅ SUCCESS: All ${products.length} products have unique images`);
        return true;
    }
}

// Run verification on page load
if (typeof window !== 'undefined') {
    window.verifyProductImages = verifyProductImageUniqueness;
}

let allProducts = JSON.parse(localStorage.getItem('products')) || defaultProducts;

// Force update if flash data is missing, count is wrong, or version changed
if (allProducts.length > 0 &&
    (!allProducts[0].hasOwnProperty('isFlash') ||
        allProducts.length < categoriesList.length * 15 ||
        localStorage.getItem('productVersion') !== PRODUCT_VERSION)) {
    allProducts = defaultProducts;
    localStorage.setItem('products', JSON.stringify(allProducts));
    localStorage.setItem('productVersion', PRODUCT_VERSION);
}

if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(allProducts));
    localStorage.setItem('productVersion', PRODUCT_VERSION);
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let allOrders = JSON.parse(localStorage.getItem('orders')) || [];
let allUsers = JSON.parse(localStorage.getItem('users')) || [];

// CRITICAL FIX: Function to refresh global data from localStorage
function refreshGlobalData() {
    allUsers = JSON.parse(localStorage.getItem('users')) || [];
    allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    allProducts = JSON.parse(localStorage.getItem('products')) || defaultProducts;
    console.log(`✅ Global data refreshed: ${allUsers.length} users, ${allOrders.length} orders, ${allProducts.length} products`);
}

// === 2. Multi-Currency Engine ===
const exchangeRates = { "NPR": 1, "USD": 0.0075, "EUR": 0.0069 };
const currencySymbols = { "NPR": "NPR", "USD": "$", "EUR": "€" };

function convertPrice(nprPrice) {
    const curr = localStorage.getItem('selectedCurrency') || "NPR";
    const converted = (nprPrice * exchangeRates[curr]).toFixed(curr === "NPR" ? 0 : 2);
    return `${currencySymbols[curr]} ${converted}`;
}

// === 3. Authentication & Dashboards ===
function handleAuth() {
    // Note: Authentication is now strictly managed by auth.js using Firebase.
    // This function is kept for any UI-specific toggles that might still be needed.
    console.log("Firebase Auth system active.");
}

function updateNavbarAuth() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Remove existing auth related buttons if they exist
    const existingAuthBtn = document.getElementById('auth-btn');
    if (existingAuthBtn) existingAuthBtn.remove();
    const existingLogoutBtn = document.getElementById('logout-nav-btn');
    if (existingLogoutBtn) existingLogoutBtn.remove();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const closeBtn = document.getElementById('close');

    if (currentUser) {
        // 1. Dashboard Link
        const authLi = document.createElement('li');
        authLi.id = 'auth-btn';
        const aDashboard = document.createElement('a');
        aDashboard.href = 'user-dashboard.html';
        aDashboard.innerHTML = `<i class="fa-solid fa-user"></i> ${currentUser.name}`;
        authLi.appendChild(aDashboard);

        // 2. Logout Link
        const logoutLi = document.createElement('li');
        logoutLi.id = 'logout-nav-btn';
        const aLogout = document.createElement('a');
        aLogout.href = '#';
        aLogout.innerHTML = `Logout <i class="fa-solid fa-sign-out-alt"></i>`;
        aLogout.onclick = (e) => { e.preventDefault(); logoutUser(); };
        logoutLi.appendChild(aLogout);

        if (closeBtn && closeBtn.parentNode === navbar) {
            navbar.insertBefore(authLi, closeBtn);
            navbar.insertBefore(logoutLi, closeBtn);
        } else {
            navbar.appendChild(authLi);
            navbar.appendChild(logoutLi);
        }
        document.body.classList.remove('guest-mode');
    } else {
        const authLi = document.createElement('li');
        authLi.id = 'auth-btn';
        const aLogin = document.createElement('a');
        aLogin.href = 'login.html';
        aLogin.innerHTML = `<i class="fa-solid fa-user"></i> Login`;
        authLi.appendChild(aLogin);

        if (closeBtn && closeBtn.parentNode === navbar) {
            navbar.insertBefore(authLi, closeBtn);
        } else {
            navbar.appendChild(authLi);
        }
        document.body.classList.add('guest-mode');
    }

    // --- Also update Mobile Drawer auth links ---
    const drawerLinks = document.querySelector('.mob-drawer-links');
    if (drawerLinks) {
        // Remove existing drawer auth items
        const existingDrawerAuth = document.getElementById('mob-auth-item');
        if (existingDrawerAuth) existingDrawerAuth.remove();
        const existingDrawerLogout = document.getElementById('mob-logout-item');
        if (existingDrawerLogout) existingDrawerLogout.remove();
        // Find the static Account link (last item at --i:6) and update it
        const accountItems = drawerLinks.querySelectorAll('.mob-link-item');
        accountItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.href && link.href.includes('login.html')) {
                if (currentUser) {
                    link.href = 'user-dashboard.html';
                    link.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
                    // Add logout item after
                    const logoutLi = document.createElement('li');
                    logoutLi.className = 'mob-link-item';
                    logoutLi.id = 'mob-logout-item';
                    logoutLi.style.setProperty('--i', '7');
                    logoutLi.innerHTML = `<a href="#" id="mob-logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>`;
                    item.insertAdjacentElement('afterend', logoutLi);
                    const logoutLink = document.getElementById('mob-logout-link');
                    if (logoutLink) {
                        logoutLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            logoutUser();
                        });
                    }
                }
            } else if (link && link.href && link.href.includes('user-dashboard.html') && !currentUser) {
                link.href = 'login.html';
                link.innerHTML = `<i class="fas fa-user"></i> Account`;
            }
        });
    }
}

function logoutUser() {
    // Show confirmation modal
    showLogoutConfirmation();
}

function showLogoutConfirmation() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'logout-modal-overlay';
    overlay.id = 'logout-modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'logout-modal';
    
    modal.innerHTML = `
        <div class="logout-modal-header">
            <i class="fas fa-sign-out-alt logout-icon"></i>
            <h3>Confirm Logout</h3>
        </div>
        <div class="logout-modal-body">
            <p>Are you sure you want to sign out?</p>
            <p class="logout-note">You can sign back in anytime.</p>
        </div>
        <div class="logout-modal-footer">
            <button class="logout-btn-cancel" id="logout-cancel-btn">
                <i class="fas fa-times"></i> Cancel
            </button>
            <button class="logout-btn-confirm" id="logout-confirm-btn">
                <i class="fas fa-check"></i> Yes, Logout
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    
    // Handle cancel
    document.getElementById('logout-cancel-btn').addEventListener('click', closeLogoutModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeLogoutModal();
        }
    });
    
    // Handle confirm
    document.getElementById('logout-confirm-btn').addEventListener('click', confirmLogout);
    
    // Handle ESC key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeLogoutModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

function closeLogoutModal() {
    const overlay = document.getElementById('logout-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function confirmLogout() {
    // Close modal first
    closeLogoutModal();
    
    // Perform logout
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    
    // Global bridge for auth.js to call firebase signOut
    if (window.firebaseSignOut) {
        window.firebaseSignOut();
    }
    
    showToast('Logged out successfully');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// === Account Deletion System ===
function showDeleteAccountModal() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showToast('Please login first');
        return;
    }

    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'delete-account-modal-overlay';
    overlay.id = 'delete-account-modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'delete-account-modal';
    
    modal.innerHTML = `
        <div class="delete-modal-header">
            <i class="fas fa-exclamation-triangle delete-warning-icon"></i>
            <h3>Delete Account</h3>
        </div>
        <div class="delete-modal-body">
            <div class="warning-box">
                <i class="fas fa-info-circle"></i>
                <p><strong>Warning:</strong> This action is permanent and cannot be undone!</p>
            </div>
            <h4>The following data will be permanently deleted:</h4>
            <ul class="deletion-list">
                <li><i class="fas fa-user"></i> Your profile information</li>
                <li><i class="fas fa-shopping-cart"></i> Shopping cart and wishlist</li>
                <li><i class="fas fa-receipt"></i> Order history</li>
                <li><i class="fas fa-star"></i> Loyalty points</li>
                <li><i class="fas fa-database"></i> All personal data</li>
            </ul>
            <div class="confirmation-input">
                <label>Type <strong>DELETE</strong> to confirm:</label>
                <input type="text" id="delete-confirmation-input" placeholder="Type DELETE" autocomplete="off">
                <span class="input-error" id="delete-input-error"></span>
            </div>
        </div>
        <div class="delete-modal-footer">
            <button class="delete-btn-cancel" id="delete-cancel-btn">
                <i class="fas fa-times"></i> Cancel
            </button>
            <button class="delete-btn-confirm" id="delete-confirm-btn" disabled>
                <i class="fas fa-trash-can"></i> Delete My Account
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    
    // Handle confirmation input
    const confirmInput = document.getElementById('delete-confirmation-input');
    const confirmBtn = document.getElementById('delete-confirm-btn');
    const errorSpan = document.getElementById('delete-input-error');
    
    confirmInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value === 'DELETE') {
            confirmBtn.disabled = false;
            confirmBtn.classList.add('enabled');
            errorSpan.textContent = '';
        } else {
            confirmBtn.disabled = true;
            confirmBtn.classList.remove('enabled');
            if (value.length > 0) {
                errorSpan.textContent = 'Please type DELETE exactly';
            } else {
                errorSpan.textContent = '';
            }
        }
    });
    
    // Handle cancel
    document.getElementById('delete-cancel-btn').addEventListener('click', closeDeleteAccountModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDeleteAccountModal();
        }
    });
    
    // Handle confirm
    confirmBtn.addEventListener('click', () => {
        if (!confirmBtn.disabled) {
            confirmDeleteAccount();
        }
    });
    
    // Handle ESC key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeDeleteAccountModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    // Focus on input
    setTimeout(() => {
        confirmInput.focus();
    }, 400);
}

function closeDeleteAccountModal() {
    const overlay = document.getElementById('delete-account-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function confirmDeleteAccount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Close modal
    closeDeleteAccountModal();
    
    // Show processing toast
    showToast('Deleting account...');
    
    // Simulate deletion process
    setTimeout(() => {
        // Get all users
        let allUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find the user to delete
        const userToDelete = allUsers.find(u => u.email === currentUser.email);
        
        // Add to deleted users list with deletion timestamp
        if (userToDelete) {
            let deletedUsers = JSON.parse(localStorage.getItem('deletedUsers')) || [];
            deletedUsers.push({
                ...userToDelete,
                deletedDate: new Date().toISOString(),
                deletedBy: 'self'
            });
            localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));
        }
        
        // Remove current user from users array
        allUsers = allUsers.filter(u => u.email !== currentUser.email);
        localStorage.setItem('users', JSON.stringify(allUsers));
        
        // Remove user-specific data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        
        // Remove user's cart and wishlist
        const userCartKey = `cart_${currentUser.email}`;
        const userWishlistKey = `wishlist_${currentUser.email}`;
        localStorage.removeItem(userCartKey);
        localStorage.removeItem(userWishlistKey);
        
        // Remove user's orders
        let allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        allOrders = allOrders.filter(o => o.userEmail !== currentUser.email);
        localStorage.setItem('orders', JSON.stringify(allOrders));
        
        // Firebase signout if applicable
        if (window.firebaseSignOut) {
            window.firebaseSignOut();
        }
        
        // Show success message
        showToast('Account deleted successfully');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1000);
}

// === 4. Product Rendering & Search ===
// Pagination State
let currentPage = 1;
const itemsPerPage = 12;

function renderProducts(containerId, limit = null, category = null, search = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear container
    container.innerHTML = "";

    let list = [...allProducts];

    // Apply Active Filters
    const maxPrice = parseInt(localStorage.getItem('filterPrice')) || 10000;
    const activeBrands = JSON.parse(localStorage.getItem('filterBrands')) || premiumBrands;
    const isFlashContainer = containerId.includes('flash');

    if (window.location.pathname.includes('shop.html')) {
        list = list.filter(p => p.price <= maxPrice && activeBrands.includes(p.brand));
    }

    if (isFlashContainer && !category) {
        list = list.filter(p => p.isFlash);
    } else if (category) {
        if (categoryGroups[category]) {
            list = list.filter(p => categoryGroups[category].includes(p.cat));
        } else {
            list = list.filter(p => p.cat.toLowerCase() === category.toLowerCase());
        }
    }
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

    // Sorting Logic
    const sortVal = document.getElementById('sort-select')?.value || 'default';
    if (sortVal === 'low-high') {
        list.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'high-low') {
        list.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'newest') {
        list.sort((a, b) => b.id - a.id);
    }

    // Update Product Count
    const countEl = document.getElementById('product-count');
    if (countEl) countEl.innerText = `Showing ${list.length} results`;

    // Pagination Logic (Only for main shop container)
    if (containerId === 'dynamic-all-pro' && !limit) {
        const totalPages = Math.ceil(list.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const paginatedList = list.slice(start, end);
        renderPagination(totalPages);
        list = paginatedList;
    } else if (limit) {
        list = list.slice(0, limit);
    }

    if (list.length === 0) {
        container.innerHTML = "<p style='padding: 20px; width: 100%; text-align: center; color: var(--text-muted);'>No products found matching your criteria.</p>";
        return;
    }

    // Optimized Rendering using Map and Join
    const htmlBuffer = list.map(p => {
        const isWishlisted = wishlist.includes(p.id);
        const showFlashBadge = !!p.isFlash;
        
        // Calculate discount percentage
        const oldPrice = p.oldPrice || (showFlashBadge ? p.price * 1.5 : null);
        const discountPercent = oldPrice ? Math.round(((oldPrice - p.price) / oldPrice) * 100) : 0;

        return `
            <div class="pro" onclick="window.location.href='sproduct.html?id=${p.id}'">
                <div class="pro-img-wrapper">
                    ${discountPercent > 0 ? `<span class="discount-badge">-${discountPercent}%</span>` : ''}
                    <div class="wishlist-icon ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
                        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </div>
                    <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';" loading="lazy">
                </div>
                <div class="pro-body">
                    <span class="brand-tag">${p.brand.toUpperCase()}</span>
                    <h3 class="pro-title">${p.name}</h3>
                    <div class="rating-row">
                        ${generateStarRating(p.rating)}
                        <span class="review-count">(${p.reviewCount || 0})</span>
                    </div>
                    <div class="price-wrapper">
                        <span class="current-price">${convertPrice(p.price)}</span>
                        ${oldPrice ? `<span class="original-price">${convertPrice(oldPrice)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button onclick="event.stopPropagation(); addToCart(${p.id})" class="btn-add-cart">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                        <button onclick="event.stopPropagation(); buyNow(${p.id})" class="btn-buy-now">
                            <i class="fa-solid fa-bolt"></i> Buy Now
                        </button>
                    </div>
                </div>
            </div>`;
    });

    container.innerHTML = htmlBuffer.join('');

    // Add "View All" card at the end for mobile horizontal scroll (only for limited containers)
    if (limit && window.innerWidth < 640) {
        const viewAllCard = document.createElement('a');
        viewAllCard.className = 'view-all-card';
        
        // Determine the link based on container type
        let viewAllLink = 'shop.html';
        if (isFlashContainer) {
            viewAllLink = 'flash-sale.html';
        } else if (category) {
            viewAllLink = `shop.html?cat=${category}`;
        }
        
        viewAllCard.href = viewAllLink;
        viewAllCard.innerHTML = `
            <i class="fa-solid fa-grid-2"></i>
            <div class="view-all-text">View All</div>
            <div class="view-all-subtitle">Explore our complete collection</div>
        `;
        
        container.appendChild(viewAllCard);
    }
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) starsHTML += '<i class="fas fa-star"></i>';
    if (hasHalfStar) starsHTML += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="far fa-star"></i>';

    return starsHTML;
}

function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    if (totalPages <= 1) {
        paginationContainer.innerHTML = "";
        return;
    }

    let html = '';

    if (currentPage > 1) {
        html += `<a href="#" onclick="changePage(${currentPage - 1}); return false;"><i class="fas fa-long-arrow-alt-left"></i></a>`;
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `<a href="#" class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i}); return false;">${i}</a>`;
    }

    if (currentPage < totalPages) {
        html += `<a href="#" onclick="changePage(${currentPage + 1}); return false;"><i class="fas fa-long-arrow-alt-right"></i></a>`;
    }

    paginationContainer.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    const params = new URLSearchParams(window.location.search);
    renderProducts('dynamic-all-pro', null, params.get('cat'), params.get('search'));
    const container = document.getElementById('shop-container');
    if (container) container.scrollIntoView({ behavior: 'smooth' });
}

function openQuickView(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    const modal = document.createElement('div');
    modal.id = 'quick-view-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="quick-view-content">
            <i class="fas fa-times close-modal" onclick="this.closest('.modal-overlay').remove()"></i>
            <div class="qv-left">
                <img src="${product.image}" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';" alt="">
            </div>
            <div class="qv-right">
                <span>${product.cat}</span>
                <h2>${product.name}</h2>
                <h3 class="price">${convertPrice(product.price)}</h3>
                <p>Experience the ultimate blend of style and performance with the ${product.name}. Designed for the modern trendsetter.</p>
                <div class="qv-actions">
                    <button onclick="addToCart(${product.id}); this.closest('.modal-overlay').remove();" class="normal">Add To Cart</button>
                    <button onclick="window.location.href='sproduct.html?id=${product.id}'" class="normal outline-dark">View Details</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function buyNow(productId, qty = 1) {
    const product = allProducts.find(p => p.id === productId);
    if (!product || product.stock <= 0) { showToast('Out of Stock!'); return; }

    // Direct redirect with parameters for immediate purchase isolation
    window.location.href = `checkout.html?buy_now=true&id=${productId}&qty=${qty}`;
}

// Shop Filters
function updatePriceFilter(val) {
    const el = document.getElementById('price-val');
    if (el) el.innerText = `NPR ${val}`;
    localStorage.setItem('filterPrice', val);
}

function applyFilters() {
    currentPage = 1;
    const brands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    localStorage.setItem('filterBrands', JSON.stringify(brands));

    const params = new URLSearchParams(window.location.search);
    renderProducts('dynamic-all-pro', null, params.get('cat'), params.get('search'));

    updateActiveFilterTags();
    showToast('Filters Applied');
}

function clearAllFilters() {
    document.querySelectorAll('.brand-filter').forEach(cb => cb.checked = true);
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.value = 10000;
        updatePriceFilter(10000);
    }
    applyFilters();
}

function updateActiveFilterTags() {
    const container = document.getElementById('active-filters-container');
    if (!container) return;
    container.innerHTML = "";

    const activeBrands = JSON.parse(localStorage.getItem('filterBrands')) || [];
    const maxPrice = parseInt(localStorage.getItem('filterPrice')) || 10000;

    if (maxPrice < 10000) {
        container.innerHTML += `<span class="filter-tag">Under NPR ${maxPrice} <i class="fas fa-times" onclick="resetPriceFilter()"></i></span>`;
    }

    // Only show brand tags if some are hidden (to avoid clutter)
    if (activeBrands.length < premiumBrands.length) {
        activeBrands.forEach(brand => {
            container.innerHTML += `<span class="filter-tag">${brand} <i class="fas fa-times" onclick="removeBrandFilter('${brand}')"></i></span>`;
        });
    }
}

function resetPriceFilter() {
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.value = 10000;
        updatePriceFilter(10000);
        applyFilters();
    }
}

function removeBrandFilter(brand) {
    document.querySelectorAll('.brand-filter').forEach(cb => {
        if (cb.value === brand) cb.checked = false;
    });
    applyFilters();
}

// === 5. Cart & Checkout System ===
function addToCart(productId, qty = 1) {
    const product = allProducts.find(p => p.id === productId);
    if (!product || product.stock <= 0) { showToast('Out of Stock!'); return; }

    // Fly animation logic
    const proEl = event?.target?.closest('.pro') || document.querySelector('.single-pro-img');
    const cartIcon = document.querySelector('.fa-bag-shopping') || document.querySelector('.cart-link');

    if (proEl && cartIcon) {
        const flyingImg = document.createElement('img');
        flyingImg.src = product.image;
        flyingImg.style.position = 'fixed';
        flyingImg.style.zIndex = '10000';
        flyingImg.style.width = '100px';
        flyingImg.style.borderRadius = '50%';
        flyingImg.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        const rect = proEl.getBoundingClientRect();
        flyingImg.style.top = rect.top + 'px';
        flyingImg.style.left = rect.left + 'px';

        document.body.appendChild(flyingImg);

        const cartRect = cartIcon.getBoundingClientRect();

        setTimeout(() => {
            flyingImg.style.top = cartRect.top + 'px';
            flyingImg.style.left = cartRect.left + 'px';
            flyingImg.style.width = '20px';
            flyingImg.style.opacity = '0';
        }, 10);

        setTimeout(() => flyingImg.remove(), 800);
    }

    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity += parseInt(qty); else cart.push({ ...product, quantity: parseInt(qty) });
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${product.name} added!`);
    updateCartIconCount();
    if (window.location.pathname.includes('cart.html')) renderCart();
    else toggleSideCart();
}

function updateCartIconCount() {
    LayoutManager.updateCartBadge();
}


function renderCart() {
    const tableBody = document.querySelector('#cart tbody');
    if (!tableBody) return;
    tableBody.innerHTML = "";
    let subtotal = 0;
    cart.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;
        tableBody.innerHTML += `
            <tr>
                <td data-label="REMOVE"><a href="#" onclick="removeFromCart(${item.id})"><i class="fa-regular fa-circle-xmark"></i></a></td>
                <td data-label="IMAGES"><img src="${item.image}" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';" width="70"></td>
                <td data-label="PRODUCTS">${item.name}</td>
                <td data-label="PRICE">${convertPrice(item.price)}</td>
                <td data-label="QUANTITY"><input type="number" value="${item.quantity}" onchange="updateCartQty(${item.id}, this.value)"></td>
                <td data-label="SUBTOTAL">${convertPrice(total)}</td>
            </tr>`;
    });
    updateCartTotals(subtotal);
}

function removeFromCart(id) { cart = cart.filter(i => i.id !== id); localStorage.setItem('cart', JSON.stringify(cart)); renderCart(); updateCartIconCount(); }
function updateCartQty(id, val) { const i = cart.find(item => item.id === id); if (i) i.quantity = parseInt(val); localStorage.setItem('cart', JSON.stringify(cart)); renderCart(); updateCartIconCount(); }
function updateCartTotals(sub) {
    const subEl = document.querySelector('#sub-total table tr:nth-child(1) td:last-child');
    const totEl = document.querySelector('#sub-total table tr:nth-child(3) td:last-child strong');
    if (subEl) subEl.innerText = convertPrice(sub);
    if (totEl) totEl.innerText = convertPrice(sub);
}

// === 6. Sovereign Admin Panel CRUD & Intelligence ===
function getStockStatus(stock) {
    if (stock <= 0) return '<span style="color:#ef4444; font-weight:800;">OUT OF STOCK</span>';
    if (stock < 10) return `<span style="color:#f59e0b; font-weight:800;">LOW STOCK (${stock})</span>`;
    return `<span style="color:#22c55e; font-weight:800;">IN STOCK (${stock})</span>`;
}

function renderAdminDashboard() {
    // CRITICAL FIX: Refresh global data first
    refreshGlobalData();
    
    // 1. Executive Metrics
    const totalSales = allOrders.reduce((sum, o) => sum + o.total, 0);
    const lowStockCount = allProducts.filter(p => p.stock < 10).length;

    if (document.getElementById('stat-total-sales')) document.getElementById('stat-total-sales').innerText = convertPrice(totalSales);
    if (document.getElementById('stat-total-orders')) document.getElementById('stat-total-orders').innerText = allOrders.length;
    if (document.getElementById('stat-total-users')) document.getElementById('stat-total-users').innerText = allUsers.length + 1; // +1 for the Admin
    if (document.getElementById('stat-low-stock')) document.getElementById('stat-low-stock').innerText = lowStockCount;

    // 2. Inventory Vault (Products)
    const pTable = document.querySelector('#admin-product-table tbody');
    if (pTable) {
        // Sort by ID descending to show latest additions first
        const sortedProducts = [...allProducts].reverse();
        
        // VERIFICATION: Check for duplicate images in dashboard
        const imageMap = new Map();
        sortedProducts.forEach(p => {
            if (!imageMap.has(p.image)) {
                imageMap.set(p.image, []);
            }
            imageMap.get(p.image).push(p.id);
        });
        
        // Log warning if duplicates found
        const duplicates = Array.from(imageMap.entries()).filter(([img, ids]) => ids.length > 1);
        if (duplicates.length > 0) {
            console.warn(`⚠️ Dashboard: Found ${duplicates.length} duplicate images across products`);
            duplicates.forEach(([img, ids]) => {
                console.warn(`   Image: ${img.substring(0, 80)}... used by products: ${ids.join(', ')}`);
            });
        } else {
            console.log(`✅ Dashboard: All ${sortedProducts.length} products have unique images`);
        }
        
        pTable.innerHTML = sortedProducts.map(p => `
            <tr>
                <td><img src="${p.image}" class="inventory-img" alt="Product ${p.id}" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';"></td>
                <td>
                    <div style="font-weight:800;">${p.name}</div>
                    <div style="font-size:11px; color:var(--text-muted);">Product ID: #${p.id}</div>
                </td>
                <td>
                    <span class="badge-cat" style="${p.isFlash ? 'background: var(--primary-color); color: white;' : ''}">${p.cat}</span>
                    ${p.isFlash ? '<div style="font-size:10px; color:var(--primary-color); font-weight:800; text-transform:uppercase; margin-top:2px;"><i class="fa-solid fa-bolt"></i> Flash Sale</div>' : ''}
                </td>
                <td>
                    <div style="font-size:11px; color:var(--text-muted); margin-bottom: 2px;">Brand: ${p.brand}</div>
                    <span class="price-text">${convertPrice(p.price)}</span>
                </td>
                <td>
                    <div class="stock-status">
                        ${getStockStatus(p.stock)}
                    </div>
                </td>
                <td>
                    <div class="action-flex">
                        <button class="action-btn btn-edit" onclick="openProductModal(${p.id})"><i class="fas fa-edit"></i> Edit</button>
                        <button class="action-btn btn-delete" onclick="deleteProduct(${p.id})"><i class="fas fa-trash-alt"></i> Delete</button>
                    </div>
                </td>
            </tr>`).join('');
    }

    // 3. Order Management (Full & Recent)
    renderAdminOrders();

    // 4. Inventory Performance (Summary List)
    const invSummary = document.getElementById('inventory-summary-list');
    if (invSummary) {
        invSummary.innerHTML = allProducts.slice(0, 5).map(p => `
            <div class="mini-item">
                <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';">
                <div class="mini-item-info">
                    <h4>${p.name}</h4>
                    <p>Price: ${convertPrice(p.price)} | Stock: ${p.stock}</p>
                </div>
            </div>
        `).join('');
    }

    // 5. User Registry
    renderAdminUsers();
}

function renderAdminOrders() {
    const fullOrderTable = document.querySelector('#admin-full-order-table tbody');
    const recentOrderTable = document.querySelector('#admin-recent-order-table tbody');

    const ordersHTML = allOrders.slice().reverse().map(o => `
        <tr>
            <td data-label="REF"><strong>#${o.id}</strong></td>
            <td data-label="DATE">${o.date}</td>
            <td data-label="CLIENT">
                <div>${o.userEmail}</div>
                <div style="font-size:11px; color:#94a3b8;">${o.items.length} unique assets</div>
            </td>
            <td data-label="TOTAL"><strong>${convertPrice(o.total)}</strong></td>
            <td data-label="STATUS"><span class="status-badge status-${o.status}">${o.status}</span></td>
            <td data-label="ACTION">
                <select class="status-control" onchange="updateOrderStatus(${o.id}, this.value)">
                    <option value="" disabled selected>Update Status</option>
                    <option value="placed">Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </td>
        </tr>
    `).join('');

    if (fullOrderTable) fullOrderTable.innerHTML = ordersHTML;

    if (recentOrderTable) {
        recentOrderTable.innerHTML = allOrders.slice().reverse().slice(0, 5).map(o => `
            <tr>
                <td data-label="REF">#${o.id}</td>
                <td data-label="CLIENT">${o.userEmail.split('@')[0]}</td>
                <td data-label="VALUE">${convertPrice(o.total)}</td>
                <td data-label="STATUS"><span class="status-badge status-${o.status}">${o.status}</span></td>
            </tr>
        `).join('');
    }
}

function updateOrderStatus(id, newStatus) {
    const order = allOrders.find(o => o.id === id);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('orders', JSON.stringify(allOrders));
        renderAdminDashboard();
        showToast(`Order #${id} status updated to ${newStatus}`);
    }
}

function renderAdminUsers() {
    const uTable = document.querySelector('#admin-user-table tbody');
    if (!uTable) {
        console.error('❌ Admin Users Table not found!');
        return;
    }

    // CRITICAL FIX: Read fresh data from localStorage every time
    const activeUsers = JSON.parse(localStorage.getItem('users')) || [];
    const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers')) || [];
    
    console.log(`✅ Loaded ${activeUsers.length} active users and ${deletedUsers.length} deleted users`);
    
    // Update statistics
    const totalUsersEl = document.getElementById('total-users-count');
    const activeUsersEl = document.getElementById('active-users-count');
    const deletedUsersEl = document.getElementById('deleted-users-count');
    
    if (totalUsersEl) totalUsersEl.textContent = activeUsers.length + deletedUsers.length;
    if (activeUsersEl) activeUsersEl.textContent = activeUsers.length;
    if (deletedUsersEl) deletedUsersEl.textContent = deletedUsers.length;
    
    // Combine active and deleted users
    const activeUsersList = activeUsers.map(u => ({ ...u, status: 'active' }));
    const deletedUsersList = deletedUsers.map(u => ({ ...u, status: 'deleted' }));
    const combinedUsers = [...activeUsersList, ...deletedUsersList];
    
    // Sort: Admin first, then by registration date (newest first)
    combinedUsers.sort((a, b) => {
        if (a.role === 'admin' && b.role !== 'admin') return -1;
        if (a.role !== 'admin' && b.role === 'admin') return 1;
        const dateA = a.registeredDate ? new Date(a.registeredDate) : new Date(0);
        const dateB = b.registeredDate ? new Date(b.registeredDate) : new Date(0);
        return dateB - dateA;
    });

    if (combinedUsers.length === 0) {
        console.warn('⚠️ No users found in database');
        uTable.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding: 60px 20px; color: var(--dash-text-muted);">
                    <i class="fas fa-users" style="font-size: 48px; opacity: 0.3; margin-bottom: 20px; display: block;"></i>
                    <h3 style="font-size: 18px; margin-bottom: 8px;">No Users Found</h3>
                    <p style="font-size: 14px;">Users will appear here when they register on the website.</p>
                </td>
            </tr>
        `;
        return;
    }

    console.log(`✅ Rendering ${combinedUsers.length} users to table`);

    uTable.innerHTML = combinedUsers.map(u => {
        const isOwner = u.email === 'davidscot8786@gmail.com' || u.email === 'imserv67@gmail.com' || u.role === 'admin';
        const statusBadge = u.status === 'deleted' 
            ? '<span class="status-badge status-cancelled">Deleted</span>'
            : '<span class="status-badge status-delivered">Active</span>';
        
        const registeredDate = u.registeredDate 
            ? new Date(u.registeredDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            : 'N/A';
        
        const profilePic = u.profilePic 
            ? `<img src="${u.profilePic}" alt="${u.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; margin-right: 12px; border: 2px solid var(--dash-border);">`
            : `<div style="width: 40px; height: 40px; border-radius: 50%; background: var(--dash-primary-light); color: var(--dash-primary); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; margin-right: 12px; border: 2px solid var(--dash-border);">${u.name ? u.name.charAt(0).toUpperCase() : '?'}</div>`;
        
        return `
            <tr style="${u.status === 'deleted' ? 'opacity: 0.6;' : ''}">
                <td data-label="NAME">
                    <div style="display: flex; align-items: center;">
                        ${profilePic}
                        <div>
                            <div style="font-weight:800; font-size: 14px; color: var(--dash-text);">${u.name || 'Unknown User'}</div>
                            <div style="font-size:11px; color: var(--dash-text-muted); margin-top: 2px;">${u.email}</div>
                        </div>
                    </div>
                </td>
                <td data-label="PHONE">
                    <div style="font-size: 13px; font-weight: 600;">${u.phone || '<span style="color: var(--dash-text-muted); font-style: italic;">Not provided</span>'}</div>
                </td>
                <td data-label="ROLE">
                    <span class="role-badge role-${u.role || 'user'}" style="text-transform: capitalize;">
                        ${u.role === 'admin' ? '<i class="fas fa-crown"></i> Admin' : '<i class="fas fa-user"></i> User'}
                    </span>
                </td>
                <td data-label="REGISTERED">
                    <div style="font-size: 12px; font-weight: 600; color: var(--dash-text-muted);">${registeredDate}</div>
                </td>
                <td data-label="STATUS">${statusBadge}</td>
                <td data-label="ACTION">
                    ${u.status === 'deleted' 
                        ? '<span style="font-size:11px; color: var(--dash-text-muted); font-style: italic;">Account Deleted</span>'
                        : isOwner 
                            ? '<span style="font-size:11px; color:#22c55e; font-weight:800;"><i class="fas fa-shield-halved"></i> PROTECTED</span>'
                            : `<button class="action-btn btn-delete" onclick="expungeUser('${u.email}')"><i class="fas fa-trash"></i> Remove</button>`
                    }
                </td>
            </tr>
        `;
    }).join('');
    
    console.log('✅ Users table rendered successfully');
}

function expungeUser(email) {
    if (!confirm('Are you sure you want to remove this user from the list?')) {
        return;
    }
    
    try {
        // CRITICAL FIX: Read fresh data from localStorage
        let activeUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userToRemove = activeUsers.find(u => u.email === email);
        
        if (!userToRemove) {
            showToast('User not found');
            return;
        }
        
        // Remove from active users
        activeUsers = activeUsers.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(activeUsers));
        
        // Add to deleted users archive
        let deletedUsers = JSON.parse(localStorage.getItem('deletedUsers')) || [];
        deletedUsers.push({
            ...userToRemove,
            deletedDate: new Date().toISOString(),
            deletedBy: 'admin'
        });
        localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));
        
        console.log(`✅ User ${email} removed and archived`);
        
        // Refresh the display
        renderAdminDashboard();
        showToast('User removed successfully');
    } catch (error) {
        console.error('❌ Error removing user:', error);
        showToast('Error removing user');
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        allProducts = allProducts.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(allProducts));
        renderAdminDashboard();
        showToast('Product Deleted');
    }
}

function openProductModal(id = null) {
    if (id) {
        window.location.href = `admin-product-config.html?id=${id}`;
    } else {
        window.location.href = `admin-product-config.html`;
    }
}

function closeProductModal() {
    if (document.getElementById('product-modal')) {
        document.getElementById('product-modal').classList.remove('active');
    } else {
        window.location.href = 'admin-inventory.html';
    }
}

function saveProduct(e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value;
    const brand = document.getElementById('edit-brand').value;
    const price = parseInt(document.getElementById('edit-price').value);
    const cat = document.getElementById('edit-cat').value;
    const stock = parseInt(document.getElementById('edit-stock').value);
    const description = document.getElementById('edit-desc').value;
    const image = document.getElementById('edit-image').value || 'image/product/f1.jpg';
    const isFlash = document.getElementById('edit-flash')?.checked || false;
    const oldPrice = parseInt(document.getElementById('edit-old-price')?.value) || 0;

    const productData = id ?
        { ...allProducts.find(p => p.id == id), name, brand, price, cat, stock, description, image, isFlash, oldPrice } :
        { id: allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id)) + 1 : 1, name, brand, price, cat, stock, description, image, rating: "5.0", reviewCount: 0, isFlash, oldPrice };

    if (id) {
        const idx = allProducts.findIndex(p => p.id == id);
        allProducts[idx] = productData;
    } else {
        allProducts.push(productData);
    }

    localStorage.setItem('products', JSON.stringify(allProducts));

    // 🔥 Firebase Sync
    if (window.saveProductToFirebase) {
        window.saveProductToFirebase(productData);
    }

    showToast('Vault Updated Successfully!');
}


// === 7. Specialized Features ===
function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    const product = allProducts.find(p => p.id === id);
    const isAdding = idx === -1;

    if (isAdding) {
        wishlist.push(id);
        showToast(`${product ? product.name : 'Item'} added to wishlist!`);
    } else {
        wishlist.splice(idx, 1);
        showToast(`Removed from wishlist.`);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Dynamic UI Update (Update all heart icons for this product ID on the current page)
    const heartIcons = document.querySelectorAll(`.wishlist-icon[onclick*="toggleWishlist(${id})"]`);
    heartIcons.forEach(iconContainer => {
        const heart = iconContainer.querySelector('i');
        if (isAdding) {
            iconContainer.classList.add('active');
            heart.classList.replace('fa-regular', 'fa-solid');
        } else {
            iconContainer.classList.remove('active');
            heart.classList.replace('fa-solid', 'fa-regular');
        }
    });
}

function initTiltEffect() {
    document.querySelectorAll('.banner-box').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 10;
            const y = (e.clientY - rect.top - rect.height / 2) / 10;
            card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`; });
    });
}

function startCountdown() {
    const daysEl = document.getElementById('days');
    if (!daysEl) return;
    let deadline = new Date(); deadline.setDate(deadline.getDate() + 3);
    const timer = setInterval(() => {
        const dist = deadline - new Date().getTime();
        if (dist < 0) { clearInterval(timer); return; }
        daysEl.innerText = Math.floor(dist / 86400000);
        document.getElementById('hours').innerText = Math.floor((dist % 86400000) / 3600000);
        document.getElementById('minutes').innerText = Math.floor((dist % 3600000) / 60000);
        document.getElementById('seconds').innerText = Math.floor((dist % 60000) / 1000);
    }, 1000);
}

// Feature initializations moved to LayoutManager.init()


function renderSProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    if (!id || !window.location.pathname.includes('sproduct.html')) return;

    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    document.getElementById('mainImg').src = product.image;
    document.getElementById('mainImg').onerror = function () { this.onerror = null; this.src = UNIVERSAL_FALLBACK_IMAGE; };
    document.getElementById('pro-name').innerText = product.name;
    document.getElementById('pro-price').innerText = convertPrice(product.price);
    document.getElementById('pro-category-path').innerText = `Home / ${product.cat}`;
    document.getElementById('pro-desc').innerText = `${product.name} is a high-quality product from ${product.brand}. Crafted with premium materials, it offers unmatched comfort and durability for the modern individual. Available in multiple sizes.`;

    // Premium Rating Display on SProduct
    const ratingContainer = document.querySelector('.single-pro-details .star');
    if (ratingContainer) {
        ratingContainer.innerHTML = `
            ${generateStarRating(product.rating)}
            <span class="rating-value" style="font-weight: 800; margin-left: 10px;">${product.rating}</span>
            <span class="review-count" style="color: var(--text-muted); font-size: 13px; margin-left: 5px;">(${product.reviewCount} Verified Reviews)</span>
        `;
    }

    const smallImgContainer = document.getElementById('small-img-container');
    if (smallImgContainer) {
        smallImgContainer.innerHTML = "";
        for (let i = 0; i < 4; i++) {
            const imgCol = document.createElement('div');
            imgCol.className = 'small-img-col';
            imgCol.innerHTML = `<img src="${product.image}" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';" width="100%" class="small-img" alt="">`;
            imgCol.onclick = () => document.getElementById('mainImg').src = product.image;
            smallImgContainer.appendChild(imgCol);
        }
    }

    renderReviews(product);
    renderProducts('dynamic-related-pro', 4, product.cat);
    initImageZoom();
}

function renderReviews(product) {
    const section = document.createElement('section');
    section.id = 'product-reviews';
    section.className = 'section-p1';

    // Coming Soon Design
    let reviewsHTML = `
        <div class="reviews-coming-soon" style="text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); border-radius: 20px; border: 2px dashed #0ea5e9;">
            <div class="star-display" style="font-size: 48px; color: #0ea5e9; margin-bottom: 20px; display: flex; justify-content: center; gap: 10px;">
                <i class="fa-solid fa-star" style="animation: starPulse 1.5s ease-in-out infinite;"></i>
                <i class="fa-solid fa-star" style="animation: starPulse 1.5s ease-in-out 0.1s infinite;"></i>
                <i class="fa-solid fa-star" style="animation: starPulse 1.5s ease-in-out 0.2s infinite;"></i>
                <i class="fa-solid fa-star" style="animation: starPulse 1.5s ease-in-out 0.3s infinite;"></i>
                <i class="fa-solid fa-star" style="animation: starPulse 1.5s ease-in-out 0.4s infinite;"></i>
            </div>
            <h2 style="font-size: 36px; color: #0c4a6e; margin-bottom: 15px; font-weight: 800;">Customer Reviews Coming Soon!</h2>
            <p style="font-size: 18px; color: #0369a1; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">We're building an amazing review system with verified purchases, photo reviews, and exclusive rewards for reviewers.</p>
            <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 30px; flex-wrap: wrap;">
                <div style="text-align: center;">
                    <i class="fa-solid fa-shield-check" style="font-size: 32px; color: #0ea5e9; margin-bottom: 10px;"></i>
                    <p style="font-size: 14px; color: #0369a1; font-weight: 600; margin: 0;">Verified Reviews</p>
                </div>
                <div style="text-align: center;">
                    <i class="fa-solid fa-camera" style="font-size: 32px; color: #0ea5e9; margin-bottom: 10px;"></i>
                    <p style="font-size: 14px; color: #0369a1; font-weight: 600; margin: 0;">Photo Reviews</p>
                </div>
                <div style="text-align: center;">
                    <i class="fa-solid fa-gift" style="font-size: 32px; color: #0ea5e9; margin-bottom: 10px;"></i>
                    <p style="font-size: 14px; color: #0369a1; font-weight: 600; margin: 0;">Earn Rewards</p>
                </div>
            </div>
            <button class="normal" onclick="showToast('We will notify you when reviews are available!')" style="background: #0ea5e9; color: white; padding: 15px 40px; font-size: 16px; font-weight: 700;">Notify Me When Available</button>
        </div>
    `;

    section.innerHTML = reviewsHTML;

    // Insert before related products
    const relatedSection = document.getElementById('product1');
    if (relatedSection) {
        relatedSection.parentNode.insertBefore(section, relatedSection);
    }
}

function initImageZoom() {
    const mainImg = document.getElementById('mainImg');
    if (!mainImg || !window.location.pathname.includes('sproduct.html')) return;

    mainImg.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = mainImg.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        mainImg.style.transformOrigin = `${x}% ${y}%`;
        mainImg.style.transform = "scale(1.5)";
    });

    mainImg.addEventListener('mouseleave', () => {
        mainImg.style.transform = "scale(1)";
        mainImg.style.transformOrigin = "center center";
    });
}

function initLiveSearch() {
    const input = document.getElementById('header-search-input');
    if (!input) return;

    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'live-search-results';
    input.parentNode.appendChild(resultsDiv);

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            resultsDiv.innerHTML = "";
            resultsDiv.classList.remove('active');
            return;
        }

        const matches = allProducts.filter(p => p.name.toLowerCase().includes(query) || p.cat.toLowerCase().includes(query)).slice(0, 5);

        if (matches.length > 0) {
            resultsDiv.innerHTML = matches.map(p => `
                <div class="search-item" onclick="window.location.href='sproduct.html?id=${p.id}'">
                    <img src="${p.image}" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';" width="40">
                    <div class="search-item-info">
                        <p class="name">${p.name}</p>
                        <p class="price">${convertPrice(p.price)}</p>
                    </div>
                </div>
            `).join('');
            resultsDiv.classList.add('active');
        } else {
            resultsDiv.innerHTML = "<p style='padding: 15px; font-size: 13px;'>No results found</p>";
            resultsDiv.classList.add('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !resultsDiv.contains(e.target)) {
            resultsDiv.classList.remove('active');
        }
    });
}

function initPremiumEffects() {
    // 1. Reveal on Scroll with Stagger
    const revealElements = document.querySelectorAll('.pro, .fe-box, .banner-box, #banner, .newstext, .form, .blog-box, .support-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-active');
                }, index * 100); // Staggered effect
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // 2. Parallax Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }

        const banner = document.getElementById('banner');
        if (banner) {
            banner.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
        }
    });

    // 3. Navbar Shrink on Scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        const scrollProgress = document.getElementById('scroll-progress');

        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + "%";

        if (window.scrollY > 100) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });
}

function showMockNotification(method, target, otp) {
    let iconClass = "fa-envelope";
    let serviceName = "Mail";
    let color = "#000";

    if (method === 'whatsapp') { iconClass = "fa-whatsapp"; serviceName = "WhatsApp"; color = "#25D366"; }
    else if (method === 'sms') { iconClass = "fa-comment-sms"; serviceName = "Messages"; color = "#007AFF"; }

    const notif = document.createElement('div');
    notif.className = 'notification-toast';
    notif.innerHTML = `
        <div class="notif-icon" style="background: ${color}"><i class="fa-solid ${iconClass}"></i></div>
        <div class="notif-content">
            <h4>${serviceName} • ${target}</h4>
            <p>Your Alina Collection verification code is: <strong>${otp}</strong>. Do not share this code.</p>
        </div>
        <span class="notif-time">now</span>
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('active'), 100);
    setTimeout(() => {
        notif.classList.remove('active');
        setTimeout(() => { if (notif.parentNode) notif.remove(); }, 500);
    }, 8000);
}

function showToast(m) {
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = m; document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 100);
    setTimeout(() => { t.classList.remove('show'); if (t.parentNode) document.body.removeChild(t); }, 8000);
}// Filter Portal Logic
function toggleFilterPortal() {
    showToast('Filter Portal Coming Soon! 🔍');
}

// Contact form logic moved to LayoutManager.initContactForm()


function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(i => i.classList.remove('active'));

                // Toggle current item
                if (!isOpen) item.classList.add('active');
            });
        }
    });
}

function initLoader() {
    const progress = document.createElement('div');
    progress.id = 'scroll-progress';
    document.body.appendChild(progress);

    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `<img src="image/Logo/logo.png" class="loader-logo">`;
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

function initScrollTop() {
    if (document.getElementById('scroll-top')) return;
    const btn = document.createElement('div');

    btn.id = 'scroll-top';
    btn.innerHTML = `<i class="fas fa-arrow-up"></i>`;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    btn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

function initSideCart() {
    if (document.getElementById('side-cart')) return;
    const sideCart = document.createElement('div');

    sideCart.id = 'side-cart';
    sideCart.innerHTML = `
        <div class="side-cart-overlay"></div>
        <div class="side-cart-content">
            <div class="side-cart-header">
                <h3>Shopping Bag</h3>
                <i class="fas fa-times close-cart"></i>
            </div>
            <div id="side-cart-items"></div>
            <div class="side-cart-footer">
                <div class="side-cart-total">
                    <span>Subtotal:</span>
                    <strong id="side-cart-total-amount">NPR 0</strong>
                </div>
                <button onclick="window.location.href='cart.html'" class="normal">View Bag</button>
                <button onclick="window.location.href='checkout.html'" class="normal outline-dark">Checkout</button>
            </div>
        </div>
    `;
    document.body.appendChild(sideCart);

    const closeBtns = sideCart.querySelectorAll('.close-cart, .side-cart-overlay');
    closeBtns.forEach(btn => btn.onclick = () => sideCart.classList.remove('active'));

    window.toggleSideCart = () => {
        renderSideCart();
        sideCart.classList.add('active');
    };

    // Replace cart links with toggle
    document.querySelectorAll('.cart-link, .fa-bag-shopping').forEach(link => {
        link.onclick = (e) => {
            if (window.location.pathname.includes('checkout.html') || window.location.pathname.includes('cart.html')) return;
            e.preventDefault();
            toggleSideCart();
        };
    });
}

function renderSideCart() {
    const container = document.getElementById('side-cart-items');
    const totalEl = document.getElementById('side-cart-total-amount');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center; margin-top:50px; color:#999;'>Your bag is empty.</p>";
        totalEl.innerText = "NPR 0";
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        subtotal += item.price * item.quantity;
        return `
            <div class="side-cart-item">
                <img src="${item.image}" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';" width="60">
                <div class="item-info">
                    <p class="name">${item.name}</p>
                    <p class="price">${item.quantity} x ${convertPrice(item.price)}</p>
                </div>
                <i class="fas fa-times remove-item" onclick="removeFromCart(${item.id}); renderSideCart();"></i>
            </div>
        `;
    }).join('');
    totalEl.innerText = convertPrice(subtotal);
}

function initNewsletterPopup() {
    if (localStorage.getItem('newsletterShown') || !window.location.pathname.includes('index.html')) return;

    setTimeout(() => {
        const popup = document.createElement('div');
        popup.id = 'newsletter-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <i class="fas fa-times close-popup" id="close-news-popup"></i>
                <div class="popup-img"></div>
                <div class="popup-text">
                    <h2>Exclusive Access</h2>
                    <p>Subscribe to our newsletter and get 15% off your first purchase!</p>
                    <input type="email" placeholder="Your email address">
                    <button class="normal">Join the Collection</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('active'), 100);

        document.getElementById('close-news-popup').onclick = () => {
            popup.classList.remove('active');
            setTimeout(() => popup.remove(), 500);
            localStorage.setItem('newsletterShown', 'true');
        };
    }, 10000);
}

function initDarkMode() {
    // Force light mode and show coming soon alert
    document.body.classList.remove('dark-mode');
    
    const showComingSoonAlert = () => {
        showToast('Dark Mode Coming Soon! 🌙');
    };

    // Desktop Toggle
    if (!document.getElementById('dark-mode-toggle')) {
        const desktopToggle = document.createElement('li');
        desktopToggle.innerHTML = `<a href="#" id="dark-mode-toggle" title="Dark Mode Coming Soon"><i class="fas fa-moon"></i></a>`;
        const navbar = document.getElementById('navbar');
        if (navbar) {
            const closeBtn = document.getElementById('close');
            if (closeBtn) navbar.insertBefore(desktopToggle, closeBtn);
            else navbar.appendChild(desktopToggle);
        }
    }

    // Mobile Toggle Injection
    const drawerLinks = document.querySelector('.mob-drawer-links');
    if (drawerLinks && !document.getElementById('mob-dark-mode-toggle')) {
        const mobToggleLi = document.createElement('li');
        mobToggleLi.className = 'mob-link-item';
        mobToggleLi.id = 'mob-dark-mode-item';
        mobToggleLi.style.setProperty('--i', '8');
        mobToggleLi.innerHTML = `<a href="#" id="mob-dark-mode-toggle"><i class="fas fa-moon"></i> Dark Mode</a>`;
        drawerLinks.appendChild(mobToggleLi);

        document.getElementById('mob-dark-mode-toggle').onclick = (e) => {
            e.preventDefault();
            showComingSoonAlert();
        };
    }

    // Click handler for desktop
    const desktopBtn = document.getElementById('dark-mode-toggle');
    if (desktopBtn) {
        desktopBtn.onclick = (e) => {
            e.preventDefault();
            showComingSoonAlert();
        };
    }
}

function initCustomDropdowns() {
    const originalSelects = document.querySelectorAll('#currency-select');

    originalSelects.forEach(select => {
        // Prevent double initialization
        if (select.nextElementSibling && select.nextElementSibling.classList.contains('custom-select-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';

        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.innerHTML = `<span>${select.value}</span> <div class="custom-arrow"></div>`;

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'custom-options';

        // Generate options from original select
        Array.from(select.options).forEach(opt => {
            const optionDiv = document.createElement('span');
            optionDiv.className = `custom-option ${opt.value === select.value ? 'selected' : ''}`;
            optionDiv.dataset.value = opt.value;
            optionDiv.textContent = opt.textContent;

            optionDiv.addEventListener('click', function () {
                // Update original select
                select.value = this.dataset.value;

                // Update UI
                trigger.querySelector('span').textContent = this.textContent;
                optionsContainer.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');

                // Close dropdown
                wrapper.classList.remove('open');

                // Trigger change event manually
                select.dispatchEvent(new Event('change'));
            });

            optionsContainer.appendChild(optionDiv);
        });

        wrapper.appendChild(trigger);
        wrapper.appendChild(optionsContainer);

        // Hide original
        select.style.display = 'none';

        // Insert custom
        select.parentNode.insertBefore(wrapper, select.nextSibling);

        // Toggle logic
        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop bubble so document click doesn't close it immediately
            // Close other open dropdowns
            document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
                if (w !== wrapper) w.classList.remove('open');
            });
            wrapper.classList.toggle('open');
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.custom-select-wrapper.open').forEach(w => w.classList.remove('open'));
        }
    });
}

function renderHomeCategories() {
    const container = document.getElementById('home-categories-showcase');
    if (!container) return;

    // Build the entire HTML buffer first for performance
    const sectionsHTML = Object.keys(categoryGroups).map(catName => {
        const sectionId = `cat-section-${catName.toLowerCase().replace(/\s+/g, '-')}`;
        return `
            <section id="product1" class="section-p1 category-showcase-section">
                <h2>${catName} Collection</h2>
                <p>Explore our premium range of ${catName.toLowerCase()}</p>
                <div class="pro-container" id="${sectionId}">
                    <!-- Products injected below -->
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="normal outline-dark" onclick="window.location.href='shop.html?cat=${catName}'">View All ${catName}</button>
                </div>
            </section>
        `;
    }).join('');

    container.innerHTML = sectionsHTML;

    // After injecting containers, populate them with products
    Object.keys(categoryGroups).forEach(catName => {
        const sectionId = `cat-section-${catName.toLowerCase().replace(/\s+/g, '-')}`;
        renderProducts(sectionId, 4, catName);
    });
}

// Global Initialization Trigger
document.addEventListener('DOMContentLoaded', () => {
    LayoutManager.init();
});
