import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const Map = () => {
  const [studySpots, setStudySpots] = useState([]);

  useEffect(() => {
    // Fetch study spots from the backend API endpoint
    const fetchStudySpots = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/study-spots');
        if (!response.ok) {
          throw new Error('Failed to fetch study spots');
        }
        const data = await response.json();
        console.log('Fetched study spots:', data);
        setStudySpots(data);
      } catch (error) {
        console.error('Error fetching study spots:', error);
      }
    };

    fetchStudySpots();
  }, []);

  useEffect(() => {
    // Create map instance and add markers for study spots
    console.log('Study Spots:', studySpots); // Log studySpots to inspect its value
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

    // Function to format study spot attributes
    const formatAttributes = (attributes) => {
      let formattedAttributes = '';
      // Loop through each attribute and concatenate them into a string
      for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          formattedAttributes += `<b>${key}:</b> ${attributes[key]}<br>`;
        }
      }
      return formattedAttributes;
    };
  

  return <div id="map" style={{ height: '100vh' }}></div>; // Set height to 100vh for full viewport height
};

export default Map;