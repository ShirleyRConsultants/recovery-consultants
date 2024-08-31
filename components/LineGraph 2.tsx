import React, { useState, useEffect } from 'react';
import { AgCharts } from "ag-charts-react";

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
  const [selectedCategory, setSelectedCategory] = useState<keyof Omit<Client, 'entries'>>('anxiety'); // Default category
  const [chartOptions, setChartOptions] = useState({
    data: [] as any[],
    background: {
      fill: 'black',
    },
    minWidth: 0,
    minHeight: 0,
    series: [{ type: 'line', xKey: 'entries', yKey: 'vals' }],
  });

  useEffect(() => {
    const categoryData = data[selectedCategory] || [];
    const entries = data.entries || [];

    const chartData = entries.map((entry, index) => ({
      entries: entry,
      vals: categoryData[index],
    }));

    setChartOptions({
      data: chartData,
      background: {
        fill: 'black',
      },
      minWidth: 0,
      minHeight: 0,
      series: [{ type: 'line', xKey: 'entries', yKey: 'vals' }],
    });
  }, [selectedCategory, data]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value as keyof Omit<Client, 'entries'>);
  };

  const categories: (keyof Omit<Client, 'entries'>)[] = [
    'sobriety', 'nutrition', 'purpose', 'sleep', 'anxiety', 'depression',
    'family', 'routine', 'support', 'future', 'emotional_response', 'finance'
  ];

  return (
    <div className="h-screen text-center mt-12">
      <h1>Data Visualization</h1>
      <select className='bg-black' onChange={handleCategoryChange} value={selectedCategory}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      <AgCharts
        options={chartOptions as any}
        className="chart mt-20"
        style={{ width: "400px", height: "400px" }}
      />
    </div>
  );
};

export default LineGraph;
