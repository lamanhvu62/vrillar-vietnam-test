"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type scheduleType = {
  hero: [
    {
      cardTitle: string;
      raceStatus: string;
      startDate: string;
      endDate: string;
      place: string;
      title: string;
      image: string;
    }
  ];
};

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<scheduleType>({
    hero: [
      {
        cardTitle: "",
        raceStatus: "",
        startDate: "",
        endDate: "",
        place: "",
        title: "",
        image: "",
      },
    ],
  });

  const getData = async () => {
    const res = await axios.get("/api/schedule");
    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  if (isLoading) {
    return <div className="text-gray-900 text-2xl text-center">Loading...</div>;
  }

  console.log(data);

  return (
    <div>
      <div className="text-gray-700">Schedule</div>
      <div className="text-gray-700">
        {data.hero.map((data) => {
          return <div key={data.title}>{data.title}</div>;
        })}
      </div>
    </div>
  );
};

export default Page;
