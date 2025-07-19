# Wohnnormade Client v2

## Setup

### Environment Variables

No API keys required! The application uses the free OpenStreetMap Nominatim API for location autocomplete.

## Features

- User registration with extended profile fields
- Location autocomplete using OpenStreetMap Nominatim API (completely free)
- Comprehensive form validation
- Reusable components
- Responsive design

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## API Usage

The application uses OpenStreetMap's Nominatim API for city and country suggestions:

- **Completely Free**: No API key required
- **No Rate Limits**: Respectful usage with 500ms debounce
- **Global Coverage**: Cities and countries worldwide
- **Open Source**: Powered by OpenStreetMap community data
