import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

interface ChartComponentProps {
  dataChart?: filterType[] | undefined;
  type?: string | null;
}

interface filterType {
  dataYear: {
    year: string;
    yearLink: string;
  }[];
  dataType: {
    type: string;
    typeLink: string;
  }[];
  dataMeetingKey: {
    meetingKey: string;
    meetingKeyLink: string;
  }[];
  table: {
    th?: string;
  }[];
  tableTd: any[][];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ dataChart, type }) => {
  const chartContainerRef = useRef<HTMLCanvasElement>(null);

  const handleChart = () => {
    const data = dataChart?.tableTd.map((data: string[]) => {
      if (type === "Teams") {
        return Number(data[2]);
      } else {
        return Number(data[4]);
      }
    });

    const labels = dataChart?.tableTd.map((data: string[]) => {
      if (data.length > 0) {
        return data[1];
      }
      return "";
    });

    return { labels, data };
  };

  useEffect(() => {
    const ctx = chartContainerRef.current?.getContext("2d");
    const chartData = handleChart();

    if (ctx && chartData) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "# of Points",
              data: chartData.data,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  return <canvas ref={chartContainerRef} />;
};

export default ChartComponent;
