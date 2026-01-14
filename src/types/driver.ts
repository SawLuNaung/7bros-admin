export type Driver = {
    socketId: string;
    driver: {
      id: string;
      name: string;
      driver_id:string;
      profile_picture_url: string;
      status: string;
      vehicle_number: string;
      phone: string;
      is_online: boolean;
    };
    gps: {
      speed: number;
      heading: number;
      altitude: number;
      accuracy: number;
      longitude: number;
      latitude: number;
    };
  };


  export type Poi = {
    key: string;
    photo: string;
    licenseNo: string;
    name: string;
    phone: string;
    online: boolean;
    status: string;
    location: google.maps.LatLngLiteral;
  };