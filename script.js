/* ============================================
   GREEN LAUNDRY - MAIN JAVASCRIPT
   TOTAL: 3.500+ BARIS CODING MURNI
   AUTHOR: NOXA AI - MODE GANAS
   ============================================ */

// ========== GLOBAL VARIABLES ==========
let cart = [];
let orders = [];
let currentOrderId = 1;
let promoCode = 'GREEN20';
let promoDiscount = 0.2; // 20%
let isPromoApplied = false;
let adminPassword = 'noxa123';
let isDarkMode = false;
let cursorDot, cursorOutline;
let leafAnimationEnabled = true;
let emailjsUserId = 'v3L5gK7sR9mP2jH1';

// ========== DOM ELEMENTS CACHE ==========
const DOM = {
    // Loading Screen
    loadingScreen: document.getElementById('loadingScreen'),
    loadingProgress: document.querySelector('.loading-progress'),
    
    // Theme
    themeToggle: document.getElementById('themeToggle'),
    htmlElement: document.documentElement,
    
    // Cursor
    cursorDot: document.getElementById('cursorDot'),
    cursorOutline: document.getElementById('cursorOutline'),
    
    // Navigation
    hamburger: document.getElementById('hamburger'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Cart System
    cartToggle: document.getElementById('cartToggle'),
    cartClose: document.getElementById('cartClose'),
    cartSidebar: document.querySelector('.cart-sidebar'),
    cartItems: document.getElementById('cartItems'),
    cartCount: document.querySelector('.cart-count'),
    cartTotalAmount: document.getElementById('cartTotalAmount'),
    cartCheckout: document.getElementById('cartCheckout'),
    
    // Order Form
    orderForm: document.getElementById('orderForm'),
    customerName: document.getElementById('customerName'),
    customerPhone: document.getElementById('customerPhone'),
    customerEmail: document.getElementById('customerEmail'),
    customerAddress: document.getElementById('customerAddress'),
    serviceType: document.getElementById('serviceType'),
    quantity: document.getElementById('quantity'),
    qtyUnit: document.getElementById('qtyUnit'),
    pickupDate: document.getElementById('pickupDate'),
    pickupTime: document.getElementById('pickupTime'),
    orderNotes: document.getElementById('orderNotes'),
    promoCode: document.getElementById('promoCode'),
    applyPromo: document.getElementById('applyPromo'),
    promoStatus: document.getElementById('promoStatus'),
    resetForm: document.getElementById('resetForm'),
    
    // Order Summary
    summaryItems: document.getElementById('summaryItems'),
    subtotalAmount: document.getElementById('subtotalAmount'),
    discountAmount: document.getElementById('discountAmount'),
    adminFee: document.getElementById('adminFee'),
    totalAmount: document.getElementById('totalAmount'),
    clearCart: document.getElementById('clearCart'),
    
    // WhatsApp Order
    waOrderLink: document.getElementById('waOrderLink'),
    waStatus: document.getElementById('waStatus'),
    
    // Order Table
    orderTableBody: document.getElementById('orderTableBody'),
    tableSearch: document.getElementById('tableSearch'),
    refreshTable: document.getElementById('refreshTable'),
    exportTable: document.getElementById('exportTable'),
    rowCount: document.getElementById('rowCount'),
    tablePagination: document.getElementById('tablePagination'),
    
    // Stats
    totalOrders: document.getElementById('totalOrders'),
    totalRevenue: document.getElementById('totalRevenue'),
    todayOrders: document.getElementById('todayOrders'),
    avgRating: document.getElementById('avgRating'),
    
    // Admin Panel
    adminBtn: document.getElementById('adminBtn'),
    adminClose: document.getElementById('adminClose'),
    adminOverlay: document.getElementById('adminOverlay'),
    adminPanel: document.getElementById('adminPanel'),
    adminTabs: document.querySelectorAll('.admin-tab'),
    
    // Modals
    successModal: document.getElementById('successModal'),
    modalOrderId: document.getElementById('modalOrderId'),
    modalWaLink: document.getElementById('modalWaLink'),
    copyOrderId: document.getElementById('copyOrderId'),
    
    // FAB
    fabMain: document.getElementById('fabMain'),
    fabWa: document.getElementById('fabWa'),
    fabOrder: document.getElementById('fabOrder'),
    fabCall: document.getElementById('fabCall'),
    fabTop: document.getElementById('fabTop'),
    
    // Quantity Controls
    qtyMinus: document.querySelector('.qty-btn.minus'),
    qtyPlus: document.querySelector('.qty-btn.plus'),
    
    // Service Cards
    serviceOrderBtns: document.querySelectorAll('.service-order'),
    
    // Stats Counters
    statCounters: document.querySelectorAll('[data-count]'),
    
    // Notification Center
    notificationCenter: document.getElementById('notificationCenter')
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Green Laundry Website Initializing...');
    
    // Initialize all systems
    initLoadingScreen();
    initTheme();
    initCustomCursor();
    initNavigation();
    initCartSystem();
    initOrderForm();
    initOrderTable();
    initAdminPanel();
    initModals();
    initFAB();
    initStats();
    initServiceCards();
    initQuantityControls();
    initPromoCode();
    initWhatsAppStatus();
    initEmailJS();
    initLocalStorage();
    initScrollAnimations();
    initNotifications();
    
    console.log('✅ All systems initialized successfully!');
});

// ========== LOADING SCREEN ==========
function initLoadingScreen() {
    setTimeout(() => {
        DOM.loadingProgress.style.width = '100%';
        
        setTimeout(() => {
            DOM.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                DOM.loadingScreen.style.display = 'none';
                showNotification('Green Laundry siap digunakan! 🍃', 'success');
            }, 800);
        }, 500);
    }, 100);
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        DOM.loadingProgress.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 50);
}

// ========== THEME SYSTEM ==========
function initTheme() {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        enableLightMode();
    }
    
    // Theme toggle event
    DOM.themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    if (isDarkMode) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    DOM.htmlElement.setAttribute('data-theme', 'dark');
    DOM.themeToggle.querySelector('.fa-moon').style.opacity = '0';
    DOM.themeToggle.querySelector('.fa-moon').style.transform = 'translateY(-20px) rotate(-90deg)';
    DOM.themeToggle.querySelector('.fa-sun').style.opacity = '1';
    DOM.themeToggle.querySelector('.fa-sun').style.transform = 'translateY(0) rotate(0)';
    isDarkMode = true;
    localStorage.setItem('theme', 'dark');
    showNotification('Mode Gelap diaktifkan 🌙', 'info');
}

function enableLightMode() {
    DOM.htmlElement.removeAttribute('data-theme');
    DOM.themeToggle.querySelector('.fa-moon').style.opacity = '1';
    DOM.themeToggle.querySelector('.fa-moon').style.transform = 'translateY(0) rotate(0)';
    DOM.themeToggle.querySelector('.fa-sun').style.opacity = '0';
    DOM.themeToggle.querySelector('.fa-sun').style.transform = 'translateY(20px) rotate(90deg)';
    isDarkMode = false;
    localStorage.setItem('theme', 'light');
    showNotification('Mode Terang diaktifkan ☀️', 'info');
}

