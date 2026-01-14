import { gql } from "@apollo/client";

export const GETALL_EXTRAFEES = gql`
  query MyQuery {
    extra_fees(order_by: { created_at: desc_nulls_first }) {
      updated_at
      name
      id
      disabled
      created_at
      amount
    }
  }
`;
