import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Topbar } from "./Topbar";

export const Layout = () => {
  return (
    <div className=" flex z-0">
      <SideBar />

      <div className="flex border flex-col z-30 w-full">
       <Topbar/>

        <main className=" w-full h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
