"use client"
import React, { useState, useEffect } from 'react';
import LineGraph from '@/components/LineGraph';
import { useAuth } from '@/components/Auth';
import { createClient } from '@/utils/supabase/client';

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
  const [clientData, setClientData] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { profile, loading } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select(
          'sobriety, nutrition, purpose, sleep, anxiety, depression, family, routine, support, future, emotional_response, finance, entries'
        )
        .eq('id', 11)
        .single(); // Use .single() to get a single object

      if (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        return;
      }

      if (!data) {
        setError('No data available');
        return;
      }

      setClientData(data as Client);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen text-center mt-12">
      <h1>Monthly Data Visualization</h1>
      {clientData ? (
        <LineGraph data={clientData} />
      ) : (
        <p>Loading data...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default DataVisualization;
