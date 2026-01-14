import { gql } from "@apollo/client";


export const ADMIN_SIGNIN = gql`
mutation AdminSignIn($phone: String!, $password: String!) {
  AdminSignIn(phone: $phone, password: $password) {
    token
    message
  }
}
`;
