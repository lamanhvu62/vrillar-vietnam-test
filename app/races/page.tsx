"use client";

import axios from "axios";
import { data } from "cheerio/lib/api/attributes";
import { useEffect, useState } from "react";

type filterType = {
  dataYear: [
    {
      year: string;
      yearLink: string;
    }
  ];
  dataType: [
    {
      type: string;
      typeLink: string;
    }
  ];
  dataMeetingKey: [
    {
      meetingKey: string;
      meetingKeyLink: string;
    }
  ];
  table: [{ th?: string }];
  tableTd: Array<any>;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<filterType>({
    dataYear: [
      {
        year: "",
        yearLink: "",
      },
    ],
    dataType: [
      {
        type: "",
        typeLink: "",
      },
    ],
    dataMeetingKey: [
      {
        meetingKey: "",
        meetingKeyLink: "",
      },
    ],
    table: [{ th: "" }],
    tableTd: [],
  });

  useEffect(() => {
    setIsLoading(true);
    axios({
      url: "/api/filter",
      method: "post",
      data: {
        urlWeb: "results.html/2023/races.html",
      },
    })
      .then((res) => {
        setFilter(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(filter);

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex justify-center h-60 p-3">
          <ul className="text-gray-600 h-full overflow-auto flex-1">
            {filter.dataYear.map((data, index) => {
              return (
                <li key={index}>
                  <span className="cursor-pointer p-1 inline-block border-b border-transparent hover:text-gray-800 hover:border-amber-950 transition">
                    {data.year}
                  </span>
                </li>
              );
            })}
          </ul>

          <ul className="text-gray-600 h-full overflow-auto flex-1">
            {filter.dataType.map((data, index) => {
              return (
                <li key={index}>
                  <span className="cursor-pointer p-1 inline-block border-b border-transparent hover:text-gray-800 hover:border-amber-950 transition">
                    {data.type}
                  </span>
                </li>
              );
            })}
          </ul>

          <ul className="text-gray-600 h-full overflow-auto flex-1">
            {filter.dataMeetingKey.map((data, index) => {
              return (
                <li key={index}>
                  <span className="cursor-pointer p-1 inline-block border-b border-transparent hover:text-gray-800 hover:border-amber-950 transition">
                    {data.meetingKey}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-gray-900 mb-4 p-3 text-center font-semibold text-xl">
          2023 RACE RESULTS
        </h2>
        <table className="table-auto w-full text-gray-700 border-collapse text-left">
          <thead>
            <tr>
              {filter.table.map((th, index) => {
                return th?.th ? (
                  <th key={index} className="bg-red-300 p-2 text-lg">
                    {th?.th}
                  </th>
                ) : (
                  ""
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filter.tableTd.map((td, index) => {
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-300" : ""}
                >
                  {td[0] && <td className="py-3 px-1">{td[0]}</td>}
                  {td[1] && <td className="py-3 px-1">{td[1]}</td>}
                  {td[2] && <td className="py-3 px-1">{td[2]}</td>}
                  {td[3] && <td className="py-3 px-1">{td[3]}</td>}
                  {td[4] && <td className="py-3 px-1">{td[4]}</td>}
                  {td[5] && <td className="py-3 px-1">{td[5]}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
