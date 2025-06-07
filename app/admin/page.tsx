"use client"
import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/components/Auth';

export default function AdminPage() {
  const { profile } = useAuth();

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/admin/signup"
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-2">CM Register</h2>
              <p className="text-slate-600">Register new case managers</p>
            </Link>

            <Link
              href="/admin/case-managers"
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-2">CM Dashboard</h2>
              <p className="text-slate-600">Manage case managers</p>
            </Link>

            <Link
              href="/admin/clients"
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Client Dashboard</h2>
              <p className="text-slate-600">View all clients</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}