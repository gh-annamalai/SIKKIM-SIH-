import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 27.3011, // Rumtek Monastery latitude
  lng: 88.55,   // Rumtek Monastery longitude
};

const GOOGLE_MAPS_API_KEY = 'AIzaSyD2raFFnpOWfEuiXkTDDMel9HgssH_QhAo'; // <-- Replace with your API key

const MapView: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      mapTypeId={window.google && window.google.maps ? window.google.maps.MapTypeId.ROADMAP : 'roadmap'}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapView;
