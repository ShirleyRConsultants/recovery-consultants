"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
  case_manager?: number;
};

type CaseManager = {
  first_name: string;
  last_name: string;
};

const categories = [
  { key: 'sobriety', label: 'Sobriety' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'sleep', label: 'Sleep' },
  { key: 'anxiety', label: 'Anxiety' },
  { key: 'depression', label: 'Depression' },
  { key: 'family', label: 'Family' },
  { key: 'routine', label: 'Routine' },
  { key: 'support', label: 'Support' },
  { key: 'future', label: 'Future' },
  { key: 'emotional_response', label: 'Emotional Response' },
  { key: 'finance', label: 'Financial Independence' },
];

const DataVisualization: React.FC = () => {
  const [clientData, setClientData] = useState<Client | null>(null);
  const [caseManager, setCaseManager] = useState<CaseManager | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['anxiety', 'depression']);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const { profile, loading, session } = useAuth();
  const supabase = createClient();
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    if (!session && !loading) {
      router.push('/');
      return;
    }
  }, [session, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select(
          'sobriety, nutrition, purpose, sleep, anxiety, depression, family, routine, support, future, emotional_response, finance, entries, first_name, last_name, case_manager'
        )
        .eq('id', id)
        .single();

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

      // Fetch case manager data if available
      if (data.case_manager) {
        const { data: caseManagerData, error: caseManagerError } = await supabase
          .from('case_managers')
          .select('first_name, last_name')
          .eq('id', data.case_manager)
          .single();

        if (!caseManagerError && caseManagerData) {
          setCaseManager(caseManagerData);
        }
      }
    };

    if (session) {
      fetchData();
    }
  }, [id, session, supabase]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getChartData = () => {
    if (!clientData) return null;

    const dates = clientData.entries.map(formatDate);
    const datasets = selectedCategories.map((category, index) => ({
      label: categories.find(c => c.key === category)?.label || category,
      data: clientData[category as keyof Client] as string[],
      borderColor: `hsl(${(index * 360) / selectedCategories.length}, 70%, 50%)`,
      backgroundColor: `hsla(${(index * 360) / selectedCategories.length}, 70%, 50%, 0.1)`,
      fill: true,
      tension: 0.4,
    }));

    return {
      labels: dates,
      datasets,
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const label = context.dataset.label;
            return `${label}: ${value}/5`;
          }
        }
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-600">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          {capitalize(clientData.first_name)} {capitalize(clientData.last_name)}
        </h2>
        {caseManager && (
          <p className="text-lg text-slate-600">
            Case Manager: {capitalize(caseManager.first_name)} {capitalize(caseManager.last_name)}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map(category => (
          <button
            key={category.key}
            onClick={() => toggleCategory(category.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategories.includes(category.key)
                ? 'bg-purp text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setChartType('line')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            chartType === 'line'
              ? 'bg-purp text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Line Chart
        </button>
        <button
          onClick={() => setChartType('bar')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            chartType === 'bar'
              ? 'bg-purp text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Bar Chart
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="h-[500px]">
          {chartType === 'line' ? (
            <Line data={getChartData()!} options={chartOptions} />
          ) : (
            <Bar data={getChartData()!} options={chartOptions} />
          )}
        </div>
      </div>

      <div className="text-center text-sm text-slate-600">
        <p>Scale: 1 (Lowest) to 5 (Highest)</p>
        <p className="mt-1">Select categories to compare different aspects of progress</p>
      </div>
    </div>
  );
};

export default DataVisualization;
