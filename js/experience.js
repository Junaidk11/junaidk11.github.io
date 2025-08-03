// Alternative CV Page Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Debug stats section
    debugStatsSection();
    
    // Initialize skill bar animations
    initSkillBars();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize card hover effects
    initCardEffects();
    
    // Initialize date-time widget
    initDateTime();
});

// Debug function to check stats section
function debugStatsSection() {
    const statsSection = document.querySelector('.cv-hero-stats');
    const statElements = document.querySelectorAll('.stat');
    
    console.log('Stats section found:', statsSection);
    console.log('Stat elements found:', statElements.length);
    
    if (statsSection) {
        console.log('Stats section display:', window.getComputedStyle(statsSection).display);
        console.log('Stats section visibility:', window.getComputedStyle(statsSection).visibility);
        console.log('Stats section opacity:', window.getComputedStyle(statsSection).opacity);
    }
    
    statElements.forEach((stat, index) => {
        console.log(`Stat ${index + 1} display:`, window.getComputedStyle(stat).display);
        console.log(`Stat ${index + 1} visibility:`, window.getComputedStyle(stat).visibility);
    });
    
    // Debug experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    console.log('Experience cards found:', experienceCards.length);
    
    experienceCards.forEach((card, index) => {
        console.log(`Experience card ${index + 1}:`, card);
        console.log(`Card ${index + 1} display:`, window.getComputedStyle(card).display);
        console.log(`Card ${index + 1} visibility:`, window.getComputedStyle(card).visibility);
        
        const cardContent = card.querySelector('.card-content');
        if (cardContent) {
            console.log(`Card ${index + 1} content found:`, cardContent);
            console.log(`Card ${index + 1} content display:`, window.getComputedStyle(cardContent).display);
        }
    });
}

// Animate skill bars on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const width = skillFill.style.width;
                skillFill.style.width = '0%';
                
                setTimeout(() => {
                    skillFill.style.width = width;
                }, 200);
                
                observer.unobserve(skillFill);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.experience-card, .education-card, .projects-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Print functionality
function printCV() {
    window.print();
}

// Add loading animation for skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 100);
    });
}

// Initialize when page loads
window.addEventListener('load', () => {
    // Add a small delay for better visual effect
    setTimeout(animateSkillBars, 500);
});

// Date and Time Widget Functionality
function initDateTime() {
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('currentTime');
    
    console.log('Date element found:', dateElement);
    console.log('Time element found:', timeElement);
    
    if (!dateElement || !timeElement) {
        console.log('Date or time elements not found!');
        return;
    }
    
    function updateDateTime() {
        const now = new Date();
        
        // Format date (e.g., "Monday, January 15, 2024")
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = now.toLocaleDateString('en-US', dateOptions);
        
        // Format time (e.g., "14:30:25")
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        };
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
        
        // Update the elements
        dateElement.textContent = formattedDate;
        timeElement.textContent = formattedTime;
        
        console.log('Updated date:', formattedDate);
        console.log('Updated time:', formattedTime);
    }
    
    // Update immediately
    updateDateTime();
    
    // Update every second
    setInterval(updateDateTime, 1000);
}
}); 