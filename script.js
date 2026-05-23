document.addEventListener('DOMContentLoaded', () => {
    // Target Card Interactivity
    const targetCards = document.querySelectorAll('.target-card');
    
    targetCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all
            targetCards.forEach(c => c.classList.remove('active'));
            // Add to clicked
            card.classList.add('active');
            
            // In a real app, this would trigger an update to Column 2 and 3
        });
    });

    // Traffic Value Leak Slider Logic
    const slider = document.getElementById('leak-slider');
    const sliderPercentage = document.getElementById('slider-percentage');
    const leakValue = document.getElementById('leak-value');
    const leakBar = document.getElementById('leak-bar');
    
    // Base traffic value for the mockup math
    // Let's assume max leak is $29,000 at 50%
    const maxLeakageAmount = 29000;
    
    function updateLeakageValue() {
        const percentage = parseInt(slider.value, 10);
        sliderPercentage.textContent = `${percentage}% Leak`;
        
        // Calculate the simulated monetary leak
        // e.g. at 25% we want to show $14,500
        const calculatedValue = (percentage / 50) * maxLeakageAmount;
        
        // Format as currency
        const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(calculatedValue);
        
        // Ensure the /mo is kept
        leakValue.innerHTML = `${formattedValue}<span class="per-month">/mo</span>`;

        // Update slider background dynamically for visual appeal
        const progress = (percentage / slider.max) * 100;
        slider.style.background = `linear-gradient(to right, var(--emerald-500) ${progress}%, #334155 ${progress}%)`;
        
        // Update leak visualizer bar width and color based on severity
        if(leakBar) {
            leakBar.style.width = `${progress}%`;
            // Interpolate color from green to red based on progress
            if (progress > 60) {
                leakValue.style.color = 'var(--red-400)';
            } else if (progress > 30) {
                leakValue.style.color = '#facc15'; /* yellow */
            } else {
                leakValue.style.color = 'var(--emerald-400)';
            }
        }
    }

    slider.addEventListener('input', updateLeakageValue);
    
    // Initialize
    updateLeakageValue();
    
    // Optional: Add simple entrance animations
    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 150 * (index + 1));
    });
});
