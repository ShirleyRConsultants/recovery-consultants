import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

type Client = {
  sobriety: string[];
  nutrition: string[];
  purpose: string[];
  sleep: string[];
  anxiety: string[];
  depression: string[];
  family: string[];
  routine: string[];
  support: string[];
  future: string[];
  emotional_response: string[];
  finance: string[];
  entries: Date[];
};

interface LineGraphProps {
  data: Client; // The entire data object
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof Omit<Client, "entries">>("anxiety"); // Default category
  const [chartOptions, setChartOptions] = useState({
    data: [] as any[],
    background: {
      fill: "white",
    },
    minWidth: 0,
    minHeight: 0,
    series: [{ type: "line", xKey: "entries", yKey: "vals" }],
  });

  useEffect(() => {
    const categoryData = data[selectedCategory] || [];
    const entries = data.entries || [];
  
    const chartData = entries.map((entry, index) => ({
      entries: new Date(entry).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }),
      vals:
        parseInt(categoryData[index]) === 1
          ? parseInt(categoryData[index])
          : parseInt(categoryData[index]) * 2,
    }));
  
    setChartOptions({
      data: chartData,
      background: {
        fill: "white",
      },
      minWidth: 0,
      minHeight: 0,
      series: [{ type: "bar", xKey: "entries", yKey: "vals" }],
    });
  }, [selectedCategory, data]);
  

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value as keyof Omit<Client, "entries">);
  };

  const categories: (keyof Omit<Client, "entries">)[] = [
    "sobriety",
    "nutrition",
    "purpose",
    "sleep",
    "anxiety",
    "depression",
    "family",
    "routine",
    "support",
    "future",
    "emotional_response",
    "finance",
  ];

  return (
    <div className=" h-screen text-center mt-12">
      <h1>Data Visualization</h1>
      <select
        className=""
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgCharts
          options={chartOptions as any}
          className="chart mt-20"
          style={{ width: "450px", height: "450px" }}
        />
      </div>
    </div>
  );
};

export default LineGraph;
