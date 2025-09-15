// The One Source IT Solutions - Enhanced Laptop Marketplace JavaScript

// Application Data with Multiple Images
const laptopData = {
    "laptops": [
        {
            "id": 1,
            "brand": "Dell",
            "model": "Latitude 7480",
            "processor": "Intel Core i7 6th Gen",
            "ram": "8GB",
            "storage": "256GB SSD",
            "screen": "14 inch",
            "grade": "A",
            "condition": "Excellent",
            "original_price": 65000,
            "sell_price": 24999,
            "buy_price": 18000,
            "warranty": "12 months",
            "images": [
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
            ],
            "features": ["Business Grade", "Lightweight", "Long Battery Life"]
        },
        {
            "id": 2,
            "brand": "HP",
            "model": "EliteBook 840 G6",
            "processor": "Intel Core i5 8th Gen",
            "ram": "8GB",
            "storage": "256GB SSD",
            "screen": "14 inch",
            "grade": "B",
            "condition": "Good",
            "original_price": 75000,
            "sell_price": 29999,
            "buy_price": 22000,
            "warranty": "12 months",
            "images": [
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop"
            ],
            "features": ["Professional Series", "Security Chip", "Durable Design"]
        },
        {
            "id": 3,
            "brand": "Lenovo",
            "model": "ThinkPad X1 Carbon",
            "processor": "Intel Core i7 8th Gen",
            "ram": "16GB",
            "storage": "512GB SSD",
            "screen": "14 inch",
            "grade": "A",
            "condition": "Excellent",
            "original_price": 120000,
            "sell_price": 45999,
            "buy_price": 35000,
            "warranty": "12 months",
            "images": [
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop"
            ],
            "features": ["Premium Build", "Carbon Fiber", "Ultra Lightweight"]
        },
        {
            "id": 4,
            "brand": "Apple",
            "model": "MacBook Air M1",
            "processor": "Apple M1 Chip",
            "ram": "8GB",
            "storage": "256GB SSD",
            "screen": "13.3 inch",
            "grade": "A",
            "condition": "Excellent",
            "original_price": 99900,
            "sell_price": 65999,
            "buy_price": 55000,
            "warranty": "12 months",
            "images": [
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop"
            ],
            "features": ["M1 Processor", "All Day Battery", "Retina Display"]
        },
        {
            "id": 5,
            "brand": "ASUS",
            "model": "ZenBook 14",
            "processor": "AMD Ryzen 5 Pro",
            "ram": "8GB",
            "storage": "512GB SSD",
            "screen": "14 inch",
            "grade": "B",
            "condition": "Good",
            "original_price": 60000,
            "sell_price": 32999,
            "buy_price": 25000,
            "warranty": "12 months",
            "images": [
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop"
            ],
            "features": ["AMD Ryzen", "Full HD Display", "Fast Performance"]
        },
        {
            "id": 6,
            "brand": "Dell",
            "model": "Precision 5540",
            "processor": "Intel Core i9 9th Gen",
            "ram": "32GB",
            "storage": "1TB SSD",
            "screen": "15.6 inch",
            "grade": "A",
            "condition": "Excellent",
            "original_price": 200000,
            "sell_price": 85999,
            "buy_price": 70000,
            "warranty": "12 months",
            "images": [
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
            ],
            "features": ["Workstation Grade", "4K Display", "High Performance"]
        }
    ]
};

// Global variables
let cart = JSON.parse(localStorage.getItem('theonesourceitCart')) || [];
let filteredLaptops = [...laptopData.laptops];
let currentStep = 1;

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const actionCards = document.querySelectorAll('.action-card');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchSuggestions = document.getElementById('searchSuggestions');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateCartCount();
    loadFeaturedLaptops();
    loadProductGrid();
    setupEventListeners();
    setupSearch();
    setupPolicyNavigation(); // NEW: Setup policy page navigation
});

