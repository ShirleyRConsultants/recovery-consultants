"use client";
import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { useAuth } from "@/components/Auth";
import { createClient } from "@/utils/supabase/client";
// Initialize Supabase client

const DataVisualization: React.FC = () => {
    const [chartOptions, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: [
            { week: 'week1',  Anxiety: 8 },
            { week: 'week2',  Anxiety: 2 },
            { week: 'week3',  Anxiety: 3 },
            { week: 'week4',  Anxiety: 4 },
            { week: 'week5',  Anxiety: 1 },
     
        ],
        background: {
            fill: '',
        },
        minWidth: 0,
        minHeight:0,
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'week', yKey: 'Anxiety' }],
    });
  const [displayData, setDisplayData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const { profile, loading } = useAuth();
  const supabase = createClient();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select(
          "created_at, sobriety, nutrition, purpose, sleep, anxiety, depression, family, routine, support, future, emotional_response, finance"
        )
        .eq("id", 11);

      if (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        return;
      }

      if (!data || data.length === 0) {
        setError("No data available");
        return;
      }

      // Process the data
    //   const reversedData = data.reverse(); // If needed to reverse
    //   const formattedData = reversedData.map((entry) => ({

    //     sobriety: entry.sobriety || 0,
    //     nutrition: entry.nutrition || 0,
    //     purpose: entry.purpose || 0,
    //     sleep: entry.sleep || 0,
    //     anxiety: entry.anxiety || 0,
    //     depression: entry.depression || 0,
    //     family: entry.family || 0,
    //     routine: entry.routine || 0,
    //     support: entry.support || 0,
    //     future: entry.future || 0,
    //     emotional_response: entry.emotional_response || 0,
    //     finance: entry.finance || 0,
    //   }));
    //   console.log(formattedData);

    };

    fetchData();
  }, []);



  return (
    <div className="h-screen text-center mt-12">
      <h1 >Monthly Data Visualization</h1>
      {error && <p>{error}</p>}
      {chartOptions.data.length > 0 ? (
        <AgCharts  options={chartOptions}
        className="chart mt-20"
        style={{ width: "400px", height: "400px" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DataVisualization;
