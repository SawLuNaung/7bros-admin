import { gql } from "@apollo/client";

export const DASHBOARD_ALL_CUSTOMERS = gql`
  query MyQuery {
    customers_aggregate(order_by: { created_at: asc }) {
      aggregate {
        count(columns: created_at)
      }
    }
  }
`;

export const DASHBOARD_ALL_DRIVERS = gql`
  query MyQuery {
    drivers_aggregate(order_by: { created_at: asc }) {
      aggregate {
        count
      }
    }
  }
`;

export const DASHBOARD_ALL_VEHICLE = gql`
  query MyQuery {
    vehicle_types_aggregate(order_by: { created_at: asc }) {
      aggregate {
        count
      }
    }
  }
`;

export const DASHBOARD_ALL_TRIP = gql`
  query MyQuery {
    trips_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const DASHBOARD_TOTAL_INCOME = gql`
  query totalIncome {
    driver_transactions_aggregate(
      where: { transaction_type: { _eq: "commission" } }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

export const DASHBOARD_TOTAL_TOPUP = gql`
  query totalTopUp {
    driver_transactions_aggregate(
      where: { transaction_type: { _eq: "cash in" } }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;
