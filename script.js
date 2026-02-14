// Mobile Navigation Toggle (legacy navbar — kept for other pages)
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

// Only use old navbar toggle if new mobile drawer is NOT present
if (bar && !document.getElementById('mobile-drawer')) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// ====== Premium Mobile Drawer System ======
(function initMobileDrawer() {
    const hamburger = document.getElementById('bar');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-nav-overlay');
    const drawerClose = document.getElementById('mob-drawer-close');

    if (!hamburger || !drawer || !overlay) return;

    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('active');
        hamburger.classList.add('is-active');
        document.body.classList.add('mob-nav-open');
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        hamburger.classList.remove('is-active');
        document.body.classList.remove('mob-nav-open');
        // Close any open sub-menus
        document.querySelectorAll('.mob-has-sub.sub-open').forEach(el => el.classList.remove('sub-open'));
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (drawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    // Shop sub-menu accordion toggle
    document.querySelectorAll('.mob-sub-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.closest('.mob-has-sub');
            if (parent) parent.classList.toggle('sub-open');
        });
    });

    // Sync the mobile drawer dark mode toggle with main
    function updateMobileDarkModeIcon(isDark) {
        const mobToggle = document.getElementById('mob-dark-mode-toggle');
        if (mobToggle) {
            const icon = mobToggle.querySelector('i');
            if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Export for use in initDarkMode
    window.updateMobileDarkModeIcon = updateMobileDarkModeIcon;

    // Sync the mobile drawer currency selector with the main one
    const mobCurrencySelect = document.getElementById('mob-currency-select');
    const mainCurrencySelect = document.getElementById('currency-select');
    if (mobCurrencySelect && mainCurrencySelect) {
        // Sync on load
        mobCurrencySelect.value = localStorage.getItem('selectedCurrency') || 'NPR';
        mobCurrencySelect.addEventListener('change', () => {
            localStorage.setItem('selectedCurrency', mobCurrencySelect.value);
            if (mainCurrencySelect) mainCurrencySelect.value = mobCurrencySelect.value;
            // Trigger re-render if on a product page
            if (typeof renderProducts === 'function') {
                const params = new URLSearchParams(window.location.search);
                const containers = ['dynamic-featured-pro', 'dynamic-new-pro', 'dynamic-all-pro', 'dynamic-flash-mini'];
                containers.forEach(c => {
                    if (document.getElementById(c)) renderProducts(c, c.includes('featured') || c.includes('new') ? 8 : null, params.get('cat'), params.get('search'));
                });
            }
            closeDrawer();
        });
    }

    // Close drawer on window resize to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 900 && drawer.classList.contains('open')) {
                closeDrawer();
            }
        }, 150);
    });
})();

// === 1. State Management & Data ===
const PRODUCT_VERSION = "3.9"; // Granular "Name-Wise" Visual Accuracy Overhaul

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

            // Precise Selection: Match image content to the product name
            const photoId = pool[i % pool.length];
            // Ensure 100% uniqueness via unique ID seed
            const uniqueImageURL = `https://images.unsplash.com/photo-${photoId}.jpg?auto=format&fit=crop&w=600&h=800&q=80&sig=${id}`;

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
    return products;
}

