import React from 'react'
import L from 'leaflet'

const Marker = ({ studySpot }) => {
    const { latitude, longitude, name, attributes } = studySpot

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

  const popupContent = `<b>${name}</b><br>${formatAttributes(attributes)}`

  return (
    <React.Fragment>
        <L.Marker position ={[latitude, longitude]}>
            <L.Popup>{popupContent}</L.Popup>
        </L.Marker>
    </React.Fragment>
  )
}

export default Marker