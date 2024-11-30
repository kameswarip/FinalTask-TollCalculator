import React, { useState } from "react";
import TollCalculator from "./components/TollCalculator";
import Map from "./components/Map";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [waypoints, setWaypoints] = useState([]);

  const handleWaypointsUpdate = (waypoints) => {
    // Convert user inputs (strings) to coordinate arrays
    const coordinates = waypoints.map((point) => {
      const [lat, lng] = point.split(",").map(Number);
      return [lat, lng];
    });
    setWaypoints(coordinates);
  };

  return (
    <div>
      <h1>Toll Calculator</h1>
      <TollCalculator onWaypointsUpdate={handleWaypointsUpdate} />
      <Map waypoints={waypoints} />
    </div>
  );
};

export default App;
