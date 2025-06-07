"use client";

import React from 'react';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <main className="relative z-10 pt-16 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-10">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
                  Weekly Mental Health Assessment System
                </h1>
                
                <div className="space-y-8 text-slate-700">
                  <section>
                    <h2 className="text-2xl font-semibold text-slate-800 mb-4">How It Works</h2>
                    <p className="mb-4">
                      Our weekly mental health assessment system is designed to track and monitor client progress throughout their recovery journey. Each week, clients complete a comprehensive assessment that helps us:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Track emotional well-being and mental health progress</li>
                      <li>Identify patterns and trends in recovery</li>
                      <li>Adjust treatment plans based on real-time feedback</li>
                      <li>Provide personalized support and interventions</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-slate-800 mb-4">Benefits</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">For Clients</h3>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                          <li>Regular check-ins on progress</li>
                          <li>Personalized feedback and support</li>
                          <li>Clear visualization of improvement</li>
                          <li>Better communication with care team</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">For Case Managers</h3>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                          <li>Data-driven decision making</li>
                          <li>Early intervention opportunities</li>
                          <li>Comprehensive progress tracking</li>
                          <li>Improved client outcomes</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-slate-800 mb-4">Get Started</h2>
                    <p className="mb-6">
                      Ready to begin your journey to better mental health? Our assessment system is designed to be user-friendly and supportive.
                    </p>
                    <div className="flex justify-center">
                      <Link
                        href="/login"
                        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-purp hover:bg-purp/90 active:bg-purp/80 rounded-xl transition-all shadow-lg"
                      >
                        Start Your Journey
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 