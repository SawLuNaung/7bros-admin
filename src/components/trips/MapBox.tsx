import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Map,
  AdvancedMarker,
  MapCameraChangedEvent,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import TUKTUK from "../../assets/Location icon.svg";
import { useEffect, useState } from "react";

function Directions({ start, end,photo }: { start: string; end: string,photo:string }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
        polylineOptions: {
          strokeColor: "#fa8231",
          strokeOpacity: 1,
          strokeWeight: 5,
        },
      })
    );
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <>
      <AdvancedMarker position={leg.start_location}>
        <div className="relative flex items-center justify-center">
          <img className="w-[50px]" src={TUKTUK} alt="tuktuk" />
          <img
            className="w-[40px] h-[40px] object-cover rounded-full top-[5.5px] absolute"
            src={photo}
            alt="avatar"
          />
        </div>
      </AdvancedMarker>
      <AdvancedMarker position={leg.end_location}>
        <div className="relative flex items-center justify-center">
          <img className="w-[50px]" src={TUKTUK} alt="tuktuk" />
          <img
            className="w-[40px] h-[40px] object-cover rounded-full top-[5.5px] absolute"
            src={photo}
            alt="avatar"
          />
        </div>
      </AdvancedMarker>
      {leg.via_waypoints?.map((waypoint: any, index) => (
        <AdvancedMarker key={index} position={waypoint.location}>
          <div className="relative flex items-center justify-center">
            <img className="w-[50px]" src={TUKTUK} alt="tuktuk" />
            <img
              className="w-[40px] h-[40px] object-cover rounded-full top-[5.5px] absolute"
              src={photo}
              alt="avatar"
            />
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
}

export const MapBox = ({
  start,
  end,
  photo,
}: {
  start: string;
  end: string;
  photo: string;
}) => {
  return (
    <Card className="w-[100%] h-[500px]">
      <CardHeader className="p-5">
        <CardTitle className="flex mb-2 justify-between">
          <p>Trip Map Details</p>
        </CardTitle>
        <CardDescription className=" bg-gray-100 rounded p-4">
          <Map
            defaultZoom={13}
            mapId={"bf51a910020fa25a"}
            className="h-[440px]"
            defaultCenter={{ lat: 21.97473, lng: 96.08359 }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          >
            <Directions start={start} end={end} photo={photo} />
          </Map>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
