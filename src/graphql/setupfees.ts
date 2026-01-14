import { gql } from "@apollo/client";

// ✅ Get all fee configs with their related time-based fees
export const GET_ALL_INITIAL_FEES = gql`
  query MyQuery {
    fee_configs(order_by: { commission_rate: asc }) {
      id
      initial_fee
      insurance_fee
      platform_fee
      waiting_fee_per_minute
      free_waiting_minute
      distance_fee_per_km
      commission_rate_type
      commission_rate
      out_of_town

      # include relationship
      time_based_fees {
        id
        start_hour
        end_hour
        fee
      }
    }
  }
`;

// ✅ Update fee_configs only
export const UPDATE_TOPUP_FEES_BY_ID = gql`
  mutation MyMutation(
    $id: uuid!
    $commission_rate: numeric = ""
    $commission_rate_type: String = ""
    $waiting_fee_per_minute: numeric = ""
    $platform_fee: numeric = ""
    $insurance_fee: numeric = ""
    $initial_fee: numeric = ""
    $free_waiting_minute: Int = 10
    $distance_fee_per_km: numeric = ""
    $out_of_town: numeric = ""
  ) {
    update_fee_configs_by_pk(
      pk_columns: { id: $id }
      _set: {
        commission_rate: $commission_rate
        commission_rate_type: $commission_rate_type
        distance_fee_per_km: $distance_fee_per_km
        free_waiting_minute: $free_waiting_minute
        initial_fee: $initial_fee
        insurance_fee: $insurance_fee
        platform_fee: $platform_fee
        waiting_fee_per_minute: $waiting_fee_per_minute
        out_of_town: $out_of_town
      }
    ) {
      id
      waiting_fee_per_minute
      platform_fee
      insurance_fee
      initial_fee
      free_waiting_minute
      distance_fee_per_km
      commission_rate_type
      commission_rate
      out_of_town
    }
  }
`;

// ✅ Insert new time-based fee for a given fee_config
export const INSERT_TIME_BASED_FEE = gql`
  mutation InsertTimeBasedFee(
    $fee_config_id: uuid!
    $start_hour: timetz!
    $end_hour: timetz!
    $fee: numeric!
  ) {
    insert_time_based_fee_one(
      object: {
        fee_config_id: $fee_config_id
        start_hour: $start_hour
        end_hour: $end_hour
        fee: $fee
      }
    ) {
      id
      start_hour
      end_hour
      fee
    }
  }
`;

// ✅ Update an existing time-based fee
export const UPDATE_TIME_BASED_FEE = gql`
mutation update_time_based_fee_by_pk(
  $id: uuid!,
  $start_hour: timetz,
  $end_hour: timetz,
  $fee: numeric
) {
  update_time_based_fee_by_pk(
    pk_columns: { id: $id },
    _set: { start_hour: $start_hour, end_hour: $end_hour, fee: $fee }
  ) {
    id
    start_hour
    end_hour
    fee
  }
}

`;

// ✅ Delete a time-based fee
export const DELETE_TIME_BASED_FEE = gql`
  mutation MyMutation($id: uuid!) {
    delete_time_based_fee_by_pk(id: $id) {
      id
    }
  }
`;
