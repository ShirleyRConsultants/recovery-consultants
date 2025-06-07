"use client";

import React from 'react';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/components/Auth';

export default function ClientUploadPage() {
  const { profile } = useAuth();

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Upload Client Data</h1>
          {/* Add your upload form content here */}
        </div>
      </div>
    </>
  );
}