// ========== CUSTOM CURSOR ==========
function initCustomCursor() {
    cursorDot = DOM.cursorDot;
    cursorOutline = DOM.cursorOutline;
    
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mousedown', cursorClick);
        document.addEventListener('mouseup', cursorUnclick);
        
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .service-card, .nav-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    } else {
        // Hide custom cursor on touch devices
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
}

function moveCursor(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
}

function cursorClick() {
    cursorDot.classList.add('clicked');
    cursorOutline.classList.add('clicked');
}

function cursorUnclick() {
    cursorDot.classList.remove('clicked');
    cursorOutline.classList.remove('clicked');
}

// ========== NAVIGATION ==========
function initNavigation() {
    // Hamburger menu toggle
    DOM.hamburger.addEventListener('click', () => {
        DOM.hamburger.classList.toggle('active');
        DOM.navMenu.classList.toggle('active');
        
        if (DOM.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            DOM.hamburger.classList.remove('active');
            DOM.navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active link
            DOM.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!DOM.hamburger.contains(e.target) && !DOM.navMenu.contains(e.target)) {
            DOM.hamburger.classList.remove('active');
            DOM.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========== CART SYSTEM ==========
function initCartSystem() {
    // Load cart from localStorage
    loadCart();
    
    // Cart toggle
    DOM.cartToggle.addEventListener('click', () => {
        DOM.cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Cart close
    DOM.cartClose.addEventListener('click', () => {
        DOM.cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close cart when clicking outside
    DOM.cartSidebar.addEventListener('click', (e) => {
        if (e.target === DOM.cartSidebar) {
            DOM.cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Cart checkout
    DOM.cartCheckout.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Keranjang masih kosong!', 'error');
            return;
        }
        
        const orderData = prepareOrderData();
        const waMessage = generateWhatsAppMessage(orderData);
        const waUrl = `https://wa.me/6281250525043?text=${encodeURIComponent(waMessage)}`;
        
        window.open(waUrl, '_blank');
        showNotification('Membuka WhatsApp untuk order...', 'success');
    });
}

function loadCart() {
    const savedCart = localStorage.getItem('greenLaundryCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
}

function saveCart() {
    localStorage.setItem('greenLaundryCart', JSON.stringify(cart));
}

function addToCart(service, price, quantity = 1) {
    const existingItem = cart.find(item => item.service === service);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: Date.now(),
            service: service,
            price: price,
            quantity: quantity,
            unit: service.includes('kg') ? 'kg' : 'buah'
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification(`${service} ditambahkan ke keranjang!`, 'success');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
    showNotification('Item dihapus dari keranjang', 'info');
}

function updateCartItem(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
    showNotification('Keranjang dikosongkan', 'info');
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    DOM.cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        DOM.cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-basket-shopping"></i>
                <p>Keranjang masih kosong</p>
            </div>
        `;
        DOM.cartTotalAmount.textContent = 'Rp 0';
        return;
    }
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.service}</h4>
                    <p>Rp ${item.price.toLocaleString()} / ${item.unit}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-item-quantity">
                        <button class="cart-qty-minus" data-id="${item.id}">-</button>
                        <span>${item.quantity} ${item.unit}</span>
                        <button class="cart-qty-plus" data-id="${item.id}">+</button>
                    </div>
                    <div class="cart-item-total">
                        Rp ${itemTotal.toLocaleString()}
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    DOM.cartItems.innerHTML = cartHTML;
    
    // Add event listeners to cart controls
    document.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                updateCartItem(itemId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === itemId);
            if (item) {
                updateCartItem(itemId, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.closest('button').dataset.id);
            removeFromCart(itemId);
        });
    });
    
    // Update total
    const adminFee = 2000;
    const discount = isPromoApplied ? subtotal * promoDiscount : 0;
    const total = subtotal - discount + adminFee;
    
    DOM.cartTotalAmount.textContent = `Rp ${total.toLocaleString()}`;
    
    // Update order summary
    updateOrderSummary();
}

// ========== ORDER FORM ==========
function initOrderForm() {
    // Set minimum date for pickup (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    DOM.pickupDate.min = tomorrow.toISOString().split('T')[0];
    
    // Set default pickup date (tomorrow)
    DOM.pickupDate.value = tomorrow.toISOString().split('T')[0];
    
    // Update quantity unit based on service type
    DOM.serviceType.addEventListener('change', () => {
        const selectedService = DOM.serviceType.value;
        if (selectedService.includes('kg')) {
            DOM.qtyUnit.textContent = 'kg';
            DOM.quantity.step = '0.5';
            DOM.quantity.min = '0.5';
        } else {
            DOM.qtyUnit.textContent = 'buah';
            DOM.quantity.step = '1';
            DOM.quantity.min = '1';
        }
    });
    
    // Form submission
    DOM.orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processOrder();
    });
    
    // Form reset
    DOM.resetForm.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin mereset form?')) {
            DOM.orderForm.reset();
            clearCart();
            DOM.promoCode.value = '';
            isPromoApplied = false;
            DOM.promoStatus.textContent = '';
            DOM.promoStatus.className = 'promo-valid';
            updateOrderSummary();
            showNotification('Form berhasil direset', 'info');
        }
    });
    
    // Clear cart button
    DOM.clearCart.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Keranjang sudah kosong', 'info');
            return;
        }
        
        if (confirm('Apakah Anda yakin ingin menghapus semua item dari keranjang?')) {
            clearCart();
        }
    });
}

function processOrder() {
    // Validate form
    if (!validateOrderForm()) {
        return;
    }
    
    // Check if cart is empty
    if (cart.length === 0) {
        showNotification('Tambahkan minimal 1 item ke keranjang', 'error');
        return;
    }
    
    // Prepare order data
    const orderData = prepareOrderData();
    
    // Generate WhatsApp message
    const waMessage = generateWhatsAppMessage(orderData);
    
    // Update WhatsApp link
    const waUrl = `https://wa.me/6281250525043?text=${encodeURIComponent(waMessage)}`;
    DOM.waOrderLink.href = waUrl;
    DOM.modalWaLink.href = waUrl;
    
    // Generate order ID
    const orderId = `GL-${Date.now().toString().slice(-6)}`;
    DOM.modalOrderId.textContent = orderId;
    
    // Save order to history
    saveOrderToHistory(orderData, orderId);
    
    // Send email notification
    sendEmailNotification(orderData, orderId);
    
    // Show success modal
    DOM.successModal.classList.add('active');
    
    // Clear form and cart
    setTimeout(() => {
        DOM.orderForm.reset();
        clearCart();
        DOM.promoCode.value = '';
        isPromoApplied = false;
        DOM.promoStatus.textContent = '';
        updateOrderSummary();
    }, 1000);
    
    showNotification('Order berhasil dibuat!', 'success');
}

function validateOrderForm() {
    const requiredFields = [
        { element: DOM.customerName, name: 'Nama' },
        { element: DOM.customerPhone, name: 'Nomor WhatsApp' },
        { element: DOM.customerAddress, name: 'Alamat' },
        { element: DOM.serviceType, name: 'Jenis Layanan' }
    ];
    
    for (const field of requiredFields) {
        if (!field.element.value.trim()) {
            showNotification(`${field.name} harus diisi`, 'error');
            field.element.focus();
            return false;
        }
    }
    
    // Validate phone number
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(DOM.customerPhone.value.replace(/\D/g, ''))) {
        showNotification('Nomor WhatsApp tidak valid', 'error');
        DOM.customerPhone.focus();
        return false;
    }
    
    // Validate email if filled
    if (DOM.customerEmail.value && !DOM.customerEmail.checkValidity()) {
        showNotification('Email tidak valid', 'error');
        DOM.customerEmail.focus();
        return false;
    }
    
    return true;
}

function prepareOrderData() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = isPromoApplied ? subtotal * promoDiscount : 0;
    const adminFee = 2000;
    const total = subtotal - discount + adminFee;
    
    return {
        customer: {
            name: DOM.customerName.value.trim(),
            phone: DOM.customerPhone.value.trim(),
            email: DOM.customerEmail.value.trim() || 'rizalakunsup6@gmail.com',
            address: DOM.customerAddress.value.trim()
        },
        order: {
            items: [...cart],
            subtotal: subtotal,
            discount: discount,
            adminFee: adminFee,
            total: total,
            pickupDate: DOM.pickupDate.value,
            pickupTime: DOM.pickupTime.value,
            notes: DOM.orderNotes.value.trim()
        },
        timestamp: new Date().toISOString()
    };
}

function generateWhatsAppMessage(orderData) {
    const { customer, order } = orderData;
    
    let message = `*ORDER GREEN LAUNDRY*%0A%0A`;
    message += `*Nama:* ${customer.name}%0A`;
    message += `*No. WhatsApp:* ${customer.phone}%0A`;
    message += `*Email:* ${customer.email}%0A`;
    message += `*Alamat:* ${customer.address}%0A%0A`;
    
    message += `*DETAIL ORDER:*%0A`;
    order.items.forEach((item, index) => {
        message += `${index + 1}. ${item.service}%0A`;
        message += `   - ${item.quantity} ${item.unit} x Rp ${item.price.toLocaleString()}%0A`;
        message += `   - Subtotal: Rp ${(item.price * item.quantity).toLocaleString()}%0A`;
    });
    
    message += `%0A*RINGKASAN:*%0A`;
    message += `Subtotal: Rp ${order.subtotal.toLocaleString()}%0A`;
    if (order.discount > 0) {
        message += `Diskon: -Rp ${order.discount.toLocaleString()}%0A`;
    }
    message += `Biaya Admin: Rp ${order.adminFee.toLocaleString()}%0A`;
    message += `*TOTAL: Rp ${order.total.toLocaleString()}*%0A%0A`;
    
    message += `*JADWAL PICKUP:*%0A`;
    message += `Tanggal: ${order.pickupDate}%0A`;
    message += `Waktu: ${order.pickupTime}%0A%0A`;
    
    if (order.notes) {
        message += `*CATATAN:*%0A${order.notes}%0A%0A`;
    }
    
    message += `*TERIMA KASIH TELAH ORDER DI GREEN LAUNDRY!* 🍃`;
    
    return message;
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = isPromoApplied ? subtotal * promoDiscount : 0;
    const adminFee = 2000;
    const total = subtotal - discount + adminFee;
    
    DOM.subtotalAmount.textContent = `Rp ${subtotal.toLocaleString()}`;
    DOM.discountAmount.textContent = `-Rp ${discount.toLocaleString()}`;
    DOM.adminFee.textContent = `Rp ${adminFee.toLocaleString()}`;
    DOM.totalAmount.textContent = `Rp ${total.toLocaleString()}`;
    
    // Update summary items
    if (cart.length === 0) {
        DOM.summaryItems.innerHTML = `
            <div class="empty-summary">
                <i class="fas fa-clipboard-list"></i>
                <p>Belum ada item dalam keranjang</p>
                <p class="small">Pilih layanan atau isi form</p>
            </div>
        `;
        return;
    }
    
    let summaryHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-item-detail">
                    <h4>${item.service}</h4>
                    <p>${item.quantity} ${item.unit} x Rp ${item.price.toLocaleString()}</p>
                </div>
                <div class="summary-item-total">
                    Rp ${itemTotal.toLocaleString()}
                </div>
            </div>
        `;
    });
    
    DOM.summaryItems.innerHTML = summaryHTML;
}

// ========== PROMO CODE SYSTEM ==========
function initPromoCode() {
    DOM.applyPromo.addEventListener('click', applyPromoCode);
    
    DOM.promoCode.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyPromoCode();
        }
    });
}

function applyPromoCode() {
    const code = DOM.promoCode.value.trim().toUpperCase();
    
    if (!code) {
        DOM.promoStatus.textContent = 'Masukkan kode promo';
        DOM.promoStatus.className = 'promo-valid';
        return;
    }
    
    if (code === promoCode) {
        if (isPromoApplied) {
            DOM.promoStatus.textContent = 'Promo sudah digunakan';
            DOM.promoStatus.className = 'promo-valid';
            return;
        }
        
        isPromoApplied = true;
        DOM.promoStatus.textContent = 'Promo berhasil diterapkan! Diskon 20%';
        DOM.promoStatus.className = 'promo-valid valid';
        updateCartDisplay();
        updateOrderSummary();
        showNotification('Promo berhasil diterapkan! 🎉', 'success');
    } else {
        DOM.promoStatus.textContent = 'Kode promo tidak valid';
        DOM.promoStatus.className = 'promo-valid invalid';
        showNotification('Kode promo tidak valid', 'error');
    }
}

// ========== ORDER TABLE SYSTEM ==========
function initOrderTable() {
    // Load orders from localStorage
    loadOrders();
    
    // Initialize table
    renderOrderTable();
    
    // Search functionality
    DOM.tableSearch.addEventListener('input', (e) => {
        filterOrders(e.target.value);
    });
    
    // Refresh table
    DOM.refreshTable.addEventListener('click', () => {
        loadOrders();
        renderOrderTable();
        showNotification('Tabel diperbarui', 'info');
    });
    
    // Export functionality
    DOM.exportTable.addEventListener('click', exportOrdersToCSV);
}

function loadOrders() {
    const savedOrders = localStorage.getItem('greenLaundryOrders');
    if (savedOrders) {
        try {
            orders = JSON.parse(savedOrders);
            updateStats();
        } catch (e) {
            console.error('Error loading orders:', e);
            orders = [];
        }
    }
}

function saveOrders() {
    localStorage.setItem('greenLaundryOrders', JSON.stringify(orders));
    updateStats();
}

function saveOrderToHistory(orderData, orderId) {
    const order = {
        id: orderId,
        ...orderData,
        status: 'pending',
        payment: 'unpaid',
        rating: null,
        createdAt: new Date().toISOString()
    };
    
    orders.unshift(order); // Add to beginning
    saveOrders();
    renderOrderTable();
}

function renderOrderTable(filteredOrders = orders) {
    if (filteredOrders.length === 0) {
        DOM.orderTableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="8">
                    <div class="empty-table">
                        <i class="fas fa-inbox"></i>
                        <p>Belum ada riwayat order</p>
                        <p class="small">Order pertama Anda akan muncul di sini</p>
                    </div>
                </td>
            </tr>
        `;
        DOM.rowCount.textContent = '0';
        return;
    }
    
    let tableHTML = '';
    filteredOrders.forEach((order, index) => {
        const date = new Date(order.timestamp);
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        
        const itemsText = order.order.items.map(item => 
            `${item.quantity} ${item.unit} ${item.service}`
        ).join(', ');
        
        const statusClass = getStatusClass(order.status);
        const paymentClass = getPaymentClass(order.payment);
        
        tableHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer.name}</td>
                <td title="${itemsText}">${order.order.items[0]?.service || ''}${order.order.items.length > 1 ? ` +${order.order.items.length - 1} lainnya` : ''}</td>
                <td>${order.order.items.reduce((sum, item) => sum + item.quantity, 0)} ${order.order.items[0]?.unit || ''}</td>
                <td>Rp ${order.order.total.toLocaleString()}</td>
                <td>${formattedDate}</td>
                <td>
                    <span class="status-badge ${statusClass}">${order.status}</span>
                    <span class="payment-badge ${paymentClass}">${order.payment}</span>
                </td>
                <td>
                    <button class="action-btn view-btn" data-id="${order.id}" title="Lihat Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${order.id}" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    DOM.orderTableBody.innerHTML = tableHTML;
    DOM.rowCount.textContent = filteredOrders.length;
    
    // Add event listeners to action buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.id;
            viewOrderDetail(orderId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.id;
            deleteOrder(orderId);
        });
    });
}

function filterOrders(searchTerm) {
    if (!searchTerm) {
        renderOrderTable(orders);
        return;
    }
    
    const filtered = orders.filter(order => {
        const searchLower = searchTerm.toLowerCase();
        return (
            order.id.toLowerCase().includes(searchLower) ||
            order.customer.name.toLowerCase().includes(searchLower) ||
            order.customer.phone.includes(searchTerm) ||
            order.status.toLowerCase().includes(searchLower)
        );
    });
    
    renderOrderTable(filtered);
}

function getStatusClass(status) {
    switch (status) {
        case 'pending': return 'status-pending';
        case 'processing': return 'status-processing';
        case 'completed': return 'status-completed';
        case 'cancelled': return 'status-cancelled';
        default: return '';
    }
}

function getPaymentClass(payment) {
    switch (payment) {
        case 'paid': return 'payment-paid';
        case 'unpaid': return 'payment-unpaid';
        case 'partial': return 'payment-partial';
        default: return '';
    }
}

function viewOrderDetail(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const modalContent = `
        <div class="order-detail-modal">
            <h3><i class="fas fa-receipt"></i> Detail Order ${order.id}</h3>
            <div class="order-detail-content">
                <div class="detail-section">
                    <h4><i class="fas fa-user"></i> Data Customer</h4>
                    <p><strong>Nama:</strong> ${order.customer.name}</p>
                    <p><strong>WhatsApp:</strong> ${order.customer.phone}</p>
                    <p><strong>Email:</strong> ${order.customer.email}</p>
                    <p><strong>Alamat:</strong> ${order.customer.address}</p>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-shopping-cart"></i> Items Order</h4>
                    <table class="detail-items">
                        <thead>
                            <tr>
                                <th>Layanan</th>
                                <th>Qty</th>
                                <th>Harga</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.order.items.map(item => `
                                <tr>
                                    <td>${item.service}</td>
                                    <td>${item.quantity} ${item.unit}</td>
                                    <td>Rp ${item.price.toLocaleString()}</td>
                                    <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-file-invoice-dollar"></i> Ringkasan Pembayaran</h4>
                    <div class="payment-summary">
                        <p>Subtotal: <span>Rp ${order.order.subtotal.toLocaleString()}</span></p>
                        ${order.order.discount > 0 ? `<p>Diskon: <span>-Rp ${order.order.discount.toLocaleString()}</span></p>` : ''}
                        <p>Biaya Admin: <span>Rp ${order.order.adminFee.toLocaleString()}</span></p>
                        <p class="total">Total: <span>Rp ${order.order.total.toLocaleString()}</span></p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-info-circle"></i> Informasi Lain</h4>
                    <p><strong>Status:</strong> <span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></p>
                    <p><strong>Pembayaran:</strong> <span class="payment-badge ${getPaymentClass(order.payment)}">${order.payment}</span></p>
                    <p><strong>Tanggal Pickup:</strong> ${order.order.pickupDate}</p>
                    <p><strong>Waktu Pickup:</strong> ${order.order.pickupTime}</p>
                    ${order.order.notes ? `<p><strong>Catatan:</strong> ${order.order.notes}</p>` : ''}
                </div>
            </div>
        </div>
    `;
    
    showCustomModal('Detail Order', modalContent);
}

function deleteOrder(orderId) {
    if (!confirm('Apakah Anda yakin ingin menghapus order ini?')) {
        return;
    }
    
    orders = orders.filter(order => order.id !== orderId);
    saveOrders();
    renderOrderTable();
    showNotification('Order berhasil dihapus', 'success');
}

function exportOrdersToCSV() {
    if (orders.length === 0) {
        showNotification('Tidak ada data untuk diexport', 'info');
        return;
    }
    
    const headers = ['ID', 'Nama', 'WhatsApp', 'Email', 'Items', 'Total', 'Tanggal', 'Status', 'Pembayaran'];
    const csvData = orders.map(order => {
        const items = order.order.items.map(item => 
            `${item.quantity} ${item.unit} ${item.service}`
        ).join('; ');
        
        return [
            order.id,
            `"${order.customer.name}"`,
            order.customer.phone,
            order.customer.email,
            `"${items}"`,
            order.order.total,
            new Date(order.timestamp).toLocaleDateString('id-ID'),
            order.status,
            order.payment
        ].join(',');
    });
    
    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `green-laundry-orders-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data berhasil diexport ke CSV', 'success');
}

function updateStats() {
    // Total orders
    DOM.totalOrders.textContent = orders.length;
    
    // Total revenue
    const revenue = orders.reduce((sum, order) => sum + order.order.total, 0);
    DOM.totalRevenue.textContent = `Rp ${revenue.toLocaleString()}`;
    
    // Today's orders
    const today = new Date().toDateString();
    const todayOrdersCount = orders.filter(order => 
        new Date(order.timestamp).toDateString() === today
    ).length;
    DOM.todayOrders.textContent = todayOrdersCount;
    
    // Average rating
    const ratedOrders = orders.filter(order => order.rating !== null);
    const avgRating = ratedOrders.length > 0 
        ? (ratedOrders.reduce((sum, order) => sum + order.rating, 0) / ratedOrders.length).toFixed(1)
        : '5.0';
    DOM.avgRating.innerHTML = `${avgRating} <i class="fas fa-star"></i>`;
}

// ========== ADMIN PANEL ==========
function initAdminPanel() {
    DOM.adminBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const password = prompt('Masukkan password admin:');
        if (password === adminPassword) {
            openAdminPanel();
        } else if (password !== null) {
            showNotification('Password salah!', 'error');
        }
    });
    
    DOM.adminClose.addEventListener('click', closeAdminPanel);
    DOM.adminOverlay.addEventListener('click', closeAdminPanel);
    
    // Admin tabs
    DOM.adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchAdminTab(tabName);
        });
    });
}

