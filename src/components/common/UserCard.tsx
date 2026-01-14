import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Driver } from "../../types/trip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserCard = ({data}:{data:Driver}) => {
  return (
    <Card className="w-[30%] h-[350px]">
      <CardHeader className="p-5">
        <CardTitle>
          <div className=" flex gap-5 flex-col justify-center items-center">
            <Avatar className="w-full rounded h-[150px]">
              <AvatarImage className=" object-cover" src={data.profile_picture_url} alt="@shadcn" />
              <AvatarFallback>Loading!</AvatarFallback>
            </Avatar>

          
          </div>
        
        </CardTitle>
        <CardDescription>
        <p className="text-[24px]   my-5 font-medium  text-gray-700">{data.name}</p>
          <table className="w-full">
            <tr className="h-[25px] ">
              <td className=" font-medium">Driver Id</td>
              <td className=" text-gray-500 text-end">{data.driver_id}</td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Phone</td>
              <td className=" text-gray-500 text-end">{data.phone}</td>
            </tr>
            <tr className="h-[25px]">
              <td className=" font-medium">Birth Date</td>
              <td className=" text-gray-500 text-end">{data.birth_date}</td>
            </tr>
          </table>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
