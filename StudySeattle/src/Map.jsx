import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [studySpots, setStudySpots] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

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
    if (studySpots.length > 0) {
      // Initialize map if it hasn't been initialized yet
      if (!mapRef.current) {
        mapRef.current = L.map(mapContainerRef.current).setView([47.6062, -122.3321], 13);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
      }

      // Add markers for study spots
      studySpots.forEach((spot) => {
        const { latitude, longitude, name, attributes } = spot;
        L.marker([latitude, longitude])
          .addTo(mapRef.current)
          .bindPopup(`<b>${name}</b><br>${formatAttributes(attributes)}`); // Bind popup with study spot name and attributes
      });
    }

    return () => {
      // Clean up the map when the component unmounts
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
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

  return <div ref={mapContainerRef} style={{ height: '100vh' }}></div>; // Set height to 100vh for full viewport height
};

export default Map;