function initializeApp() {
    // Show home section by default
    showSection('home');

    // Set minimum date for pickup scheduling
    const pickupDateInput = document.getElementById('pickupDate');
    if (pickupDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        pickupDateInput.min = tomorrow.toISOString().split('T')[0];
    }
}

// NEW: Setup policy page navigation
function setupPolicyNavigation() {
    // Handle all hash links (including footer policy links)
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            if (sectionId) {
                showSection(sectionId);
                // Update nav active state if it's a main nav link
                updateActiveNavLink(document.querySelector(`nav a[href="#${sectionId}"]`));
            }
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const sectionId = window.location.hash ? window.location.hash.substring(1) : 'home';
        showSection(sectionId);
    });

    // Handle initial hash on page load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        showSection(sectionId);
    }
}

function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            showSection(section);
            updateActiveNavLink(link);
            // Update URL hash
            window.history.pushState(null, '', `#${section}`);
        });
    });

    // Action cards
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const section = card.dataset.section;
            if (section) {
                showSection(section);
                updateActiveNavLink(document.querySelector(`[href="#${section}"]`));
                window.history.pushState(null, '', `#${section}`);
            }
        });
    });

    // Cart button
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            showCartModal();
        });
    }

    // Filters
    setupFilters();

    // Sell form
    setupSellForm();

    // Contact form
    setupContactForm();

    // Modal functionality
    setupModals();
}

// Enhanced showSection function with policy page support
function showSection(sectionId) {
    console.log('Showing section:', sectionId); // Debug log

    // Hide all sections
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Policy pages are embedded in home section, so we need special handling
    const policyPages = ['faq', 'warranty', 'refund', 'privacy', 'terms'];

    if (policyPages.includes(sectionId)) {
        // Show the home section but scroll to policy content
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.style.display = 'block';
        }

        // Find and show the specific policy section
        const policySection = document.getElementById(sectionId);
        if (policySection) {
            // Hide all policy sections first
            policyPages.forEach(pageId => {
                const page = document.getElementById(pageId);
                if (page && page.style) {
                    page.style.display = 'none';
                }
            });

            // Show the requested policy section
            policySection.style.display = 'block';

            // Scroll to the policy section
            setTimeout(() => {
                policySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            console.warn('Policy section not found:', sectionId);
            // Fallback: create policy sections dynamically if they don't exist
            createPolicySection(sectionId);
        }
    } else {
        // Regular sections
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        } else {
            // Fallback to home
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.style.display = 'block';
            }
        }

        // Hide all policy sections when showing regular sections
        policyPages.forEach(pageId => {
            const page = document.getElementById(pageId);
            if (page && page.style) {
                page.style.display = 'none';
            }
        });
    }
}

