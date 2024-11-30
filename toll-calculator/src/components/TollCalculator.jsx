import React, { useState } from 'react';
import axios from 'axios';
import './TollCalculator.css';

const TollCalculator = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [tollCost, setTollCost] = useState(null);
  const [error, setError] = useState(null);

  const geocodeLocation = async (location) => {
    const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY; // Correct usage of env variable

    if (!apiKey) {
      throw new Error('API Key is missing or not defined.');
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/toll/calculate-toll`, {
        params: { start, end }
      });

      if (response.status === 200 && response.data.results.length > 0) {
        const lat = response.data.results[0].geometry.lat;
        const lng = response.data.results[0].geometry.lng;
        return [lat, lng];
      } else {
        throw new Error('No results found for the location.');
      }
    } catch (error) {
      console.error('Error during geocoding:', error);
      throw new Error(`Geocoding service error: ${error.message}`);
    }
  };

  const calculateTollCost = async (startLat, startLng, endLat, endLng) => {
    const tollGuruApiKey = process.env.REACT_APP_TOLLGURU_API_KEY; // Correct usage of env variable

    if (!tollGuruApiKey) {
      throw new Error('TollGuru API Key is missing or not defined.');
    }

    try {
      const response = await axios.post(
        'https://api.tollguru.com/v1/calc/route',
        {
          from: { lat: startLat, lng: startLng },
          to: { lat: endLat, lng: endLng },
          vehicle: { type: 'car' }, // Change vehicle type as required
        },
        {
          headers: {
            'Authorization': `Bearer ${tollGuruApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.cost) {
        return response.data.cost;
      } else {
        throw new Error('Unable to fetch toll cost from TollGuru.');
      }
    } catch (error) {
      console.error('Error during toll cost calculation:', error);
      throw new Error(`TollGuru service error: ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!startLocation || !endLocation) {
      setError('Please enter both start and end locations.');
      return;
    }

    try {
      const [startLat, startLng] = await geocodeLocation(startLocation);
      const [endLat, endLng] = await geocodeLocation(endLocation);

      const calculatedTollCost = await calculateTollCost(startLat, startLng, endLat, endLng);
      setTollCost(calculatedTollCost);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="Enter start location"
            required
            className="location-input"
          />
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="Enter end location"
            required
            className="location-input"
          />
        </div>
        <button onClick={handleSubmit}>Calculate Toll</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tollCost !== null && <p>The calculated toll cost is: ${tollCost}</p>}
    </div>
  );
};

export default TollCalculator;
