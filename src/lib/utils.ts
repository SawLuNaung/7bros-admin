import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeekOfMonth(date: any) {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const dayOfWeek = startOfMonth.getDay();
  return Math.ceil((dayOfMonth + dayOfWeek) / 7);
}

export function getPostBarChart(drivers: { drivers: any }) {
  const postBarChart: any = [];

  drivers.drivers.map((post: { created_at: string | number | Date }) => {
    const createDate = new Date(post.created_at);
    const weekOfMonth = getWeekOfMonth(createDate);

    if (postBarChart[weekOfMonth - 1]) {
      postBarChart[weekOfMonth - 1].post[1]++;
    } else {
      postBarChart[weekOfMonth - 1] = {
        week: `${weekOfMonth}`,
        post: [0, 1],
      };
    }
  });

  for (let i = 0; i < postBarChart.length; i++) {
    if (!postBarChart[i]) {
      postBarChart[i] = {
        week: `${postBarChart.length - 1 - i} wks`,
        post: [0, 0],
      };
    }
  }

  return postBarChart;
}
export function generateThreeMonthChartData(customers: any[], drivers: any[]) {
  const chartData: { date: string; customers: number; drivers: number }[] = [];
  const weekData: { [key: string]: { customers: number; drivers: number } } =
    {};

  // Helper function to get the start date of the week
  function getStartDateOfWeek(date: Date): string {
    const startDate = new Date(
      date.setDate(date.getDate() - date.getDay() + 1)
    );
    return startDate.toISOString().split("T")[0]; // Get YYYY-MM-DD format
  }

  // Get the date three months ago
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Process users
  customers?.forEach((customer) => {
    const createdAt = new Date(customer.created_at);
    if (createdAt >= threeMonthsAgo) {
      const weekStart = getStartDateOfWeek(createdAt);
      if (!weekData[weekStart]) {
        weekData[weekStart] = { customers: 0, drivers: 0 };
      }
      weekData[weekStart].customers++;
    }
  });

  // Process partners
  drivers?.forEach((driver) => {
    const createdAt = new Date(driver.created_at);
    if (createdAt >= threeMonthsAgo) {
      const weekStart = getStartDateOfWeek(createdAt);
      if (!weekData[weekStart]) {
        weekData[weekStart] = { customers: 0, drivers: 0 };
      }
      weekData[weekStart].drivers++;
    }
  });

  // Convert the map to the chartData array
  Object.keys(weekData).forEach((date) => {
    chartData.push({
      date,
      customers: weekData[date].customers,
      drivers: weekData[date].drivers,
    });
  });

  return chartData;
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}
