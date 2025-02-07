// EmailJS configuration
(function() {
    emailjs.init("wjxBWNTp9sMHaZjZt");
})();

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            name: this.querySelector('input[name="name"]').value,
            email: this.querySelector('input[name="email"]').value,
            message: this.querySelector('textarea[name="message"]').value
        };

        // Log the attempt
        console.log('Attempting to send email with data:', {
            service_id: 'service_hv6lib5',
            template_id: 'template_fowcqg6',
            user_id: 'wjxBWNTp9sMHaZjZt',
            template_params: {
                from_name: formData.name,
                reply_to: formData.email,
                message: formData.message
            }
        });

        // Send email using EmailJS
        emailjs.send('service_hv6lib5', 'template_fowcqg6', {
            from_name: formData.name,
            reply_to: formData.email,
            message: formData.message
        })
        .then(function(response) {
            console.log('Email sent successfully:', response);
            // Redirect to success page
            window.location.href = 'success.html';
        })
        .catch(function(error) {
            console.error('EmailJS error:', error);
            // Show error message with more details
            alert('Failed to send message. Error: ' + (error.text || error.message || 'Unknown error'));
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
});