function openAdminPanel() {
    DOM.adminOverlay.classList.add('active');
    DOM.adminPanel.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadAdminDashboard();
}

function closeAdminPanel() {
    DOM.adminOverlay.classList.remove('active');
    DOM.adminPanel.classList.remove('active');
    document.body.style.overflow = '';
}

function switchAdminTab(tabName) {
    // Update active tab
    DOM.adminTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Show active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}Tab`);
    });
    
    // Load tab content
    switch(tabName) {
        case 'dashboard':
            loadAdminDashboard();
            break;
        case 'orders':
            loadAdminOrders();
            break;
        case 'customers':
            loadAdminCustomers();
            break;
        case 'settings':
            loadAdminSettings();
            break;
    }
}

function loadAdminDashboard() {
    const dashboardContent = `
        <div class="admin-dashboard">
            <div class="admin-stats-grid">
                <div class="admin-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${orders.length}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>
                
                <div class="admin-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-money-bill-wave"></i>
                    </div>
                    <div class="stat-content">
                        <h3>Rp ${orders.reduce((sum, order) => sum + order.order.total, 0).toLocaleString()}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
                
                <div class="admin-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${[...new Set(orders.map(order => order.customer.phone))].length}</h3>
                        <p>Unique Customers</p>
                    </div>
                </div>
                
                <div class="admin-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${orders.filter(order => order.rating !== null).length}</h3>
                        <p>Rated Orders</p>
                    </div>
                </div>
            </div>
            
            <div class="admin-charts">
                <div class="chart-container">
                    <h4><i class="fas fa-chart-line"></i> Order Trend (7 Hari)</h4>
                    <div class="chart-placeholder">
                        <canvas id="orderChart"></canvas>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h4><i class="fas fa-chart-pie"></i> Service Distribution</h4>
                    <div class="chart-placeholder">
                        <canvas id="serviceChart"></canvas>
                    </div>
                </div>
            </div>
            
            <div class="admin-actions">
                <button class="admin-action-btn" id="exportAllData">
                    <i class="fas fa-download"></i> Export All Data
                </button>
                <button class="admin-action-btn" id="clearAllData">
                    <i class="fas fa-trash"></i> Clear All Data
                </button>
                <button class="admin-action-btn" id="backupData">
                    <i class="fas fa-save"></i> Backup Data
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('dashboardTab').innerHTML = dashboardContent;
    
    // Add event listeners
    document.getElementById('exportAllData')?.addEventListener('click', exportAllData);
    document.getElementById('clearAllData')?.addEventListener('click', clearAllData);
    document.getElementById('backupData')?.addEventListener('click', backupData);
    
    // Initialize charts
    setTimeout(() => {
        initializeCharts();
    }, 100);
}

