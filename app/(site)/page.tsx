"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const ScrapePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/scrape")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1>Scraped Surnames</h1>
      <ul>
        {data.map((user, index) => {
          return <li key={index}>{user}</li>;
        })}
      </ul>
    </div>
  );
};

export default ScrapePage;
