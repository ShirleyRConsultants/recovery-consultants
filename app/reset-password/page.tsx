"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setError] = useState("");
  const [sent, setSent] = useState(false);
  const { profile, session } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
  }, [session, router]);

  const handleResetPassword = async () => {
    setSent(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error as Error) {
        throw error as Error;
      }
      setMessage("Password has been updated");
      setError("");
    } catch (error) {
      setError("Try using a new 8 character password");
      setSent(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-sm z-0" />
        <div className="relative z-10 w-full max-w-lg mx-auto p-10 rounded-3xl shadow-xl bg-white/90 backdrop-blur-sm border border-slate-200">
          {profile && (
            <>
              <h1 className="text-center text-3xl font-extrabold text-slate-800 mb-6 tracking-tight">
                Reset Your Password
              </h1>
              <p className="text-center text-slate-600 mb-8">
                Please enter your new password below.
              </p>
              <div className="flex flex-col gap-6">
                <label className="text-lg font-semibold text-slate-700" htmlFor="password">
                  New Password
                </label>
                <input
                  id="password"
                  className="rounded-xl px-5 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white placeholder-slate-400 text-base outline-none"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {message && (
                  <p className="mt-6 text-center text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg py-2 px-4 shadow">
                    {message}
                  </p>
                )}

                {errors && (
                  <p className="mt-6 text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-4 shadow">
                    {errors}
                  </p>
                )}

                {!sent && (
                  <button
                    className="bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white py-3 rounded-xl font-bold text-lg shadow-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={sent}
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
