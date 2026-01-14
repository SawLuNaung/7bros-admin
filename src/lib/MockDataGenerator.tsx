// MockDataGenerator.js
import { useEffect } from 'react';
type Poi = { key: string; location: google.maps.LatLngLiteral };


const speeds = [
  0.0001, // Speed for first POI
  0.0003, // Speed for second POI
  0.0002, // Speed for third POI
  0.00015, // Speed for fourth POI
  0.00025, // Speed for fifth POI
];

const MockDataGenerator = ({ locations, onUpdate }:{locations:Poi[],onUpdate:any}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedLocations = locations.map((location:any, index:any) => {
        const speed = speeds[index]; // Get speed for the current POI
        const newLat = location.location.lat + (Math.random() > 0.5 ? speed : -speed); // Randomly add/subtract speed
        const newLng = location.location.lng + (Math.random() > 0.5 ? speed : -speed); // Randomly add/subtract speed

        return {
          ...location,
          location: { lat: newLat, lng: newLng },
        };
      });

      onUpdate(updatedLocations); // Send updated locations back to parent component
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [locations, onUpdate]);

  return null;
};

export default MockDataGenerator;
