import { gql } from "@apollo/client";

export const GET_ALL_TOPUPS = gql`
  query getTopUpTransactions {
    driver_transactions(
      where: { transaction_type: { _eq: "cash in" } }
      order_by: { created_at: desc }
    ) {
      id
      amount
      status
      created_at
      transaction_number
      top_up {
        receipt_photo_url
      }
      driver {
        name
        phone
        driver_id
        address
        profile_picture_url
        vehicle_number
        balance
        bookings {
          customer {
            name
            phone
            profile_picture_url
          }
        }
      }
    }
  }
`;


export const UPDATE_AMOUNT = gql`
mutation UpdateDriverCashIn($driver_transaction_id: uuid!, $accepted: Boolean!, $amount: numeric!) {
  UpdateDriverCashIn(driver_transaction_id: $driver_transaction_id, accepted: $accepted, amount: $amount) {
    message
    transaction_id
  }
}
`;
