import {
  BellRing,
  Bike,
  CirclePlus,
  ClockArrowUp,
  Contact,
  Gauge,
  HandCoins,
  MapPinned,
  Scroll,
  Ticket,
  UserPlus,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";

const UseMenus = () => {
  // Get admin role from localStorage
  const adminRole = localStorage.getItem('admin_role') || 'staff';
  
  // Define all menus with their allowed roles
  const allMenus = useMemo(
    () => [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: (
          <Gauge
            id={"my-anchor-element-/dashboard"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
      {
        name: "Drivers",
        path: "/drivers",
        icon: (
          <Contact
            id={"my-anchor-element-/drivers"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin', 'staff'], // Both can see
      },
      {
        name: "Create Account",
        path: "/create-account",
        icon: (
          <UserPlus
            id={"my-anchor-element-/create-account"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin', 'staff'], // Both can see
      },
      {
        name: "Customers",
        path: "/customers",
        icon: (
          <UsersRound
            id={"my-anchor-element-/customers"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
      {
        name: "Setup Fees",
        path: "/setup-fees",
        icon: (
          <HandCoins
            id={"my-anchor-element-/setup-fees"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
      {
        name: "Trip History",
        path: "/trip-history",
        icon: (
          <Bike
            id={"my-anchor-element-/setup-fees"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin', 'staff'], // Both can see
      },
      {
        name: "Extra Fee",
        path: "/extra-fees",
        icon: (
          <CirclePlus
            id={"my-anchor-element-/notification"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
      {
        name: "Notifications",
        path: "/notification",
        icon: (
          <BellRing
            id={"my-anchor-element-/notification"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
      {
        name: "Top-up",
        path: "/top-up",
        icon: (
          <Wallet
            id={"my-anchor-element-/top-up"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin', 'staff'], // Both can see
      },
      {
        name: "Post",
        path: "/posts",
        icon: (
          <Scroll
            id={"my-anchor-element-/posts"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
      {
        name: "Cupon",
        path: "/cupons",
        icon: (
          <Ticket
            id={"my-anchor-element-/cupons"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
      {
        name: "Book Orders",
        path: "/book-orders",
        icon: (
          <ClockArrowUp
            id={"my-anchor-element-/book-orders"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
      {
        name: "Map",
        path: "/map",
        icon: (
          <MapPinned
            id={"my-anchor-element-/map"}
            className=" text-gray-400 w-[20px] "
          />
        ),
        roles: ['admin'], // Only admin can see
      },
    ],
    []
  );

  // Filter menus based on user role
  return useMemo(
    () => allMenus.filter((menu) => menu.roles.includes(adminRole)),
    [allMenus, adminRole]
  );
};

export default UseMenus;
