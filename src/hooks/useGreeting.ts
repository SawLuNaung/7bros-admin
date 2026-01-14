import { useState, useEffect } from "react";

const useTimeOfDay = () => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [styles, setStyles] = useState({ fontSize: 18, color: "" });

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    let time = "";
    let color = "";

    if (hours < 12) {
      time = "morning";
      color = "#f56076";
    } else if (hours >= 12 && hours < 17) {
      time = "afternoon";
      color = "#fcce7f";
    } else {
      time = "night";
      color = "#c581fc";
    }

    setTimeOfDay(time);
    setStyles((prevStyles) => ({ ...prevStyles, color }));
  }, []);

  return { timeOfDay, styles };
};

export default useTimeOfDay;