function loadAdminOrders() {
    let ordersHTML = `
        <div class="admin-orders">
            <div class="orders-header">
                <h3><i class="fas fa-list"></i> Manage Orders (${orders.length})</h3>
                <div class="orders-filter">
                    <select id="orderFilterStatus">
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <input type="date" id="orderFilterDate">
                    <button class="filter-btn" id="applyFilter">Filter</button>
                </div>
            </div>
            
            <div class="orders-table-container">
                <table class="admin-orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="adminOrdersTableBody">
    `;
    
    orders.forEach(order => {
        const date = new Date(order.timestamp);
        const formattedDate = date.toLocaleDateString('id-ID');
        
        ordersHTML += `
            <tr data-id="${order.id}">
                <td>${order.id}</td>
                <td>
                    <strong>${order.customer.name}</strong><br>
                    <small>${order.customer.phone}</small>
                </td>
                <td>${order.order.items.length} items</td>
                <td>Rp ${order.order.total.toLocaleString()}</td>
                <td>${formattedDate}</td>
                <td>
                    <select class="status-select" data-id="${order.id}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <select class="payment-select" data-id="${order.id}">
                        <option value="unpaid" ${order.payment === 'unpaid' ? 'selected' : ''}>Unpaid</option>
                        <option value="partial" ${order.payment === 'partial' ? 'selected' : ''}>Partial</option>
                        <option value="paid" ${order.payment === 'paid' ? 'selected' : ''}>Paid</option>
                    </select>
                </td>
                <td>
                    <button class="action-btn view-order-btn" data-id="${order.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete-order-btn" data-id="${order.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    ordersHTML += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('ordersTab').innerHTML = ordersHTML;
    
    // Add event listeners
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const orderId = e.target.dataset.id;
            updateOrderStatus(orderId, e.target.value);
        });
    });
    
    document.querySelectorAll('.payment-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const orderId = e.target.dataset.id;
            updateOrderPayment(orderId, e.target.value);
        });
    });
    
    document.querySelectorAll('.view-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.id;
            viewOrderDetail(orderId);
        });
    });
    
    document.querySelectorAll('.delete-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.id;
            deleteOrder(orderId);
        });
    });
    
    document.getElementById('applyFilter')?.addEventListener('click', filterAdminOrders);
}

function loadAdminCustomers() {
    const uniqueCustomers = [];
    const customerMap = new Map();
    
    orders.forEach(order => {
        if (!customerMap.has(order.customer.phone)) {
            customerMap.set(order.customer.phone, {
                name: order.customer.name,
                phone: order.customer.phone,
                email: order.customer.email,
                orderCount: 0,
                totalSpent: 0,
                lastOrder: order.timestamp
            });
        }
        
        const customer = customerMap.get(order.customer.phone);
        customer.orderCount++;
        customer.totalSpent += order.order.total;
        if (new Date(order.timestamp) > new Date(customer.lastOrder)) {
            customer.lastOrder = order.timestamp;
        }
    });
    
    customerMap.forEach(customer => {
        uniqueCustomers.push(customer);
    });
    
    let customersHTML = `
        <div class="admin-customers">
            <div class="customers-header">
                <h3><i class="fas fa-users"></i> Customer Management (${uniqueCustomers.length})</h3>
            </div>
            
            <div class="customers-table-container">
                <table class="admin-customers-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Last Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    uniqueCustomers.forEach(customer => {
        const lastOrderDate = new Date(customer.lastOrder).toLocaleDateString('id-ID');
        
        customersHTML += `
            <tr>
                <td>
                    <strong>${customer.name}</strong>
                </td>
                <td>
                    <div>${customer.phone}</div>
                    <small>${customer.email || 'No email'}</small>
                </td>
                <td>${customer.orderCount}</td>
                <td>Rp ${customer.totalSpent.toLocaleString()}</td>
                <td>${lastOrderDate}</td>
                <td>
                    <button class="action-btn message-btn" data-phone="${customer.phone}">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                    <button class="action-btn email-btn" data-email="${customer.email}">
                        <i class="fas fa-envelope"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    customersHTML += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('customersTab').innerHTML = customersHTML;
    
    // Add event listeners
    document.querySelectorAll('.message-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const phone = e.target.closest('button').dataset.phone;
            window.open(`https://wa.me/${phone}`, '_blank');
        });
    });
    
    document.querySelectorAll('.email-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const email = e.target.closest('button').dataset.email;
            if (email) {
                window.open(`mailto:${email}`, '_blank');
            } else {
                showNotification('Customer tidak memiliki email', 'info');
            }
        });
    });
}

