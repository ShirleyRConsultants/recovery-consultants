import React from 'react';
import { useState, useEffect } from 'react';
import { AgCharts } from "ag-charts-react";
import { useAuth } from "@/components/Auth";
import { createClient } from "@/utils/supabase/client";

type Client = {
     sobriety: string[]
     nutrition: string[]
     purpose: string[]
     sleep: string[]
     anxiety: string[]
     depression: string[] 
     family: string[] 
     routine: string[] 
     support : string[]
     future: string[]
     emotional_response: string[]
     finance: string[] 
     entries: Date[]
}

type Category = {
    category: string[],
    entries: Date[]
}

interface LineGraphProps {
    category: string[],
    entries: Date[]
}

const LineGraph: React.FC<LineGraphProps> = ({category, entries}) => {
    const [displayData, setDisplayData] = useState([]);
    const [error, setError] = useState<string | null>(null);
   
    const displayCategory = "Anxiety"
    console.log(entries, "entries")
    console.log(category[3], "categories")

    const [chartOptions, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        
        data: [
         {entries:entries[0], vals: category[0]},
         {entries:entries[1], vals: category[1]},
         {entries:entries[3], vals: category[2]},
         {entries:entries[4], vals: category[3]},
         {entries:entries[5], vals: category[4]}
           
        ],
        background: {
            fill: '',
        },
        minWidth: 0,
        minHeight:0,
        // Series: Defines which chart type and data to use
        series: [{ type: 'line', xKey: 'entries', yKey: "vals" }],
    });



  return (
    <div className="h-screen text-center mt-12">
      {error && <p>{error}</p>}
     
        <AgCharts  options={chartOptions as any} 
        className="chart mt-20"
        style={{ width: "400px", height: "400px" }}
        />
   
    </div>
  );
};

export default LineGraph;