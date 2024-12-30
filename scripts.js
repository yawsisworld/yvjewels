document.addEventListener('DOMContentLoaded', function() {
    // Function to handle hover effects
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Maybe add some fun animations here like shaking or glowing
            this.classList.add('active');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
});