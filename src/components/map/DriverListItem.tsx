import { useState } from "react";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import { Separator } from "../ui/separator";
import { CheckCircleIcon, IdCard, Phone, XCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Poi } from "../../types/driver";


export const DriverListItem: React.FC<Poi> = ({ status,name,phone,photo,licenseNo,online }) => {
  const [detail, setDetail] = useState(false);

  return (
    <div
      className={cn(
        "w-full duration-500 overf`low-hidden rounded mb-2 bg-white shadow  pt-[10px]  justify-between h-[50px] overflow-hidden px-3 ",
        detail && "h-[200px] items-start pt-[10px] "
      )}
    >
      <div
     
        className="flex justify-between  w-full"
      >
        <div className="flex  gap-1 items-center">
          <div    onClick={() => setDetail((prev) => !prev)} className=" relative w-[33px] h-[33px] cursor-pointer">
            <img
              className="w-[33px] h-[33px] rounded-full object-cover"
              src={photo ? photo : 'https://info.drivedifferent.com/hubfs/SMI-BLOG-Ways-to-Improve-Drivers-Happiness%20%281%29.jpg'}
            />
            <span
              className={`absolute top-[-4px] right-[-5px] w-4 h-4 rounded-full border-2 border-white ${
                true ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
        </div>
          <h3 className="text-xs font-semibold">{name}</h3>
        </div>
        {status === "active" && (
          <Badge
            variant={"outline"}
            className="h-[24px] border-green-400 bg-green-200 mt-1 text-xs"
          >
           Active
          </Badge>
        )}
        {status === "on trip" && (
          <Badge
            variant={"outline"}
            className="h-[24px] border-yellow-400 bg-yellow-200 mt-1 text-xs"
          >
            On Trip
          </Badge>
        )}
        {status === "offline" && (
          <Badge
            variant={"outline"}
            className="h-[24px] mt-1 text-xs bg-red-200 border-red-400"
          >
            Offline
          </Badge>
        )}
         {status === "busy" && (
          <Badge
            variant={"outline"}
            className="h-[24px] mt-1 text-xs bg-red-200 border-red-400"
          >
            Busy
          </Badge>
        )}
      </div>
      <div
        className={cn(
          "opacity-0 duration-1000 overflow-hidden w-full h-[130px]  mt-[10px]",
          detail && "opacity-100"
        )}
      >
        <Separator />
        <div className=" p-2 space-y-2 overflow-hidden">
          <div className="flex items-center text-sm space-x-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700"> <span className="text-gray-500 text-xs ">Phone No</span>: {phone}</span>
          </div>

          <div className="flex items-center text-sm space-x-2">
            <IdCard className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700"><span className="text-gray-500 text-xs ">License No</span>: {licenseNo}</span>
          </div>

          <div className="flex items-center text-sm space-x-2">
            {online ? (
              <>
                <CheckCircleIcon className="w-4 h-4 text-xs text-green-500" />
                <span className="text-green-600">Online</span>
              </>
            ) : (
              <>
                <XCircleIcon className="w-4 h-4 text-red-500" />
                <span className="text-red-600">Offline</span>
              </>
            )}
          </div>

          <div className="w-full flex justify-around items-center space-x-2">
            <Button
              variant={'outline'}
              disabled
              className="flex-grow border-sky-500  text-sky-500 py-2 px-4 rounded shadow-md font-light text-sm hover:bg-sky-600 transition-colors"
            >
              Call
            </Button>
            <Button
              variant={'outline'}
              disabled
              className="flex-grow bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600 text-sm font-thin transition-colors"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
