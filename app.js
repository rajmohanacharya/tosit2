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
                "https://ppl-ai-image-service.s3.amazonaws.com/web-images/image:66",
                "https://ppl-ai-image-service.s3.amazonaws.com/web-images/image:68"
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
                "https://ppl-ai-image-service.s3.amazonaws.com/web-images/image:64",
                "https://ppl-ai-image-service.s3.amazonaws.com/web-images/image:67"
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
                "https://ppl-ai-image-service.s3.amazonaws.com/web-images/image:65"
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
                "https://ppl-ai-image-service.s3.amazonaws.com/web-images/image:69"
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
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500"
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
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
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

function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            showSection(section);
            updateActiveNavLink(link);
        });
    });

    // Action cards
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const section = card.dataset.section;
            if (section) {
                showSection(section);
                updateActiveNavLink(document.querySelector(`[href="#${section}"]`));
            }
        });
    });

    // Cart button
    cartBtn.addEventListener('click', () => {
        showCartModal();
    });

    // Filters
    setupFilters();

    // Sell form
    setupSellForm();

    // Contact form
    setupContactForm();

    // Modal functionality
    setupModals();
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
            <small> - ${match.laptop.processor} | ${match.laptop.ram} | ₹${match.laptop.sell_price.toLocaleString()}</small>
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
    searchSuggestions.style.display = 'none';
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
}

function showSection(sectionId) {
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
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
    const gradeClass = laptop.grade === 'A' ? 'excellent' : laptop.grade === 'B' ? 'good' : 'fair';
    
    // Use first image if available, otherwise fallback to emoji
    const imageHtml = laptop.images && laptop.images.length > 0 
        ? `<img src="${laptop.images[0]}" alt="${laptop.brand} ${laptop.model}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div style="display:none; font-size:4rem; color:#6b7280; align-items:center; justify-content:center; height:100%;">💻</div>`
        : `<div style="font-size:4rem; color:#6b7280;">💻</div>`;
    
    card.innerHTML = `
        <div class="laptop-image">${imageHtml}</div>
        <div class="laptop-details">
            <div class="laptop-brand">${laptop.brand}</div>
            <div class="laptop-model">${laptop.model}</div>
            <div class="laptop-specs">
                <span>Processor: ${laptop.processor}</span>
                <span>RAM: ${laptop.ram}</span>
                <span>Storage: ${laptop.storage}</span>
                <span>Screen: ${laptop.screen}</span>
            </div>
            <div class="grade-badge ${gradeClass}">Grade ${laptop.grade} - ${laptop.condition}</div>
            <div class="laptop-pricing">
                <span class="original-price">₹${laptop.original_price.toLocaleString()}</span>
                <span class="current-price">₹${laptop.sell_price.toLocaleString()}</span>
                <span class="discount">${discountPercent}% OFF</span>
            </div>
            <div class="laptop-actions">
                <button class="btn btn--outline" onclick="viewLaptopDetails(${laptop.id})">View Details</button>
                <button class="btn btn--primary" onclick="addToCart(${laptop.id})">Add to Cart</button>
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

    // Grade filters
    const gradeFilters = document.getElementById('gradeFilters');
    if (gradeFilters) {
        gradeFilters.addEventListener('change', applyFilters);
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

    // Grade filter
    const selectedGrades = Array.from(document.querySelectorAll('#gradeFilters input:checked')).map(cb => cb.value);
    if (selectedGrades.length > 0) {
        filtered = filtered.filter(laptop => selectedGrades.includes(laptop.grade));
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
        case 'grade':
            filteredLaptops.sort((a, b) => a.grade.localeCompare(b.grade));
            break;
    }

    loadProductGrid();
}

function clearAllFilters() {
    // Clear all checkboxes
    document.querySelectorAll('#brandFilters input, #gradeFilters input, #ramFilters input').forEach(cb => cb.checked = false);
    
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
    const gradeClass = laptop.grade === 'A' ? 'excellent' : laptop.grade === 'B' ? 'good' : 'fair';

    // Create image gallery
    const imageGallery = laptop.images && laptop.images.length > 0 
        ? `<div class="image-gallery">
             ${laptop.images.map((img, index) => 
                `<img src="${img}" alt="${laptop.brand} ${laptop.model} - Image ${index + 1}" 
                     style="width: 100%; margin-bottom: 8px; border-radius: 8px;" 
                     onerror="this.style.display='none';">`
             ).join('')}
           </div>`
        : `<div class="product-detail__image">💻</div>`;

    modalContent.innerHTML = `
        <div class="product-detail">
            ${imageGallery}
            <div class="product-detail__info">
                <h2>${laptop.brand} ${laptop.model}</h2>
                <div class="grade-badge ${gradeClass}">Grade ${laptop.grade} - ${laptop.condition}</div>
                
                <div class="pricing">
                    <span class="original-price">₹${laptop.original_price.toLocaleString()}</span>
                    <span class="current-price">₹${laptop.sell_price.toLocaleString()}</span>
                    <span class="discount">${discountPercent}% OFF</span>
                </div>
                
                <div class="specifications">
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
                            <span class="spec-label">Warranty:</span>
                            <span class="spec-value">${laptop.warranty}</span>
                        </div>
                    </div>
                </div>
                
                <div class="features">
                    <h3>Key Features</h3>
                    <ul>
                        ${laptop.features.map(feature => `<li>✅ ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="actions">
                    <button class="btn btn--primary" onclick="addToCart(${laptop.id})">Add to Cart</button>
                    <button class="btn btn--secondary" onclick="closeModal('productModal')">Close</button>
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
    cartCount.textContent = count;
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
                    <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
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
    }
    
    .image-gallery img:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);
