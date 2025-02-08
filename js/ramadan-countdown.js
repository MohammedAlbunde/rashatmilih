// Ramadan Countdown Timer
document.addEventListener('DOMContentLoaded', function() {
    function updateRamadanCountdown() {
        const countdownElements = document.querySelectorAll('.ramadan-countdown');
        
        countdownElements.forEach(element => {
            const targetDate = new Date(element.getAttribute('data-ends'));
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

                element.innerHTML = `${days}d ${hours}h ${minutes}m`;
            } else {
                element.innerHTML = "Pre-order Now!";
            }
        });
    }

    // Update countdown every minute
    updateRamadanCountdown();
    setInterval(updateRamadanCountdown, 60000);
});
