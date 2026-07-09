(function() {
    const body = document.body;
    const loadingScreen = document.getElementById('loading-screen');
    const header = document.getElementById('header');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const searchResults = document.getElementById('searchResults');
    const themeToggle = document.getElementById('themeToggle');
    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const cartShipping = document.getElementById('cartShipping');
    const modalOverlay = document.getElementById('modalOverlay');
    const productModal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const backToTop = document.getElementById('backToTop');
    const toastContainer = document.getElementById('toastContainer');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    const contactForm = document.getElementById('contactForm');
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testPrev = document.getElementById('testPrev');
    const testNext = document.getElementById('testNext');
    const testDots = document.getElementById('testDots');
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    let cart = JSON.parse(localStorage.getItem('primep_cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('primep_wishlist')) || [];
    let currentTestimonial = 0;
    let testimonialCount = 0;
    let testimonialInterval = null;
    let currentCoupon = null;
    let couponDiscount = 0;
    let isScrolling = false;
    let lastScrollTop = 0;

    const PRODUCTS_DB = [
        { id: 'p1', name: 'Parisian Bloom', brand: 'Maison de Luxe', category: 'floral', country: 'France', price: 245, rating: 5, reviews: 246, desc: 'A delicate floral bouquet with notes of rose, jasmine, and lily of the valley.', image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2070&auto=format&fit=crop', badge: 'Best Seller', type: 'perfume' },
        { id: 'p2', name: 'Tuscan Cedar', brand: 'Artisan Scents', category: 'woody', country: 'Italy', price: 289, rating: 4.5, reviews: 189, desc: 'Warm cedarwood blended with amber and a hint of Mediterranean citrus.', image: 'https://images.unsplash.com/photo-1619994380355-1a42106b1f2b?q=80&w=1974&auto=format&fit=crop', badge: 'New', type: 'perfume' },
        { id: 'p3', name: 'Dubai Oud', brand: 'Arabian Nights', category: 'oriental', country: 'UAE', price: 420, rating: 5, reviews: 312, desc: 'Rich agarwood oud with saffron, rose, and dark musk undertones.', image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1974&auto=format&fit=crop', badge: 'Premium', type: 'perfume' },
        { id: 'p4', name: 'Kyoto Rain', brand: 'Zen Fragrances', category: 'fresh', country: 'Japan', price: 198, rating: 4.5, reviews: 175, desc: 'Crisp green tea, bamboo, and aquatic notes inspired by Japanese gardens.', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2070&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p5', name: 'Istanbul Rose', brand: 'Ottoman Essence', category: 'floral', country: 'Turkey', price: 275, rating: 5, reviews: 203, desc: 'Turkish rose absolute with saffron, patchouli, and vanilla base notes.', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2070&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p6', name: 'London Fog', brand: 'British Aroma', category: 'niche', country: 'United Kingdom', price: 235, rating: 4.5, reviews: 156, desc: 'Earl Grey tea, bergamot, and smoky notes evoking London misty mornings.', image: 'https://images.unsplash.com/photo-1563826909-bb25c2973d8e?q=80&w=2073&auto=format&fit=crop', badge: 'Limited', type: 'perfume' },
        { id: 'p7', name: 'Sierra Pine', brand: 'Wild Frontier', category: 'woody', country: 'USA', price: 185, rating: 5, reviews: 134, desc: 'Pine needle, cedar bark, and wild sage capturing the American wilderness.', image: 'https://images.unsplash.com/photo-1615467906845-abf2d0e0f71c?q=80&w=1974&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p8', name: 'Mumbai Spice', brand: 'Spice Route', category: 'oriental', country: 'India', price: 198, rating: 4.5, reviews: 221, desc: 'Cardamom, cinnamon, clove, and sandalwood on a bed of amber.', image: 'https://images.unsplash.com/photo-1572635148818-9506d482bf5e?q=80&w=1935&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p9', name: 'Sydney Coast', brand: 'Coastal Scents', category: 'fresh', country: 'Australia', price: 175, rating: 5, reviews: 167, desc: 'Sea salt, lime, eucalyptus, and driftwood for a coastal breeze.', image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=1936&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p10', name: 'Marrakech Jasmine', brand: 'Atlas Aromas', category: 'floral', country: 'Morocco', price: 325, rating: 5, reviews: 198, desc: 'Moroccan jasmine with orange blossom, honey, and warm spices.', image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2076&auto=format&fit=crop', badge: 'Premium', type: 'perfume' },
        { id: 'p11', name: 'Grasse Lavender', brand: 'Provence Parfum', category: 'niche', country: 'France', price: 265, rating: 4.5, reviews: 143, desc: 'French lavender absolute with rosemary, thyme, and light musk.', image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1974&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p12', name: 'Cairo Musk', brand: 'Pharaoh Scents', category: 'oriental', country: 'Egypt', price: 290, rating: 5, reviews: 189, desc: 'White musk with amber, myrrh, and a touch of Egyptian lotus.', image: 'https://images.unsplash.com/photo-1572635148818-9506d482bf5e?q=80&w=1935&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p13', name: 'Santorini Breeze', brand: 'Aegean Essence', category: 'fresh', country: 'Greece', price: 195, rating: 4.5, reviews: 88, desc: 'Sea spray, white flowers, olive blossom, and sun-warmed citrus.', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2070&auto=format&fit=crop', badge: 'New', type: 'perfume' },
        { id: 'p14', name: 'Moscow Winter', brand: 'Tsar Aromas', category: 'woody', country: 'Russia', price: 215, rating: 5, reviews: 156, desc: 'Birch tar, frozen pine, black tea, and smoked leather.', image: 'https://images.unsplash.com/photo-1615467906845-abf2d0e0f71c?q=80&w=1974&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p15', name: 'Venice Carnival', brand: 'Venetian Masks', category: 'niche', country: 'Italy', price: 380, rating: 4.5, reviews: 134, desc: 'Masquerade ball blend of tuberose, cognac, and aged leather.', image: 'https://images.unsplash.com/photo-1563826909-bb25c2973d8e?q=80&w=2073&auto=format&fit=crop', badge: 'Premium', type: 'perfume' },
        { id: 'p16', name: 'Amsterdam Tulip', brand: 'Dutch Fields', category: 'floral', country: 'Netherlands', price: 175, rating: 5, reviews: 112, desc: 'Dutch tulip, hyacinth, fresh soil, and green stem accord.', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2070&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'p17', name: 'Shanghai Silk', brand: 'Silk Road', category: 'oriental', country: 'China', price: 230, rating: 4.5, reviews: 167, desc: 'Osmanthus, peony, silk accord, and warm musk base.', image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1974&auto=format&fit=crop', badge: '', type: 'perfume' },
        { id: 'b1', name: 'Milan Leather Tote', brand: 'Milano Atelier', category: 'tote', country: 'Italy', price: 1890, rating: 5, reviews: 312, desc: 'Handcrafted Italian calfskin leather with gold-tone hardware.', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop', badge: 'Best Seller', type: 'bag' },
        { id: 'b2', name: 'Paris Crossbody', brand: 'Rive Gauche', category: 'crossbody', country: 'France', price: 1250, rating: 4.5, reviews: 245, desc: 'Saffiano leather with adjustable strap and multiple compartments.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop', badge: 'New', type: 'bag' },
        { id: 'b3', name: 'Barcelona Crystal Clutch', brand: 'Barcelona Luxe', category: 'clutch', country: 'Spain', price: 2400, rating: 5, reviews: 178, desc: 'Crystal-embellished mesh clutch with satin interior lining.', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1972&auto=format&fit=crop', badge: 'Premium', type: 'bag' },
        { id: 'b4', name: 'Berlin Urban Backpack', brand: 'Berlin Craft', category: 'backpack', country: 'Germany', price: 890, rating: 4.5, reviews: 134, desc: 'Water-resistant canvas with leather trim and padded laptop compartment.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop', badge: '', type: 'bag' },
        { id: 'b5', name: 'London Shoulder Bag', brand: 'Savile Row', category: 'shoulder', country: 'United Kingdom', price: 1650, rating: 5, reviews: 201, desc: 'British grain leather with brass hardware and detachable shoulder strap.', image: 'https://images.unsplash.com/photo-1564375907666-4e6d4cb5d07d?q=80&w=1974&auto=format&fit=crop', badge: 'Limited', type: 'bag' },
        { id: 'b6', name: 'Tokyo Canvas Tote', brand: 'Tokyo Minimal', category: 'tote', country: 'Japan', price: 520, rating: 5, reviews: 167, desc: 'Minimalist Japanese canvas with clean lines and premium stitching.', image: 'https://images.unsplash.com/photo-1591561954557-26941169b08e?q=80&w=1974&auto=format&fit=crop', badge: '', type: 'bag' },
        { id: 'b7', name: 'Rio Color Block Crossbody', brand: 'Rio Vibrant', category: 'crossbody', country: 'Brazil', price: 680, rating: 4.5, reviews: 89, desc: 'Vibrant Brazilian leather with hand-painted color block design.', image: 'https://images.unsplash.com/photo-1594226801341-41427b4e5c1e?q=80&w=1887&auto=format&fit=crop', badge: '', type: 'bag' },
        { id: 'b8', name: 'Florence Minaudiere', brand: 'Florence Artisan', category: 'clutch', country: 'Italy', price: 1980, rating: 5, reviews: 145, desc: 'Velvet minaudiere with hand-embroidered floral motifs and gold frame.', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1976&auto=format&fit=crop', badge: 'Premium', type: 'bag' },
        { id: 'b9', name: 'Nice Straw Shoulder Bag', brand: 'Cote d\'Azur', category: 'shoulder', country: 'France', price: 450, rating: 4.5, reviews: 112, desc: 'Handwoven straw with leather trim, perfect for summer elegance.', image: 'https://images.unsplash.com/photo-1584382192960-d27d1ba11ec3?q=80&w=1935&auto=format&fit=crop', badge: '', type: 'bag' },
        { id: 'b10', name: 'Stockholm Minimal Backpack', brand: 'Scandi Design', category: 'backpack', country: 'Sweden', price: 620, rating: 5, reviews: 98, desc: 'Clean Scandinavian design in vegan leather with recycled lining.', image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1886&auto=format&fit=crop', badge: '', type: 'bag' },
        { id: 'b11', name: 'Cannes Beach Tote', brand: 'Riviera Style', category: 'tote', country: 'France', price: 380, rating: 4.5, reviews: 76, desc: 'Raffia tote with leather handles and matching pouch.', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1888&auto=format&fit=crop', badge: 'New', type: 'bag' },
        { id: 'b12', name: 'New York Metro Bag', brand: 'NYC Edge', category: 'shoulder', country: 'USA', price: 750, rating: 5, reviews: 223, desc: 'Urban edgy design in black leather with silver chain strap.', image: 'https://images.unsplash.com/photo-1582885854912-5e17beb7e451?q=80&w=1932&auto=format&fit=crop', badge: '', type: 'bag' },
        { id: 'b13', name: 'Madrid Leather Tote', brand: 'Iberian Leather', category: 'tote', country: 'Spain', price: 1120, rating: 5, reviews: 145, desc: 'Spanish leather tote with woven details and detachable pouch.', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1976&auto=format&fit=crop', badge: '', type: 'bag' },
        { id: 'b14', name: 'Mexico City Crossbody', brand: 'Fiesta Leather', category: 'crossbody', country: 'Mexico', price: 480, rating: 4.5, reviews: 67, desc: 'Hand-tooled leather with traditional embroidery and fringe details.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop', badge: 'New', type: 'bag' },
        { id: 'b15', name: 'Edinburgh Tartan Clutch', brand: 'Highland Luxe', category: 'clutch', country: 'United Kingdom', price: 530, rating: 5, reviews: 91, desc: 'Authentic tartan wool with leather trim and brass clasp.', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1972&auto=format&fit=crop', badge: 'Limited', type: 'bag' },
        { id: 'b16', name: 'Zurich Alpine Backpack', brand: 'Alpine Craft', category: 'backpack', country: 'Switzerland', price: 950, rating: 4.5, reviews: 78, desc: 'Waterproof fabric with precision Swiss engineering and ergonomic design.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop', badge: '', type: 'bag' },
        { id: 'g1', name: 'Parisian Morning Set', brand: 'PrimeP Curated', category: 'gift', country: 'France', price: 420, rating: 5, reviews: 234, desc: 'Parisian Bloom perfume, silk scarf, and French lavender sachet.', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd1a?q=80&w=2040&auto=format&fit=crop', badge: 'Best Seller', type: 'gift' },
        { id: 'g2', name: 'Italian Elegance Set', brand: 'PrimeP Curated', category: 'gift', country: 'Italy', price: 560, rating: 4.5, reviews: 156, desc: 'Tuscan Cedar perfume, Italian leather cardholder, Murano glass bottle.', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd1a?q=80&w=2040&auto=format&fit=crop', badge: 'New', type: 'gift' },
        { id: 'g3', name: 'Arabian Treasure Set', brand: 'PrimeP Curated', category: 'gift', country: 'UAE', price: 890, rating: 5, reviews: 312, desc: 'Dubai Oud perfume, gold-dipped bottle, and Arabian silk pouch.', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd1a?q=80&w=2040&auto=format&fit=crop', badge: 'Premium', type: 'gift' },
        { id: 'g4', name: 'Zen Harmony Set', brand: 'PrimeP Curated', category: 'gift', country: 'Japan', price: 380, rating: 5, reviews: 178, desc: 'Kyoto Rain perfume, ceramic diffuser, matcha tea set, silk fan.', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd1a?q=80&w=2040&auto=format&fit=crop', badge: '', type: 'gift' },
        { id: 'g5', name: 'Marrakech Nights Set', brand: 'PrimeP Curated', category: 'gift', country: 'Morocco', price: 520, rating: 4.5, reviews: 89, desc: 'Marrakech Jasmine perfume, brass tea set, and handwoven textile.', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd1a?q=80&w=2040&auto=format&fit=crop', badge: 'Limited', type: 'gift' },
        { id: 'g6', name: 'Royal Spice Set', brand: 'PrimeP Curated', category: 'gift', country: 'India', price: 460, rating: 5, reviews: 145, desc: 'Mumbai Spice perfume, pashmina shawl, and carved sandalwood box.', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd1a?q=80&w=2040&auto=format&fit=crop', badge: '', type: 'gift' }
    ];

    function hideLoadingScreen() {
        if (!loadingScreen) return;

        body.classList.remove('loading');
        loadingScreen.classList.add('hidden');

        window.setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 600);
    }

    document.addEventListener('DOMContentLoaded', function() {
        window.addEventListener('load', hideLoadingScreen, { once: true });
        window.setTimeout(hideLoadingScreen, 1800);
    });

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        if (scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        isScrolling = true;
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 150);
        lastScrollTop = scrollY;
    });

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.querySelectorAll('.dropdown > .nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });

    searchToggle.addEventListener('click', function() {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchClose.addEventListener('click', function() {
        searchBar.classList.remove('active');
        searchResults.classList.remove('active');
        searchInput.value = '';
    });

    document.addEventListener('click', function(e) {
        if (!searchToggle.contains(e.target) && !searchBar.contains(e.target)) {
            searchBar.classList.remove('active');
            searchResults.classList.remove('active');
        }
    });

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        const results = PRODUCTS_DB.filter(function(p) {
            return p.name.toLowerCase().includes(query) ||
                   p.brand.toLowerCase().includes(query) ||
                   p.desc.toLowerCase().includes(query) ||
                   p.country.toLowerCase().includes(query) ||
                   p.category.toLowerCase().includes(query);
        });
        if (results.length > 0) {
            searchResults.innerHTML = results.map(function(item) {
                return '<div class="search-result-item" data-id="' + item.id + '">' +
                    '<img src="' + item.image + '" alt="' + item.name + '">' +
                    '<div class="search-result-info">' +
                    '<span class="search-result-brand">' + item.brand + '</span>' +
                    '<span class="search-result-name">' + item.name + '</span>' +
                    '<span class="search-result-price">$' + item.price + '</span>' +
                    '</div>' +
                    '</div>';
            }).join('');
            searchResults.classList.add('active');
            searchResults.querySelectorAll('.search-result-item').forEach(function(item) {
                item.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const product = PRODUCTS_DB.find(function(p) { return p.id === id; });
                    if (product) {
                        const card = document.querySelector('.btn-add-cart[data-id="' + id + '"]');
                        if (card) {
                            card.closest('.product-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            card.closest('.product-card')?.classList.add('highlight');
                            setTimeout(function() {
                                card.closest('.product-card')?.classList.remove('highlight');
                            }, 2000);
                        } else {
                            openModalById(id);
                        }
                    }
                    searchBar.classList.remove('active');
                    searchResults.classList.remove('active');
                    searchInput.value = '';
                });
            });
        } else {
            searchResults.innerHTML = '<div class="search-no-results">No products found matching "<strong>' + query + '</strong>". Try a different search term.</div>';
            searchResults.classList.add('active');
        }
    });

    let currentTheme = localStorage.getItem('primep_theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('primep_theme', 'light');
            showToast('Light mode activated', 'info');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('primep_theme', 'dark');
            showToast('Dark mode activated', 'info');
        }
    });

    function updateCartUI() {
        cartCount.textContent = cart.length;
        if (cart.length > 0) {
            cartCount.classList.add('show');
        } else {
            cartCount.classList.remove('show');
        }
        renderCartItems();
        updateCartTotals();
        localStorage.setItem('primep_cart', JSON.stringify(cart));
    }

    function renderCartItems() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="cart-empty">' +
                '<i class="fas fa-shopping-bag"></i>' +
                '<p>Your bag is empty</p>' +
                '<span>Discover our collections and add items you love.</span>' +
                '<a href="#collections" class="btn btn-primary">Shop Now</a>' +
                '</div>';
            return;
        }
        cartItems.innerHTML = cart.map(function(item, index) {
            return '<div class="cart-item" data-index="' + index + '">' +
                '<img src="' + item.image + '" alt="' + item.name + '" class="cart-item-img">' +
                '<div class="cart-item-info">' +
                '<h4 class="cart-item-name">' + item.name + '</h4>' +
                '<div class="cart-item-price">$' + item.price.toLocaleString() + '</div>' +
                '<div class="cart-item-bottom">' +
                '<div class="cart-item-qty">' +
                '<button class="cart-qty-minus" data-index="' + index + '"><i class="fas fa-minus"></i></button>' +
                '<span>' + item.quantity + '</span>' +
                '<button class="cart-qty-plus" data-index="' + index + '"><i class="fas fa-plus"></i></button>' +
                '</div>' +
                '<button class="cart-item-remove" data-index="' + index + '">Remove</button>' +
                '</div>' +
                '</div>' +
                '</div>';
        }).join('');
        document.querySelectorAll('.cart-qty-minus').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                    showToast('Item removed from bag', 'info');
                }
                updateCartUI();
            });
        });
        document.querySelectorAll('.cart-qty-plus').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity < 10) {
                    cart[index].quantity++;
                    updateCartUI();
                } else {
                    showToast('Maximum 10 items per product', 'error');
                }
            });
        });
        document.querySelectorAll('.cart-item-remove').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const name = cart[index].name;
                cart.splice(index, 1);
                updateCartUI();
                showToast(name + ' removed from bag', 'info');
            });
        });
    }

    function updateCartTotals() {
        let subtotal = 0;
        cart.forEach(function(item) {
            subtotal += item.price * item.quantity;
        });
        const discount = subtotal * couponDiscount;
        const total = subtotal - discount;
        cartSubtotal.textContent = '$' + subtotal.toLocaleString();
        if (couponDiscount > 0) {
            if (!document.querySelector('.cart-discount')) {
                const discountRow = document.createElement('div');
                discountRow.className = 'cart-discount';
                discountRow.innerHTML = '<span>Discount (' + Math.round(couponDiscount * 100) + '%)</span><span>-$' + Math.round(discount).toLocaleString() + '</span>';
                const subtotalRow = document.querySelector('.cart-subtotal');
                if (subtotalRow && subtotalRow.parentNode) {
                    subtotalRow.parentNode.insertBefore(discountRow, subtotalRow.nextSibling);
                }
            } else {
                document.querySelector('.cart-discount span:last-child').textContent = '-$' + Math.round(discount).toLocaleString();
            }
        } else {
            const discountRow = document.querySelector('.cart-discount');
            if (discountRow) discountRow.remove();
        }
        cartTotal.textContent = '$' + Math.round(total).toLocaleString();
        if (total >= 200) {
            cartShipping.textContent = 'Free';
            cartShipping.style.color = '#2ecc71';
        } else {
            cartShipping.textContent = 'Calculated at checkout';
            cartShipping.style.color = '';
        }
    }

    function addToCart(id, name, price, image, quantity) {
        qty = quantity || 1;
        const existingIndex = cart.findIndex(function(item) { return item.id === id; });
        if (existingIndex > -1) {
            const newQty = cart[existingIndex].quantity + qty;
            if (newQty <= 10) {
                cart[existingIndex].quantity = newQty;
                showToast(name + ' quantity updated in bag (' + cart[existingIndex].quantity + ')', 'success');
            } else {
                showToast('Maximum 10 items per product reached', 'error');
                return;
            }
        } else {
            cart.push({ id: id, name: name, price: parseFloat(price), image: image, quantity: qty });
            showToast(name + ' added to bag', 'success');
        }
        updateCartUI();
        animateCartIcon();
    }

    function animateCartIcon() {
        cartToggle.style.transform = 'scale(1.2)';
        setTimeout(function() {
            cartToggle.style.transform = '';
        }, 300);
    }

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast ' + (type || 'info');
        const iconMap = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
        toast.innerHTML = '<i class="fas ' + (iconMap[type] || iconMap.info) + '"></i><span>' + message + '</span>';
        toastContainer.appendChild(toast);
        setTimeout(function() {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(20px)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(function() {
                    if (toast.parentNode) toast.remove();
                }, 300);
            }
        }, 3500);
    }

    document.querySelectorAll('.btn-add-cart').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            addToCart(id, name, price, image);
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.background = 'linear-gradient(135deg, #c9a96e, #dfc08a)';
            this.style.color = '#000';
            this.style.borderColor = 'transparent';
            setTimeout(function() {
                btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Add';
                btn.style.background = '';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        });
    });

    cartToggle.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        body.style.overflow = 'hidden';
    });

    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        body.style.overflow = '';
    }

    document.querySelector('.checkout-btn')?.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Your bag is empty', 'error');
            return;
        }
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;
        setTimeout(function() {
            closeCart();
            showToast('Order placed successfully! Thank you for shopping with PrimeP. A confirmation has been sent to your email.', 'success');
            cart = [];
            updateCartUI();
            const checkoutBtn = document.querySelector('.checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.innerHTML = 'Proceed to Checkout <i class="fas fa-arrow-right"></i>';
                checkoutBtn.disabled = false;
            }
        }, 2500);
    });

    document.querySelectorAll('.quick-view').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            openModalById(id);
        });
    });

    function openModalById(id) {
        const product = PRODUCTS_DB.find(function(p) { return p.id === id; });
        if (!product) return;
        const starsHtml = generateStars(product.rating);
        const countryIcon = '<i class="fas fa-map-marker-alt"></i> ' + product.country;
        document.getElementById('modalImg').src = product.image;
        document.getElementById('modalImg').alt = product.name;
        document.getElementById('modalBrand').textContent = product.brand;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalRating').innerHTML = starsHtml + '<span> (' + product.reviews + ' reviews)</span>';
        document.getElementById('modalPrice').textContent = '$' + product.price;
        document.getElementById('modalDesc').textContent = product.desc;
        document.getElementById('modalCountry').innerHTML = countryIcon;
        document.getElementById('modalAddBtn').setAttribute('data-id', product.id);
        document.getElementById('modalAddBtn').setAttribute('data-name', product.name);
        document.getElementById('modalAddBtn').setAttribute('data-price', product.price.toString());
        document.getElementById('modalAddBtn').setAttribute('data-image', product.image);
        document.getElementById('qtyInput').value = 1;
        modalOverlay.classList.add('active');
        productModal.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function generateStars(rating) {
        let html = '';
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        for (let i = 0; i < full; i++) {
            html += '<i class="fas fa-star"></i>';
        }
        if (half) {
            html += '<i class="fas fa-star-half-alt"></i>';
        }
        const empty = 5 - full - (half ? 1 : 0);
        for (let i = 0; i < empty; i++) {
            html += '<i class="far fa-star"></i>';
        }
        return html;
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    function closeModal() {
        modalOverlay.classList.remove('active');
        productModal.classList.remove('active');
        body.style.overflow = '';
    }

    document.getElementById('qtyPlus')?.addEventListener('click', function() {
        const input = document.getElementById('qtyInput');
        let val = parseInt(input.value) || 1;
        if (val < 10) {
            input.value = val + 1;
        } else {
            showToast('Maximum 10 items', 'error');
        }
    });

    document.getElementById('qtyMinus')?.addEventListener('click', function() {
        const input = document.getElementById('qtyInput');
        let val = parseInt(input.value) || 1;
        if (val > 1) {
            input.value = val - 1;
        }
    });

    document.getElementById('qtyInput')?.addEventListener('change', function() {
        let val = parseInt(this.value) || 1;
        if (val < 1) val = 1;
        if (val > 10) val = 10;
        this.value = val;
    });

    document.getElementById('modalAddBtn')?.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        const image = this.getAttribute('data-image');
        const qty = parseInt(document.getElementById('qtyInput').value) || 1;
        addToCart(id, name, price, image, qty);
        closeModal();
    });

    document.querySelectorAll('.add-wishlist').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            const heart = this.querySelector('i');
            const index = wishlist.indexOf(id);
            if (index > -1) {
                wishlist.splice(index, 1);
                heart.classList.remove('fas');
                heart.classList.add('far');
                heart.style.color = '';
                showToast('Removed from wishlist', 'info');
            } else {
                wishlist.push(id);
                heart.classList.remove('far');
                heart.classList.add('fas');
                heart.style.color = '#e74c3c';
                showToast('Added to wishlist', 'success');
            }
            localStorage.setItem('primep_wishlist', JSON.stringify(wishlist));
        });
    });

    document.querySelectorAll('.wishlist-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (wishlist.length === 0) {
                showToast('Your wishlist is empty', 'info');
                return;
            }
            showToast('Showing ' + wishlist.length + ' items in your wishlist', 'info');
        });
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(function(el) {
        revealObserver.observe(el);
    });

    function animateCounters() {
        document.querySelectorAll('.stat-number[data-count]').forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            if (isNaN(target) || target === 0) return;
            const duration = 2000;
            const start = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                counter.textContent = current.toLocaleString();
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
            requestAnimationFrame(update);
        });
    }

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    const testimonials = testimonialTrack?.querySelectorAll('.testimonial-card');
    testimonialCount = testimonials ? testimonials.length : 0;

    if (testimonialCount > 0) {
        for (let i = 0; i < testimonialCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function() {
                goToTestimonial(parseInt(this.getAttribute('data-index')));
                clearInterval(testimonialInterval);
                startTestimonialAutoPlay();
            });
            testDots.appendChild(dot);
        }

        function goToTestimonial(index) {
            currentTestimonial = index;
            testimonialTrack.style.transform = 'translateX(-' + (index * 100) + '%)';
            document.querySelectorAll('.testimonial-dot').forEach(function(d, i) {
                d.classList.toggle('active', i === index);
            });
        }

        function startTestimonialAutoPlay() {
            testimonialInterval = setInterval(function() {
                const next = (currentTestimonial + 1) % testimonialCount;
                goToTestimonial(next);
            }, 5000);
        }

        testPrev?.addEventListener('click', function() {
            const prev = (currentTestimonial - 1 + testimonialCount) % testimonialCount;
            goToTestimonial(prev);
            clearInterval(testimonialInterval);
            startTestimonialAutoPlay();
        });

        testNext?.addEventListener('click', function() {
            const next = (currentTestimonial + 1) % testimonialCount;
            goToTestimonial(next);
            clearInterval(testimonialInterval);
            startTestimonialAutoPlay();
        });

        document.querySelector('.testimonial-slider')?.addEventListener('touchstart', function(e) {
            const startX = e.touches[0].clientX;
            function onTouchEnd(endE) {
                const endX = endE.changedTouches[0].clientX;
                const diff = startX - endX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        const next = (currentTestimonial + 1) % testimonialCount;
                        goToTestimonial(next);
                    } else {
                        const prev = (currentTestimonial - 1 + testimonialCount) % testimonialCount;
                        goToTestimonial(prev);
                    }
                    clearInterval(testimonialInterval);
                    startTestimonialAutoPlay();
                }
                document.removeEventListener('touchend', onTouchEnd);
            }
            document.addEventListener('touchend', onTouchEnd);
        });

        startTestimonialAutoPlay();
    }

    document.querySelectorAll('.filter-bar').forEach(function(bar) {
        const section = bar.closest('.section');
        const grid = section ? section.querySelector('.products-grid') : null;
        if (!grid) return;
        const buttons = bar.querySelectorAll('.filter-btn');
        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                buttons.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                grid.querySelectorAll('.product-card').forEach(function(card) {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = '';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(function() {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'all 0.4s ease';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        card.style.transition = 'all 0.3s ease';
                        setTimeout(function() {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                const count = grid.querySelectorAll('.product-card[style*="display: none"]').length;
                const total = grid.querySelectorAll('.product-card').length;
                showToast('Showing ' + (total - count) + ' of ' + total + ' ' + filter + ' products', 'info');
            });
        });
    });

    document.querySelectorAll('.faq-question').forEach(function(question) {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            item.closest('.faq-grid')?.querySelectorAll('.faq-item.active').forEach(function(el) {
                el.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    function startCountdown(targetDate) {
        function update() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance <= 0) {
                countdownElements.days.textContent = '00';
                countdownElements.hours.textContent = '00';
                countdownElements.minutes.textContent = '00';
                countdownElements.seconds.textContent = '00';

                const timerLabel = document.querySelector('.limited-timer .timer-label');
                if (timerLabel) {
                    timerLabel.textContent = 'Sale Ended';
                }
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdownElements.days.textContent = String(days).padStart(2, '0');
            countdownElements.hours.textContent = String(hours).padStart(2, '0');
            countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
            countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
        }
        update();
        setInterval(update, 1000);
    }

    const countdownSection = document.getElementById('countdown');
    if (countdownSection) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 12);
        targetDate.setHours(23, 59, 59, 0);
        startCountdown(targetDate.getTime());
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value.trim();
            if (!email || !validateEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                document.getElementById('newsletterEmail').focus();
                return;
            }
            const btn = this.querySelector('.btn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            btn.disabled = true;
            setTimeout(function() {
                btn.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
                btn.disabled = false;
                newsletterForm.style.display = 'none';
                newsletterSuccess.classList.add('active');
                showToast('Welcome to the PrimeP Circle! Check your inbox for 10% off.', 'success');
            }, 1500);
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            if (!name) {
                showToast('Please enter your name', 'error');
                document.getElementById('contactName').focus();
                return;
            }
            if (!email) {
                showToast('Please enter your email', 'error');
                document.getElementById('contactEmail').focus();
                return;
            }
            if (!validateEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                document.getElementById('contactEmail').focus();
                return;
            }
            if (!message) {
                showToast('Please enter your message', 'error');
                document.getElementById('contactMessage').focus();
                return;
            }
            if (message.length < 10) {
                showToast('Message must be at least 10 characters', 'error');
                return;
            }
            const btn = this.querySelector('.submit-btn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            setTimeout(function() {
                btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                btn.disabled = false;
                showToast('Thank you, ' + name + '! We will get back to you within 24 hours.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        if (parallaxElements.length === 0) return;
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollY = window.scrollY;
                    parallaxElements.forEach(function(el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
                            const speed = 0.2;
                            const yPos = (scrollY * speed);
                            el.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
                        }
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    initParallax();

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (productModal.classList.contains('active')) {
                closeModal();
            }
            if (cartSidebar.classList.contains('active')) {
                closeCart();
            }
            if (searchBar.classList.contains('active')) {
                searchBar.classList.remove('active');
                searchResults.classList.remove('active');
                searchInput.value = '';
            }
        }
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            const tag = e.target.tagName;
            if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
                e.preventDefault();
                searchBar.classList.add('active');
                searchInput.focus();
            }
        }
    });

    document.querySelectorAll('.gallery-item').forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const label = this.querySelector('.gallery-overlay span')?.textContent || 'Gallery Image';
            if (img) {
                showToast('Viewing: ' + label, 'info');
            }
        });
    });

    document.querySelectorAll('.partner-item').forEach(function(item) {
        item.addEventListener('click', function() {
            showToast('Partner brand details coming soon', 'info');
        });
    });

    document.querySelectorAll('.insta-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Follow us @primep for daily inspiration and behind-the-scenes content', 'info');
        });
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    document.querySelectorAll('.product-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn-add-cart') || e.target.closest('.quick-view') || e.target.closest('.add-wishlist')) {
                return;
            }
            const quickViewBtn = this.querySelector('.quick-view');
            if (quickViewBtn) {
                quickViewBtn.click();
            }
        });
    });

    function initMouseParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        hero.addEventListener('mousemove', function(e) {
            const bg = this.querySelector('.hero-bg');
            if (!bg) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 8;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;
            bg.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(1.08)';
        });
        hero.addEventListener('mouseleave', function() {
            const bg = this.querySelector('.hero-bg');
            if (bg) {
                bg.style.transform = 'scale(1.08)';
                bg.style.transition = 'transform 0.8s ease';
                setTimeout(function() {
                    if (bg) bg.style.transition = '';
                }, 800);
            }
        });
    }
    initMouseParallax();

    function initNavScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        if (sections.length === 0 || navLinks.length === 0) return;
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollY = window.scrollY + 120;
                    let current = '';
                    sections.forEach(function(section) {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;
                        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                            current = section.getAttribute('id');
                        }
                    });
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                        const href = link.getAttribute('href')?.replace('#', '');
                        if (href === current) {
                            link.classList.add('active');
                        }
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    initNavScrollSpy();

    document.querySelectorAll('.category-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.closest('.category-card')?.getAttribute('data-category');
            let sectionId = 'perfumes';
            if (targetId === 'bag') sectionId = 'bags';
            else if (targetId === 'gifts') sectionId = 'gifts';
            else if (targetId === 'limited') sectionId = 'limited';
            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    document.querySelectorAll('.global-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const country = this.querySelector('h3')?.textContent || '';
            const specialty = this.querySelector('.global-specialty')?.textContent || '';
            showToast('Explore ' + country + ' - ' + specialty, 'info');
        });
    });

    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('loading' in HTMLImageElement.prototype) return;
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) img.src = src;
                    lazyObserver.unobserve(img);
                }
            });
        });
        images.forEach(function(img) {
            lazyObserver.observe(img);
        });
    }
    initLazyLoading();

    document.querySelectorAll('.nav-icon-btn').forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    document.querySelectorAll('.btn').forEach(function(btn) {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.97)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    const announcementBar = document.querySelector('.announcement-bar');
    if (announcementBar) {
        announcementBar.addEventListener('mouseenter', function() {
            this.querySelectorAll('.announcement-content').forEach(function(el) {
                el.style.animationPlayState = 'paused';
            });
        });
        announcementBar.addEventListener('mouseleave', function() {
            this.querySelectorAll('.announcement-content').forEach(function(el) {
                el.style.animationPlayState = 'running';
            });
        });
    }

    document.querySelectorAll('.service-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.service-link')) return;
            const serviceName = this.querySelector('h3')?.textContent || '';
            showToast('Learn more about ' + serviceName, 'info');
        });
    });

    document.querySelectorAll('.team-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.team-social')) return;
            const name = this.querySelector('h4')?.textContent || '';
            const role = this.querySelector('.team-role')?.textContent || '';
            showToast(name + ' - ' + role, 'info');
        });
    });

    document.querySelectorAll('.award-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const award = this.querySelector('h3')?.textContent || '';
            showToast(award + ' - Click for details', 'info');
        });
    });

    document.querySelectorAll('.value-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const value = this.querySelector('h3')?.textContent || '';
            showToast('PrimeP values: ' + value, 'info');
        });
    });

    document.querySelectorAll('.limited-card .btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const name = this.closest('.limited-info')?.querySelector('h3, h4')?.textContent || 'Limited Edition';
            showToast(name + ' - Pre-order secured!', 'success');
        });
    });

    document.querySelectorAll('.press-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const publication = this.querySelector('.press-logo span')?.textContent || '';
            showToast('Read full article in ' + publication, 'info');
        });
    });

    document.querySelectorAll('.sourcing-stat').forEach(function(stat) {
        stat.addEventListener('click', function() {
            const number = this.querySelector('.sourcing-number')?.textContent || '';
            const label = this.querySelector('.sourcing-label')?.textContent || '';
            showToast(number + ' ' + label, 'info');
        });
    });

    document.querySelectorAll('.sustain-stat').forEach(function(stat) {
        stat.addEventListener('click', function() {
            const number = this.querySelector('.sustain-number')?.textContent || '';
            const label = this.querySelector('.sustain-label')?.textContent || '';
            showToast('Our commitment: ' + number + ' ' + label, 'info');
        });
    });

    document.querySelectorAll('.blog-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.blog-link')) return;
            const title = this.querySelector('h3')?.textContent || '';
            showToast('Reading: ' + title, 'info');
        });
    });

    document.querySelectorAll('.app-badge').forEach(function(badge) {
        badge.addEventListener('click', function(e) {
            e.preventDefault();
            const store = this.querySelector('span')?.textContent || 'App Store';
            showToast('PrimeP app coming soon to ' + store + '!', 'info');
        });
    });

    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    viewAllBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('.section');
            const grid = section?.querySelector('.products-grid');
            if (grid) {
                const hidden = grid.querySelectorAll('.product-card[style*="display: none"]');
                if (hidden.length > 0) {
                    hidden.forEach(function(card) { card.style.display = ''; card.style.opacity = '1'; card.style.transform = ''; });
                    this.textContent = 'Show Less';
                } else {
                    const cards = grid.querySelectorAll('.product-card');
                    if (cards.length > 8) {
                        for (let i = 8; i < cards.length; i++) {
                            cards[i].style.display = 'none';
                        }
                        this.innerHTML = 'View All <i class="fas fa-arrow-right"></i>';
                    }
                }
            }
        });
    });

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = 'Come back to PrimeP ✨';
        } else {
            document.title = 'PrimeP - Premium Perfume & Bag Collection';
        }
    });

    window.addEventListener('beforeunload', function() {
        localStorage.setItem('primep_cart', JSON.stringify(cart));
        localStorage.setItem('primep_wishlist', JSON.stringify(wishlist));
    });

    function initRippleEffect() {
        document.querySelectorAll('.btn-primary').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                ripple.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;background:rgba(255,255,255,0.3);border-radius:50%;transform:scale(0);animation:rippleAnim 0.6s ease-out;pointer-events:none;';
                this.appendChild(ripple);
                setTimeout(function() { ripple.remove(); }, 600);
            });
        });
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = '@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }';
        document.head.appendChild(rippleStyle);
    }
    initRippleEffect();

    function initProductCounts() {
        document.querySelectorAll('.products-grid').forEach(function(grid) {
            const count = grid.querySelectorAll('.product-card').length;
            const parent = grid.closest('.section');
            if (parent) {
                const countBadge = document.createElement('div');
                countBadge.className = 'product-count-badge';
                countBadge.textContent = count + ' Products';
                countBadge.style.cssText = 'text-align:center;font-size:0.8rem;color:var(--text-muted);letter-spacing:1px;margin-top:-20px;margin-bottom:20px;';
                const header = parent.querySelector('.section-header');
                if (header) {
                    header.appendChild(countBadge);
                }
            }
        });
    }
    initProductCounts();

    function initViewCounters() {
        document.querySelectorAll('.stat-number[data-count]').forEach(function(counter) {
            const stored = localStorage.getItem('primep_view_' + (counter.getAttribute('data-count') || '0'));
            if (stored) {
                counter.textContent = stored;
            }
        });
    }
    initViewCounters();

    function initPriceFormatting() {
        document.querySelectorAll('.product-price').forEach(function(el) {
            let text = el.textContent;
            text = text.replace(/[^0-9.,]/g, '');
            if (text) {
                const num = parseFloat(text.replace(/,/g, ''));
                if (!isNaN(num)) {
                    el.textContent = '$' + num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                }
            }
        });
    }
    initPriceFormatting();

    function initHeroAnimation() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        heroContent.querySelectorAll('.hero-subtitle, .hero-title, .hero-desc, .hero-buttons, .hero-stats').forEach(function(el, i) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease ' + (i * 0.2 + 0.3) + 's';
        });
        setTimeout(function() {
            heroContent.querySelectorAll('.hero-subtitle, .hero-title, .hero-desc, .hero-buttons, .hero-stats').forEach(function(el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 500);
    }
    initHeroAnimation();

    function initFeaturedProducts() {
        const bestSellers = PRODUCTS_DB.filter(function(p) { return p.badge === 'Best Seller'; });
        const featuredContainer = document.querySelector('.featured-products-grid');
        if (featuredContainer && bestSellers.length > 0) {
            featuredContainer.innerHTML = bestSellers.slice(0, 4).map(function(p) {
                return '<div class="product-card" data-category="' + p.category + '" data-country="' + p.country + '">' +
                    '<div class="product-img"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
                    '<div class="product-actions"><button class="product-action quick-view" data-id="' + p.id + '"><i class="fas fa-eye"></i></button>' +
                    '<button class="product-action add-wishlist" data-id="' + p.id + '"><i class="far fa-heart"></i></button></div>' +
                    '<div class="product-badge">Best Seller</div>' +
                    '<div class="product-country"><i class="fas fa-map-marker-alt"></i> ' + p.country + '</div></div>' +
                    '<div class="product-info"><span class="product-brand">' + p.brand + '</span>' +
                    '<h3 class="product-name">' + p.name + '</h3>' +
                    '<div class="product-rating">' + generateStars(p.rating) + '<span class="rating-count">(' + p.reviews + ')</span></div>' +
                    '<p class="product-desc">' + p.desc + '</p>' +
                    '<div class="product-bottom"><span class="product-price">$' + p.price + '</span>' +
                    '<button class="btn btn-add-cart" data-id="' + p.id + '" data-name="' + p.name + '" data-price="' + p.price + '" data-image="' + p.image + '"><i class="fas fa-shopping-bag"></i> Add</button></div></div></div>';
            }).join('');
        }
    }
    initFeaturedProducts();

    initProductCounts();
    initPriceFormatting();

    function initCursorGlow() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(201,169,110,0.06),transparent 70%);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:left 0.1s ease,top 0.1s ease;display:none;';
        document.body.appendChild(cursor);
        if (window.innerWidth > 768) {
            cursor.style.display = 'block';
            document.addEventListener('mousemove', function(e) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        }
    }
    initCursorGlow();

    function initSmoothAnchor() {
        document.querySelectorAll('.nav-link[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
    initSmoothAnchor();

    function initPromoCode() {
        const promoInput = document.createElement('div');
        promoInput.className = 'promo-code-input';
        promoInput.style.cssText = 'display:flex;gap:8px;margin-top:12px;';
        promoInput.innerHTML = '<input type="text" id="promoInput" placeholder="Enter coupon code" style="flex:1;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px;background:var(--card-bg);color:var(--text-primary);font-size:0.8rem;"><button id="applyPromo" style="padding:10px 16px;border-radius:6px;background:var(--gold-gradient);color:#000;font-weight:600;font-size:0.78rem;border:none;">Apply</button>';
        const cartFooter = document.querySelector('.cart-footer');
        if (cartFooter) {
            const summary = cartFooter.querySelector('.cart-summary');
            if (summary) {
                summary.after(promoInput);
            }
        }
        document.getElementById('applyPromo')?.addEventListener('click', function() {
            const code = document.getElementById('promoInput').value.trim().toUpperCase();
            const validCodes = { 'PRIME10': 0.1, 'VIP20': 0.2, 'WELCOME15': 0.15, 'LUXURY25': 0.25 };
            if (validCodes[code]) {
                couponDiscount = validCodes[code];
                currentCoupon = code;
                showToast('Coupon "' + code + '" applied! ' + Math.round(couponDiscount * 100) + '% off', 'success');
                updateCartTotals();
            } else {
                couponDiscount = 0;
                currentCoupon = null;
                showToast('Invalid coupon code', 'error');
                updateCartTotals();
            }
        });
    }
    initPromoCode();

    function initNewsletterPlaceholder() {
        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput) {
            const placeholders = ['your@email.com', 'Enter your email for 10% off', 'Join 50,000+ subscribers', 'Get exclusive access'];
            let index = 0;
            setInterval(function() {
                index = (index + 1) % placeholders.length;
                emailInput.setAttribute('placeholder', placeholders[index]);
            }, 4000);
        }
    }
    initNewsletterPlaceholder();

    function initProductImageZoom() {
        document.querySelectorAll('.product-img').forEach(function(container) {
            container.addEventListener('mousemove', function(e) {
                const img = this.querySelector('img');
                if (!img) return;
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                img.style.transformOrigin = (x * 100) + '% ' + (y * 100) + '%';
                img.style.transform = 'scale(1.15)';
            });
            container.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transformOrigin = 'center center';
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }
    initProductImageZoom();

    function initImageGalleryLightbox() {
        document.querySelectorAll('.gallery-item').forEach(function(item) {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (!img) return;
                const lightbox = document.createElement('div');
                lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:5000;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity 0.3s ease;';
                const fullImg = document.createElement('img');
                fullImg.src = img.src;
                fullImg.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain;border-radius:8px;transform:scale(0.9);transition:transform 0.3s ease;';
                lightbox.appendChild(fullImg);
                document.body.appendChild(lightbox);
                requestAnimationFrame(function() {
                    lightbox.style.opacity = '1';
                    fullImg.style.transform = 'scale(1)';
                });
                lightbox.addEventListener('click', function() {
                    lightbox.style.opacity = '0';
                    fullImg.style.transform = 'scale(0.9)';
                    setTimeout(function() { lightbox.remove(); }, 300);
                });
                document.addEventListener('keydown', function handler(e) {
                    if (e.key === 'Escape') {
                        lightbox.style.opacity = '0';
                        fullImg.style.transform = 'scale(0.9)';
                        setTimeout(function() { lightbox.remove(); document.removeEventListener('keydown', handler); }, 300);
                    }
                });
            });
        });
    }
    initImageGalleryLightbox();

    function initMobileMenuSwipe() {
        let startX = 0;
        let startY = 0;
        document.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        document.addEventListener('touchmove', function(e) {
            if (startX > 40) return;
            const diffX = e.touches[0].clientX - startX;
            const diffY = e.touches[0].clientY - startY;
            if (diffX > 50 && Math.abs(diffY) < 100 && window.innerWidth <= 768) {
                navLinks.classList.add('active');
                hamburger.classList.add('active');
            }
        }, { passive: true });
    }
    initMobileMenuSwipe();

    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scrollProgress';
        progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--primary),var(--primary-light));z-index:10001;width:0%;transition:width 0.1s ease;';
        document.body.appendChild(progressBar);
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    initScrollProgress();

    function initTabVisibility() {
        const originalTitle = document.title;
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                document.title = '✨ Come back to PrimeP';
            } else {
                document.title = originalTitle;
                setTimeout(function() {
                    document.title = originalTitle;
                }, 3000);
            }
        });
    }
    initTabVisibility();

    function initPerformanceMonitor() {
        const timing = performance.timing;
        if (timing) {
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            if (loadTime > 0 && loadTime < 30000) {
                console.log('%c⚡ Page loaded in ' + Math.round(loadTime) + 'ms', 'color: #2ecc71; font-size: 11px;');
            }
        }
    }

    if (window.performance) {
        window.addEventListener('load', function() {
            setTimeout(initPerformanceMonitor, 0);
        });
    }

    console.log('%c ██████╗ ██████╗ ██╗███╗   ███╗███████╗██████╗ ', 'color: #c9a96e; font-size: 10px;');
    console.log('%c ██╔══██╗██╔══██╗██║████╗ ████║██╔════╝██╔══██╗', 'color: #c9a96e; font-size: 10px;');
    console.log('%c ██████╔╝██████╔╝██║██╔████╔██║█████╗  ██████╔╝', 'color: #c9a96e; font-size: 10px;');
    console.log('%c ██╔═══╝ ██╔══██╗██║██║╚██╔╝██║██╔══╝  ██╔══██╗', 'color: #c9a96e; font-size: 10px;');
    console.log('%c ██║     ██║  ██║██║██║ ╚═╝ ██║███████╗██║  ██║', 'color: #c9a96e; font-size: 10px;');
    console.log('%c ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝', 'color: #c9a96e; font-size: 10px;');
    console.log('%c 🌍 Premium Perfume & Bag Collection From Around The Globe', 'color: #b8b0a8; font-size: 13px; font-family: Montserrat, sans-serif;');
    console.log('%c ✨ Sourced from 50+ countries | 👜 Curated with passion | ✅ Authenticity guaranteed', 'color: #6b6560; font-size: 11px;');
    console.log('%c 📍 Flagship: 123 Luxury Avenue, New York | 📞 +1 (800) 555-PRIME', 'color: #6b6560; font-size: 11px;');
    console.log('%c 🔥 Tip: Press "/" to search products instantly', 'color: #c9a96e; font-size: 11px;');

    const style = document.createElement('style');
    style.textContent = '.search-result-item{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;transition:background 0.2s ease;border-bottom:1px solid var(--border-color);}.search-result-item:hover{background:var(--bg-light);}.search-result-item img{width:48px;height:48px;object-fit:cover;border-radius:6px;}.search-result-info{display:flex;flex-direction:column;gap:2px;}.search-result-brand{font-size:0.65rem;text-transform:uppercase;letter-spacing:1px;color:var(--primary);}.search-result-name{font-size:0.85rem;color:var(--text-primary);font-weight:500;}.search-result-price{font-size:0.8rem;color:var(--primary);font-family:var(--font-display);font-weight:600;}.search-no-results{padding:24px 16px;text-align:center;color:var(--text-muted);font-size:0.85rem;}.highlight{animation:highlightPulse 2s ease;}.cart-discount{display:flex;justify-content:space-between;font-size:0.9rem;color:var(--primary);font-weight:500;}@keyframes highlightPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,0);}50%{box-shadow:0 0 0 8px rgba(201,169,110,0.3);}}.product-count-badge{font-family:var(--font-alt);letter-spacing:2px;}.light-theme .search-result-item{border-bottom-color:#ddd5c8;}.light-theme .search-result-item:hover{background:#ede8e0;}';
    document.head.appendChild(style);

    updateCartUI();

    initFeaturedProducts();

    document.querySelectorAll('.add-wishlist').forEach(function(btn) {
        const id = btn.getAttribute('data-id');
        if (wishlist.indexOf(id) > -1) {
            const heart = btn.querySelector('i');
            heart.classList.remove('far');
            heart.classList.add('fas');
            heart.style.color = '#e74c3c';
        }
    });

    function initStockIndicators() {
        document.querySelectorAll('.product-card').forEach(function(card, index) {
            const stock = document.createElement('div');
            stock.className = 'stock-indicator';
            const inStock = (index % 5 !== 4);
            stock.innerHTML = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:' + (inStock ? '#2ecc71' : '#e74c3c') + ';margin-right:6px;"></span>' +
                (inStock ? 'In Stock' : 'Low Stock');
            stock.style.cssText = 'font-size:0.65rem;color:var(--text-muted);display:flex;align-items:center;margin-top:4px;';
            const desc = card.querySelector('.product-desc');
            if (desc) {
                desc.after(stock);
            }
        });
    }
    initStockIndicators();

    function initPaymentMethods() {
        const methods = ['visa', 'mastercard', 'amex', 'discover', 'paypal', 'apple-pay', 'google-pay', 'klarna', 'affirm', 'afterpay'];
        const container = document.querySelector('.footer-payments');
        if (container) {
            methods.forEach(function(m) {
                const icon = document.createElement('i');
                icon.className = 'fab fa-cc-' + m;
                if (m === 'google-pay') { icon.className = 'fab fa-google-pay'; }
                if (m === 'klarna' || m === 'affirm' || m === 'afterpay') {
                    icon.className = 'fas fa-credit-card';
                    icon.title = m.charAt(0).toUpperCase() + m.slice(1);
                }
                container.appendChild(icon);
            });
        }
    }
    initPaymentMethods();

    function initDeviceDetection() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        const isDesktop = window.innerWidth > 1024;
        if (isMobile) {
            document.querySelectorAll('.product-card .product-actions').forEach(function(el) {
                el.style.opacity = '1';
                el.style.transform = 'translateX(0)';
            });
            document.querySelectorAll('.global-card .global-card-overlay').forEach(function(el) {
                el.style.background = 'linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.5) 50%, rgba(10, 10, 15, 0.3) 100%)';
            });
        }
    }
    initDeviceDetection();

    function initLoadingAnimation() {
        const logo = document.querySelector('.loader-logo');
        if (logo) {
            const chars = logo.textContent.split('');
            logo.innerHTML = chars.map(function(c, i) {
                return '<span style="display:inline-block;animation:letterPulse 1.5s ease-in-out ' + (i * 0.15) + 's infinite">' + c + '</span>';
            }).join('');
            const pulseStyle = document.createElement('style');
            pulseStyle.textContent = '@keyframes letterPulse{0%,100%{opacity:0.6;}50%{opacity:1;}}';
            document.head.appendChild(pulseStyle);
        }
    }
    initLoadingAnimation();

    console.log('%c🚀 PrimeP v1.0 | Built with passion | ' + new Date().getFullYear(), 'color: #6b6560; font-size: 10px;');

    function initQuickViewKeyboard() {
        document.addEventListener('keydown', function(e) {
            if (productModal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    const currentId = document.getElementById('modalAddBtn').getAttribute('data-id');
                    const currentIndex = PRODUCTS_DB.findIndex(function(p) { return p.id === currentId; });
                    if (currentIndex > 0) {
                        openModalById(PRODUCTS_DB[currentIndex - 1].id);
                    } else {
                        openModalById(PRODUCTS_DB[PRODUCTS_DB.length - 1].id);
                    }
                    e.preventDefault();
                }
                if (e.key === 'ArrowRight') {
                    const currentId = document.getElementById('modalAddBtn').getAttribute('data-id');
                    const currentIndex = PRODUCTS_DB.findIndex(function(p) { return p.id === currentId; });
                    if (currentIndex < PRODUCTS_DB.length - 1) {
                        openModalById(PRODUCTS_DB[currentIndex + 1].id);
                    } else {
                        openModalById(PRODUCTS_DB[0].id);
                    }
                    e.preventDefault();
                }
            }
        });
    }
    initQuickViewKeyboard();

    function initSocialShare() {
        document.querySelectorAll('.product-card').forEach(function(card) {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'product-action share-product';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
            shareBtn.setAttribute('aria-label', 'Share');
            shareBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const name = card.querySelector('.product-name')?.textContent || 'PrimeP Product';
                const url = window.location.href + '?product=' + encodeURIComponent(name);
                if (navigator.share) {
                    navigator.share({ title: name, url: url }).catch(function() {});
                } else {
                    navigator.clipboard.writeText(url).then(function() {
                        showToast('Product link copied to clipboard!', 'success');
                    }).catch(function() {
                        showToast('Share: ' + name, 'info');
                    });
                }
            });
            const actions = card.querySelector('.product-actions');
            if (actions) {
                actions.appendChild(shareBtn);
            }
        });
    }
    initSocialShare();

    function initProductCompare() {
        let compareList = JSON.parse(localStorage.getItem('primep_compare')) || [];
        document.querySelectorAll('.product-card').forEach(function(card) {
            const compareBtn = document.createElement('button');
            compareBtn.className = 'product-action compare-product';
            compareBtn.innerHTML = '<i class="fas fa-balance-scale"></i>';
            compareBtn.setAttribute('aria-label', 'Compare');
            compareBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const id = card.querySelector('.btn-add-cart')?.getAttribute('data-id');
                if (!id) return;
                const index = compareList.indexOf(id);
                if (index > -1) {
                    compareList.splice(index, 1);
                    this.style.color = '';
                    showToast('Removed from compare', 'info');
                } else {
                    if (compareList.length >= 4) {
                        showToast('Maximum 4 products for comparison', 'error');
                        return;
                    }
                    compareList.push(id);
                    this.style.color = '#c9a96e';
                    showToast('Added to compare (' + compareList.length + '/4)', 'success');
                }
                localStorage.setItem('primep_compare', JSON.stringify(compareList));
            });
            const actions = card.querySelector('.product-actions');
            if (actions) {
                actions.appendChild(compareBtn);
            }
        });
        const compareBar = document.createElement('div');
        compareBar.id = 'compareBar';
        compareBar.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:var(--bg-dark-alt);border-top:1px solid var(--border-color);padding:12px 24px;z-index:500;display:none;align-items:center;justify-content:space-between;transform:translateY(100%);transition:transform 0.3s ease;';
        compareBar.innerHTML = '<span id="compareCount" style="font-size:0.85rem;color:var(--text-secondary);">0 products selected</span>' +
            '<div style="display:flex;gap:12px;">' +
            '<button id="compareClear" style="padding:8px 16px;border-radius:6px;border:1px solid var(--border-color);color:var(--text-secondary);font-size:0.78rem;">Clear</button>' +
            '<button id="compareNow" style="padding:8px 20px;border-radius:6px;background:var(--gold-gradient);color:#000;font-size:0.78rem;font-weight:600;">Compare</button></div>';
        document.body.appendChild(compareBar);
        function updateCompareBar() {
            const bar = document.getElementById('compareBar');
            const count = document.getElementById('compareCount');
            if (!bar || !count) return;
            if (compareList.length > 0) {
                bar.style.display = 'flex';
                setTimeout(function() { bar.style.transform = 'translateY(0)'; }, 50);
                count.textContent = compareList.length + ' product' + (compareList.length > 1 ? 's' : '') + ' selected';
            } else {
                bar.style.transform = 'translateY(100%)';
                setTimeout(function() { bar.style.display = 'none'; }, 300);
            }
        }
        document.getElementById('compareClear')?.addEventListener('click', function() {
            compareList = [];
            localStorage.setItem('primep_compare', JSON.stringify(compareList));
            document.querySelectorAll('.compare-product').forEach(function(btn) { btn.style.color = ''; });
            updateCompareBar();
            showToast('Compare list cleared', 'info');
        });
        document.getElementById('compareNow')?.addEventListener('click', function() {
            if (compareList.length < 2) {
                showToast('Select at least 2 products to compare', 'error');
                return;
            }
            const products = compareList.map(function(id) { return PRODUCTS_DB.find(function(p) { return p.id === id; }); }).filter(Boolean);
            let compareHtml = '<div style="display:grid;grid-template-columns:repeat(' + products.length + ',1fr);gap:16px;padding:20px;">';
            products.forEach(function(p) {
                compareHtml += '<div style="text-align:center;"><img src="' + p.image + '" style="width:100%;height:150px;object-fit:cover;border-radius:8px;margin-bottom:12px;">' +
                    '<h4 style="font-family:var(--font-display);font-size:0.95rem;color:var(--text-primary);margin-bottom:4px;">' + p.name + '</h4>' +
                    '<p style="font-size:0.75rem;color:var(--primary);margin-bottom:4px;">$' + p.price + '</p>' +
                    '<p style="font-size:0.72rem;color:var(--text-secondary);">' + p.brand + '</p>' +
                    '<p style="font-size:0.72rem;color:var(--text-muted);">' + p.country + '</p>' +
                    '<p style="font-size:0.72rem;color:var(--text-muted);">' + p.category + '</p>' +
                    '<div style="margin-top:8px;">' + generateStars(p.rating) + '</div>' +
                    '<p style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">' + p.reviews + ' reviews</p></div>';
            });
            compareHtml += '</div>';
            const compareModal = document.createElement('div');
            compareModal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:6000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;';
            const compareContent = document.createElement('div');
            compareContent.style.cssText = 'background:var(--bg-dark-alt);border-radius:16px;max-width:900px;width:90%;max-height:80vh;overflow-y:auto;position:relative;border:1px solid var(--border-color);';
            compareContent.innerHTML = '<button class="compare-modal-close" style="position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;background:var(--bg-light);display:flex;align-items:center;justify-content:center;color:var(--text-secondary);font-size:1.1rem;z-index:5;"><i class="fas fa-times"></i></button>' +
                '<div style="padding:24px 24px 16px;border-bottom:1px solid var(--border-color);"><h3 style="font-family:var(--font-display);font-size:1.3rem;">Product Comparison</h3></div>' +
                compareHtml;
            compareModal.appendChild(compareContent);
            document.body.appendChild(compareModal);
            requestAnimationFrame(function() { compareModal.style.opacity = '1'; });
            compareModal.addEventListener('click', function(e) {
                if (e.target === compareModal || e.target.closest('.compare-modal-close')) {
                    compareModal.style.opacity = '0';
                    setTimeout(function() { compareModal.remove(); }, 300);
                }
            });
        });
        updateCompareBar();
        window.addEventListener('storage', function(e) {
            if (e.key === 'primep_compare') {
                compareList = JSON.parse(e.newValue || '[]');
                updateCompareBar();
            }
        });
    }
    initProductCompare();

    function initColorSwatches() {
        document.querySelectorAll('.product-card').forEach(function(card) {
            const colors = ['#c9a96e', '#1a1a1a', '#8b4513', '#2c3e50', '#8e44ad', '#c0392b'];
            const swatchContainer = document.createElement('div');
            swatchContainer.className = 'color-swatches';
            swatchContainer.style.cssText = 'display:flex;gap:6px;margin:8px 0;justify-content:center;';
            const numColors = Math.floor(Math.random() * 3) + 2;
            const shuffled = colors.sort(function() { return 0.5 - Math.random(); });
            for (let i = 0; i < numColors; i++) {
                const swatch = document.createElement('span');
                swatch.style.cssText = 'display:inline-block;width:14px;height:14px;border-radius:50%;background:' + shuffled[i] + ';cursor:pointer;border:2px solid transparent;transition:all 0.2s ease;';
                if (i === 0) swatch.style.borderColor = 'var(--primary)';
                swatch.addEventListener('click', function(e) {
                    e.stopPropagation();
                    swatchContainer.querySelectorAll('span').forEach(function(s) { s.style.borderColor = 'transparent'; });
                    this.style.borderColor = 'var(--primary)';
                });
                swatchContainer.appendChild(swatch);
            }
            const info = card.querySelector('.product-info');
            if (info) {
                const desc = info.querySelector('.product-desc');
                if (desc) {
                    desc.after(swatchContainer);
                }
            }
        });
    }
    initColorSwatches();

    function initSizeSelector() {
        document.querySelectorAll('.product-card').forEach(function(card) {
            const sizes = ['XS', 'S', 'M', 'L', 'XL'];
            const sizeContainer = document.createElement('div');
            sizeContainer.className = 'size-selector';
            sizeContainer.style.cssText = 'display:flex;gap:4px;margin:8px 0;justify-content:center;flex-wrap:wrap;';
            const numSizes = Math.floor(Math.random() * 3) + 2;
            for (let i = 0; i < numSizes; i++) {
                const sizeBtn = document.createElement('button');
                sizeBtn.textContent = sizes[i];
                sizeBtn.style.cssText = 'padding:2px 8px;border-radius:4px;border:1px solid var(--border-color);font-size:0.65rem;color:var(--text-muted);background:transparent;transition:all 0.2s ease;';
                if (i === Math.floor(numSizes / 2)) {
                    sizeBtn.style.borderColor = 'var(--primary)';
                    sizeBtn.style.color = 'var(--primary)';
                }
                sizeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    sizeContainer.querySelectorAll('button').forEach(function(b) {
                        b.style.borderColor = 'var(--border-color)';
                        b.style.color = 'var(--text-muted)';
                    });
                    this.style.borderColor = 'var(--primary)';
                    this.style.color = 'var(--primary)';
                });
                sizeContainer.appendChild(sizeBtn);
            }
            const info = card.querySelector('.product-info');
            if (info) {
                const desc = info.querySelector('.product-desc');
                if (desc) {
                    desc.after(sizeContainer);
                }
            }
        });
    }
    initSizeSelector();

    function initRecentlyViewed() {
        let recentlyViewed = JSON.parse(localStorage.getItem('primep_recently_viewed')) || [];
        function addToRecentlyViewed(id) {
            const index = recentlyViewed.indexOf(id);
            if (index > -1) recentlyViewed.splice(index, 1);
            recentlyViewed.unshift(id);
            if (recentlyViewed.length > 6) recentlyViewed.pop();
            localStorage.setItem('primep_recently_viewed', JSON.stringify(recentlyViewed));
        }
        document.querySelectorAll('.quick-view').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if (id) addToRecentlyViewed(id);
            });
        });
        document.querySelectorAll('.product-card').forEach(function(card) {
            card.addEventListener('click', function() {
                const id = this.querySelector('.btn-add-cart')?.getAttribute('data-id');
                if (id) addToRecentlyViewed(id);
            });
        });
        const container = document.createElement('div');
        container.className = 'recently-viewed';
        container.style.cssText = 'display:none;';
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            container.style.cssText = 'padding:60px 0;';
            container.innerHTML = '<div class="container"><div class="section-header reveal"><span class="section-tag">Continue Exploring</span><h2 class="section-title">Recently <span class="gold-text">Viewed</span></h2><div class="section-divider"><span class="divider-line"></span><i class="fas fa-history divider-icon"></i><span class="divider-line"></span></div></div><div class="products-grid recently-grid" id="recentlyGrid"></div></div>';
            aboutSection.parentNode?.insertBefore(container, aboutSection.nextSibling);
        }
        function renderRecentlyViewed() {
            const grid = document.getElementById('recentlyGrid');
            if (!grid) return;
            const products = recentlyViewed.map(function(id) { return PRODUCTS_DB.find(function(p) { return p.id === id; }); }).filter(Boolean);
            if (products.length === 0) {
                container.style.display = 'none';
                return;
            }
            container.style.display = 'block';
            grid.innerHTML = products.slice(0, 4).map(function(p) {
                return '<div class="product-card" data-category="' + p.category + '">' +
                    '<div class="product-img"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
                    '<div class="product-actions"><button class="product-action quick-view" data-id="' + p.id + '"><i class="fas fa-eye"></i></button>' +
                    '<button class="product-action add-wishlist" data-id="' + p.id + '"><i class="far fa-heart"></i></button></div>' +
                    '<div class="product-country"><i class="fas fa-map-marker-alt"></i> ' + p.country + '</div></div>' +
                    '<div class="product-info"><span class="product-brand">' + p.brand + '</span>' +
                    '<h3 class="product-name">' + p.name + '</h3>' +
                    '<div class="product-rating">' + generateStars(p.rating) + '<span class="rating-count">(' + p.reviews + ')</span></div>' +
                    '<div class="product-bottom"><span class="product-price">$' + p.price + '</span>' +
                    '<button class="btn btn-add-cart" data-id="' + p.id + '" data-name="' + p.name + '" data-price="' + p.price + '" data-image="' + p.image + '"><i class="fas fa-shopping-bag"></i> Add</button></div></div></div>';
            }).join('');
            revealObserver.observe(container.querySelector('.section-header'));
            container.querySelectorAll('.quick-view').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openModalById(this.getAttribute('data-id'));
                });
            });
            container.querySelectorAll('.btn-add-cart').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(this.getAttribute('data-id'), this.getAttribute('data-name'), this.getAttribute('data-price'), this.getAttribute('data-image'));
                });
            });
            container.querySelectorAll('.add-wishlist').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = this.getAttribute('data-id');
                    const heart = this.querySelector('i');
                    const idx = wishlist.indexOf(id);
                    if (idx > -1) { wishlist.splice(idx, 1); heart.classList.replace('fas', 'far'); heart.style.color = ''; showToast('Removed from wishlist', 'info'); }
                    else { wishlist.push(id); heart.classList.replace('far', 'fas'); heart.style.color = '#e74c3c'; showToast('Added to wishlist', 'success'); }
                    localStorage.setItem('primep_wishlist', JSON.stringify(wishlist));
                });
            });
        }
        renderRecentlyViewed();
        window.addEventListener('storage', function(e) {
            if (e.key === 'primep_recently_viewed') {
                recentlyViewed = JSON.parse(e.newValue || '[]');
                renderRecentlyViewed();
            }
        });
    }
    initRecentlyViewed();

    function initSeasonalBanner() {
        const now = new Date();
        const month = now.getMonth();
        let season = '';
        let message = '';
        if (month >= 2 && month <= 4) { season = 'Spring'; message = 'Spring Collection - Fresh florals and pastel hues have arrived.'; }
        else if (month >= 5 && month <= 7) { season = 'Summer'; message = 'Summer Edit - Light, breezy, and vacation-ready pieces.'; }
        else if (month >= 8 && month <= 10) { season = 'Fall'; message = 'Fall Collection - Warm amber tones and rich textures.'; }
        else { season = 'Winter'; message = 'Winter Luxe - Cozy opulence for the season ahead.'; }
        const seasonBadge = document.createElement('div');
        seasonBadge.className = 'season-badge';
        seasonBadge.style.cssText = 'position:fixed;top:50%;left:0;transform:translateY(-50%) rotate(-90deg) translateX(-50%);transform-origin:top left;background:var(--gold-gradient);color:#000;padding:10px 20px;border-radius:0 0 8px 8px;font-size:0.7rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;z-index:900;cursor:pointer;transition:all 0.3s ease;box-shadow:0 2px 12px rgba(201,169,110,0.3);';
        seasonBadge.textContent = season + ' Collection';
        seasonBadge.setAttribute('title', message);
        seasonBadge.addEventListener('click', function() {
            showToast(message, 'info');
        });
        document.body.appendChild(seasonBadge);
        if (window.innerWidth <= 768) {
            seasonBadge.style.display = 'none';
        }
    }
    initSeasonalBanner();

    function initStickyAddToCart() {
        const stickyBar = document.createElement('div');
        stickyBar.id = 'stickyCartBar';
        stickyBar.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:var(--bg-dark-alt);border-top:1px solid var(--border-color);padding:12px 24px;z-index:900;display:none;align-items:center;justify-content:space-between;transform:translateY(100%);transition:transform 0.3s ease;';
        stickyBar.innerHTML = '<div style="display:flex;align-items:center;gap:16px;"><span id="stickyProductName" style="font-size:0.9rem;color:var(--text-primary);font-family:var(--font-display);"></span><span id="stickyProductPrice" style="font-size:1rem;color:var(--primary);font-weight:700;"></span></div>' +
            '<button id="stickyAddBtn" style="padding:10px 24px;border-radius:50px;background:var(--gold-gradient);color:#000;font-weight:600;font-size:0.8rem;"><i class="fas fa-shopping-bag"></i> Add to Bag</button>';
        document.body.appendChild(stickyBar);
        let stickyTimer = null;
        window.addEventListener('scroll', function() {
            const products = document.querySelectorAll('.product-card');
            let visibleProduct = null;
            products.forEach(function(card) {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                    if (visible > 100) {
                        const id = card.querySelector('.btn-add-cart')?.getAttribute('data-id');
                        const product = PRODUCTS_DB.find(function(p) { return p.id === id; });
                        if (product) visibleProduct = product;
                    }
                }
            });
            if (visibleProduct && window.innerWidth <= 768) {
                document.getElementById('stickyProductName').textContent = visibleProduct.name;
                document.getElementById('stickyProductPrice').textContent = '$' + visibleProduct.price;
                document.getElementById('stickyAddBtn').setAttribute('data-id', visibleProduct.id);
                document.getElementById('stickyAddBtn').setAttribute('data-name', visibleProduct.name);
                document.getElementById('stickyAddBtn').setAttribute('data-price', visibleProduct.price);
                document.getElementById('stickyAddBtn').setAttribute('data-image', visibleProduct.image);
                stickyBar.style.display = 'flex';
                clearTimeout(stickyTimer);
                stickyTimer = setTimeout(function() {
                    stickyBar.style.transform = 'translateY(0)';
                }, 50);
            } else {
                stickyBar.style.transform = 'translateY(100%)';
                setTimeout(function() { stickyBar.style.display = 'none'; }, 300);
            }
        });
        document.getElementById('stickyAddBtn')?.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            if (id) {
                addToCart(id, name, price, image);
                stickyBar.style.transform = 'translateY(100%)';
                setTimeout(function() { stickyBar.style.display = 'none'; }, 300);
            }
        });
    }
    initStickyAddToCart();

    function initCurrencyConverter() {
        const rates = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151.5, AED: 3.67, INR: 83.2, SAR: 3.75 };
        const currencyBtn = document.createElement('button');
        currencyBtn.id = 'currencyBtn';
        currencyBtn.innerHTML = '<i class="fas fa-dollar-sign"></i> USD';
        currencyBtn.style.cssText = 'padding:8px 14px;border-radius:50px;border:1px solid var(--border-color);color:var(--text-secondary);font-size:0.7rem;letter-spacing:0.5px;display:flex;align-items:center;gap:6px;';
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            navRight.insertBefore(currencyBtn, themeToggle);
        }
        currencyBtn.addEventListener('click', function() {
            const currencies = Object.keys(rates);
            const currentCurrency = this.textContent.trim().split(' ')[1] || 'USD';
            const currentIndex = currencies.indexOf(currentCurrency);
            const nextCurrency = currencies[(currentIndex + 1) % currencies.length];
            const rate = rates[nextCurrency];
            const symbolMap = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', AED: 'د.إ', INR: '₹', SAR: '﷼' };
            const symbol = symbolMap[nextCurrency] || '$';
            this.innerHTML = '<i class="fas fa-' + (nextCurrency === 'JPY' ? 'yen' : nextCurrency === 'GBP' ? 'pound' : 'dollar') + '-sign"></i> ' + nextCurrency;
            document.querySelectorAll('.product-price, .limited-sale').forEach(function(el) {
                let text = el.textContent;
                let numStr = text.replace(/[^0-9.,]/g, '').replace(/,/g, '');
                let num = parseFloat(numStr);
                if (!isNaN(num) && num > 0) {
                    const converted = Math.round(num * rate * 100) / 100;
                    el.textContent = symbol + converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                }
            });
            document.querySelectorAll('.cart-item-price, .cart-subtotal span:last-child, .cart-total span:last-child').forEach(function(el) {
                if (el.closest('.cart-summary') || el.closest('.cart-item')) {
                    let text = el.textContent;
                    let numStr = text.replace(/[^0-9.,]/g, '').replace(/,/g, '');
                    let num = parseFloat(numStr);
                    if (!isNaN(num) && num > 0) {
                        const converted = Math.round(num * rate * 100) / 100;
                        el.textContent = symbol + converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                    }
                }
            });
            if (document.querySelector('.cart-discount span:last-child')) {
                let text = document.querySelector('.cart-discount span:last-child').textContent;
                let numStr = text.replace(/[^0-9.,-]/g, '').replace(/,/g, '');
                let num = parseFloat(numStr);
                if (!isNaN(num)) {
                    const converted = Math.round(num * rate * 100) / 100;
                    document.querySelector('.cart-discount span:last-child').textContent = '-' + symbol + Math.abs(converted).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                }
            }
            showToast('Currency changed to ' + nextCurrency, 'info');
        });
    }
    initCurrencyConverter();

    function initWishlistPage() {
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'nav-icon-btn wishlist-btn-nav';
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        wishlistBtn.setAttribute('aria-label', 'Wishlist');
        wishlistBtn.style.cssText = 'width:42px;height:42px;display:flex;align-items:center;justify-content:center;border-radius:50%;color:var(--text-secondary);font-size:1rem;';
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            navRight.insertBefore(wishlistBtn, cartToggle);
        }
        wishlistBtn.addEventListener('click', function() {
            if (wishlist.length === 0) {
                showToast('Your wishlist is empty. Browse our collections!', 'info');
                return;
            }
            const products = wishlist.map(function(id) { return PRODUCTS_DB.find(function(p) { return p.id === id; }); }).filter(Boolean);
            let wHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;padding:20px;">';
            products.forEach(function(p) {
                wHtml += '<div style="text-align:center;padding:16px;background:var(--card-bg);border-radius:12px;border:1px solid var(--card-border);">' +
                    '<img src="' + p.image + '" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;">' +
                    '<h4 style="font-size:0.85rem;color:var(--text-primary);font-family:var(--font-display);">' + p.name + '</h4>' +
                    '<p style="font-size:0.8rem;color:var(--primary);">$' + p.price + '</p>' +
                    '<button class="wishlist-to-cart" data-id="' + p.id + '" data-name="' + p.name + '" data-price="' + p.price + '" data-image="' + p.image + '" style="margin-top:8px;padding:6px 14px;border-radius:50px;background:var(--gold-gradient);color:#000;font-size:0.72rem;font-weight:600;">Add to Bag</button></div>';
            });
            wHtml += '</div>';
            const wModal = document.createElement('div');
            wModal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:6000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;';
            const wContent = document.createElement('div');
            wContent.style.cssText = 'background:var(--bg-dark-alt);border-radius:16px;max-width:800px;width:90%;max-height:80vh;overflow-y:auto;position:relative;border:1px solid var(--border-color);';
            wContent.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border-color);">' +
                '<h3 style="font-family:var(--font-display);font-size:1.2rem;">My Wishlist (' + wishlist.length + ')</h3>' +
                '<button class="wishlist-modal-close" style="width:32px;height:32px;border-radius:50%;background:var(--bg-light);display:flex;align-items:center;justify-content:center;color:var(--text-secondary);"><i class="fas fa-times"></i></button></div>' +
                wHtml;
            wModal.appendChild(wContent);
            document.body.appendChild(wModal);
            requestAnimationFrame(function() { wModal.style.opacity = '1'; });
            wModal.addEventListener('click', function(e) {
                if (e.target === wModal || e.target.closest('.wishlist-modal-close')) {
                    wModal.style.opacity = '0';
                    setTimeout(function() { wModal.remove(); }, 300);
                }
            });
            wModal.querySelectorAll('.wishlist-to-cart').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    addToCart(this.getAttribute('data-id'), this.getAttribute('data-name'), this.getAttribute('data-price'), this.getAttribute('data-image'));
                });
            });
        });
    }
    initWishlistPage();

    function initQuickCart() {
        const quickCartBtn = document.createElement('button');
        quickCartBtn.id = 'quickCartBtn';
        quickCartBtn.innerHTML = '<i class="fas fa-shopping-bag"></i> <span id="quickCartTotal">$0</span>';
        quickCartBtn.style.cssText = 'display:none;position:fixed;bottom:24px;right:90px;padding:12px 20px;border-radius:50px;background:var(--gold-gradient);color:#000;font-weight:600;font-size:0.8rem;z-index:100;box-shadow:0 4px 20px rgba(201,169,110,0.3);align-items:center;gap:8px;';
        document.body.appendChild(quickCartBtn);
        function updateQuickCart() {
            let total = 0;
            cart.forEach(function(item) { total += item.price * item.quantity; });
            document.getElementById('quickCartTotal').textContent = '$' + Math.round(total).toLocaleString();
            if (cart.length > 0 && window.innerWidth <= 768) {
                quickCartBtn.style.display = 'flex';
            } else {
                quickCartBtn.style.display = 'none';
            }
        }
        updateQuickCart();
        const origUpdate = updateCartUI;
        updateCartUI = function() {
            origUpdate();
            updateQuickCart();
        };
        quickCartBtn.addEventListener('click', function() {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }
    initQuickCart();

    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'k') {
                    e.preventDefault();
                    searchBar.classList.toggle('active');
                    if (searchBar.classList.contains('active')) searchInput.focus();
                }
            }
            if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.target.closest('input,textarea,select')) {
                cartSidebar.classList.add('active');
                cartOverlay.classList.add('active');
                body.style.overflow = 'hidden';
            }
            if (e.key === 'w' && !e.ctrlKey && !e.metaKey && !e.target.closest('input,textarea,select')) {
                if (wishlist.length > 0) {
                    showToast('Wishlist: ' + wishlist.length + ' items', 'info');
                } else {
                    showToast('Wishlist is empty', 'info');
                }
            }
            if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.target.closest('input,textarea,select')) {
                themeToggle.click();
            }
        });
    }
    initKeyboardShortcuts();

    function initBackToTopProgress() {
        const svgRing = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgRing.setAttribute('width', '56');
        svgRing.setAttribute('height', '56');
        svgRing.setAttribute('viewBox', '0 0 56 56');
        svgRing.style.cssText = 'position:fixed;bottom:28px;right:28px;z-index:101;pointer-events:none;transform:rotate(-90deg);';
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '28');
        circle.setAttribute('cy', '28');
        circle.setAttribute('r', '24');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', 'var(--primary)');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('stroke-dasharray', '150.8');
        circle.setAttribute('stroke-dashoffset', '150.8');
        circle.style.opacity = '0.5';
        circle.id = 'scrollProgressCircle';
        svgRing.appendChild(circle);
        document.body.appendChild(svgRing);
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
            const dashOffset = 150.8 - (scrollPercent * 150.8);
            circle.setAttribute('stroke-dashoffset', dashOffset.toString());
        });
    }
    initBackToTopProgress();

    function initTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });
        document.addEventListener('touchend', function(e) {
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            const deltaY = e.changedTouches[0].clientY - touchStartY;
            const deltaTime = Date.now() - touchStartTime;
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 300) {
                if (deltaX > 0 && cartSidebar.classList.contains('active')) {
                    closeCart();
                }
                if (deltaX < 0) {
                    const productsSection = document.querySelector('.products-grid');
                    if (productsSection && !cartSidebar.classList.contains('active')) {
                        const tabs = document.querySelectorAll('.filter-btn');
                        let activeIndex = 0;
                        tabs.forEach(function(t, i) { if (t.classList.contains('active')) activeIndex = i; });
                        const nextIndex = (activeIndex + 1) % tabs.length;
                        tabs[nextIndex]?.click();
                    }
                }
            }
        }, { passive: true });
    }
    initTouchGestures();

    function initAnalyticsSimulation() {
        const events = [];
        function trackEvent(category, action, label) {
            events.push({ category: category, action: action, label: label, timestamp: new Date().toISOString() });
            if (events.length > 50) events.shift();
            sessionStorage.setItem('primep_analytics', JSON.stringify(events));
        }
        document.querySelectorAll('.btn-primary').forEach(function(btn) {
            btn.addEventListener('click', function() {
                trackEvent('Button', 'Click', this.textContent.trim().substring(0, 50));
            });
        });
        document.querySelectorAll('.product-card').forEach(function(card) {
            card.addEventListener('click', function() {
                const name = this.querySelector('.product-name')?.textContent || 'Unknown';
                trackEvent('Product', 'View', name);
            });
        });
        document.querySelectorAll('.btn-add-cart').forEach(function(btn) {
            btn.addEventListener('click', function() {
                trackEvent('Cart', 'Add', this.getAttribute('data-name') || 'Unknown');
            });
        });
        document.querySelectorAll('.category-card').forEach(function(card) {
            card.addEventListener('click', function() {
                const name = this.querySelector('h3')?.textContent || 'Unknown';
                trackEvent('Category', 'Click', name);
            });
        });
        window.addEventListener('scroll', function() {
            if (window.scrollY > 1000 && !window._primep_scrolled) {
                window._primep_scrolled = true;
                trackEvent('Engagement', 'DeepScroll', 'Scrolled > 1000px');
            }
        });
        trackEvent('Session', 'Start', 'Page loaded');
        window.addEventListener('beforeunload', function() {
            trackEvent('Session', 'End', 'Page unloaded');
            sessionStorage.setItem('primep_analytics', JSON.stringify(events));
        });
        console.log('%c📊 Analytics tracking initialized', 'color: #6b6560; font-size: 10px;');
    }
    initAnalyticsSimulation();

    function initNewsletterPopup() {
        const popupShown = localStorage.getItem('primep_popup_shown');
        if (popupShown) return;
        setTimeout(function() {
            const popup = document.createElement('div');
            popup.id = 'newsletterPopup';
            popup.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:7000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.5s ease;';
            popup.innerHTML = '<div style="background:var(--bg-dark-alt);border-radius:20px;max-width:500px;width:90%;padding:40px;text-align:center;position:relative;border:1px solid var(--border-color);">' +
                '<button class="popup-close" style="position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;background:var(--bg-light);display:flex;align-items:center;justify-content:center;color:var(--text-secondary);font-size:1.1rem;"><i class="fas fa-times"></i></button>' +
                '<div style="font-size:3rem;margin-bottom:16px;">🎉</div>' +
                '<h2 style="font-family:var(--font-display);font-size:1.6rem;color:var(--text-primary);margin-bottom:8px;">Welcome to <span class="gold-text">PrimeP</span></h2>' +
                '<p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:24px;line-height:1.6;">Subscribe now and get <strong style="color:var(--primary);">10% off</strong> your first order. Be the first to know about new collections and exclusive drops.</p>' +
                '<div style="display:flex;gap:0;border-radius:50px;overflow:hidden;border:1px solid var(--border-color);">' +
                '<input type="email" id="popupEmail" placeholder="Enter your email" style="flex:1;padding:14px 18px;background:transparent;color:var(--text-primary);font-size:0.9rem;">' +
                '<button id="popupSubscribe" style="padding:14px 24px;background:var(--gold-gradient);color:#000;font-weight:600;font-size:0.85rem;">Subscribe</button></div>' +
                '<p style="font-size:0.72rem;color:var(--text-muted);margin-top:16px;">No spam, unsubscribe anytime.</p></div>';
            document.body.appendChild(popup);
            requestAnimationFrame(function() { popup.style.opacity = '1'; });
            function closePopup() {
                popup.style.opacity = '0';
                setTimeout(function() { popup.remove(); }, 300);
                localStorage.setItem('primep_popup_shown', 'true');
            }
            popup.querySelector('.popup-close')?.addEventListener('click', closePopup);
            popup.addEventListener('click', function(e) { if (e.target === popup) closePopup(); });
            document.getElementById('popupSubscribe')?.addEventListener('click', function() {
                const email = document.getElementById('popupEmail').value.trim();
                if (!email || !validateEmail(email)) {
                    showToast('Please enter a valid email', 'error');
                    return;
                }
                showToast('Welcome! Check your inbox for 10% off.', 'success');
                closePopup();
            });
            document.getElementById('popupEmail')?.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') document.getElementById('popupSubscribe')?.click();
            });
        }, 8000);
    }
    initNewsletterPopup();

    function initPerformanceMode() {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.parallax-bg').forEach(function(el) {
                el.style.backgroundAttachment = 'scroll';
            });
            document.querySelectorAll('.section-bg[style*="fixed"]').forEach(function(el) {
                el.style.backgroundAttachment = 'scroll';
            });
        }
    }
    initPerformanceMode();

    function initAccessibilityEnhancements() {
        document.querySelectorAll('button:not([aria-label])').forEach(function(btn) {
            const text = btn.textContent.trim().substring(0, 30);
            if (text) btn.setAttribute('aria-label', text);
        });
        document.querySelectorAll('a:not([aria-label])').forEach(function(a) {
            const text = a.textContent.trim().substring(0, 30);
            if (text) a.setAttribute('aria-label', text);
        });
        document.querySelectorAll('img:not([alt])').forEach(function(img) {
            img.setAttribute('alt', 'PrimeP Product');
        });
        document.querySelectorAll('.product-card').forEach(function(card) {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.querySelector('.quick-view')?.click();
                }
            });
        });
        document.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
        });
    }
    initAccessibilityEnhancements();

    function initNetworkStatus() {
        function updateOnlineStatus() {
            if (navigator.onLine) {
                document.body.classList.remove('offline');
            } else {
                document.body.classList.add('offline');
                showToast('You are offline. Some features may be limited.', 'error');
            }
        }
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
        const offlineBanner = document.createElement('div');
        offlineBanner.id = 'offlineBanner';
        offlineBanner.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;padding:10px;background:#e74c3c;color:#fff;text-align:center;font-size:0.85rem;z-index:10001;';
        offlineBanner.textContent = 'You are currently offline. Please check your connection.';
        document.body.prepend(offlineBanner);
        window.addEventListener('offline', function() { offlineBanner.style.display = 'block'; });
        window.addEventListener('online', function() { offlineBanner.style.display = 'none'; });
    }
    initNetworkStatus();

    function initDynamicYear() {
        document.querySelectorAll('.footer-copy').forEach(function(el) {
            el.textContent = el.textContent.replace(/\d{4}/, new Date().getFullYear().toString());
        });
    }
    initDynamicYear();

    function initSmoothImageLoading() {
        document.querySelectorAll('.product-img img, .gallery-item img, .blog-img img').forEach(function(img) {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.4s ease';
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                img.addEventListener('error', function() {
                    this.style.opacity = '1';
                    this.src = 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2070&auto=format&fit=crop';
                });
            }
        });
    }
    initSmoothImageLoading();

    function initNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            setTimeout(function() {
                Notification.requestPermission().then(function(permission) {
                    if (permission === 'granted') {
                        console.log('%c🔔 Notifications enabled', 'color: #2ecc71; font-size: 10px;');
                    }
                });
            }, 10000);
        }
    }
    initNotificationPermission();

    function initPageNavigation() {
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                setTimeout(function() {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 1500);
            }
        }
        const urlParams = new URLSearchParams(window.location.search);
        const productParam = urlParams.get('product');
        if (productParam) {
            const product = PRODUCTS_DB.find(function(p) {
                return p.name.toLowerCase().includes(productParam.toLowerCase());
            });
            if (product) {
                setTimeout(function() {
                    openModalById(product.id);
                }, 2000);
            }
        }
    }
    initPageNavigation();

    function initThemeColorMeta() {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = body.classList.contains('light-theme') ? '#faf8f5' : '#0a0a0f';
        document.head.appendChild(meta);
        const observer = new MutationObserver(function() {
            meta.content = body.classList.contains('light-theme') ? '#faf8f5' : '#0a0a0f';
        });
        observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    }
    initThemeColorMeta();

    function initServiceWorkerRegistration() {
        if ('serviceWorker' in navigator) {
            console.log('%c📱 Service Worker API available', 'color: #6b6560; font-size: 10px;');
        }
    }
    initServiceWorkerRegistration();

    function initWebShareAPI() {
        if (navigator.share) {
            const shareButton = document.createElement('button');
            shareButton.id = 'sharePrimeP';
            shareButton.innerHTML = '<i class="fas fa-share-alt"></i>';
            shareButton.style.cssText = 'display:none;';
            document.body.appendChild(shareButton);
        }
    }
    initWebShareAPI();

    function initMemoryUsage() {
        if (performance.memory) {
            console.log('%c💾 Memory: ' + Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB / ' + Math.round(performance.memory.jsHeapSizeLimit / 1048576) + 'MB', 'color: #6b6560; font-size: 10px;');
        }
    }
    setTimeout(initMemoryUsage, 3000);

    function initConnectionSpeed() {
        if (navigator.connection) {
            const conn = navigator.connection;
            console.log('%c📶 Connection: ' + (conn.effectiveType || 'unknown') + ' | RTT: ' + (conn.rtt || '?') + 'ms', 'color: #6b6560; font-size: 10px;');
            conn.addEventListener('change', function() {
                console.log('%c📶 Connection changed: ' + conn.effectiveType, 'color: #6b6560; font-size: 10px;');
            });
        }
    }
    setTimeout(initConnectionSpeed, 2000);

    function initBatteryStatus() {
        if (navigator.getBattery) {
            navigator.getBattery().then(function(battery) {
                console.log('%c🔋 Battery: ' + Math.round(battery.level * 100) + '% ' + (battery.charging ? '(charging)' : ''), 'color: #6b6560; font-size: 10px;');
            }).catch(function() {});
        }
    }
    setTimeout(initBatteryStatus, 2500);

    function initLocaleDetection() {
        const locale = navigator.language || navigator.userLanguage || 'en-US';
        console.log('%c🌐 Locale: ' + locale, 'color: #6b6560; font-size: 10px;');
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log('%c🕐 Timezone: ' + timezone, 'color: #6b6560; font-size: 10px;');
    }
    setTimeout(initLocaleDetection, 1500);

    function initConsoleHelp() {
        console.log('%c📖 Available commands: PrimeP.help()', 'color: #c9a96e; font-size: 11px;');
        window.PrimeP = {
            help: function() {
                console.log('%cPrimeP Console Help:', 'color: #c9a96e; font-size: 14px; font-weight: bold;');
                console.log('  PrimeP.cart         - View current cart');
                console.log('  PrimeP.wishlist     - View wishlist');
                console.log('  PrimeP.products     - View all products');
                console.log('  PrimeP.theme()      - Toggle theme');
                console.log('  PrimeP.clearCart()  - Clear cart');
                console.log('  PrimeP.stats()      - Show site stats');
                console.log('  PrimeP.search("q")  - Search products');
                console.log('  PrimeP.showcase()   - Product showcase');
                console.log('  PrimeP.about()      - About PrimeP');
            },
            cart: cart,
            get wishlist() { return wishlist; },
            products: PRODUCTS_DB,
            theme: function() { themeToggle.click(); },
            clearCart: function() { cart = []; updateCartUI(); showToast('Cart cleared', 'info'); },
            search: function(query) {
                const results = PRODUCTS_DB.filter(function(p) {
                    return p.name.toLowerCase().includes(query.toLowerCase()) ||
                           p.brand.toLowerCase().includes(query.toLowerCase());
                });
                console.log('%c🔍 Search results for "' + query + '":', 'color: #c9a96e; font-size: 12px;');
                if (results.length === 0) { console.log('  No results found.'); return; }
                results.forEach(function(p, i) {
                    console.log('  ' + (i + 1) + '. ' + p.name + ' - $' + p.price + ' (' + p.brand + ')');
                });
            },
            showcase: function() {
                console.log('%c🏆 PrimeP Showcase:', 'color: #c9a96e; font-size: 14px; font-weight: bold;');
                const best = PRODUCTS_DB.filter(function(p) { return p.rating >= 5; }).slice(0, 5);
                best.forEach(function(p) {
                    console.log('  ⭐ ' + p.name + ' - $' + p.price + ' (' + p.country + ')');
                });
            },
            about: function() {
                console.log('%c🌍 PrimeP - Premium Perfume & Bag Collection', 'color: #c9a96e; font-size: 16px; font-weight: bold;');
                console.log('  Sourced from 50+ countries | Est. 2024');
                console.log('  Flagship: 123 Luxury Avenue, New York');
                console.log('  Contact: concierge@primep.com | +1 (800) 555-PRIME');
            },
            stats: function() {
                const totalProducts = PRODUCTS_DB.length;
                const totalValue = cart.reduce(function(sum, item) { return sum + item.price * item.quantity; }, 0);
                console.log('%c📊 PrimeP Stats:', 'color: #c9a96e; font-size: 13px; font-weight: bold;');
                console.log('  Total Products: ' + totalProducts);
                console.log('  Cart Items: ' + cart.length + ' (Value: $' + totalValue + ')');
                console.log('  Wishlist: ' + wishlist.length + ' items');
                console.log('  Theme: ' + (body.classList.contains('light-theme') ? 'Light' : 'Dark'));
                console.log('  Products in DB: ' + PRODUCTS_DB.length);
                console.log('  Categories: Perfumes, Bags, Gift Sets');
                console.log('  Countries: 17 sourcing locations');
            }
        };
    }
    initConsoleHelp();

    function initProductRecommendations() {
        const viewed = JSON.parse(localStorage.getItem('primep_recently_viewed')) || [];
        if (viewed.length === 0) return;
        const lastViewed = PRODUCTS_DB.find(function(p) { return p.id === viewed[0]; });
        if (!lastViewed) return;
        const recommended = PRODUCTS_DB.filter(function(p) {
            return p.id !== lastViewed.id && (p.category === lastViewed.category || p.country === lastViewed.country);
        }).slice(0, 4);
        if (recommended.length === 0) return;
        const recSection = document.createElement('section');
        recSection.className = 'section recommendations';
        recSection.style.cssText = 'padding:80px 0;background:var(--bg-dark-alt);';
        recSection.innerHTML = '<div class="container"><div class="section-header reveal">' +
            '<span class="section-tag">You May Also Like</span>' +
            '<h2 class="section-title">Recommended <span class="gold-text">For You</span></h2>' +
            '<div class="section-divider"><span class="divider-line"></span><i class="fas fa-star divider-icon"></i><span class="divider-line"></span></div>' +
            '<p class="section-desc">Based on your browsing history, we think you will love these pieces.</p></div>' +
            '<div class="products-grid reveal" id="recGrid"></div></div>';
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.parentNode?.insertBefore(recSection, footer);
        } else {
            document.body.appendChild(recSection);
        }
        const grid = document.getElementById('recGrid');
        if (grid) {
            grid.innerHTML = recommended.map(function(p) {
                return '<div class="product-card" data-category="' + p.category + '">' +
                    '<div class="product-img"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
                    '<div class="product-actions"><button class="product-action quick-view" data-id="' + p.id + '"><i class="fas fa-eye"></i></button>' +
                    '<button class="product-action add-wishlist" data-id="' + p.id + '"><i class="far fa-heart"></i></button></div>' +
                    '<div class="product-badge">Recommended</div>' +
                    '<div class="product-country"><i class="fas fa-map-marker-alt"></i> ' + p.country + '</div></div>' +
                    '<div class="product-info"><span class="product-brand">' + p.brand + '</span>' +
                    '<h3 class="product-name">' + p.name + '</h3>' +
                    '<div class="product-rating">' + generateStars(p.rating) + '<span class="rating-count">(' + p.reviews + ')</span></div>' +
                    '<p class="product-desc">' + p.desc + '</p>' +
                    '<div class="product-bottom"><span class="product-price">$' + p.price + '</span>' +
                    '<button class="btn btn-add-cart" data-id="' + p.id + '" data-name="' + p.name + '" data-price="' + p.price + '" data-image="' + p.image + '"><i class="fas fa-shopping-bag"></i> Add</button></div></div></div>';
            }).join('');
            revealObserver.observe(recSection.querySelector('.section-header'));
            recSection.querySelectorAll('.quick-view').forEach(function(btn) {
                btn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); openModalById(this.getAttribute('data-id')); });
            });
            recSection.querySelectorAll('.btn-add-cart').forEach(function(btn) {
                btn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); addToCart(this.getAttribute('data-id'), this.getAttribute('data-name'), this.getAttribute('data-price'), this.getAttribute('data-image')); });
            });
            recSection.querySelectorAll('.add-wishlist').forEach(function(btn) {
                btn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); const id = this.getAttribute('data-id'); const h = this.querySelector('i'); const idx = wishlist.indexOf(id); if (idx > -1) { wishlist.splice(idx,1); h.classList.replace('fas','far'); h.style.color=''; showToast('Removed','info'); } else { wishlist.push(id); h.classList.replace('far','fas'); h.style.color='#e74c3c'; showToast('Added to wishlist','success'); } localStorage.setItem('primep_wishlist',JSON.stringify(wishlist)); });
            });
        }
    }
    initProductRecommendations();

    function initFloatingWhatsApp() {
        const waBtn = document.createElement('a');
        waBtn.id = 'whatsappBtn';
        waBtn.href = 'https://wa.me/180055577463';
        waBtn.target = '_blank';
        waBtn.rel = 'noopener';
        waBtn.setAttribute('aria-label', 'Contact on WhatsApp');
        waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        waBtn.style.cssText = 'position:fixed;bottom:92px;right:32px;width:48px;height:48px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.4rem;z-index:100;box-shadow:0 4px 16px rgba(37,211,102,0.4);transition:all 0.3s ease;opacity:0;transform:translateY(20px);';
        document.body.appendChild(waBtn);
        setTimeout(function() { waBtn.style.opacity = '1'; waBtn.style.transform = 'translateY(0)'; }, 3000);
        waBtn.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-4px) scale(1.05)'; });
        waBtn.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
    }
    initFloatingWhatsApp();

    function initImagePreloader() {
        const images = [
            'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
        ];
        images.forEach(function(src) {
            const img = new Image();
            img.src = src;
        });
    }
    initImagePreloader();

    function initRandomTestimonials() {
        const extraTestimonials = [
            { text: 'PrimeP exceeded my expectations. The packaging alone was a work of art.', author: 'Amanda K.', location: 'Paris', rating: 5 },
            { text: 'I have never experienced such personalized service. They helped me find the perfect gift.', author: 'David L.', location: 'Sydney', rating: 5 },
            { text: 'The quality of their leather goods is unparalleled. You can feel the craftsmanship.', author: 'Yuki T.', location: 'Osaka', rating: 5 },
            { text: 'My new signature scent came from PrimeP. I get compliments everywhere I go.', author: 'Carlos M.', location: 'Barcelona', rating: 5 },
            { text: 'Fast shipping to Singapore and the product was even more beautiful in person.', author: 'Mei L.', location: 'Singapore', rating: 5 },
            { text: 'The virtual try-on feature is incredible. I knew exactly what I was getting.', author: 'Sarah J.', location: 'Toronto', rating: 5 }
        ];
        const track = document.getElementById('testimonialTrack');
        if (track) {
            extraTestimonials.forEach(function(t) {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                let stars = '';
                for (let i = 0; i < t.rating; i++) stars += '<i class="fas fa-star"></i>';
                card.innerHTML = '<div class="testimonial-stars">' + stars + '</div>' +
                    '<p class="testimonial-text">"' + t.text + '"</p>' +
                    '<div class="testimonial-author"><div style="width:56px;height:56px;border-radius:50%;background:var(--bg-light);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--primary);"><i class="fas fa-user"></i></div>' +
                    '<div><h4>' + t.author + '</h4><span>Verified Buyer, ' + t.location + '</span></div></div>';
                track.appendChild(card);
            });
            testimonialCount = track.querySelectorAll('.testimonial-card').length;
            document.querySelectorAll('.testimonial-dot').forEach(function(d) { d.remove(); });
            testDots.innerHTML = '';
            for (let i = 0; i < testimonialCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', function() {
                    goToTestimonial(parseInt(this.getAttribute('data-index')));
                    clearInterval(testimonialInterval);
                    startTestimonialAutoPlay();
                });
                testDots.appendChild(dot);
            }
        }
    }
    initRandomTestimonials();

    function initFeaturedInFooter() {
        const footerBottom = document.querySelector('.footer-bottom-content');
        if (footerBottom) {
            const featured = document.createElement('div');
            featured.style.cssText = 'font-size:0.7rem;color:var(--text-muted);text-align:center;margin-top:8px;letter-spacing:1px;width:100%;';
            featured.textContent = 'Featured in VOGUE • ELLE • Harper\'s Bazaar • Forbes • The New York Times';
            footerBottom.appendChild(featured);
        }
    }
    initFeaturedInFooter();

    function initTrustBadges() {
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'trust-badges';
        badgesContainer.style.cssText = 'display:flex;justify-content:center;gap:24px;padding:24px 0;flex-wrap:wrap;';
        const badges = [
            { icon: 'fa-shield-alt', text: 'SSL Secure' },
            { icon: 'fa-lock', text: 'Safe Checkout' },
            { icon: 'fa-undo-alt', text: '30-Day Returns' },
            { icon: 'fa-truck', text: 'Free Shipping' },
            { icon: 'fa-certificate', text: '100% Authentic' }
        ];
        badges.forEach(function(b) {
            const badge = document.createElement('div');
            badge.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:0.72rem;color:var(--text-muted);';
            badge.innerHTML = '<i class="fas ' + b.icon + '" style="color:var(--primary);font-size:0.85rem;"></i> ' + b.text;
            badgesContainer.appendChild(badge);
        });
        const cartFooter = document.querySelector('.cart-footer');
        if (cartFooter) {
            cartFooter.appendChild(badgesContainer);
        }
    }
    initTrustBadges();

    function initReadingProgress() {
        const progressWrapper = document.createElement('div');
        progressWrapper.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:3px;z-index:10001;background:transparent;';
        const progressFill = document.createElement('div');
        progressFill.style.cssText = 'height:100%;background:linear-gradient(90deg,var(--primary),var(--primary-light));width:0%;transition:width 0.1s ease;border-radius:0 2px 2px 0;';
        progressWrapper.appendChild(progressFill);
        document.body.prepend(progressWrapper);
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressFill.style.width = percent + '%';
        });
    }
    initReadingProgress();

    function initVideoBackgroundFallback() {
        const videoBgs = document.querySelectorAll('[data-video-bg]');
        videoBgs.forEach(function(el) {
            const poster = el.getAttribute('data-poster');
            if (poster) {
                el.style.backgroundImage = 'url(' + poster + ')';
            }
        });
    }
    initVideoBackgroundFallback();

    function initFormAutoSave() {
        const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
        formInputs.forEach(function(input) {
            const name = input.id || input.name;
            if (!name) return;
            const saved = localStorage.getItem('primep_form_' + name);
            if (saved) input.value = saved;
            input.addEventListener('input', function() {
                localStorage.setItem('primep_form_' + name, this.value);
            });
        });
        const contactFormEl = document.getElementById('contactForm');
        if (contactFormEl) {
            contactFormEl.addEventListener('submit', function() {
                formInputs.forEach(function(input) {
                    const name = input.id || input.name;
                    if (name) localStorage.removeItem('primep_form_' + name);
                });
            });
        }
    }
    initFormAutoSave();

    function initSmoothScrollEnhance() {
        document.querySelectorAll('a[href^="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 90;
                    const pos = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            });
        });
    }
    initSmoothScrollEnhance();

    function initCookieConsent() {
        const consentGiven = localStorage.getItem('primep_cookie_consent');
        if (consentGiven) return;
        const banner = document.createElement('div');
        banner.id = 'cookieConsent';
        banner.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);max-width:500px;width:90%;background:var(--bg-dark-alt);border:1px solid var(--border-color);border-radius:16px;padding:20px 24px;z-index:8000;box-shadow:0 8px 40px rgba(0,0,0,0.4);display:flex;flex-direction:column;gap:12px;';
        banner.innerHTML = '<div style="display:flex;align-items:center;gap:12px;"><i class="fas fa-cookie-bite" style="color:var(--primary);font-size:1.4rem;"></i><p style="font-size:0.82rem;color:var(--text-secondary);flex:1;line-height:1.5;">We use cookies to enhance your experience. By continuing, you agree to our use of cookies.</p></div>' +
            '<div style="display:flex;gap:8px;justify-content:flex-end;"><button id="cookieDecline" style="padding:8px 18px;border-radius:50px;border:1px solid var(--border-color);color:var(--text-secondary);font-size:0.75rem;">Decline</button>' +
            '<button id="cookieAccept" style="padding:8px 24px;border-radius:50px;background:var(--gold-gradient);color:#000;font-weight:600;font-size:0.75rem;">Accept</button></div>';
        document.body.appendChild(banner);
        document.getElementById('cookieAccept')?.addEventListener('click', function() {
            localStorage.setItem('primep_cookie_consent', 'accepted');
            banner.style.opacity = '0';
            banner.style.transform = 'translateX(-50%) translateY(20px)';
            banner.style.transition = 'all 0.3s ease';
            setTimeout(function() { banner.remove(); }, 300);
        });
        document.getElementById('cookieDecline')?.addEventListener('click', function() {
            localStorage.setItem('primep_cookie_consent', 'declined');
            banner.style.opacity = '0';
            banner.style.transform = 'translateX(-50%) translateY(20px)';
            banner.style.transition = 'all 0.3s ease';
            setTimeout(function() { banner.remove(); }, 300);
        });
    }
    initCookieConsent();

    function initVersionDisplay() {
        const version = '1.0.0';
        const buildDate = '2024-12-01';
        console.log('%c🏷️ PrimeP v' + version + ' | Build: ' + buildDate, 'color: #6b6560; font-size: 10px;');
        const versionEl = document.createElement('div');
        versionEl.style.cssText = 'position:fixed;bottom:8px;left:12px;font-size:0.6rem;color:var(--text-muted);z-index:1;opacity:0.5;pointer-events:none;';
        versionEl.textContent = 'PrimeP v' + version;
        document.body.appendChild(versionEl);
    }
    initVersionDisplay();

    function initGlobalSearch() {
        const searchStyle = document.createElement('style');
        searchStyle.textContent = '.search-highlight{background:rgba(201,169,110,0.3);padding:0 2px;border-radius:2px;}';
        document.head.appendChild(searchStyle);
    }
    initGlobalSearch();

    function initPageLoadTime() {
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log('%c⏱️ Page interactive in ' + Math.round(loadTime) + 'ms', 'color: #6b6560; font-size: 10px;');
        });
    }
    initPageLoadTime();

    function initDynamicFavicon() {
        const link = document.querySelector('link[rel="icon"]') || document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👜</text></svg>';
        document.head.appendChild(link);
    }
    initDynamicFavicon();

    function initUnreadNotifications() {
        let notificationCount = 0;
        const originalTitle = document.title;
        setInterval(function() {
            if (document.hidden) {
                notificationCount++;
                document.title = '(' + notificationCount + ') New updates - PrimeP';
            } else {
                notificationCount = 0;
                document.title = originalTitle;
            }
        }, 30000);
    }
    initUnreadNotifications();

    function initLazySectionLoader() {
        const sections = document.querySelectorAll('.section[data-lazy]');
        const lazySectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const content = section.getAttribute('data-lazy-content');
                    if (content) {
                        section.innerHTML = content;
                        section.removeAttribute('data-lazy-content');
                    }
                    lazySectionObserver.unobserve(section);
                }
            });
        }, { rootMargin: '200px' });
        sections.forEach(function(s) { lazySectionObserver.observe(s); });
    }
    initLazySectionLoader();

    function initMobileNavEnhance() {
        const overlay = document.createElement('div');
        overlay.id = 'navOverlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:999;opacity:0;visibility:hidden;transition:all 0.3s ease;';
        document.body.appendChild(overlay);
        hamburger.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('active');
            overlay.style.opacity = isOpen ? '1' : '0';
            overlay.style.visibility = isOpen ? 'visible' : 'hidden';
        });
        overlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            this.style.opacity = '0';
            this.style.visibility = 'hidden';
        });
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            });
        });
    }
    initMobileNavEnhance();

    function initScrollDirectionDetection() {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll && currentScroll > 300) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }
    initScrollDirectionDetection();

    function initElementAnimations() {
        const animStyle = document.createElement('style');
        animStyle.textContent = '@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}' +
            '@keyframes fadeIn{from{opacity:0}to{opacity:1}}' +
            '@keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}' +
            '@keyframes slideLeft{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}' +
            '@keyframes slideRight{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}' +
            '@keyframes floatAnim{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}' +
            '.anim-slide-up{animation:slideUp 0.6s ease forwards;}' +
            '.anim-fade-in{animation:fadeIn 0.6s ease forwards;}' +
            '.anim-scale-in{animation:scaleIn 0.5s ease forwards;}' +
            '.anim-slide-left{animation:slideLeft 0.6s ease forwards;}' +
            '.anim-slide-right{animation:slideRight 0.6s ease forwards;}' +
            '.anim-float{animation:floatAnim 3s ease-in-out infinite;}';
        document.head.appendChild(animStyle);
        document.querySelectorAll('.product-card').forEach(function(card, i) {
            card.style.opacity = '0';
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.classList.add('anim-slide-up');
                        }, i * 50);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(card);
        });
    }
    initElementAnimations();

    console.log('%c🚀 PrimeP v2.0 | ' + new Date().getFullYear() + ' | Built with passion from around the globe', 'color: #c9a96e; font-size: 12px; font-weight: bold;');
    console.log('%c📌 Press "/" to search | "C" for cart | "T" for theme | "W" for wishlist', 'color: #6b6560; font-size: 10px;');
    console.log('%c💡 Tip: Try PrimeP.help() in the console', 'color: #6b6560; font-size: 10px;');
    console.log('%c🌍 "Luxury knows no borders." — PrimeP', 'color: #c9a96e; font-size: 11px; font-style: italic;');

    function initEventDelegation() {
        document.addEventListener('click', function(e) {
            const quickViewBtn = e.target.closest('.quick-view');
            if (quickViewBtn) {
                const id = quickViewBtn.getAttribute('data-id');
                if (id) { e.preventDefault(); e.stopPropagation(); openModalById(id); }
                return;
            }
            const addCartBtn = e.target.closest('.btn-add-cart');
            if (addCartBtn) {
                const id = addCartBtn.getAttribute('data-id');
                const name = addCartBtn.getAttribute('data-name');
                const price = addCartBtn.getAttribute('data-price');
                const image = addCartBtn.getAttribute('data-image');
                if (id) { e.preventDefault(); e.stopPropagation(); addToCart(id, name, price, image); }
                return;
            }
            const wishlistBtn = e.target.closest('.add-wishlist');
            if (wishlistBtn) {
                e.preventDefault(); e.stopPropagation();
                const id = wishlistBtn.getAttribute('data-id');
                const heart = wishlistBtn.querySelector('i');
                const idx = wishlist.indexOf(id);
                if (idx > -1) { wishlist.splice(idx,1); heart.className='far fa-heart'; heart.style.color=''; showToast('Removed from wishlist','info'); }
                else { wishlist.push(id); heart.className='fas fa-heart'; heart.style.color='#e74c3c'; showToast('Added to wishlist','success'); }
                localStorage.setItem('primep_wishlist',JSON.stringify(wishlist));
            }
        });
    }
    initEventDelegation();

    function initHeroVideoParallax() {
        const heroBg = document.querySelector('.hero-bg');
        if (!heroBg) return;
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollPos = window.scrollY;
                    const opacity = Math.max(0, 1 - scrollPos / 700);
                    heroBg.style.opacity = opacity;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    initHeroVideoParallax();

    function initCustomScrollbar() {
        const style = document.createElement('style');
        style.textContent = '::-webkit-scrollbar{width:6px;height:6px;}' +
            '::-webkit-scrollbar-track{background:var(--bg-dark);}' +
            '::-webkit-scrollbar-thumb{background:var(--border-light);border-radius:3px;}' +
            '::-webkit-scrollbar-thumb:hover{background:var(--primary);}' +
            '*{scrollbar-width:thin;scrollbar-color:var(--border-light) var(--bg-dark);}';
        document.head.appendChild(style);
    }
    initCustomScrollbar();

    function initCategoryHoverEffects() {
        document.querySelectorAll('.category-card').forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                const overlay = this.querySelector('.category-overlay h3');
                if (overlay) overlay.style.transform = 'translateY(-4px)';
            });
            card.addEventListener('mouseleave', function() {
                const overlay = this.querySelector('.category-overlay h3');
                if (overlay) overlay.style.transform = '';
            });
        });
    }
    initCategoryHoverEffects();

    function initPriceAnimation() {
        document.querySelectorAll('.product-price').forEach(function(el) {
            const text = el.textContent;
            const num = parseFloat(text.replace(/[^0-9.]/g, ''));
            if (!isNaN(num)) {
                el.setAttribute('data-price', num);
            }
        });
    }
    initPriceAnimation();

    function initSmoothCardEntrance() {
        const cards = document.querySelectorAll('.team-card, .value-card, .award-card, .service-card, .press-card');
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(function(card, i) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease ' + (i * 0.05) + 's';
            cardObserver.observe(card);
        });
    }
    initSmoothCardEntrance();

    function initTooltipSystem() {
        const tooltipStyle = document.createElement('style');
        tooltipStyle.textContent = '[data-tooltip]{position:relative;}[data-tooltip]:hover::after{content:attr(data-tooltip);position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);padding:6px 12px;border-radius:6px;background:var(--bg-dark);color:var(--text-primary);font-size:0.7rem;white-space:nowrap;z-index:100;border:1px solid var(--border-color);box-shadow:0 4px 12px rgba(0,0,0,0.3);}';
        document.head.appendChild(tooltipStyle);
        document.querySelectorAll('.nav-icon-btn, .product-action, .social-icons a, .footer-social a').forEach(function(el) {
            const label = el.getAttribute('aria-label') || el.querySelector('i')?.className?.replace(/[^a-zA-Z]/g, '') || 'Action';
            if (!el.hasAttribute('data-tooltip')) {
                el.setAttribute('data-tooltip', label.charAt(0).toUpperCase() + label.slice(1));
            }
        });
    }
    initTooltipSystem();

    function initResponsiveTables() {
        const style = document.createElement('style');
        style.textContent = '@media(max-width:768px){.products-grid{gap:12px;}.product-img{height:200px;}.product-info{padding:14px;}.product-name{font-size:0.95rem;}.hero-title{font-size:2rem;}.section-title{font-size:1.6rem;}.testimonial-text{font-size:0.9rem;}.category-card{height:220px;}.limited-img{height:160px;}.limited-featured .limited-img{height:200px;}.gallery-grid{grid-template-rows:repeat(7,160px);gap:8px;}.insta-grid{gap:4px;}.blog-img{height:160px;}.team-img{width:100px;height:100px;}.value-card{padding:24px 16px;}.award-card{padding:20px 16px;}.service-card{padding:24px 16px;}.testimonial-card{padding:16px;}}';
        document.head.appendChild(style);
    }
    initResponsiveTables();

    function initErrorBoundary() {
        window.addEventListener('error', function(e) {
            console.log('%c⚠️ Error caught: ' + (e.message || 'Unknown'), 'color: #e74c3c; font-size: 10px;');
            e.preventDefault();
        });
        window.addEventListener('unhandledrejection', function(e) {
            console.log('%c⚠️ Promise rejected: ' + (e.reason || 'Unknown'), 'color: #e74c3c; font-size: 10px;');
            e.preventDefault();
        });
    }
    initErrorBoundary();

    function initProductCardLinks() {
        document.querySelectorAll('.product-card').forEach(function(card) {
            card.style.cursor = 'pointer';
        });
    }
    initProductCardLinks();

    console.log('%c🌟 Thank you for visiting PrimeP!', 'color: #c9a96e; font-size: 14px; font-weight: bold;');
    console.log('%c📬 Questions? Email concierge@primep.com', 'color: #6b6560; font-size: 11px;');

})();