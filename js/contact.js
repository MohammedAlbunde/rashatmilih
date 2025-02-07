// EmailJS configuration
(function() {
    emailjs.init("wjxBWNTp9sMHaZjZt");
})();

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
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

    // Send email using EmailJS
    emailjs.send('service_hv6lib5', 'template_fowcqg6', {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message
    })
    .then(function() {
        // Show success message
        alert('Message sent successfully!');
        // Reset form
        document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
        // Show error message
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});
