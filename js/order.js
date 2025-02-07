// Order form submission
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    if (!orderForm) {
        console.error('Order form not found');
        return;
    }

    orderForm.addEventListener('submit', function(event) {
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

        // Log the attempt
        console.log('Attempting to send order email with data:', {
            service_id: 'service_hv6lib5',
            template_id: 'template_ndtj6ce',
            user_id: 'wjxBWNTp9sMHaZjZt',
            template_params: {
                from_name: formData.name,
                reply_to: formData.email,
                phone: formData.phone,
                address: formData.address,
                order_details: orderDetails,
                total: `$${total.toFixed(2)}`
            }
        });

        // Send order email using EmailJS
        emailjs.send('service_hv6lib5', 'template_ndtj6ce', {
            from_name: formData.name,
            reply_to: formData.email,
            phone: formData.phone,
            address: formData.address,
            order_details: orderDetails,
            total: `$${total.toFixed(2)}`
        })
        .then(function(response) {
            console.log('Order email sent successfully:', response);
            // Clear cart
            localStorage.removeItem('cart');
            // Redirect to success page
            window.location.href = 'order-success.html';
        })
        .catch(function(error) {
            console.error('EmailJS error:', error);
            // Show error message with more details
            alert('Failed to place order. Error: ' + (error.text || error.message || 'Unknown error'));
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
});
