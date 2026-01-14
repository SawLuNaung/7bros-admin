import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { io } from "socket.io-client";
import { AlignLeft, Search, X } from "lucide-react";
import { DriverListItem } from "./DriverListItem";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Driver, Poi } from "../../types/driver";

export const DriverFilter = () => {
  const [show, setShow] = useState(false);
  const [allDrivers, setAllDrivers] = useState<Poi[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");

  const filterDrivers = (drivers: Poi[]) => {
    return drivers.filter(
      (driver) =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm)
    );
  };

  const activeDrivers = filterDrivers(
    allDrivers.filter((driver) => driver.status === "active")
  );
  const onTripDrivers = filterDrivers(
    allDrivers.filter((driver) => driver.status === "on trip")
  );
  const offlineDrivers = filterDrivers(
    allDrivers.filter((driver) => driver.status === "offline")
  );
  const busyDrivers = filterDrivers(
    allDrivers.filter((driver) => driver.status === "busy")
  );

  useEffect(() => {
    const socket = io("wss://rest.eaxi.axra.app/");

    // Listen for real-time driver location updates
    socket.on("allDriverLocation", (data: Driver[]) => {
      const updatedLocations: Poi[] = data.map((driver: Driver) => ({
        key: driver.driver.id, // Use unique driver id for marker key
        photo: driver.driver.profile_picture_url,
        licenseNo: driver.driver.driver_id,
        name: driver.driver.name,
        phone: driver.driver.phone,
        online: driver.driver.is_online,
        status: driver.driver.status,
        location: {
          lat: driver.gps.latitude,
          lng: driver.gps.longitude,
        },
      }));

      setAllDrivers(updatedLocations); // Update the locations state with new data
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Button
        onClick={() => setShow((prev) => !prev)}
        variant={"outline"}
        className={cn(
          "flex items-center justify-between gap-3 fixed top-[13px]"
        )}
      >
        Filter Drivers
        {show ? <AlignLeft className="w-4 h-4" /> : <X className="w-4 h-4" />}
      </Button>
      <div
        className={cn(
          " w-[300px] p-3 opacity-100 duration-500 overflow-hidden  h-[calc(100svh-100px)] bg-white  fixed  z-50  ",
          show && " hidden"
        )}
      >
        <div>
          <p className="text-xs text-gray-500 ">GO</p>
          <h3 className="text-md font-bold">DRIVERS</h3>
        </div>
        <div className="flex border h-[33px] mt-[10px] border-gray-300 rounded pr-3 bg-gray-100 justify-center items-center">
          <Input
            placeholder="Search"
            value={searchTerm} // Controlled input for search term
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none h-[33px] focus-visible:ring-0 focus:outline-lime-50"
          />
          <Search className="w-4 h-4" />
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          defaultValue="all"
          className="w-full mt-[20px] "
        >
          <TabsList className=" w-full">
            <TabsTrigger className="w-[25%] text-xs" value="active">
              Active ({activeDrivers.length})
            </TabsTrigger>
            <TabsTrigger className="w-[25%] text-xs" value="on trip">
              Driving ({onTripDrivers.length})
            </TabsTrigger>
            <TabsTrigger className="w-[25%] text-xs" value="busy">
              Busy ({busyDrivers.length})
            </TabsTrigger>
            <TabsTrigger className="w-[25%] text-xs" value="offline">
              Offline ({offlineDrivers.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <ScrollArea className="border py-2 bg-gray-100 px-2  h-[calc(100svh-260px)]">
              {activeDrivers.map((driver, index) => (
                <DriverListItem
                  key={`${index}`}
                  name={driver.name}
                  phone={driver.phone}
                  photo={driver.photo}
                  licenseNo={driver.licenseNo}
                  location={driver.location}
                  online={driver.online}
                  status={driver.status}
                />
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="on trip">
            <ScrollArea className="border py-2 bg-gray-100 px-2  h-[calc(100svh-260px)]">
              {onTripDrivers.map((driver, index) => (
                <DriverListItem
                  key={`${index}`}
                  name={driver.name}
                  phone={driver.phone}
                  photo={driver.photo}
                  licenseNo={driver.licenseNo}
                  location={driver.location}
                  online={driver.online}
                  status={driver.status}
                />
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="offline">
            <ScrollArea className="border py-2 bg-gray-100 px-2  h-[calc(100svh-260px)]">
              {offlineDrivers.map((driver, index) => (
                <DriverListItem
                  key={`${index}`}
                  name={driver.name}
                  phone={driver.phone}
                  photo={driver.photo}
                  licenseNo={driver.licenseNo}
                  location={driver.location}
                  online={driver.online}
                  status={driver.status}
                />
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="busy">
            <ScrollArea className="border py-2 bg-gray-100 px-2 h-[calc(100svh-260px)]">
              {busyDrivers.map((driver, index) => (
                <DriverListItem
                  key={`${index}`}
                  name={driver.name}
                  phone={driver.phone}
                  photo={driver.photo}
                  licenseNo={driver.licenseNo}
                  location={driver.location}
                  online={driver.online}
                  status={driver.status}
                />
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
