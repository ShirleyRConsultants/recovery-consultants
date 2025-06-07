"use client"
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import NavBar from "@/components/NavBar";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage('Error sending reset link. Please try again.');
      setIsError(true);
    } else {
      setMessage('Password reset link has been sent to your email.');
      setIsError(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-sm z-0" />
        <div className="relative z-10 w-full max-w-lg mx-auto p-10 rounded-3xl shadow-xl bg-white/90 backdrop-blur-sm border border-slate-200">
          <h1 className="text-center text-3xl font-extrabold text-slate-800 mb-6 tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-center text-slate-600 mb-8">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-6">
            <label className="text-lg font-semibold text-slate-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl px-5 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white placeholder-slate-400 text-base outline-none"
            />
            <button
              type="submit"
              className="bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white py-3 rounded-xl font-bold text-lg shadow-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Send Reset Link
            </button>
          </form>
          {message && (
            <p className={`mt-6 text-center font-semibold rounded-lg py-2 px-4 shadow ${
              isError 
                ? "text-red-600 bg-red-50 border border-red-200" 
                : "text-green-600 bg-green-50 border border-green-200"
            }`}>
              {message}
            </p>
          )}
          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-purp hover:text-purp/80 transition-colors font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