// NEW: Create policy section dynamically if missing
function createPolicySection(sectionId) {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    let content = '';
    let title = '';

    switch(sectionId) {
        case 'faq':
            title = 'Frequently Asked Questions';
            content = `
                <div class="section--policy">
                    <div class="container">
                        <h2 class="section__title">Frequently Asked Questions</h2>
                        <div class="faq-content">
                            <div class="faq-item">
                                <h4>What is a refurbished laptop?</h4>
                                <p>A refurbished laptop is a pre-owned device that has been professionally restored to like-new condition. Each laptop undergoes comprehensive testing, cleaning, component replacement (if needed), and quality certification before being offered for sale.</p>
                            </div>
                            <div class="faq-item">
                                <h4>What warranty do you provide?</h4>
                                <p>All refurbished laptops come with a comprehensive 12-month warranty covering all hardware components, including motherboard, processor, RAM, storage, display, and battery. We also provide 15 days return policy for complete satisfaction.</p>
                            </div>
                            <div class="faq-item">
                                <h4>How do I sell my laptop to you?</h4>
                                <p>Our selling process is simple: (1) Provide your laptop details online, (2) Answer condition assessment questions, (3) Receive instant quote, (4) Schedule free pickup. We handle evaluation, payment processing, and provide instant payment upon verification.</p>
                            </div>
                            <div class="faq-item">
                                <h4>Do you provide free pickup and delivery?</h4>
                                <p>Yes! We offer completely free doorstep pickup for laptop sales and free delivery for purchases within Bangalore and major Indian cities. For remote locations, nominal shipping charges may apply.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'warranty':
            title = 'Warranty Policy';
            content = `
                <div class="section--policy">
                    <div class="container">
                        <h2 class="section__title">Warranty Policy</h2>
                        <div class="policy-content">
                            <h3>12-Month Comprehensive Warranty</h3>
                            <p>At The One Source IT Solutions, we provide comprehensive warranty coverage on all our refurbished laptops to ensure your complete peace of mind.</p>
                            <h3>What's Covered</h3>
                            <ul>
                                <li>Motherboard and all internal components</li>
                                <li>Processor and memory modules</li>
                                <li>Display and backlight system</li>
                                <li>Keyboard and touchpad</li>
                                <li>Battery (minimum 70% capacity guarantee)</li>
                                <li>All ports and connectivity features</li>
                            </ul>
                            <h3>Warranty Support</h3>
                            <p><strong>Phone:</strong> +91-9876543210<br>
                            <strong>Email:</strong> warranty@theonesourceit.com<br>
                            <strong>Hours:</strong> Monday to Saturday, 9:00 AM to 7:00 PM</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'refund':
            title = 'Refund Policy';
            content = `
                <div class="section--policy">
                    <div class="container">
                        <h2 class="section__title">Refund Policy</h2>
                        <div class="policy-content">
                            <h3>15-Day Money Back Guarantee</h3>
                            <p>We stand behind the quality of our refurbished laptops with a comprehensive 15-day money back guarantee. If you're not completely satisfied with your purchase, we'll provide a full refund with no questions asked.</p>
                            <h3>Return Process</h3>
                            <ol>
                                <li>Contact us at +91-9876543210 or refunds@theonesourceit.com</li>
                                <li>Provide your order number and reason for return</li>
                                <li>Receive return authorization and instructions</li>
                                <li>Pack the item securely with all accessories</li>
                                <li>Schedule free pickup or drop at our center</li>
                                <li>Receive inspection confirmation and refund</li>
                            </ol>
                            <h3>Refund Timeline</h3>
                            <p>Refunds are processed within 5-7 business days after we receive and inspect the returned item.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'privacy':
            title = 'Privacy Policy';
            content = `
                <div class="section--policy">
                    <div class="container">
                        <h2 class="section__title">Privacy Policy</h2>
                        <div class="policy-content">
                            <h3>Information We Collect</h3>
                            <p>We collect information to provide better services to our customers, including personal information, device specifications, and transaction data.</p>
                            <h3>How We Use Information</h3>
                            <ul>
                                <li>Process transactions and provide services</li>
                                <li>Communicate about orders and support</li>
                                <li>Improve our services and customer experience</li>
                                <li>Comply with legal requirements</li>
                            </ul>
                            <h3>Data Security</h3>
                            <p>We implement appropriate security measures to protect your information through encrypted transmission, secure storage, and limited access protocols.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'terms':
            title = 'Terms of Service';
            content = `
                <div class="section--policy">
                    <div class="container">
                        <h2 class="section__title">Terms of Service</h2>
                        <div class="policy-content">
                            <h3>Agreement to Terms</h3>
                            <p>By accessing and using The One Source IT Solutions services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                            <h3>Services Description</h3>
                            <p>We provide a marketplace for buying and selling refurbished laptops, including quality assessment, refurbishment, warranty services, and customer support.</p>
                            <h3>Limitation of Liability</h3>
                            <p>Our liability is limited to the purchase price of the product. We are not responsible for indirect, consequential, or incidental damages.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
    }

    // Create the section element
    const policySection = document.createElement('section');
    policySection.id = sectionId;
    policySection.className = 'section';
    policySection.innerHTML = content;
    policySection.style.display = 'block';

    // Append to home section or body
    homeSection.appendChild(policySection);

    // Scroll to the new section
    setTimeout(() => {
        policySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function updateActiveNavLink(activeLink) {
    if (!activeLink) return;
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Enhanced Search Functionality
function setupSearch() {
    if (!searchInput || !searchBtn || !searchSuggestions) return;

    // Create search index
    const searchIndex = createSearchIndex();

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length >= 2) {
            showSearchSuggestions(query, searchIndex);
        } else {
            hideSearchSuggestions();
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchInput.value);
        }
    });

    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSearchSuggestions();
        }
    });
}

function createSearchIndex() {
    const index = [];
    laptopData.laptops.forEach(laptop => {
        // Add various searchable terms
        const terms = [
            laptop.brand,
            laptop.model,
            `${laptop.brand} ${laptop.model}`,
            laptop.processor,
            laptop.ram,
            laptop.storage,
            laptop.screen,
            laptop.grade,
            laptop.condition,
            ...laptop.features
        ];

        terms.forEach(term => {
            if (term && typeof term === 'string') {
                index.push({
                    term: term.toLowerCase(),
                    laptop: laptop,
                    displayText: `${laptop.brand} ${laptop.model}`
                });
            }
        });
    });
    return index;
}

function showSearchSuggestions(query, index) {
    const matches = index.filter(item => 
        item.term.includes(query)
    ).slice(0, 8); // Limit to 8 suggestions

    if (matches.length === 0) {
        hideSearchSuggestions();
        return;
    }

    // Remove duplicates based on laptop ID
    const uniqueMatches = matches.filter((match, index, self) => 
        index === self.findIndex(m => m.laptop.id === match.laptop.id)
    );

    searchSuggestions.innerHTML = uniqueMatches.map(match => 
        `<div class="search-suggestion" data-laptop-id="${match.laptop.id}">
            <strong>${match.displayText}</strong>
            <span> - ${match.laptop.processor} | ${match.laptop.ram} | ₹${match.laptop.sell_price.toLocaleString()}</span>
        </div>`
    ).join('');

    // Add click handlers to suggestions
    searchSuggestions.querySelectorAll('.search-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            const laptopId = parseInt(suggestion.dataset.laptopId);
            viewLaptopDetails(laptopId);
            hideSearchSuggestions();
            searchInput.value = suggestion.querySelector('strong').textContent;
        });
    });

    searchSuggestions.style.display = 'block';
}

function hideSearchSuggestions() {
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
}

function performSearch(query) {
    if (!query.trim()) return;

    const searchTerm = query.toLowerCase();
    filteredLaptops = laptopData.laptops.filter(laptop => {
        return laptop.brand.toLowerCase().includes(searchTerm) ||
               laptop.model.toLowerCase().includes(searchTerm) ||
               laptop.processor.toLowerCase().includes(searchTerm) ||
               laptop.features.some(feature => feature.toLowerCase().includes(searchTerm));
    });

    // Switch to buy section and update results
    showSection('buy');
    updateActiveNavLink(document.querySelector('[href="#buy"]'));
    loadProductGrid();
    hideSearchSuggestions();
    window.history.pushState(null, '', '#buy');
}

function loadFeaturedLaptops() {
    const featuredGrid = document.getElementById('featuredLaptops');
    if (!featuredGrid) return;

    const featuredLaptops = laptopData.laptops.slice(0, 6);
    featuredGrid.innerHTML = '';

    featuredLaptops.forEach(laptop => {
        const laptopCard = createLaptopCard(laptop);
        featuredGrid.appendChild(laptopCard);
    });
}

function loadProductGrid() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    if (filteredLaptops.length === 0) {
        productsGrid.innerHTML = '<p>No laptops found matching your criteria.</p>';
        return;
    }

    filteredLaptops.forEach(laptop => {
        const laptopCard = createLaptopCard(laptop);
        productsGrid.appendChild(laptopCard);
    });

    updateResultsCount();
}

function createLaptopCard(laptop) {
    const card = document.createElement('div');
    card.className = 'laptop-card';

    const discountPercent = Math.round((1 - laptop.sell_price / laptop.original_price) * 100);

    // Use first image if available, otherwise fallback to emoji
    const imageHtml = laptop.images && laptop.images.length > 0 
        ? `<img src="${laptop.images[0]}" alt="${laptop.brand} ${laptop.model}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div class="laptop-emoji" style="display:none; font-size: 4rem; align-items: center; justify-content: center; height: 220px;">💻</div>`
        : `<div class="laptop-emoji" style="font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 220px;">💻</div>`;

    // Stock status
    const stockStatus = laptop.id <= 3 ? 'low' : 'available';
    const stockText = laptop.id <= 3 ? `⚠ Only ${Math.floor(Math.random() * 8) + 2} left` : '✓ In stock';

    card.innerHTML = `
        <div class="laptop-image">
            ${imageHtml}
        </div>
        <div class="laptop-details">
            <div class="laptop-brand">${laptop.brand}</div>
            <div class="laptop-model">${laptop.model}</div>
            <div class="laptop-specs">
                <div>Processor: ${laptop.processor}</div>
                <div>RAM: ${laptop.ram}</div>
                <div>Storage: ${laptop.storage}</div>
                <div>Screen: ${laptop.screen}</div>
            </div>
            <div class="stock-info stock-${stockStatus}">${stockText}</div>
            <div class="laptop-pricing">
                <span class="original-price">₹${laptop.original_price.toLocaleString()}</span>
                <span class="current-price">₹${laptop.sell_price.toLocaleString()}</span>
                <span class="discount">${discountPercent}% OFF</span>
            </div>
            <div class="laptop-actions">
                <button class="btn btn--primary" onclick="viewLaptopDetails(${laptop.id})">View Details</button>
                <button class="btn btn--outline" onclick="addToCart(${laptop.id})">Add to Cart</button>
            </div>
        </div>
    `;

    return card;
}

function setupFilters() {
    // Brand filters
    const brandFilters = document.getElementById('brandFilters');
    if (brandFilters) {
        brandFilters.addEventListener('change', applyFilters);
    }

    // RAM filters (now checkboxes)
    const ramFilters = document.getElementById('ramFilters');
    if (ramFilters) {
        ramFilters.addEventListener('change', applyFilters);
    }

    // Price filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }

    // Sort by
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', applySorting);
    }

    // Clear filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }
}

