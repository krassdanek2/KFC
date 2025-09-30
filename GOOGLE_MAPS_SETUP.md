# Google Maps Integration Setup

## Required Setup

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Features

- **Interactive Google Maps** with click-to-select location
- **Draggable marker** for precise location selection
- **Address search** with autocomplete (restricted to UAE)
- **Reverse geocoding** to get address from coordinates
- **Current location** button to center map on user's location
- **Responsive design** for mobile and desktop

### 4. Usage

The location page now includes:
- Real Google Maps integration
- Address search functionality
- Location selection with marker
- Coordinate display
- Location persistence in localStorage

### 5. Security Notes

- Always restrict your API key to specific domains
- Monitor API usage in Google Cloud Console
- Consider implementing rate limiting for production use