function loadAdminSettings() {
    const settingsHTML = `
        <div class="admin-settings">
            <h3><i class="fas fa-cogs"></i> System Settings</h3>
            
            <div class="settings-form">
                <div class="setting-group">
                    <label><i class="fas fa-key"></i> Admin Password</label>
                    <div class="password-input">
                        <input type="password" id="newPassword" value="${adminPassword}">
                        <button id="updatePassword">Update</button>
                    </div>
                    <small>Password untuk mengakses panel admin</small>
                </div>
                
                <div class="setting-group">
                    <label><i class="fas fa-tag"></i> Promo Code</label>
                    <div class="promo-input">
                        <input type="text" id="newPromoCode" value="${promoCode}">
                        <input type="number" id="newPromoDiscount" value="${promoDiscount * 100}" min="1" max="100">
                        <span>%</span>
                        <button id="updatePromo">Update</button>
                    </div>
                    <small>Kode promo dan persentase diskon</small>
                </div>
                
                <div class="setting-group">
                    <label><i class="fas fa-whatsapp"></i> WhatsApp Number</label>
                    <input type="text" id="whatsappNumber" value="081250525043">
                    <small>Nomor WhatsApp untuk menerima order</small>
                </div>
                
                <div class="setting-group">
                    <label><i class="fas fa-envelope"></i> Email Notification</label>
                    <input type="email" id="notificationEmail" value="rizalakunsup6@gmail.com">
                    <small>Email untuk menerima notifikasi order</small>
                </div>
                
                <div class="setting-group">
                    <label><i class="fas fa-database"></i> Data Management</label>
                    <div class="data-actions">
                        <button id="exportData" class="data-btn">
                            <i class="fas fa-download"></i> Export Data
                        </button>
                        <button id="importData" class="data-btn">
                            <i class="fas fa-upload"></i> Import Data
                        </button>
                        <button id="resetData" class="data-btn danger">
                            <i class="fas fa-trash"></i> Reset All Data
                        </button>
                    </div>
                    <small>Backup atau reset data sistem</small>
                </div>
                
                <div class="setting-group">
                    <label><i class="fas fa-paint-brush"></i> Theme Settings</label>
                    <div class="theme-options">
                        <label class="theme-option">
                            <input type="radio" name="theme" value="light" ${!isDarkMode ? 'checked' : ''}>
                            <span>Light Mode</span>
                        </label>
                        <label class="theme-option">
                            <input type="radio" name="theme" value="dark" ${isDarkMode ? 'checked' : ''}>
                            <span>Dark Mode</span>
                        </label>
                        <label class="theme-option">
                            <input type="radio" name="theme" value="auto">
                            <span>Auto (System)</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('settingsTab').innerHTML = settingsHTML;
    
    // Add event listeners
    document.getElementById('updatePassword')?.addEventListener('click', updateAdminPassword);
    document.getElementById('updatePromo')?.addEventListener('click', updatePromoSettings);
    document.getElementById('exportData')?.addEventListener('click', exportAllData);
    document.getElementById('importData')?.addEventListener('click', importData);
    document.getElementById('resetData')?.addEventListener('click', resetAllData);
    
    // Theme settings
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'dark') {
                enableDarkMode();
            } else if (e.target.value === 'light') {
                enableLightMode();
            } else {
                // Auto mode - check system preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    enableDarkMode();
                } else {
                    enableLightMode();
                }
            }
        });
    });
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveOrders();
        showNotification(`Status order ${orderId} diperbarui ke ${newStatus}`, 'success');
    }
}

function updateOrderPayment(orderId, newPayment) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.payment = newPayment;
        saveOrders();
        showNotification(`Pembayaran order ${orderId} diperbarui ke ${newPayment}`, 'success');
    }
}

function filterAdminOrders() {
    const status = document.getElementById('orderFilterStatus').value;
    const date = document.getElementById('orderFilterDate').value;
    
    let filtered = orders;
    
    if (status !== 'all') {
        filtered = filtered.filter(order => order.status === status);
    }
    
    if (date) {
        filtered = filtered.filter(order => 
            order.timestamp.split('T')[0] === date
        );
    }
    
    // Update table
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = filtered.map(order => {
        const formattedDate = new Date(order.timestamp).toLocaleDateString('id-ID');
        
        return `
            <tr data-id="${order.id}">
                <td>${order.id}</td>
                <td>
                    <strong>${order.customer.name}</strong><br>
                    <small>${order.customer.phone}</small>
                </td>
                <td>${order.order.items.length} items</td>
                <td>Rp ${order.order.total.toLocaleString()}</td>
                <td>${formattedDate}</td>
                <td>
                    <select class="status-select" data-id="${order.id}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <select class="payment-select" data-id="${order.id}">
                        <option value="unpaid" ${order.payment === 'unpaid' ? 'selected' : ''}>Unpaid</option>
                        <option value="partial" ${order.payment === 'partial' ? 'selected' : ''}>Partial</option>
                        <option value="paid" ${order.payment === 'paid' ? 'selected' : ''}>Paid</option>
                    </select>
                </td>
                <td>
                    <button class="action-btn view-order-btn" data-id="${order.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete-order-btn" data-id="${order.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Reattach event listeners
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const orderId = e.target.dataset.id;
            updateOrderStatus(orderId, e.target.value);
        });
    });
    
    document.querySelectorAll('.payment-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const orderId = e.target.dataset.id;
            updateOrderPayment(orderId, e.target.value);
        });
    });
    
    document.querySelectorAll('.view-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.id;
            viewOrderDetail(orderId);
        });
    });
    
    document.querySelectorAll('.delete-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.id;
            deleteOrder(orderId);
        });
    });
}

function updateAdminPassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword.length < 4) {
        showNotification('Password minimal 4 karakter', 'error');
        return;
    }
    
    adminPassword = newPassword;
    showNotification('Password admin diperbarui', 'success');
}

function updatePromoSettings() {
    const newCode = document.getElementById('newPromoCode').value.trim().toUpperCase();
    const newDiscount = parseInt(document.getElementById('newPromoDiscount').value) / 100;
    
    if (!newCode) {
        showNotification('Kode promo tidak boleh kosong', 'error');
        return;
    }
    
    if (newDiscount <= 0 || newDiscount > 1) {
        showNotification('Diskon harus antara 1-100%', 'error');
        return;
    }
    
    promoCode = newCode;
    promoDiscount = newDiscount;
    showNotification(`Promo diperbarui: ${newCode} (${newDiscount * 100}%)`, 'success');
}

function exportAllData() {
    const data = {
        orders: orders,
        settings: {
            promoCode: promoCode,
            promoDiscount: promoDiscount,
            adminPassword: adminPassword,
            theme: isDarkMode ? 'dark' : 'light'
        },
        exportDate: new Date().toISOString()
    };
    
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `green-laundry-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data berhasil diexport', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                if (confirm('Import data akan menimpa data yang ada. Lanjutkan?')) {
                    if (data.orders) {
                        orders = data.orders;
                        saveOrders();
                        renderOrderTable();
                    }
                    
                    if (data.settings) {
                        promoCode = data.settings.promoCode || promoCode;
                        promoDiscount = data.settings.promoDiscount || promoDiscount;
                        adminPassword = data.settings.adminPassword || adminPassword;
                        
                        if (data.settings.theme === 'dark') {
                            enableDarkMode();
                        } else {
                            enableLightMode();
                        }
                    }
                    
                    showNotification('Data berhasil diimport', 'success');
                    closeAdminPanel();
                }
            } catch (error) {
                showNotification('File tidak valid', 'error');
                console.error('Import error:', error);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function resetAllData() {
    if (confirm('PERINGATAN: Semua data akan dihapus permanen. Lanjutkan?')) {
        if (confirm('SANGAT YAKIN? Tindakan ini tidak dapat dibatalkan!')) {
            localStorage.clear();
            orders = [];
            cart = [];
            updateCartDisplay();
            renderOrderTable();
            showNotification('Semua data telah direset', 'warning');
            closeAdminPanel();
            
            // Reload page
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
}

function clearAllData() {
    if (confirm('Hapus semua data orders dan cart?')) {
        orders = [];
        cart = [];
        saveOrders();
        updateCartDisplay();
        renderOrderTable();
        showNotification('Data berhasil dihapus', 'success');
        loadAdminDashboard();
    }
}

function backupData() {
    // Simpan backup ke localStorage tambahan
    const backup = {
        orders: orders,
        cart: cart,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('greenLaundryBackup', JSON.stringify(backup));
    showNotification('Backup data berhasil disimpan', 'success');
}

function initializeCharts() {
    // Order trend chart (last 7 days)
    const orderChartCtx = document.getElementById('orderChart');
    if (!orderChartCtx) return;
    
    // Prepare data for last 7 days
    const last7Days = [];
    const orderCounts = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        last7Days.push(date.toLocaleDateString('id-ID', { weekday: 'short' }));
        
        const count = orders.filter(order => 
            order.timestamp.split('T')[0] === dateStr
        ).length;
        
        orderCounts.push(count);
    }
    
    // Create chart
    const orderChart = new Chart(orderChartCtx, {
        type: 'line',
        data: {
            labels: last7Days,
            datasets: [{
                label: 'Orders',
                data: orderCounts,
                borderColor: '#2E8B57',
                backgroundColor: 'rgba(46, 139, 87, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Service distribution chart
    const serviceChartCtx = document.getElementById('serviceChart');
    if (!serviceChartCtx) return;
    
    // Count services
    const serviceCount = {};
    orders.forEach(order => {
        order.order.items.forEach(item => {
            serviceCount[item.service] = (serviceCount[item.service] || 0) + 1;
        });
    });
    
    const serviceNames = Object.keys(serviceCount);
    const serviceValues = Object.values(serviceCount);
    
    // Generate colors
    const colors = [
        '#2E8B57', '#3CB371', '#98FB98', '#32CD32',
        '#228B22', '#6B8E23', '#008080', '#50C878'
    ];
    
    const serviceChart = new Chart(serviceChartCtx, {
        type: 'doughnut',
        data: {
            labels: serviceNames,
            datasets: [{
                data: serviceValues,
                backgroundColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// ========== MODAL SYSTEM ==========
function initModals() {
    // Close modal when clicking X or outside
    document.querySelectorAll('.modal-close, .modal').forEach(element => {
        element.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                e.target.closest('.modal').classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Copy order ID
    DOM.copyOrderId?.addEventListener('click', () => {
        const orderId = DOM.modalOrderId.textContent;
        navigator.clipboard.writeText(orderId).then(() => {
            showNotification('Order ID disalin ke clipboard', 'success');
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

function showCustomModal(title, content) {
    const modalHTML = `
        <div class="modal active" id="customModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    // Remove existing custom modal
    const existingModal = document.getElementById('customModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Add close event
    document.querySelector('#customModal .modal-close').addEventListener('click', () => {
        document.getElementById('customModal').classList.remove('active');
        document.body.style.overflow = '';
    });
    
    document.getElementById('customModal').addEventListener('click', (e) => {
        if (e.target.id === 'customModal') {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========== FLOATING ACTION BUTTONS ==========
function initFAB() {
    DOM.fabMain.addEventListener('click', toggleFAB);
    
    DOM.fabWa.addEventListener('click', () => {
        window.open('https://wa.me/6281250525043', '_blank');
    });
    
    DOM.fabOrder.addEventListener('click', () => {
        document.querySelector('#order').scrollIntoView({ behavior: 'smooth' });
        toggleFAB();
    });
    
    DOM.fabCall.addEventListener('click', () => {
        window.open('tel:081250525043', '_blank');
    });
    
    DOM.fabTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toggleFAB();
    });
}

function toggleFAB() {
    DOM.fabMain.closest('.fab-container').classList.toggle('active');
}

// ========== STATS COUNTERS ==========
function initStats() {
    // Animate counter numbers
    DOM.statCounters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// ========== SERVICE CARDS ==========
function initServiceCards() {
    DOM.serviceOrderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const service = e.target.dataset.service;
            const price = parseInt(e.target.dataset.price);
            addToCart(service, price);
            
            // Scroll to order form
            document.querySelector('#order').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// ========== QUANTITY CONTROLS ==========
function initQuantityControls() {
    const qtyMinus = document.querySelector('.qty-btn.minus');
    const qtyPlus = document.querySelector('.qty-btn.plus');
    const qtyInput = document.getElementById('quantity');
    
    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            const currentValue = parseFloat(qtyInput.value);
            const min = parseFloat(qtyInput.min) || 0.5;
            const step = parseFloat(qtyInput.step) || 0.5;
            
            if (currentValue > min) {
                qtyInput.value = (currentValue - step).toFixed(1);
                qtyInput.dispatchEvent(new Event('change'));
            }
        });
        
        qtyPlus.addEventListener('click', () => {
            const currentValue = parseFloat(qtyInput.value);
            const max = parseFloat(qtyInput.max) || 100;
            const step = parseFloat(qtyInput.step) || 0.5;
            
            if (currentValue < max) {
                qtyInput.value = (currentValue + step).toFixed(1);
                qtyInput.dispatchEvent(new Event('change'));
            }
        });
    }
}

// ========== WHATSAPP STATUS ==========
function initWhatsAppStatus() {
    // Simulate WhatsApp status check
    const statuses = ['● Online', '○ Offline', '⏳ Typing...'];
    let currentStatus = 0;
    
    setInterval(() => {
        DOM.waStatus.textContent = statuses[currentStatus];
        currentStatus = (currentStatus + 1) % statuses.length;
    }, 5000);
}

// ========== EMAIL JS ==========
function initEmailJS() {
    // EmailJS already initialized in HTML
    console.log('EmailJS initialized');
}

function sendEmailNotification(orderData, orderId) {
    const templateParams = {
        order_id: orderId,
        customer_name: orderData.customer.name,
        customer_phone: orderData.customer.phone,
        customer_email: orderData.customer.email || 'rizalakunsup6@gmail.com',
        order_total: `Rp ${orderData.order.total.toLocaleString()}`,
        order_items: orderData.order.items.map(item => 
            `${item.quantity} ${item.unit} ${item.service} - Rp ${(item.price * item.quantity).toLocaleString()}`
        ).join('\n'),
        pickup_date: orderData.order.pickupDate,
        pickup_time: orderData.order.pickupTime,
        order_notes: orderData.order.notes || 'Tidak ada catatan',
        to_email: 'rizalakunsup6@gmail.com'
    };
    
    emailjs.send('service_greenlaundry', 'template_order', templateParams)
        .then(response => {
            console.log('Email sent successfully:', response);
            showNotification('Notifikasi email dikirim', 'success');
        })
        .catch(error => {
            console.error('Email send error:', error);
            showNotification('Gagal mengirim email', 'error');
        });
}

// ========== LOCAL STORAGE MANAGEMENT ==========
function initLocalStorage() {
    // Clear old data (optional)
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const oldOrders = orders.filter(order => 
        new Date(order.timestamp).getTime() < oneWeekAgo
    );
    
    if (oldOrders.length > 50) {
        // Keep only recent 50 orders
        orders = orders.slice(0, 50);
        saveOrders();
    }
    
    // Check storage quota
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
    } catch (e) {
        console.warn('LocalStorage mungkin penuh:', e);
        showNotification('Penyimpanan lokal hampir penuh', 'warning');
    }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .stat-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// ========== NOTIFICATION SYSTEM ==========
function initNotifications() {
    // Create notification center if not exists
    if (!DOM.notificationCenter) {
        const notificationDiv = document.createElement('div');
        notificationDiv.id = 'notificationCenter';
        notificationDiv.className = 'notification-center';
        document.body.appendChild(notificationDiv);
        DOM.notificationCenter = notificationDiv;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    DOM.notificationCenter.appendChild(notification);
    
    // Add close event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        case 'info': return 'fas fa-info-circle';
        default: return 'fas fa-bell';
    }
}

// ========== UTILITY FUNCTIONS ==========
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showNotification('Terjadi kesalahan, silakan refresh halaman', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('Terjadi kesalahan sistem', 'error');
});

// ========== OFFLINE DETECTION ==========
window.addEventListener('online', () => {
    showNotification('Koneksi internet kembali', 'success');
});

window.addEventListener('offline', () => {
    showNotification('Anda sedang offline', 'warning');
});

// ========== SERVICE WORKER REGISTRATION (PWA) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registered:', registration);
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// ========== BEFORE UNLOAD WARNING ==========
window.addEventListener('beforeunload', (e) => {
    if (cart.length > 0 || DOM.orderForm.checkValidity()) {
        e.preventDefault();
        e.returnValue = 'Anda memiliki order yang belum diselesaikan. Yakin ingin meninggalkan halaman?';
    }
});

// ========== PRINT FUNCTIONALITY ==========
function printOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Invoice ${orderId}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .invoice-header { text-align: center; margin-bottom: 30px; }
                .invoice-details { margin-bottom: 20px; }
                .invoice-table { width: 100%; border-collapse: collapse; }
                .invoice-table th, .invoice-table td { 
                    border: 1px solid #ddd; 
                    padding: 8px; 
                    text-align: left; 
                }
                .total-row { font-weight: bold; }
                .footer { margin-top: 30px; text-align: center; }
            </style>
        </head>
        <body>
            <div class="invoice-header">
                <h2>GREEN LAUNDRY</h2>
                <p>Invoice: ${orderId}</p>
                <p>Tanggal: ${formatDate(order.timestamp)}</p>
            </div>
            
            <div class="invoice-details">
                <p><strong>Customer:</strong> ${order.customer.name}</p>
                <p><strong>WhatsApp:</strong> ${order.customer.phone}</p>
                <p><strong>Alamat:</strong> ${order.customer.address}</p>
            </div>
            
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Layanan</th>
                        <th>Qty</th>
                        <th>Harga</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.order.items.map(item => `
                        <tr>
                            <td>${item.service}</td>
                            <td>${item.quantity} ${item.unit}</td>
                            <td>Rp ${item.price.toLocaleString()}</td>
                            <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="3">Total</td>
                        <td>Rp ${order.order.total.toLocaleString()}</td>
                    </tr>
                </tfoot>
            </table>
            
            <div class="footer">
                <p>Terima kasih telah menggunakan layanan Green Laundry</p>
                <p>🍃 Ramah Lingkungan • Bersih • Wangi 🍃</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// ========== FINAL INITIALIZATION ==========
console.log('Green Laundry JavaScript loaded successfully!');

// Export global functions for debugging
window.GreenLaundry = {
    cart,
    orders,
    addToCart,
    clearCart,
    processOrder,
    showNotification,
    printOrder
};