function applyFilters() {
    let filtered = [...laptopData.laptops];

    // Brand filter
    const selectedBrands = Array.from(document.querySelectorAll('#brandFilters input:checked')).map(cb => cb.value);
    if (selectedBrands.length > 0) {
        filtered = filtered.filter(laptop => selectedBrands.includes(laptop.brand));
    }

    // RAM filter (now checkboxes)
    const selectedRAM = Array.from(document.querySelectorAll('#ramFilters input:checked')).map(cb => cb.value);
    if (selectedRAM.length > 0) {
        filtered = filtered.filter(laptop => selectedRAM.includes(laptop.ram));
    }

    // Price filter
    const priceRange = document.getElementById('priceFilter').value;
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(laptop => {
            if (max) {
                return laptop.sell_price >= min && laptop.sell_price <= max;
            } else {
                return laptop.sell_price >= min;
            }
        });
    }

    filteredLaptops = filtered;
    applySorting();
}

function applySorting() {
    const sortBy = document.getElementById('sortBy').value;

    switch (sortBy) {
        case 'price-low':
            filteredLaptops.sort((a, b) => a.sell_price - b.sell_price);
            break;
        case 'price-high':
            filteredLaptops.sort((a, b) => b.sell_price - a.sell_price);
            break;
        case 'brand':
            filteredLaptops.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
    }

    loadProductGrid();
}

