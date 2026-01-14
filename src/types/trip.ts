export type Driver = {
    __typename: "drivers";
    profile_picture_url: string;
    driver_id:string
    name: string;
    birth_date: string | null;
    phone: string;
  };
  
 export type Trip = {
    __typename: "trips";
    id: string;
    commission_fee: number;
    commission_rate: number;
    end_location: string;
    start_location: string;
    waiting_time_sec:string;
    waiting_fee_per_minute:string
    status: string;
    created_at:string
    total_amount: number;
    waiting_fee: number;
    trip_id: string;
    

    distance_km:string;
    duration_sec:string
    extra_fee: number;
    driver_id: string;
    distance_fee: number;
    initial_fee: number;
    insurance_fee: number;
    driver: Driver;
  };
  
 export type TripsByPkResponse = {
    trips_by_pk: Trip;
  };
  