"use client"

import React from 'react';
import Link from 'next/link';
import { useAuth } from './Auth';

export default function Header() {
  const { profile } = useAuth();

  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Recovery Consultants
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Empowering recovery through personalized progress tracking and professional support
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {!profile ? (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-900 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all shadow-lg hover:shadow-xl border border-slate-200"
                >
                  Learn More
                </Link>
              </>
            ) : (
              <Link
                href={profile.type_of_user === "admin" ? "/admin" : "/clients"}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-900 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
          
          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Track Progress</h3>
              <p className="text-slate-600">Monitor recovery milestones and achievements</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Professional Support</h3>
              <p className="text-slate-600">Access to dedicated case managers and resources</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Data Insights</h3>
              <p className="text-slate-600">Visualize progress and identify trends</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