function clearAllFilters() {
    // Clear all checkboxes
    document.querySelectorAll('#brandFilters input, #ramFilters input').forEach(cb => cb.checked = false);

    // Clear selects
    document.getElementById('priceFilter').value = '';
    document.getElementById('sortBy').value = 'price-low';

    // Reset filtered laptops
    filteredLaptops = [...laptopData.laptops];
    loadProductGrid();
}

function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = filteredLaptops.length;
    }
}

function viewLaptopDetails(laptopId) {
    const laptop = laptopData.laptops.find(l => l.id === laptopId);
    if (!laptop) return;

    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');

    const discountPercent = Math.round((1 - laptop.sell_price / laptop.original_price) * 100);

    // Create image gallery
    const imageGallery = laptop.images && laptop.images.length > 0 
        ? `<div class="image-gallery">
            ${laptop.images.map((img, index) => 
                `<img src="${img}" alt="${laptop.brand} ${laptop.model} - View ${index + 1}" onerror="this.style.display='none';">`
            ).join('')}
           </div>`
        : `<div style="font-size: 4rem; text-align: center; padding: 2rem;">💻</div>`;

    modalContent.innerHTML = `
        <span class="close" onclick="closeModal('productModal')">&times;</span>
        <div class="product-detail">
            <div class="product-detail__image">
                ${imageGallery}
            </div>
            <div class="product-detail__info">
                <h2>${laptop.brand} ${laptop.model}</h2>
                <div class="stock-info stock-available">Grade ${laptop.grade} - ${laptop.condition}</div>
                <div class="laptop-pricing">
                    <span class="original-price">₹${laptop.original_price.toLocaleString()}</span>
                    <span class="current-price">₹${laptop.sell_price.toLocaleString()}</span>
                    <span class="discount">${discountPercent}% OFF</span>
                </div>

                <h3>Specifications</h3>
                <div class="spec-grid">
                    <div class="spec-item">
                        <span class="spec-label">Processor:</span>
                        <span class="spec-value">${laptop.processor}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">RAM:</span>
                        <span class="spec-value">${laptop.ram}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Storage:</span>
                        <span class="spec-value">${laptop.storage}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Screen:</span>
                        <span class="spec-value">${laptop.screen}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Condition:</span>
                        <span class="spec-value">${laptop.condition}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Warranty:</span>
                        <span class="spec-value">${laptop.warranty}</span>
                    </div>
                </div>

                <h3>Key Features</h3>
                <ul>
                    ${laptop.features.map(feature => `<li>✅ ${feature}</li>`).join('')}
                </ul>

                <div class="laptop-actions">
                    <button class="btn btn--primary btn--full-width" onclick="addToCart(${laptop.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function addToCart(laptopId) {
    const laptop = laptopData.laptops.find(l => l.id === laptopId);
    if (!laptop) return;

    const existingItem = cart.find(item => item.id === laptopId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...laptop, quantity: 1 });
    }

    localStorage.setItem('theonesourceitCart', JSON.stringify(cart));
    updateCartCount();

    // Show success message
    showToast(`${laptop.brand} ${laptop.model} added to cart!`);
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = count;
    }
}

function showCartModal() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item__info">
                    <h4>${item.brand} ${item.model}</h4>
                    <p>₹${item.sell_price.toLocaleString()}</p>
                </div>
                <div class="cart-item__controls">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.sell_price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString();
    }

    modal.style.display = 'block';
}

function updateCartQuantity(laptopId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(laptopId);
        return;
    }

    const item = cart.find(item => item.id === laptopId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('theonesourceitCart', JSON.stringify(cart));
        updateCartCount();
        showCartModal(); // Refresh modal
    }
}

function removeFromCart(laptopId) {
    cart = cart.filter(item => item.id !== laptopId);
    localStorage.setItem('theonesourceitCart', JSON.stringify(cart));
    updateCartCount();
    showCartModal(); // Refresh modal
}

// Sell Section Functions
function setupSellForm() {
    // Set up sell form event listeners if elements exist
    const sellBrand = document.getElementById('sellBrand');
    const sellModel = document.getElementById('sellModel');
    const sellAge = document.getElementById('sellAge');

    if (sellBrand) {
        sellBrand.addEventListener('change', updateQuote);
    }
    if (sellModel) {
        sellModel.addEventListener('input', updateQuote);
    }
    if (sellAge) {
        sellAge.addEventListener('change', updateQuote);
    }

    // Condition assessment
    document.querySelectorAll('input[name="physical"], input[name="screen"], input[name="performance"]').forEach(radio => {
        radio.addEventListener('change', updateQuote);
    });
}

function nextStep(step) {
    // Hide current step
    document.querySelector('.form-step.active').classList.remove('active');
    document.querySelector('.step.active').classList.remove('active');

    // Show new step
    document.getElementById(`step${step}`).classList.add('active');
    document.querySelector(`[data-step="${step}"]`).classList.add('active');

    currentStep = step;

    if (step === 3) {
        calculateQuote();
    }
}

function prevStep(step) {
    nextStep(step);
}

function calculateQuote() {
    // Simple quote calculation based on form inputs
    const brand = document.getElementById('sellBrand').value;
    const age = document.getElementById('sellAge').value;
    const physical = document.querySelector('input[name="physical"]:checked')?.value;
    const screen = document.querySelector('input[name="screen"]:checked')?.value;
    const performance = document.querySelector('input[name="performance"]:checked')?.value;

    let baseValue = 30000; // Default base value

    // Adjust based on brand
    const brandMultipliers = {
        'Apple': 1.5,
        'Lenovo': 1.2,
        'Dell': 1.1,
        'HP': 1.0,
        'ASUS': 0.9,
        'Other': 0.8
    };
    baseValue *= (brandMultipliers[brand] || 1.0);

    // Adjust based on age
    const ageMultipliers = {
        '0-1': 1.0,
        '1-2': 0.8,
        '2-3': 0.6,
        '3-5': 0.4,
        '5+': 0.2
    };
    baseValue *= (ageMultipliers[age] || 0.5);

    // Condition adjustments
    let conditionDeduction = 0;
    if (physical === 'fair') conditionDeduction += 3000;
    if (physical === 'good') conditionDeduction += 1000;

    if (screen === 'major') conditionDeduction += 5000;
    if (screen === 'minor') conditionDeduction += 2000;

    if (performance === 'poor') conditionDeduction += 4000;
    if (performance === 'good') conditionDeduction += 1000;

    const finalQuote = Math.max(baseValue - conditionDeduction, 5000); // Minimum ₹5,000

    // Update quote display
    document.getElementById('baseValue').textContent = Math.round(baseValue).toLocaleString();
    document.getElementById('conditionAdjustment').textContent = Math.round(conditionDeduction).toLocaleString();
    document.getElementById('quoteAmount').textContent = Math.round(finalQuote).toLocaleString();
    document.getElementById('finalQuote').textContent = Math.round(finalQuote).toLocaleString();
}

function updateQuote() {
    if (currentStep === 2) {
        calculateQuote();
    }
}

function schedulePickup() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const date = document.getElementById('pickupDate').value;
    const time = document.getElementById('pickupTime').value;

    if (!name || !phone || !address || !date || !time) {
        showToast('Please fill all required fields', 'error');
        return;
    }

    // Simulate successful scheduling
    showToast('Pickup scheduled successfully! You will receive a confirmation call from The One Source IT Solutions shortly.', 'success');

    // Reset form
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('pickupDate').value = '';
    document.getElementById('pickupTime').value = '';

    // Go back to step 1
    nextStep(1);
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Message sent successfully! The One Source IT Solutions team will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Modal Functions
function setupModals() {
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Utility Functions
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    toast.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: ${type === 'success' ? '#16a34a' : '#dc2626'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 3000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        line-height: 1.4;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Add CSS animations for toasts and other effects
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .image-gallery {
        max-width: 300px;
    }

    .image-gallery img {
        transition: transform 0.2s ease;
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 8px;
    }

    .image-gallery img:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);
