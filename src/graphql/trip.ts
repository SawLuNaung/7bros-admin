import { gql } from "@apollo/client";

export const GET_ALL_TRIPS = gql`
  query MyQuery {
    trips(order_by: { created_at: desc }) {
      id
      commission_fee
      commission_rate
      commission_rate_type
      created_at
      distance_fee
      distance_fee_per_km
      driver_received_amount
      distance_km
      total_amount
      start_location
      trip_id
      status
      end_location
      driver_id
      extra_fee
      location_points
      waiting_fee
      driver {
        name
      }
    }
  }
`;

export const GET_TRIP_BY_ID = gql`
  query MyQuery($id: uuid = "") {
    trips_by_pk(id: $id) {
      id
      commission_fee
      commission_rate
      end_location
      start_location
      status
      total_amount
      duration_sec
      waiting_fee
      trip_id
      waiting_time_sec
      waiting_fee_per_minute
      created_at
      distance_km
      extra_fee
      driver_id
      distance_fee
      initial_fee
      insurance_fee
      driver {
        profile_picture_url
        name
        driver_id
        birth_date
        phone
      }
    }
  }
`;
