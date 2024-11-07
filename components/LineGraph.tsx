import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

type Client = {
  first_name: string;
  last_name: string;
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

const colors = ["#B19CD9", "#ACDCD3", "#AFD3DB", "#DACDE0", "#FFB6C1"]; // Array of colors for the bars

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof Omit<Client, "entries">>("anxiety"); // Default category
  const [displayName, setDisplayName] = useState("");

  const [chartOptions, setChartOptions] = useState({
    data: [] as any[],
    background: {
      fill: "#ACDCD3", // Mint background color
    },
    series: [
      {
        type: "bar", // Bar chart type
        xKey: "entries",
        yKey: "vals",
        fillOpacity: 0.7, // Transparency of bar fill
        strokeWidth: 2,
        fill: colors[3],
      },
    ],
  });

  useEffect(() => {
    const categoryData = data[selectedCategory] || [];
    const entries = data.entries || [];
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const name = capitalize(data.first_name) + " " + capitalize(data.last_name);
    setDisplayName(name);

    const chartData = entries.map((entry, index) => {
      const localDate = new Date(
        new Date(entry).getTime() + new Date(entry).getTimezoneOffset() * 60000
      );

      return {
        entries: localDate.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        vals: parseInt(categoryData[index]) || 0, // Ensure valid integer value
      };
    });

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
    <div className="absolute top-20 left-0 right-0 text-center mx-auto mt-10">
      <h1 className="text-white">{displayName}'s </h1>
      <select
        className="rounded-xl text-center hover:text-lg bg-mint text-white"
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
      <div id="myGrid">
        <AgCharts
          options={chartOptions as any}
          className="chart mx-auto"
          style={{ width: "400px", height: "400px" }}
        />
        <p className="">the lower the value the worse the symptoms</p>
        <p className="">1.0 is the lowest value (worst possible)</p>
      </div>
    </div>
  );
};

export default LineGraph;
