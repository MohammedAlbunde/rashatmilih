// Order form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    // Get form data and cart items
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        phone: this.querySelector('input[name="phone"]').value,
        address: this.querySelector('textarea[name="address"]').value,
        cartItems: JSON.parse(localStorage.getItem('cart') || '[]')
    };

    // Calculate total
    const total = formData.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Prepare email content
    const orderDetails = formData.cartItems.map(item => 
        `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    // Send order email using EmailJS
    emailjs.send('default_service', 'order_template', { // Replace with your service and template IDs
        from_name: formData.name,
        reply_to: formData.email,
        phone: formData.phone,
        address: formData.address,
        order_details: orderDetails,
        total: `$${total.toFixed(2)}`
    })
    .then(function() {
        // Show success message
        alert('Order placed successfully! We will contact you soon.');
        // Clear cart
        localStorage.removeItem('cart');
        // Reset form
        document.getElementById('order-form').reset();
        // Update cart display
        updateCartDisplay();
    })
    .catch(function(error) {
        // Show error message
        alert('Failed to place order. Please try again.');
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});
