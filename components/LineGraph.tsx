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
      fill: "#98d7c2", // Mint background color
    },
    series: [
      {
        type: "bar", // You can also switch this to "line"
        xKey: "entries",
        yKey: "vals",
        fillOpacity: 0.7, // Transparency of bar fill
        stroke: "#B19CD9", // Light purple outline of bars
        strokeWidth: 2,
        fill: "#B19CD9", // Bar fill color (light purple)
      },
    ],
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
      vals: parseInt(categoryData[index]) || 0, // Ensure valid integer value
    }));

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      data: chartData,
    }));
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
    <div className="absolute top-20 left-0 right-0 text-center mx-auto">
      <h1>Data Visualization</h1>
      <select
        className="rounded-xl bg-mint"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "emotional_response"
              ? "Emotional Response"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      <div id="myGrid"
        className="ag-theme-quartz" // Applying Quartz theme and adding border radius
  
      >
        <AgCharts
          options={chartOptions as any}
          className="chart mx-auto"
          style={{ width: "450px", height: "450px" }}
        />
      </div>
    </div>
  );
};

export default LineGraph;
