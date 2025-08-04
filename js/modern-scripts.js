// Modern Portfolio Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initDateTime();
    initSmoothScrolling();
    initAnimations();
    initModal();
    
    // Load projects first, then initialize filters
    loadProjects();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Project data - Easy to add new projects
const projectsData = [
    {
        id: 1,
        title: "Feedback Controller Design",
        description: "Advanced control system design using PID controllers and compensators for dynamic system optimization.",
        image: "images/controllericon.jpg",
        category: "signal",
        tags: ["MATLAB", "Control Systems", "PID"],
        link: "projects/compensatordesign.html",
        github: null,
        featured: true
    },
    {
        id: 2,
        title: "GPS Module Interface",
        description: "TM4C123GH6PM interfacing with Adafruit GPS for SFU Rocketry navigation system.",
        image: "images/gpsmoduleicon.png",
        category: "embedded",
        tags: ["C", "UART", "GPS"],
        link: "projects/gpsmodule.html",
        github: "https://github.com/Junaidk11/Adafruit_GPS_Module",
        featured: true
    },
    {
        id: 3,
        title: "System Modelling & Simulation",
        description: "Dynamic system modeling and simulation for complex engineering systems analysis.",
        image: "images/simulationandnmodellingicon.png",
        category: "signal",
        tags: ["MATLAB", "Simulation", "Modeling"],
        link: "projects/systemmodellingandsimulation.html",
        github: null,
        featured: true
    },
    {
        id: 4,
        title: "Industrial Control Technology",
        description: "Advanced industrial control systems implementation and optimization.",
        image: "images/industrialcontrolicon.png",
        category: "hardware",
        tags: ["PLC", "Industrial", "Control"],
        link: "projects/industrialcontroltechnology.html",
        github: null,
        featured: true
    },
    {
        id: 5,
        title: "Machine Design",
        description: "Comprehensive machine design and analysis using CAD and simulation tools.",
        image: "images/machinedesignicon.png",
        category: "hardware",
        tags: ["CAD", "Design", "Analysis"],
        link: "projects/machinedesign.html",
        github: null,
        featured: true
    },
    {
        id: 6,
        title: "Four-Bar Mechanism",
        description: "Design and analysis of four-bar linkage mechanisms for mechanical systems.",
        image: "images/4barmechanismicon.png",
        category: "hardware",
        tags: ["Mechanics", "Design", "Analysis"],
        link: "projects/fourbarmechanism.html",
        github: null,
        featured: true
    },
    {
        id: 7,
        title: "Dynamic System Design",
        description: "Dynamic system design and optimization for complex engineering applications.",
        image: "images/dynamicsystemsicon.png",
        category: "signal",
        tags: ["Dynamics", "Control", "Optimization"],
        link: "projects/dynamicsystem.html",
        github: null,
        featured: true
    },
    {
        id: 8,
        title: "Forward & Inverse Kinematics",
        description: "Robotic arm kinematics analysis and implementation for motion control.",
        image: "images/inverseandforwardkinematicicon.png",
        category: "robotics",
        tags: ["Robotics", "Kinematics", "MATLAB"],
        link: "projects/forwardinversekinematics.html",
        github: null,
        featured: true
    },
    {
        id: 9,
        title: "Inventory Management System",
        description: "Web-based inventory management application for Fraser International College.",
        image: "images/inventorymanagementappicon.png",
        category: "web",
        tags: ["Web Development", "Database", "PHP"],
        link: "projects/inventorymanagementapp.html",
        github: null,
        featured: true
    },
    {
        id: 10,
        title: "Analog Circuit Design",
        description: "Design and analysis of analog circuits including amplifiers, filters, and signal processing.",
        image: "images/analogcircuit.png",
        category: "hardware",
        tags: ["Circuit Design", "SPICE", "Op-Amps"],
        link: "projects/analogcircuit.html",
        github: null,
        featured: true
    },
    {
        id: 11,
        title: "DC Motor Controller",
        description: "PID-based DC motor control system with H-bridge driver and feedback control.",
        image: "images/controllericon.jpg",
        category: "embedded",
        tags: ["PID Control", "H-Bridge", "Embedded"],
        link: "projects/dcmotorcontroller.html",
        github: null,
        featured: true
    },
    {
        id: 12,
        title: "External Flash Communication",
        description: "SPI-based external flash memory interface for data storage and retrieval.",
        image: "images/externalFlashicon.png",
        category: "embedded",
        tags: ["SPI", "Flash Memory", "C++"],
        link: "projects/externalflashCommunication.html",
        github: null,
        featured: true
    },
    {
        id: 13,
        title: "Frame Stress Analysis",
        description: "Finite Element Analysis (FEA) and structural analysis of mechanical frames.",
        image: "images/streamlinerStressAnalysis.png",
        category: "hardware",
        tags: ["FEA", "Structural Analysis", "CAD"],
        link: "projects/framestressanalysis.html",
        github: null,
        featured: true
    },
    {
        id: 14,
        title: "Power Electronics Design",
        description: "DC-DC converters, motor drives, and power factor correction circuits.",
        image: "images/powerelectronicsicon.jpg",
        category: "hardware",
        tags: ["Power Electronics", "DC-DC", "Motor Drives"],
        link: "projects/powerelectronics.html",
        github: null,
        featured: true
    },
    {
        id: 15,
        title: "EEG Signal Processing",
        description: "Advanced EEG signal processing using EEGLAB for resting-wakeful state analysis.",
        image: "images/EEG-Project-Images/IndependentComponentAnalysis.png",
        category: "signal-processing",
        tags: ["MATLAB", "EEGLAB", "Signal Processing", "EEG"],
        link: "projects/eeglab-dsp.html",
        github: "https://github.com/Junaidk11/eeglab_DSP",
        featured: true
    },
    {
        id: 16,
        title: "Data Structures & Algorithms",
        description: "Comprehensive implementations of data structures and algorithms in C/C++.",
        image: "images/controllericon.png",
        category: "software",
        tags: ["C++", "C", "Data Structures", "Algorithms"],
        link: "projects/datastructures-algorithms.html",
        github: "https://github.com/Junaidk11/DataStructuresAndAlgorithm",
        featured: true
    },
    {
        id: 17,
        title: "CAN Network Communication",
        description: "Implementation of CAN communication between Hercules Safety MCUs.",
        image: "images/CanNetworkicone.jpg",
        category: "hardware",
        tags: ["C++", "CAN Bus", "Embedded Systems", "MCU"],
        link: "projects/can-network.html",
        github: "https://github.com/Junaidk11/can_network",
        featured: true
    },
    {
        id: 18,
        title: "Digital Filter Design",
        description: "Implementation of Butterworth and Chebyshev digital filters.",
        image: "images/analogcircuit.png",
        category: "signal-processing",
        tags: ["C", "Digital Filters", "DSP", "Signal Processing"],
        link: "projects/digital-filter-design.html",
        github: "https://github.com/Junaidk11/digital_filter_design",
        featured: true
    },
    {
        id: 19,
        title: "Modern CMake Project",
        description: "Comprehensive guide to modern CMake practices and build systems.",
        image: "images/project.jpg",
        category: "software",
        tags: ["CMake", "C++", "Build Systems", "Modern C++"],
        link: "projects/modern-cmake.html",
        github: "https://github.com/Junaidk11/how-to-cmake-good",
        featured: true
    }
];

