// This file is intentionally left blank.

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else {
                window.location.href = targetId;
            }
        });
    });

    // Initialize lightbox
    initLightbox();
});

// Function to initialize the Google Map
window.initMap = function() {
    console.log('Initializing Google Map...');
    
    // Check if map container exists
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }
    
    // Use configuration for studio location
    const studioLocation = MAPS_CONFIG.STUDIO_LOCATION;

    try {
        // Create the map
        const map = new google.maps.Map(mapContainer, {
            zoom: 16,
            center: studioLocation,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                }
            ]
        });

        // Add a marker for the studio location
        const marker = new google.maps.Marker({
            position: studioLocation,
            map: map,
            title: 'Stepbridge Studios',
            animation: google.maps.Animation.DROP
        });

        // Add an info window
        const infoWindow = new google.maps.InfoWindow({
            content: '<div style="padding: 10px;"><strong>Stepbridge Studios</strong><br>' + MAPS_CONFIG.STUDIO_ADDRESS + '</div>'
        });

        // Show info window on marker click
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        
        // Show info window by default
        infoWindow.open(map, marker);
        
        console.log('Google Map initialized successfully');
    } catch (error) {
        console.error('Error initializing Google Map:', error);
        mapContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #666;">
                <p>Unable to load interactive map.</p>
                <p><strong>Stepbridge Studios</strong><br>528 Jose Street<br>Santa Fe, NM 87501</p>
                <p><a href="https://maps.google.com/maps?q=528+Jose+Street+Santa+Fe+NM" target="_blank" style="color: #3498db; text-decoration: none;">Open in Google Maps</a></p>
            </div>
        `;
    }
};

// Handle Google Maps API loading errors
window.handleMapError = function() {
    console.error('Error loading Google Maps API');
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #666;">
                <p>Unable to load interactive map.</p>
                <p><strong>Stepbridge Studios</strong><br>528 Jose Street<br>Santa Fe, NM 87501</p>
                <p><a href="https://maps.google.com/maps?q=528+Jose+Street+Santa+Fe+NM" target="_blank" style="color: #3498db; text-decoration: none;">Open in Google Maps</a></p>
            </div>
        `;
    }
};

// Add mobile menu functionality
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '☰';
document.querySelector('header').appendChild(mobileMenuButton);

mobileMenuButton.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

// Add scroll-based header styling
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lightbox functionality
function initLightbox() {
    console.log('Initializing lightbox');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevButton = document.querySelector('.prev-image');
    const nextButton = document.querySelector('.next-image');
    
    if (!lightbox || !lightboxImg || !lightboxCaption || !closeLightbox || !prevButton || !nextButton) {
        console.error('Lightbox elements not found:', {
            lightbox: !!lightbox,
            lightboxImg: !!lightboxImg,
            lightboxCaption: !!lightboxCaption,
            closeLightbox: !!closeLightbox,
            prevButton: !!prevButton,
            nextButton: !!nextButton
        });
        return;
    }

    let currentImageIndex = 0;
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    
    function updateNavigationButtons() {
        prevButton.disabled = currentImageIndex === 0;
        nextButton.disabled = currentImageIndex === galleryItems.length - 1;
    }

    // Function to open lightbox
    function openLightbox(img, index) {
        console.log('Opening lightbox for image:', img);
        const fullSrc = img.getAttribute('data-full');
        const alt = img.getAttribute('alt');

        if (!fullSrc) {
            console.error('No data-full attribute found on image');
            return;
        }

        currentImageIndex = index;
        updateNavigationButtons();

        // Show loading state
        img.closest('.gallery-item').classList.add('loading');

        // Load the full-size image
        const fullImg = new Image();
        fullImg.onload = () => {
            console.log('Full image loaded');
            lightboxImg.src = fullSrc;
            lightboxImg.alt = alt;
            lightboxCaption.textContent = alt;
            lightbox.classList.add('active');
            img.closest('.gallery-item').classList.remove('loading');
        };
        fullImg.onerror = () => {
            console.error('Error loading full image:', fullSrc);
            img.closest('.gallery-item').classList.remove('loading');
        };
        fullImg.src = fullSrc;
    }

    function navigateToImage(direction) {
        const newIndex = currentImageIndex + direction;
        if (newIndex >= 0 && newIndex < galleryItems.length) {
            const img = galleryItems[newIndex].querySelector('img');
            if (img) {
                openLightbox(img, newIndex);
            }
        }
    }

    // Add click handlers to gallery items and images
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            console.log('Click event on:', item.tagName);
            e.preventDefault();
            e.stopPropagation();
            
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img, index);
            }
        });
    });

    // Add keyboard handlers for accessibility
    galleryItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = item.querySelector('img');
                if (img) {
                    openLightbox(img, index);
                }
            }
        });
    });

    // Navigation button handlers
    prevButton.addEventListener('click', () => navigateToImage(-1));
    nextButton.addEventListener('click', () => navigateToImage(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            navigateToImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateToImage(1);
        } else if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    });

    // Close lightbox when clicking the close button
    closeLightbox.addEventListener('click', () => {
        console.log('Close button clicked');
        lightbox.classList.remove('active');
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            console.log('Clicked outside image');
            lightbox.classList.remove('active');
        }
    });
}