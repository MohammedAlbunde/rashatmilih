// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function initScrollAnimations() {
    // Observe menu items for scroll animation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => observer.observe(item));

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Handle navbar transparency on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add hover effect to menu items
    const cards = document.querySelectorAll('.menu-item .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const title = card.querySelector('.card-title');
            if (title) {
                title.style.color = 'var(--primary-color)';
            }
        });

        card.addEventListener('mouseleave', (e) => {
            const title = card.querySelector('.card-title');
            if (title) {
                title.style.color = 'var(--secondary-color)';
            }
        });
    });
}

// Language handling
let currentLang = localStorage.getItem('language') || 'en';

function initLanguageSelector() {
    function setLanguage(lang) {
        if (!translations[lang]) return;
        
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.innerHTML = translations[currentLang][key];
            }
        });

        // Update placeholder texts
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.placeholder = translations[currentLang][key];
            }
        });
    }

    setLanguage(currentLang);
}

// Countdown Timers
function updateTimers() {
    const now = new Date();
    document.querySelectorAll('.timer').forEach(timer => {
        const endTime = new Date(timer.dataset.ends);
        const diff = endTime - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            let timeText = '';
            if (days > 0) {
                timeText = `${days}d ${hours}h`;
            } else {
                timeText = `${hours}h ${minutes}m ${seconds}s`;
            }

            timer.querySelector('.countdown').textContent = timeText;
        } else {
            timer.querySelector('.countdown').textContent = 'Expired';
        }
    });
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize language selector
    initLanguageSelector();
    
    // Initialize special offers
    updateTimers();
    setInterval(updateTimers, 1000);
});

// Welcome Animation
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome animation only once per session
    if (!sessionStorage.getItem('welcomed')) {
        const welcomeOverlay = document.querySelector('.welcome-overlay');
        welcomeOverlay.style.display = 'flex';
        sessionStorage.setItem('welcomed', 'true');

        // Remove overlay after animation
        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
        }, 4500); // Total animation duration + delay
    }
});

// Special Offers Timer
function updateTimer(elementId, endTime) {
    const timer = document.getElementById(elementId);
    if (!timer) return;

    const update = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            timer.innerHTML = "Offer Expired";
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer.innerHTML = `Ends in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    update();
    setInterval(update, 1000);
}

// Set end times for offers
const familyDealEnd = new Date().getTime() + (6 * 60 * 60 * 1000); // 6 hours from now
const lunchDealEnd = new Date().getTime() + (5 * 60 * 60 * 1000); // 5 hours from now
updateTimer('familyDeal', familyDealEnd);
updateTimer('lunchDeal', lunchDealEnd);

// Special Offer Order Handler
function orderSpecialDeal(dealType) {
    let items = [];
    switch(dealType) {
        case 'family':
            items = [
                { id: 'dolma', name: 'Dolma دولمة', price: 25, quantity: 1 },
                { id: 'kubbah', name: 'Kubbah Rice كبة حلب', price: 15, quantity: 10 },
                { id: 'potato_chap', name: 'Potato Chap بطاطا جاب', price: 18, quantity: 10 },
                { id: 'kleechah', name: 'Kleechah كليجة', price: 25, quantity: 1 }
            ];
            break;
        case 'lunch':
            items = [
                { id: 'dolma', name: 'Dolma دولمة', price: 25, quantity: 1 },
                { id: 'kubbah', name: 'Kubbah Rice كبة حلب', price: 15, quantity: 5 }
            ];
            break;
        case 'weekend':
            items = [
                { id: 'potato_chap', name: 'Potato Chap بطاطا جاب', price: 18, quantity: 5 },
                { id: 'kleechah', name: 'Kleechah كليجة', price: 25, quantity: 1 }
            ];
            break;
    }

    // Add items to cart with special pricing (25% off)
    if (items.length > 0) {
        items.forEach(item => {
            // Calculate discounted price
            const discountedPrice = (item.price * 0.75).toFixed(2);
            // Add to cart
            cart.addItem({
                id: item.id,
                name: item.name,
                price: parseFloat(discountedPrice),
                quantity: item.quantity
            });
        });
        
        // Show success message
        const toast = new bootstrap.Toast(document.getElementById('orderSuccessToast'));
        toast.show();
        
        // Open cart modal
        showCart();
    }
}

// Show Special Offer Modal
function showSpecialOffer() {
    const modal = new bootstrap.Modal(document.getElementById('specialOfferModal'));
    modal.show();
}

// Remove first-time visitor code
if (localStorage.getItem('returningVisitor')) {
    localStorage.removeItem('returningVisitor');
}

// Remove the modal if it exists
const firstTimeModal = document.getElementById('firstTimeModal');
if (firstTimeModal) {
    firstTimeModal.remove();
}

// Handle scroll-to-top button
const scrollToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', function() {
    // Show/hide scroll-to-top button
    if (window.scrollY > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }

    // Handle navbar transparency
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

scrollToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Remove loading screen when page is loaded
window.addEventListener('load', function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
});

// Add smooth hover effect to all cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Remove dark mode code
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.remove();
}

// Visitor Counter
document.addEventListener('DOMContentLoaded', function() {
    function updateCounter() {
        // Get or initialize the counter from localStorage
        let counter = localStorage.getItem('visitorCounter');
        if (!counter) {
            counter = {
                date: new Date().toLocaleDateString(),
                count: 0
            };
        } else {
            counter = JSON.parse(counter);
            // Reset counter if it's a new day
            if (counter.date !== new Date().toLocaleDateString()) {
                counter.date = new Date().toLocaleDateString();
                counter.count = 0;
            }
        }
        
        // Increment the counter
        counter.count++;
        
        // Save back to localStorage
        localStorage.setItem('visitorCounter', JSON.stringify(counter));
        
        // Update the display
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            counterElement.textContent = counter.count.toLocaleString();
        }
        
        // Update the date display
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = new Date().toLocaleDateString('en-US', options);
        }
    }

    // Run the counter update
    updateCounter();
});

// Initialize Supabase client
const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjUwNjQwMCwiZXhwIjoxOTQ4MDgyNDAwfQ.2Jm6g9eB1XJ1g9XJ1g9XJ1g9XJ1g9XJ1g';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXhQo_2O8yjWIFHqxnFrQgXlQRF9q2gQY",
    authDomain: "rashat-milih.firebaseapp.com",
    databaseURL: "https://rashat-milih-default-rtdb.firebaseio.com",
    projectId: "rashat-milih",
    storageBucket: "rashat-milih.appspot.com",
    messagingSenderId: "946916893340",
    appId: "1:946916893340:web:8f5d9c8f9f9f9f9f9f9f9f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const visitorCountRef = database.ref('visitorCount');

// Update visitor count
function updateVisitorCount() {
    visitorCountRef.transaction((currentCount) => {
        return (currentCount || 0) + 1;
    });
}

// Listen for visitor count changes
visitorCountRef.on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    document.getElementById('visitorCount').textContent = count.toLocaleString();
});

// Update count when page loads
updateVisitorCount();

// Contact Form Handler
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // Prepare the template parameters
    const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Send the email using EmailJS
    emailjs.send('service_hv6lib5', 'template_fowcqg6', templateParams)
        .then(function() {
            // Reset form
            form.reset();
            
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            // Add event listener for when modal is hidden
            document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
                // Smooth scroll to home section
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
            });
        })
        .catch(function(error) {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show error message
            alert('Oops! Something went wrong. Please try again later.');
            console.error('EmailJS error:', error);
        });

    return false;
}