// Load and display projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) {
        console.log('Projects grid not found!');
        return;
    }
    
    const featuredProjects = projectsData.filter(project => project.featured);
    
    projectsGrid.innerHTML = featuredProjects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.link}" class="project-link" target="_blank">View Project</a>
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank">GitHub</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize project filters after loading projects
    initProjectFilters();
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length === 0) {
        console.log('Filter buttons not found!');
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            console.log('Filter clicked:', filter);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get project cards (re-query to ensure we have the latest)
            const projectCards = document.querySelectorAll('.project-card');
            console.log('Found project cards:', projectCards.length);
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                console.log('Card category:', category, 'Filter:', filter);
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const modalContent = document.getElementById('modalContent');

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#10b981';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
            }, 2000);
        });
    }
});

// Utility function to add new projects easily
function addNewProject(projectData) {
    projectsData.push({
        id: projectsData.length + 1,
        featured: true,
        ...projectData
    });
    loadProjects();
}

// Example of how to add a new project:
// addNewProject({
//     title: "New Project Title",
//     description: "Project description here",
//     image: "images/new-project-image.jpg",
//     category: "embedded", // embedded, signal, hardware, software
//     tags: ["C", "Microcontrollers", "Embedded"],
//     link: "projects/newproject.html",
//     github: "https://github.com/username/repo"
// });

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Uncomment the next line to enable typing effect
        // typeWriter();
    }
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