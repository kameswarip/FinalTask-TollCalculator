import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { DUMMY_WAYPOINTS } from "../utils/constants";

const Map = ({ waypoints = DUMMY_WAYPOINTS }) => {
  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={10} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {waypoints.map((point, index) => (
        <Marker key={index} position={point} />
      ))}
    </MapContainer>
  );
};

export default Map;