const defaultProducts = generateDefaultProducts();

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
        aDashboard.href = currentUser.role === 'admin' ? 'admin-product-config.html' : 'user-dashboard.html';
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
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    // Global bridge for auth.js to call firebase signOut
    if (window.firebaseSignOut) {
        window.firebaseSignOut();
    }
    showToast('Logged out successfully');
    setTimeout(() => {
        window.location.href = 'index.html';
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
        const showFlashBadge = isFlashContainer; // Only show flash styling in flash container

        return `
            <div class="pro">
                <div class="pro-img-wrapper">
                    ${showFlashBadge ? `<span class="badge-sale">70% OFF</span>` : ''}
                    <div class="wishlist-icon ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${p.id})">
                        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </div>
                    <img src="${p.image}" alt="" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';" onclick="window.location.href='sproduct.html?id=${p.id}'" loading="lazy">
                    <button class="quick-view-btn" onclick="openQuickView(${p.id}); return false;">QUICK VIEW</button>
                </div>
                <div class="pro-data">
                    <div class="des">
                        <div class="rating-amount-row">
                            <div class="star-wrapper">
                                <span class="rating-num">${p.rating}</span>
                                <div class="star">
                                    ${generateStarRating(p.rating)}
                                </div>
                                <span class="review-num">${p.reviewCount} Reviews</span>
                            </div>
                            <span class="stock-amount">Stock: ${p.stock}</span>
                        </div>
                        <span class="brand-tag">${p.brand.toUpperCase()}</span>
                        <h5>${p.name}</h5>
                        ${showFlashBadge ? `
                            <div class="price-row">
                                <h4 class="old-price">${convertPrice(p.price * 2.5)}</h4>
                                <h4>${convertPrice(p.price)}</h4>
                            </div>
                            <div class="stock-bar">
                                <div class="progress" style="width: ${Math.max(20, (p.stock / 30) * 100)}%;"></div>
                            </div>
                            <p class="stock-text">Only ${p.stock} units left!</p>
                        ` : `<h4>${convertPrice(p.price)}</h4>`}
                    </div>
                    <div class="product-actions-text">
                        <button onclick="addToCart(${p.id}); return false;" class="add-cart-btn">Add to Cart</button>
                        <button onclick="buyNow(${p.id}); return false;" class="buy-now-btn">Buy Now</button>
                    </div>
                </div>
            </div>`;
    });

    container.innerHTML = htmlBuffer.join('');
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
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-link, .fa-cart-shopping, .fa-bag-shopping').forEach(el => {
        const target = el.classList.contains('cart-link') ? el : el.parentElement;
        if (!target || target.tagName !== 'A') return;

        let b = target.querySelector('.cart-badge');
        if (!b) { b = document.createElement('span'); b.className = 'cart-badge'; target.appendChild(b); }
        b.innerText = count; b.style.display = count > 0 ? 'flex' : 'none';
    });
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
        pTable.innerHTML = sortedProducts.map(p => `
            <tr>
                <td><img src="${p.image}" class="inventory-img" onerror="this.onerror=null;this.src='${UNIVERSAL_FALLBACK_IMAGE}';"></td>
                <td>
                    <div style="font-weight:800;">${p.name}</div>
                    <div style="font-size:11px; color:var(--text-muted);">Product ID: #${p.id}</div>
                </td>
                <td>
                    <span class="badge-cat">${p.cat}</span>
                    <div style="font-size:11px; margin-top:4px;">Brand: ${p.brand}</div>
                </td>
                <td><span class="price-text">${convertPrice(p.price)}</span></td>
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
                <img src="${p.image}" alt="">
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
    if (!uTable) return;

    // David Scot is the Sovereign, always top
    let usersList = [{ name: "David Scot", email: "davidscot8786@gmail.com", role: "admin" }, ...allUsers.filter(u => u.name !== "David Scot")];

    uTable.innerHTML = usersList.map(u => `
        <tr>
            <td data-label="NAME">
                <div style="font-weight:800;">${u.name}</div>
                <div style="font-size:11px; color:#94a3b8;">${u.email}</div>
            </td>
            <td data-label="PHONE">${u.phone || 'Contact Private'}</td>
            <td data-label="ROLE"><span class="role-badge role-${u.role}">${u.role}</span></td>
            <td data-label="ACTION">
                ${u.name !== 'David Scot' ? `<button class="action-btn btn-delete" onclick="expungeUser('${u.email}')">Remove User</button>` : '<span style="font-size:11px; color:#22c55e; font-weight:800;"><i class="fas fa-crown"></i> OWNER</span>'}
            </td>
        </tr>
    `).join('');
}

function expungeUser(email) {
    if (confirm('Are you sure you want to remove this user from the list?')) {
        allUsers = allUsers.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(allUsers));
        renderAdminDashboard();
        showToast('User removed');
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

    const productData = id ?
        { ...allProducts.find(p => p.id == id), name, brand, price, cat, stock, description, image } :
        { id: allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id)) + 1 : 1, name, brand, price, cat, stock, description, image, rating: "5.0", reviewCount: 0 };

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

// === 8. Global Initialization ===
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    updateNavbarAuth();
    handleAuth();
    updateCartIconCount();

    const params = new URLSearchParams(window.location.search);
    renderProducts('dynamic-featured-pro', 8);
    renderProducts('dynamic-new-pro', 4);
    renderProducts('dynamic-all-pro', null, params.get('cat'), params.get('search'));
    renderProducts('dynamic-flash-mini', 6);

    renderHomeCategories(); // Render category-specific sections on home page

    renderSProduct();
    renderCart();
    renderAdminDashboard();
    startCountdown();
    initTiltEffect();
    initPremiumEffects();
    initFAQ();
    initLiveSearch();
    initScrollTop();
    initNewsletterPopup();
    initDarkMode();
    initSideCart();

    // Event Listeners
    document.querySelectorAll('#currency-select').forEach(s => {
        s.value = localStorage.getItem('selectedCurrency') || "NPR";
        s.onchange = (e) => { localStorage.setItem('selectedCurrency', e.target.value); location.reload(); };
    });

    const sTrigger = document.getElementById('search-trigger');
    const mSTrigger = document.getElementById('mobile-search-btn');
    const sPopup = document.getElementById('search-popup');

    if (sTrigger) sTrigger.onclick = (e) => { e.preventDefault(); sPopup.classList.add('active'); };
    if (mSTrigger) mSTrigger.onclick = () => {
        sPopup.classList.add('active');
        document.querySelector('#search-popup input').focus();
    };

    const closeS = document.getElementById('close-search');
    if (closeS) closeS.onclick = () => sPopup.classList.remove('active');

    // Header Search Logic
    const headerSearchBtn = document.getElementById('header-search-btn');
    const headerSearchInput = document.getElementById('header-search-input');

    const performSearch = () => {
        const query = headerSearchInput.value.trim();
        if (query) {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    };

    if (headerSearchBtn) headerSearchBtn.onclick = performSearch;
    if (headerSearchInput) {
        headerSearchInput.onkeypress = (e) => {
            if (e.key === 'Enter') performSearch();
        };
    }

    // Support Widget
    const wa = document.createElement('a');
    wa.href = "https://wa.me/9779705978322";
    wa.className = "whatsapp-float";
    wa.target = "_blank";
    wa.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
    document.body.appendChild(wa);

    // Buy Now Button logic for sproduct.html
    const buyNowBtn = document.getElementById('buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.onclick = () => {
            const params = new URLSearchParams(window.location.search);
            const productId = parseInt(params.get('id'));
            const qty = parseInt(document.getElementById('pro-quantity')?.value || 1);
            if (productId) buyNow(productId, qty);
        };
    }

    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.onclick = () => {
            const params = new URLSearchParams(window.location.search);
            const productId = parseInt(params.get('id'));
            const qty = parseInt(document.getElementById('pro-quantity')?.value || 1);
            if (productId) addToCart(productId, qty);
        };
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initCustomDropdowns();
});

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

    const reviewerNames = ["Eleanor Vance", "Julian Thorne", "Seraphina Moore", "Alistair Grey", "Isolde Bell"];
    const reviewTexts = [
        "The attention to detail on this piece is remarkable. The fit is perfect and the material feels incredibly premium.",
        "A truly standout addition to my wardrobe. Vanguard Collective never fails to deliver on both style and substance.",
        "Exceeded all my expectations. The architectural silhouette is flattering and the craftsmanship is top-tier.",
        "High-end fashion that actually feels comfortable for daily wear. This is exactly what I've been looking for.",
        "Iconic design. Received so many compliments already. Definitely worth every penny."
    ];

    let reviewsHTML = `
        <div class="reviews-header" style="margin-bottom: 40px; display: flex; align-items: center; justify-content: space-between;">
            <div>
                <h2 style="font-size: 32px; margin-bottom: 5px;">Customer Reviews</h2>
                <div class="overall-rating" style="display: flex; align-items: center; gap: 15px;">
                    <h1 style="font-size: 48px; color: var(--secondary-color);">${product.rating}</h1>
                    <div>
                        <div class="star" style="color: #f3b519; font-size: 18px;">${generateStarRating(product.rating)}</div>
                        <p style="margin: 0; font-size: 14px; color: var(--text-muted);">Based on ${product.reviewCount} reviews</p>
                    </div>
                </div>
            </div>
            <button class="normal">Write a Review</button>
        </div>
        <div class="reviews-list" style="display: flex; flex-direction: column; gap: 30px;">
    `;

    for (let i = 0; i < 3; i++) {
        const name = reviewerNames[i % reviewerNames.length];
        const text = reviewTexts[i % reviewTexts.length];
        const date = new Date();
        date.setDate(date.getDate() - (i * 5 + 2));

        reviewsHTML += `
            <div class="review-item" style="padding-bottom: 30px; border-bottom: 1px solid #eee;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div class="avatar" style="width: 45px; height: 45px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary-color);">${name.charAt(0)}</div>
                        <div>
                            <h5 style="margin: 0; font-size: 16px;">${name} <i class="fas fa-check-circle" style="color: #22c55e; font-size: 12px; margin-left: 5px;"></i> <span style="font-size: 11px; font-weight: 500; color: #22c55e;">Verified Buyer</span></h5>
                            <div class="star" style="color: #f3b519; font-size: 12px;">${generateStarRating(5.0)}</div>
                        </div>
                    </div>
                    <span style="font-size: 13px; color: var(--text-muted);">${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <p style="margin: 10px 0 0 60px; line-height: 1.6; color: var(--text-color); font-weight: 500;">${text}</p>
            </div>
        `;
    }

    reviewsHTML += '</div>';
    section.innerHTML = reviewsHTML;

    // Insert before related products
    const relatedSection = document.getElementById('product1'); // The related pro section
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
    const portal = document.getElementById('filter-portal');
    const container = document.getElementById('portal-filter-container');
    const sidebarInner = document.querySelector('.sidebar-inner');

    if (!portal || !container || !sidebarInner) return;

    portal.classList.toggle('active');

    if (portal.classList.contains('active')) {
        // Move sidebar into portal
        container.appendChild(sidebarInner);
    } else {
        // Move sidebar back to its original location (inside aside.filter-sidebar)
        const aside = document.querySelector('.filter-sidebar');
        if (aside) aside.appendChild(sidebarInner);
    }
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#form-details form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }
});

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
    const darkModeStorage = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Logic: Use stored preference if exists, otherwise follow system
    let isDark = darkModeStorage === null ? prefersDark.matches : darkModeStorage === 'true';

    const updateTheme = (dark, save = true) => {
        document.body.classList.toggle('dark-mode', dark);
        if (save) localStorage.setItem('darkMode', dark);

        // Update Desktop Icon
        const desktopIcon = document.querySelector('#dark-mode-toggle i');
        if (desktopIcon) desktopIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';

        // Update Mobile Icon (via exported function)
        if (window.updateMobileDarkModeIcon) window.updateMobileDarkModeIcon(dark);
    };

    // Initial setup
    updateTheme(isDark, false);

    // Desktop Toggle
    const desktopToggle = document.createElement('li');
    desktopToggle.innerHTML = `<a href="#" id="dark-mode-toggle" title="Toggle Dark Mode"><i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i></a>`;
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const closeBtn = document.getElementById('close');
        if (closeBtn) navbar.insertBefore(desktopToggle, closeBtn);
        else navbar.appendChild(desktopToggle);
    }

    // Mobile Toggle Injection
    const drawerLinks = document.querySelector('.mob-drawer-links');
    if (drawerLinks && !document.getElementById('mob-dark-mode-toggle')) {
        const mobToggleLi = document.createElement('li');
        mobToggleLi.className = 'mob-link-item';
        mobToggleLi.id = 'mob-dark-mode-item';
        mobToggleLi.style.setProperty('--i', '8');
        mobToggleLi.innerHTML = `<a href="#" id="mob-dark-mode-toggle"><i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i> Dark Mode</a>`;
        drawerLinks.appendChild(mobToggleLi);

        document.getElementById('mob-dark-mode-toggle').onclick = (e) => {
            e.preventDefault();
            const nowDark = !document.body.classList.contains('dark-mode');
            updateTheme(nowDark);
        };
    }

    // Click hander for desktop
    const desktopBtn = document.getElementById('dark-mode-toggle');
    if (desktopBtn) {
        desktopBtn.onclick = (e) => {
            e.preventDefault();
            const nowDark = !document.body.classList.contains('dark-mode');
            updateTheme(nowDark);
        };
    }

    // Listener for system changes (only if no manual override in this session)
    prefersDark.addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
            updateTheme(e.matches, false);
        }
    });
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
