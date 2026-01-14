import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "../lib/utils";
import LOGO from "../assets/logo.png";
import { Separator } from "../components/ui/separator";
import useMenus from "../lib/UseMenus";
import { LogOut, Menu, Settings, X } from "lucide-react";
import { Switch } from "./ui/switch";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

export const SideBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const MENUS = useMenus();

  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("admin_role"); // Also remove role
    navigate("/"); // This will now work correctly
  };

  return (
    <div
      className={cn(
        "   bg-gray-50 relative   z-[50] flex  flex-col  w-[60px] ",
        open && "w-[200px]"
      )}
    >
      <div className="p-2  gap-4 h-[60px] flex items-center justify-start">
        <Button
            onClick={() => navigate(`/dashboard`)}
          className=" rounded   border-blue-500 hover:bg-blue-500  p-0  w-[40px]  "
          type="button"
          variant={"outline"}
        >
          <img src={LOGO} className="w-[40px] h-40px]" alt="logo" />

        </Button>
        {
            open && <p className=" italic font-semibold text-sm">EAXI</p>
        }
      </div>
      <Separator />

      <div className=" p-2  z-0">
        <Button
         onClick={() => setOpen((prev) => !prev)}
          id={`my-anchor-element-menu`}
          className={cn(
            "   relative border-none drop-shadow-none p-0 w-full   shadow-none bg-gray-50  flex gap-1 justify-start hover:bg-gray-200 border-2  rounded-[2px]  duration-200   "
          )}
          type="button"
          variant={"outline"}
        >
          <div className=" overflow-hidden  w-[43px] flex items-center justify-center  ">
            {open ? (
              <X className=" text-gray-600 w-[20px] " />
            ) : (
              <Menu className=" text-gray-600 w-[20px] " />
            )}
          </div>

          {!open ? (
            <Tooltip
              style={{ zIndex: 1000, backgroundColor: "#2c3e50" }}
              className="bg-blue-400"
              place="top"
              anchorSelect={`#my-anchor-element-menu`}
              content={"Open"}
            />
          ) : null}
          <p
            className={cn(
              "text-gray-500 duration-1000 overflow-hidden  w-0",
              open && "w-auto"
            )}
          >
            Menu
          </p>
        </Button>
        <div className="  z-0 space-y-1">
          {MENUS.map((e, index) => (
            <Button
              id={`my-anchor-element-${index}`}
              key={index}
              onClick={() => navigate(`${e.path}`)}
              className={cn(
                "   relative border-none drop-shadow-none p-0 w-full   shadow-none bg-gray-50  flex gap-1 justify-start hover:bg-gray-200 border-2  rounded-[2px]  duration-200   ",
                location.pathname === e.path &&
                  "bg-sky-300/80 hover:bg-sky-300   rounded-[2px]  text-white"
              )}
              type="button"
              variant={"outline"}
            >
              <div className=" overflow-hidden  w-[43px] flex items-center justify-center  ">
                {" "}
                {e.icon}
              </div>

              {!open ? (
                <Tooltip
                  style={{ zIndex: 1000, backgroundColor: "#2c3e50" }}
                  className="bg-blue-400"
                  place="top"
                  anchorSelect={`#my-anchor-element-${index}`}
                  content={e.name}
                />
              ) : null}
              <p
                className={cn(
                  "text-gray-500 duration-1000 overflow-hidden  w-0",
                  location.pathname === e.path && "text-white",
                  open && "w-auto"
                )}
              >
                {e.name}
              </p>
            </Button>
          ))}
          <div className="pt-[65px] space-y-1">
            <div className="h-[30px] text-start ml-5 overflow-hidden text-gray-400 text-sm">
              {open && <p>Account</p>}
            </div>
            <Button
              className=" rounded-md border-none drop-shadow-none p-0 w-full  h-[30px]  shadow-none bg-gray-50 flex justify-start  gap-4 "
              type="button"
              variant={"outline"}
              id={`setting`}
            >
              <Settings className=" ml-3 text-gray-400 w-[20px] " />
              {open && <p className="text-gray-500">Settings</p>}

              {!open ? (
                <Tooltip
                  style={{ zIndex: 1000, backgroundColor: "#2c3e50" }}
                  className="bg-blue-400"
                  place="top"
                  anchorSelect={`#setting`}
                  content={"Settings"}
                />
              ) : null}
            </Button>
            <Button
              className=" rounded-md border-none drop-shadow-none p-0 w-full  h-[30px]  shadow-none bg-gray-50 flex justify-start  gap-4 "
              type="button"
              variant={"outline"}
              id={`logout`}
            >
              <LogOut
                onClick={handleLogOut}
                className=" ml-3 text-gray-400 w-[20px] "
              />
              {open && <p className="text-gray-500">Log Out</p>}
              {!open ? (
                <Tooltip
                  style={{ zIndex: 1000, backgroundColor: "#2c3e50" }}
                  className="bg-blue-400"
                  place="top"
                  anchorSelect={`#logout`}
                  content={"Log Out"}
                />
              ) : null}
            </Button>
            <Button
              className=" rounded-md border-none drop-shadow-none p-0 w-full  h-[30px]  shadow-none bg-gray-50 flex justify-start  gap-4 "
              type="button"
              variant={"outline"}
            >
              <Switch className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
