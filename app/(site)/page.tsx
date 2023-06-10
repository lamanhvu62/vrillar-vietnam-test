"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/driver2023")
      .then((res) => {
        setDrivers(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(drivers);

  return (
    <div className="bg-gray-200 min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-center text-gray-900 text-2xl font-bold py-6">
          2023 Driver Standings
        </h1>
        <table className="table-auto w-full text-gray-700 border-collapse text-left">
          <thead>
            <tr>
              <th>POS</th>
              <th>DRIVER</th>
              <th>NATIONALITY</th>
              <th>CAR</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => {
              return (
                <tr
                  key={driver.firstName}
                  className={index % 2 !== 0 ? "bg-gray-300" : ""}
                >
                  <td className="p-3 border border-slate-600">{index + 1}</td>
                  <td className="p-3 border border-slate-600">
                    {driver.firstName} {driver.lastName}
                  </td>
                  <td className="p-3 border border-slate-600">
                    {driver.nation}
                  </td>
                  <td className="p-3 border border-slate-600">{driver.car}</td>
                  <td className="p-3 border border-slate-600 text-center">
                    {driver.point}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
