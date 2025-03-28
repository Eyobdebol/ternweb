// Project Slider Functionality
function initProjectSliders() {
    document.querySelectorAll('.project-slider').forEach(slider => {
        const slides = slider.querySelector('.project-slides');
        const dots = slider.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        let slideInterval;
        
        function updateSlider() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % dots.length;
            updateSlider();
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
                resetTimer();
            });
        });
        
        function startTimer() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }
        
        updateSlider();
        startTimer();
        
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startTimer);
    });
}

// Project Filtering System
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.category-btn');
    const projectContainer = document.querySelector('.projects-grid');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const category = button.dataset.category;
            const projects = document.querySelectorAll('.project-card');
            
            projects.forEach(project => {
                if (category === 'all' || project.dataset.category === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Image Modal for Project Galleries
function setupImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        z-index: 1000;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 35px;
        font-weight: bold;
        cursor: pointer;
    `;
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Handle clicks on gallery images
    document.querySelectorAll('.project-gallery img').forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProjectSliders();
    setupProjectFilters();
    
    // Only initialize modal if on project detail page
    if (document.querySelector('.project-gallery')) {
        setupImageModal();
    }
});