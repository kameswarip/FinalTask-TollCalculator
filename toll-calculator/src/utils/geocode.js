import axios from 'axios';

const geocodeLocation = async (location) => {
  const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY; // Use the API key from .env

  try {
    console.log(`Requesting geocoding for: ${location}`);
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`
    );

    if (response.status === 200) {
      if (response.data.status.code === 200 && response.data.results.length > 0) {
        const lat = response.data.results[0].geometry.lat;
        const lng = response.data.results[0].geometry.lng;
        return [lat, lng];
      } else {
        throw new Error("Geocoding failed: No results found");
      }
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    throw new Error(`Geocoding service error: ${error.message}`);
  }
};
