import { format } from "date-fns";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Trip } from "../../types/trip";

export const DriverDetails = ({ tripDetail }: { tripDetail: Trip }) => {

  const date = new Date(tripDetail.created_at);
  const formattedDate = format(date, "MMMM dd, yyyy hh:mm a");

  return (
    <Card className="w-[70%] min-h-[350px]">
      <CardHeader className="p-5">
        <CardTitle className="flex mb-2 justify-between">
          <p>Trip Details</p>
          <p></p>
          <p className="text-gray-500" >Date: <span className="text-black">{formattedDate}</span></p>
        </CardTitle>
        <CardDescription className=" bg-gray-100 rounded p-4">
          <table className="w-full  ">
            <tr className="h-[25px] ">
              <td className=" font-medium">Trip Id</td>
              <td className=" text-gray-600 text-end">{tripDetail.trip_id}</td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Distance (KM)</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.distance_km}
              </td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Duration Time</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.duration_sec}
              </td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Waiting Time</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.waiting_time_sec}
              </td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Waiting Fee Per Minute</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.waiting_fee_per_minute}
              </td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Normal Cost</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.total_amount - tripDetail.extra_fee}
              </td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Extra Cost</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.extra_fee}
              </td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Total Cost</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.total_amount}
              </td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Trip From</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.start_location}
              </td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Trip To</td>
              <td className=" text-gray-600 text-end">
                {tripDetail.end_location}
              </td>
            </tr>
          </table>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
