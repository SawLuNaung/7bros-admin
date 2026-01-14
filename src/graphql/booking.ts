import { gql } from "@apollo/client";

export const GET_ALL_TOPUPS = gql`
query MyQuery {
    bookings {
      booking_status {
        name
      }
      customer {
        name
        password
        profile_picture_url
      }
      driver {
        name
        profile_picture_url
      }
      trip {
        start_lat
        start_lngx
        total_amount
      }
    }
  }
  
`;


