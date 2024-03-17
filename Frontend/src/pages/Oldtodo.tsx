import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";

interface DataItem {
  Date: string;
  list: string[];
  name: string;
}

function Oldtodo() {
  const [data, setdata] = useState<DataItem[]>([]);

  async function fetchingold() {
    try {
      const res = await fetch("http://localhost:80/uploaded_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      setdata(result);
      console.log(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchingold();
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-cyan-500 via-green-500 to-yellow-400 overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-1 px-2  my-1">
        {data.map((item, index) => (
          <div
            key={index}
            className="h-fit flex flex-wrap flex-col md:flex-row justify-between bg-white p-2 rounded-lg gap-3"
          >
            <p>Date: {item.Date}</p>
            <p>Name: {item.name}</p>
            <p className="whitespace-pre-wrap">List: {JSON.stringify(item.list)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Oldtodo;
