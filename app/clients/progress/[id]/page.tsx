"use client";

import React from 'react';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/components/Auth';
import { useRouter } from 'next/navigation';
import DataVisualization from '@/app/client-pages/DataVisualization';
import Link from 'next/link';

export default function ClientProgressPage() {
  const { profile, session } = useAuth();
  const router = useRouter();

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Client Progress</h1>
            <Link 
              href="/all-clients"
              className="px-4 py-2 bg-purp text-white rounded-lg hover:bg-purp/90 active:bg-purp/80 transition-colors"
            >
              Back to Clients
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <DataVisualization />
          </div>
        </div>
      </div>
    </>
  );
}
