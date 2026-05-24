document.addEventListener('DOMContentLoaded', () => {
    // Target Card Interactivity
    const targetCards = document.querySelectorAll('.target-card');
    
    const intelData = {
        'auraflow': {
            name: 'AuraFlow',
            arr: '$500K',
            tech: 'HubSpot (Missing)',
            dm: 'Founder/CEO',
            title: "Why AuraFlow's Onboarding Sequence is Leaking Users",
            content: `
                <p>AuraFlow's core value proposition gets lost in their complex product tour. Without a compelling top-of-funnel explainer, early-stage prospects struggle to see the immediate ROI of the platform before signing up.</p>
                <p>This ambiguity creates hesitation right at the consideration stage. Our analysis indicates that missing visual aids are the primary reason why they fail to convert high-intent traffic into active trials.</p>
                <p>By producing a dynamic, 60-second workflow demonstration that highlights the "aha" moment instantly, AuraFlow can significantly reduce friction and boost their free-to-paid conversion rates.</p>
            `,
            maxLeak: 15000,
            angleSubtitle: `"The 'Aha' Demonstration"`,
            angleDesc: `A highly engaging visual walkthrough targeting the Founder. We compress their complex product tour into a dynamic 60-second video that immediately answers "what's in it for me?" before users even sign up.`
        },
        'cognito': {
            name: 'Cognito AI',
            arr: '$1.2M',
            tech: 'Wistia (Missing)',
            dm: 'VP of Growth',
            title: "Why Cognito's Integration Narrative is Leaking Users",
            content: `
                <p>Cognito AI's current homepage relies heavily on dense text blocks and complex diagrams to explain their core integration value prop. Without a clarifying top-of-funnel explainer video, visitors are forced to parse technical jargon before understanding the fundamental problem Cognito solves.</p>
                <p>This cognitive overload creates a significant friction point right at the awareness stage. Our analysis indicates this presentation gap is the primary driver behind their elevated bounce rates, specifically among non-technical stakeholders who are often key decision-makers.</p>
                <p>By implementing a highly targeted, 60-second visual asset that distills the integration workflow into a simple, relatable narrative, Cognito AI can rapidly bridge this comprehension gap, lowering bounce rates and accelerating the buyer journey for high-intent visitors.</p>
            `,
            maxLeak: 29000,
            angleSubtitle: `"The 60-Second Hook"`,
            angleDesc: `A punchy, cinematic overview targeting the VP of Growth. We visually contrast the painful "old way" of fragmented data with Cognito's seamless "new way", establishing immediate trust and clarity before they scroll past the fold.`
        },
        'nexus': {
            name: 'Nexus Data',
            arr: '$2.5M',
            tech: 'Marketo (Missing)',
            dm: 'CMO',
            title: "Why Nexus Data's Analytics Pitch is Leaking Users",
            content: `
                <p>Nexus Data offers an incredibly powerful analytics suite, but their current landing page focuses too heavily on features rather than outcomes. Potential enterprise clients are left wondering how the platform actually fits into their daily workflow.</p>
                <p>This lack of narrative alignment is causing them to lose deals to competitors with less robust features but clearer messaging. Decision-makers need to see the platform in action to build trust.</p>
                <p>A premium, story-driven 60-second commercial focusing on the end-user transformation—rather than dashboard features—will elevate Nexus Data's brand authority and dramatically shorten their enterprise sales cycle.</p>
            `,
            maxLeak: 65000,
            angleSubtitle: `"The Strategic Commercial"`,
            angleDesc: `A premium, story-driven commercial focusing on the CMO. We shift the narrative from dashboard features to enterprise transformation, proving how Nexus Data practically fits into their daily workflow and drives revenue.`
        }
    };

    const focusName = document.querySelector('.company-focus .highlight');
    const metricValues = document.querySelectorAll('.metrics-grid .metric-value');
    const teardownTitle = document.querySelector('.teardown-title');
    const teardownContent = document.querySelector('.teardown-content');
    const angleSubtitleNode = document.querySelector('.angle-subtitle');
    const angleDescriptionNode = document.querySelector('.angle-description');

    targetCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all
            targetCards.forEach(c => c.classList.remove('active'));
            // Add to clicked
            card.classList.add('active');
            
            const companyId = card.getAttribute('data-id');
            const data = intelData[companyId];
            
            if (data) {
                // Update Intel Section
                focusName.textContent = data.name;
                metricValues[0].textContent = data.arr;
                metricValues[1].textContent = data.tech;
                metricValues[2].textContent = data.dm;
                teardownTitle.textContent = data.title;
                teardownContent.innerHTML = data.content;
                
                // Update Calculator and Angle
                angleSubtitleNode.textContent = data.angleSubtitle;
                angleDescriptionNode.textContent = data.angleDesc;
                currentMaxLeak = data.maxLeak;
                updateLeakageValue();
                
                // Add quick pulse animation to column 2
                const colIntel = document.querySelector('.col-intel');
                colIntel.style.transition = 'none';
                colIntel.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    colIntel.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                    colIntel.style.transform = 'scale(1)';
                }, 50);
            }
        });
    });

    // Traffic Value Leak Slider Logic
    const slider = document.getElementById('leak-slider');
    const sliderPercentage = document.getElementById('slider-percentage');
    const leakValue = document.getElementById('leak-value');
    const leakBar = document.getElementById('leak-bar');
    
    // Base traffic value for the mockup math
    let currentMaxLeak = 29000;
    
    function updateLeakageValue() {
        const percentage = parseInt(slider.value, 10);
        sliderPercentage.textContent = `${percentage}% Leak`;
        
        // Calculate the simulated monetary leak
        // e.g. at 25% we want to show $14,500
        const calculatedValue = (percentage / 50) * currentMaxLeak;
        
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
