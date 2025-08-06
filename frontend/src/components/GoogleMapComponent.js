import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const GoogleMapComponent = ({ coordinates }) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!coordinates || !coordinates.lat || !coordinates.lng) {
    return <p style={{ color: "red" }}>❌ Impossible d'afficher la carte. Coordonnées invalides.</p>;
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={14}>
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
