import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useQuery } from "@apollo/client";
import {
  FilePlus2,
  Handshake,
  PiggyBank,
  ShipWheel,
  Users2,
} from "lucide-react";
import {
  cn,
  getPostBarChart,
  generateThreeMonthChartData,
} from "../../lib/utils";
import { PostDashboard } from "../../components/dashboard/posts-dashboard";
import { ReactNode, useEffect, useState } from "react";
import {
  DASHBOARD_ALL_CUSTOMERS,
  DASHBOARD_ALL_DRIVERS,
  DASHBOARD_ALL_VEHICLE,
  DASHBOARD_ALL_TRIP,
  DASHBOARD_TOTAL_INCOME,
  DASHBOARD_TOTAL_TOPUP,
} from "../../graphql/dashboard";
import { GET_ALL_CUSTOMERS, GET_ALL_DRIVERS } from "../../graphql/kiloTaxi";
import { UsersAndPartners } from "../../components/dashboard/users-partners";

type CardData = {
  name: string;
  icon: ReactNode;
  count: number;
  color: string;
};

export const Dashboard = () => {
  const [postData, setPostData] = useState(null);

  const { data: CUSTOMERDATA } = useQuery(DASHBOARD_ALL_CUSTOMERS, {
    fetchPolicy: "network-only",
  });

  const { data: DRIVERSDATA } = useQuery(DASHBOARD_ALL_DRIVERS, {
    fetchPolicy: "network-only",
  });

  const { data: VECICLEDATA } = useQuery(DASHBOARD_ALL_VEHICLE, {
    fetchPolicy: "network-only",
  });

  const { data: ALLTRIP } = useQuery(DASHBOARD_ALL_TRIP, {
    fetchPolicy: "network-only",
  });

  const { data: ALLINCOME } = useQuery(DASHBOARD_TOTAL_INCOME, {
    fetchPolicy: "network-only",
  });

  const { data: TOTALTOPUP } = useQuery(DASHBOARD_TOTAL_TOPUP, {
    fetchPolicy: "network-only",
  });

  const { data: ALLDRIVERS } = useQuery(GET_ALL_DRIVERS, {
    fetchPolicy: "network-only",
  });

  const { data: ALLCUSTOMERS } = useQuery(GET_ALL_CUSTOMERS, {
    fetchPolicy: "network-only",
  });

  const [cardData, setCardData] = useState<CardData[]>([]);
  const [data, setData] = useState<any[]>([]);



  useEffect(() => {
    if (
      CUSTOMERDATA &&
      DRIVERSDATA &&
      VECICLEDATA &&
      ALLDRIVERS &&
      ALLCUSTOMERS
    ) {
      const dataChart = generateThreeMonthChartData(
        ALLCUSTOMERS?.customers,
        ALLDRIVERS?.drivers
      );
      console.log(dataChart)
      setData(dataChart);

      const postBarChart = getPostBarChart(ALLDRIVERS);

      setPostData(postBarChart);


      setCardData([
        {
          name: "Total Income",
          icon: <PiggyBank />,
          count: ALLINCOME?.driver_transactions_aggregate.aggregate.sum.amount,
          color: "rgba(151,71,254,0.88)",
        },
        {
          name: "Customers",
          icon: <Users2 />,
          count: CUSTOMERDATA?.customers_aggregate.aggregate.count,
          color: "rgba(151,71,254,0.88)",
        },
        {
          name: "Drivers",
          icon: <Handshake />,
          count: DRIVERSDATA?.drivers_aggregate.aggregate.count,
          color: "rgba(101,194,43,0.92)",
        },
        {
          name: "Total Trips",
          icon: <ShipWheel />,
          count: ALLTRIP?.trips_aggregate.aggregate.count,
          color: "rgba(26,29,207,0.91)",
        },
        {
          name: "Total Topup",
          icon: <FilePlus2 />,
          count: TOTALTOPUP?.driver_transactions_aggregate.aggregate.sum.amount,
          color: "rgba(26,29,207,0.91)",
        },
      ]);
    }
  }, [CUSTOMERDATA, DRIVERSDATA, VECICLEDATA, ALLDRIVERS, ALLCUSTOMERS]);

  return (
    <div className="p-[10px] space-y-4 min-h-[calc(100svh-81px)]  bg-gray-100">
      <div className="flex gap-5 justify-between ">
        <div className="p-5 bg-white rounded-lg border text-[#423F7A]  font-bold  w-[100%] flex flex-col justify-between">
          <h3>Today Summary</h3>
          <p className="text-sm my-6 font-medium text-muted-foreground">
            Monitoring EAXI Insights
          </p>
          <div className="flex gap-6 ">
            {cardData.map((e, index) => (
              <Card
                key={index}
                className={cn(
                  `bg-[#F4E7FF] drop-shadow-lg hover:scale-[1.03] duration-300 h-[200px] text-[#423F7A] rounded-2xl shadow border-none w-[33%]`,
                  e.name === "Customers" && "bg-[#fa919f]",
                  e.name === "Drivers" && "bg-[#f6d499]",
                  e.name === "Vehicles" && "bg-[#9efebd]",
                  e.name === "Total Trips" && "bg-[#f8ad96] ",
                  e.name === "Total Topup" && "bg-[#fcedaa]"
                )}
              >
                <CardHeader className="">
                  <CardTitle>
                    <div
                      className={cn(
                        " inline-block shadow p-3 bg-[#FFE2E6] rounded-full",
                        e.name === "Customers" && "bg-[#fab3be]",
                        e.name === "Drivers" && "bg-[#f9deb0]",
                        e.name === "Vehicles" && "bg-[#a9fbc3]",
                        e.name === "Total Trips" && "bg-[#f7b39e] ",
                        e.name === "Total Topup" && "bg-[#f6ebb9]"
                      )}
                    >
                      {e.icon}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-[24px]">{e.count}</p>
                </CardContent>
                <CardFooter>
                  <p className=" font-light">{e.name}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <PostDashboard chartData={postData} />
        <UsersAndPartners chartData={data} />
      </div>
    </div>
  );
};
