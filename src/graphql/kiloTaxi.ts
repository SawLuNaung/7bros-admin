import { gql } from "@apollo/client";

export const GET_ALL_DRIVERS = gql`
  query MyQuery {
    drivers(order_by: { created_at: asc }) {
      id
      name
      address
      profile_picture_url
      balance
      birth_date
      created_at
      disabled
      driver_id
      verified
    }
  }
`;

export const GET_ALL_CUSTOMERS = gql`
  query MyQuery {
    customers(order_by: { created_at: asc }) {
      created_at
      disabled
      email
      fcm_token
      id
      name
      password
      phone
      profile_picture_url
    }
  }
`;

export const DELETE_DRIVER_BY_ID = gql`
  mutation MyMutation($id: uuid!) {
    delete_drivers_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_DRIVER_BY_ID = gql`
  mutation MyMutation(
    $id: uuid!
    $disabled: Boolean!
    $driving_license_number: String
    $vehicle_model: String
    $address: String
    $verified: Boolean
  ) {
    update_drivers_by_pk(
      pk_columns: { id: $id }
      _set: { 
        disabled: $disabled
        driving_license_number: $driving_license_number
        vehicle_model: $vehicle_model
        address: $address
        verified: $verified
      }
    ) {
      id
      disabled
      driving_license_number
      vehicle_model
      address
      verified
    }
  }
`;

export const CREATE_DRIVER_BY_ADMIN = gql`
  mutation AdminCreateDriver(
    $driver_id: String!
    $name: String!
    $phone: String!
    $vehicle_number: String!
    $password: String!
    $driving_license_number: String
    $vehicle_model: String
    $address_street: String
    $address_city: String
  ) {
    AdminCreateDriver(
      driver_id: $driver_id
      name: $name
      phone: $phone
      vehicle_number: $vehicle_number
      password: $password
      driving_license_number: $driving_license_number
      vehicle_model: $vehicle_model
      address_street: $address_street
      address_city: $address_city
    ) {
      id
      driver_id
      name
      phone
      message
    }
  }
`;
