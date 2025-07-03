# Stepbridge Studios Website

A professional website for Stepbridge Studios, an audio post-production service in Santa Fe, New Mexico.

## Setup Instructions

### Google Maps API Key Setup

1. **Copy the example config file:**
   ```bash
   cp js/config.example.js js/config.js
   ```

2. **Edit the config file:**
   - Open `js/config.js`
   - Replace `YOUR_API_KEY_HERE` with your actual Google Maps API key

3. **Get a Google Maps API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Maps JavaScript API"
   - Create credentials (API Key)
   - Set up billing (required for Google Maps API)
   - Optionally restrict the API key to your domain for security

### Security Notes

- The `js/config.js` file is excluded from version control via `.gitignore`
- Never commit your actual API key to the repository
- The `js/config.example.js` file shows the structure without the real key

## Features

- Professional audio studio website
- Interactive Google Maps integration
- Lightbox image gallery
- Responsive design
- Contact information and directions

## File Structure

```
recording-studio-website/
├── index.html              # Homepage
├── about.html              # About page
├── services-rates.html     # Services and rates
├── connections.html        # Specs & formats
├── directions.html         # Directions with map
├── terms-of-service.html   # Terms of service
├── covid-19.html          # COVID-19 information
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── config.js          # API configuration (not in git)
│   ├── config.example.js  # Example config file
│   └── scripts.js         # Main JavaScript
├── assets/
│   ├── images/            # Studio images
│   └── documents/         # PDF documents
└── .gitignore             # Git ignore file
```

## Development

To run the website locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.