"use client"
import React, { useState, useEffect } from 'react';
import LineGraph from '@/components/LineGraph';
import { useAuth } from '@/components/Auth';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';

type Client = {
  first_name: string,
  last_name: string,
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
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select(
          'sobriety, nutrition, purpose, sleep, anxiety, depression, family, routine, support, future, emotional_response, finance, entries, first_name, last_name'
        )
        .eq('id', id)
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
    <div className="text-center mx-auto ">
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
