"use client";
import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { useAuth } from "@/components/Auth";
import { createClient } from "@/utils/supabase/client";
import LineGraph from "@/components/LineGraph";
// Initialize Supabase client

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

const DataVisualization: React.FC = () => {
  const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
      { week: "week1", Anxiety: 8 },
      { week: "week2", Anxiety: 2 },
      { week: "week3", Anxiety: 3 },
      { week: "week4", Anxiety: 4 },
      { week: "week5", Anxiety: 1 },
    ],
    background: {
      fill: "",
    },
    minWidth: 0,
    minHeight: 0,
    // Series: Defines which chart type and data to use
    series: [{ type: "line", xKey: "week", yKey: "Anxiety" }],
  });
  const [displayData, setDisplayData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const { profile, loading } = useAuth();
  const [clientData, setClientData] = useState<Client | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select(
          "sobriety, nutrition, purpose, sleep, anxiety, depression, family, routine, support, future, emotional_response, finance, entries"
        )
        .eq("id", 11)
        .single();

      if (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        return;
      }

      if (!data ) {
        setError("No data available");
        return;
      }
      setClientData(data as Client);
    };

    fetchData();
  }, []);

  console.log(clientData, "Client data <-----");

  return clientData?(
    <div className="h-screen text-center mt-12">
      <h1>Monthly Data Visualization</h1>

      <LineGraph category={clientData.anxiety} entries={clientData.entries} />
    </div>
  ):(
    <>Sorry nothing to display here!</>
  )
};

export default DataVisualization;
