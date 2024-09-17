"use client"
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage('Error sending reset link. Please try again.');
    } else {
      setMessage('Password reset link has been sent to your email.');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl mb-4">Forgot Password?</h1>
      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-mint text-white px-4 py-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
