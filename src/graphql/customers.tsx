import { gql } from "@apollo/client";

export const GET_ALL_CUSTOMERS = gql`
  query MyQuery {
    customers(order_by: { created_at: desc }) {
      email
      disabled
      name
      password
      phone
      profile_picture_url
    }
  }
`;

export const UPDATE_CUSTOMER_BY_ID = gql`
  mutation MyMutation($id: uuid = "", $disabled: Boolean!) {
    update_customers_by_pk(
      pk_columns: { id: $id }
      _set: { disabled: $disabled }
    ) {
      disabled
    }
  }
`;

export const DELETE_CUSTOMER_BY_ID = gql`
  mutation MyMutation($id: uuid = "") {
    delete_customers_by_pk(id: $id) {
      id
    }
  }
`;
