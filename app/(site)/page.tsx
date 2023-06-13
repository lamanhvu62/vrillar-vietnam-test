"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "./components/Chart";

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

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chart, setChart] = useState(false);
  const [type, setType] = useState("");
  const [api, setApi] = useState<string>("/en/results.html/2023/races.html");
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

  const callAPI = async () => {
    const data = { url: api };
    setIsLoading(true);
    await axios
      .post("/api/filter", { data })
      .then((res) => {
        setFilter(res.data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    callAPI();
  }, [api]);

  const handleChart = (type: string) => {
    if (type === "Teams" || type === "DRIVERS") {
      setChart(true);
      setType(type);
    } else {
      setChart(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full overflow-y-hidden relative">
      <div className="min-h-screen">
        <div className="w-full bg-white rounded p-3">
          <div className="px-4 pt-4">
            <h3 className="text-gray-700 font-bold text-xl">Filter</h3>
            <p className="text-gray-700 text-sm">
              <i>Pick one of below</i>
            </p>
          </div>
          <div className="flex justify-center h-60 p-3 ">
            <div className="p-3 flex-1">
              <h3 className="text-gray-700 font-semibold mb-3">Year races</h3>
              <ul className="text-gray-600 h-40 overflow-auto  bg-gray-100 rounded">
                {filter.dataYear.map((data, index) => {
                  return (
                    <li key={index}>
                      <span
                        className="cursor-pointer p-1 inline-block border-b border-transparent hover:text-gray-800 hover:border-amber-950 transition"
                        onClick={() => {
                          setApi(data.yearLink);
                        }}
                      >
                        {data.year}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-3 flex-1">
              <h3 className="text-gray-700 font-semibold mb-3">Types</h3>
              <ul className="text-gray-600 h-40 overflow-auto flex-1 bg-gray-100 rounded">
                {filter.dataType.map((data, index) => {
                  return (
                    <li key={index}>
                      <span
                        className="cursor-pointer p-1 inline-block border-b border-transparent hover:text-gray-800 hover:border-amber-950 transition"
                        onClick={() => {
                          setApi(data.typeLink);
                          handleChart(data.type);
                        }}
                      >
                        {data.type}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-3 flex-1">
              <h3 className="text-white font-semibold mb-3">Types</h3>
              <ul className="text-gray-600 h-40 overflow-auto flex-1 bg-gray-100 rounded">
                {filter.dataMeetingKey.map((data, index) => {
                  return (
                    <li key={index}>
                      <span
                        className="cursor-pointer p-1 inline-block border-b border-transparent hover:text-gray-800 hover:border-amber-950 transition"
                        onClick={() => {
                          setApi(data.meetingKeyLink);
                          setChart(false);
                        }}
                      >
                        {data.meetingKey}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full mt-8 bg-white rounded p-4">
          <h2 className="text-gray-900 mb-4 p-3 text-center font-semibold text-xl">
            RACE RESULTS
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
                    {td[6] && <td className="py-3 px-1">{td[6]}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {chart && (
          <div className="w-full mt-8 bg-white rounded">
            <Chart dataChart={filter} type={type} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
