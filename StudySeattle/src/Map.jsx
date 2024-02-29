import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  useEffect(() => {
    // Check if the map container has already been initialized
    if (!document.getElementById('map')._leaflet_id) {
      // Create a map instance and specify the ID of the div element to contain the map
      const map = L.map('map').setView([47.6062, -122.3321], 13); // Seattle coordinates

      // Add a tile layer to the map using a base map provider (e.g., OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }
  }, []);

  return <div id="map" style={{ height: '100vh' }}></div>; // Set height to 100vh for full viewport height
};

export default Map;