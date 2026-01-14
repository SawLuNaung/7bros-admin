import React from "react";
import TUKTUK from "../../assets/Location icon.svg"; // Assuming it's a placeholder icon
import { PhoneIcon, IdCard, CheckCircleIcon, XCircleIcon } from "lucide-react"; // Heroicons
import { Button } from "../ui/button";

type driverType = {
  key: string;
  photo: string;
  licenseNo: string;
  name: string;
  phone: string;
  online: boolean;
  status: string;
  location: google.maps.LatLngLiteral;
};

export const DetailDriver: React.FC<driverType> = ({
  key,
  photo,
  name,
  phone,
  licenseNo,
  online,
}) => {
  return (
    <div
      key={key}
      className="w-[200px] absolute top-[-255px] h-[250px] bg-white border border-gray-300 rounded-lg shadow-lg z-[1000] p-3 flex flex-col items-center space-y-1 "
    >
      {/* Driver Photo with Status Indicator */}
      <div className="relative w-[70px] rounded-full h-[70px]  border border-gray-300">
        <img
          src={photo || TUKTUK}
          alt={name}
          className="w-full rounded-full h-full object-cover"
        />
        {/* Online/Offline Status */}
        <span
          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
            online ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </div>

      {/* Driver Information */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-normal text-gray-800">{name}</h3>
      </div>

      {/* Driver Details with Icons */}
      <div className="space-y-2 w-full px-2">
        {/* Phone */}
        <div className="flex items-center space-x-2">
          <PhoneIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700">{phone}</span>
        </div>

        {/* License Number */}
        <div className="flex items-center space-x-2">
          <IdCard className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700">Driver ID: {licenseNo}</span>
        </div>

        {/* Online/Offline Status with Icon */}
        <div className="flex items-center space-x-2">
          {online ? (
            <>
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span className="text-green-600">Online</span>
            </>
          ) : (
            <>
              <XCircleIcon className="w-5 h-5 text-red-500" />
              <span className="text-red-600">Offline</span>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-200 "></div>

      {/* Action Buttons */}
      <div className="w-full flex  justify-around items-center space-x-2">
        <Button disabled className="flex-grow bg-yellow-500 text-white py-2 px-4 rounded shadow-md font-light text-sm hover:bg-sky-600 transition-colors">
          Show Route
        </Button>
      </div>
    </div>
  );
};
