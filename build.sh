#!/bin/bash

# Build script for GitHub Pages deployment
# Usage: ./build.sh

echo "Building for GitHub Pages..."

# Create config file with API key
cat > js/config.js << EOF
// Google Maps API Configuration
const MAPS_CONFIG = {
    API_KEY: 'AIzaSyDh44W6CrVCXBZflepf2ODLMwbZmVcgKho',
    STUDIO_LOCATION: {
        lat: 35.6870,
        lng: -105.9378
    },
    STUDIO_ADDRESS: '528 Jose Street, Santa Fe, NM 87501'
};
EOF

echo "Config file created successfully!"
echo "You can now push to GitHub and the site will be deployed with the API key." 