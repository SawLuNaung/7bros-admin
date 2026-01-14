import { useEffect, useState } from "react";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { io } from "socket.io-client";
import TUKTUK from "../../assets/Location icon.svg";
import { DetailDriver } from "../../components/map/DetailDriver";
import { DriverFilter } from "../../components/map/DriverFilter";
import { Driver, Poi } from "../../types/driver";



const PoiMarkers = (props: { pois: Poi[] }) => {
  const [showContent, setShowContent] = useState<{ [key: string]: boolean }>(
    {}
  );



  const handleMarkerClick = (poiKey: string) => {

    setShowContent((prev) => ({
      ...prev,
      [poiKey]: !prev[poiKey], // Toggle visibility for the clicked marker
    }));
  };
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          clickable
          onClick={() => handleMarkerClick(poi.key)}
          key={poi.key}
          className="z-[100]"
          position={poi.location}
        >
          <div
            id={poi.key}
            className="relative z-20 flex items-center justify-center"
          >
            {showContent[poi.key] && (
              <DetailDriver
                key={poi.key}
                phone={poi.phone}
                name={poi.name}
                photo={poi.photo}
                licenseNo={poi.licenseNo}
                online={poi.online}
                status={poi.status}
                location={poi.location}
              />
            )}
            <img className="w-[50px]" src={TUKTUK} alt="tuktuk" />
            {
              poi?.photo &&  <img
              className="w-[40px] h-[40px] rounded-full top-[5.5px] absolute"
              src={
                  poi.photo
              }
              alt="No Profile"
            />
            }


          </div>
          {/* Tooltip for displaying the driver's license number */}
        </AdvancedMarker>
      ))}
    </>
  );
};

export const Maps = () => {
  const [locations, setLocations] = useState<Poi[]>([]); // Start with an empty array

  // Handler for updating the locations of all markers in real time
  useEffect(() => {
    const socket = io("wss://rest.eaxi.axra.app/");

    // Listen for real-time driver location updates
    socket.on("allDriverLocation", (data: Driver[]) => {
      const updatedLocations: Poi[] = data.map((driver: Driver) => ({
        key: driver.driver.id, // Use unique driver id for marker key
        photo: driver.driver.profile_picture_url,
        licenseNo: driver.driver.driver_id,
        name: driver.driver.name,
        phone: driver.driver.phone,
        online: driver.driver.is_online,
        status: driver.driver.status,
        location: {
          lat: driver.gps.latitude,
          lng: driver.gps.longitude,
        },
      }));

      setLocations(updatedLocations); // Update the locations state with new data
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);



  return (
    <div className="p-3 bg-gray-100">
     <div className="flex gap-4">
     <DriverFilter />
     <div className="p-3 w-full bg-white">
       <Map
          defaultZoom={6}
          mapId={"bf51a910020fa25a"}
          className="h-[calc(100svh-120px)] "
          defaultCenter={{ lat: 21.9162, lng: 95.956 }}
        >
          <PoiMarkers pois={locations} />{" "}
          {/* Markers are rendered based on real-time data */}
        </Map>
       </div>
     </div>
      </div>
  );
};

export default Maps;
