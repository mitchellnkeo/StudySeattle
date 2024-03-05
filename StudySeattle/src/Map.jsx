import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios'; // Import Axios for making HTTP requests


const Map = () => {
  const [studySpots, setStudySpots] = useState([]);

  useEffect(() => {
    // Fetch study spots from the backend API endpoint
    const fetchStudySpots = async () => {
      try {
        const response = await axios.get('/api/study-spots'); // Replace '/api/study-spots' with your actual API endpoint
        console.log('Fetched study spots:', response.data);
        setStudySpots(response.data);
      } catch (error) {
        console.error('Error fetching study spots:', error);
      }
    };

    fetchStudySpots();
  }, []);

  useEffect(() => {
    // Create map instance and add markers for study spots
    if (studySpots.length > 0) {
    const map = L.map('map').setView([47.6062, -122.3321], 13); // Seattle coordinates

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add markers for study spots
    studySpots.forEach((spot) => {
      const { latitude, longitude, name, attributes } = spot;
      const marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup(`<b>${name}</b><br>${formatAttributes(attributes)}`); // Bind popup with study spot name and attributes
    });
  }
  }, [studySpots]);
  

  return <div id="map" style={{ height: '100vh' }}></div>; // Set height to 100vh for full viewport height
};

export default Map;