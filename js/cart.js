class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
    }

    addItem(id, name, price, quantity = 1) {
        const existingItem = this.items.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ id, name, price, quantity });
        }
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(id);
            }
        }
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    clearCart() {
        this.items = [];
        this.total = 0;
        this.saveCart();
        this.updateCartUI();
        const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        if (modal) {
            modal.hide();
        }
    }

    updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const orderDetails = document.getElementById('order-details');
        const orderTotal = document.getElementById('order-total');
        const cartCount = document.getElementById('cart-count');
        
        // Update cart count in navbar
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        if (cartItems) {
            cartItems.innerHTML = this.items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">$${item.price.toFixed(2)} each</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn btn-sm btn-outline-secondary me-2" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button type="button" class="btn btn-sm btn-outline-secondary ms-2" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
            `).join('');
        }
        
        if (cartTotal) {
            cartTotal.textContent = this.total.toFixed(2);
        }

        // Update hidden form fields with order details
        if (orderDetails && orderTotal) {
            const formattedItems = this.items.map(item => 
                `${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`
            ).join('\n');
            
            orderDetails.value = formattedItems;
            orderTotal.value = this.total.toFixed(2);
        }
    }
}

// Initialize cart
const cart = new Cart();

function showCart() {
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    cart.updateCartUI();
    modal.show();
}

function submitOrder() {
    const orderDetails = {
        items: cart.items,
        total: cart.total,
        customerName: document.getElementById('orderName').value,
        customerEmail: document.getElementById('orderEmail').value,
        customerPhone: document.getElementById('orderPhone').value,
        deliveryAddress: document.getElementById('orderAddress').value,
        specialInstructions: document.getElementById('orderInstructions').value
    };

    // Send email using emailjs
    emailjs.send('service_id', 'template_id', {
        to_email: 'your-email@example.com',
        from_name: orderDetails.customerName,
        from_email: orderDetails.customerEmail,
        phone: orderDetails.customerPhone,
        address: orderDetails.deliveryAddress,
        special_instructions: orderDetails.specialInstructions,
        order_details: JSON.stringify(orderDetails.items, null, 2),
        total: `$${orderDetails.total.toFixed(2)}`
    })
    .then(function(response) {
        alert('Order submitted successfully! We will contact you shortly.');
        cart.clearCart();
        bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
    }, function(error) {
        alert('Error submitting order. Please try again or contact us directly.');
        console.error('Order submission failed:', error);
    });
}
