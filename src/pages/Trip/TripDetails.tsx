import { useQuery } from "@apollo/client";
import { UserCard } from "../../components/common/UserCard";
import { MapBox } from "../../components/trips/MapBox";

import { GET_TRIP_BY_ID } from "../../graphql/trip";
import { useParams } from "react-router-dom";
import { DriverDetails } from "../../components/trips/Driver-details";
import { Driver, Trip, TripsByPkResponse } from "../../types/trip";

export const TripDetails = () => {
  const { id } = useParams();
  const { data: tripData, loading } = useQuery<TripsByPkResponse>(
    GET_TRIP_BY_ID,
    {
      variables: { id: id },
      fetchPolicy: "network-only",
    }
  );

  if (loading) {
    return <div>Loading...</div>; // Optionally handle the loading state
  }

  if (!tripData || !tripData.trips_by_pk) {
    return <div>Trip not found.</div>;
  }

  const driver: Driver = tripData.trips_by_pk.driver;
  const tripDetail: Trip = tripData.trips_by_pk;

  return (
    <div className="p-[30px] space-y-3  gap-[20px] min-h-[calc(100svh-81px)]  bg-gray-100 ">
      <div className="flex gap-3 ">
        <UserCard data={driver} />
        <DriverDetails tripDetail={tripDetail} />
      </div>
      <MapBox
        start={tripDetail.start_location}
        photo={tripDetail?.driver?.profile_picture_url}
        end={tripDetail?.end_location}
      />
    </div>
  );
};
