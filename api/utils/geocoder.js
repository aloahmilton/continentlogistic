import axios from 'axios';

/**
 * Geocode an address/city string into latitude and longitude
 * using the OpenStreetMap Nominatim API.
 */
export const geocodeAddress = async (address) => {
  if (!address) return { lat: 0, lng: 0 };
  
  try {
    // Clean up address to avoid issues with extra text that isn't map-searchable
    // E.g. "Albany, NY (Available for Rehoming)" -> "Albany, NY"
    const searchAddress = address.split('(')[0].trim();
    
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: searchAddress,
        format: 'json',
        limit: 1
      },
      headers: {
        // Nominatim requires a valid user-agent
        'User-Agent': 'ContinentalTrack-Logistics-Platform/1.0'
      }
    });

    if (response.data && response.data.length > 0) {
      return {
        lat: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon) // Nominatim API uses lon instead of lng
      };
    }
    
    return { lat: 0, lng: 0 };
  } catch (error) {
    console.error(`Geocoding failed for address "${address}":`, error.message);
    return { lat: 0, lng: 0 };
  }
};
