"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";

interface ClientsProps {}

const ClientSignUp: React.FC<ClientsProps> = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [sobrietyDate, setSobrietyDate] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const { profile, caseManagerID, session } = useAuth();
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else if (profile) {
      if (
        profile.type_of_user !== "admin" &&
        profile?.type_of_user !== "case_manager"
      ) {
        router.push("/");
      } else {
        setLoadingProfile(false);
      }
    }
  }, [profile, router]);

  if (!profile || loadingProfile) {
    return <div>Loading......</div>;
  }
  console.log("case manager ID --->", caseManagerID);

  const supabase = createClient();

  const handleGeneratePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < 10; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        console.log("Error:", response.status, response.statusText);
      } else {
        console.log("POST request successful");
      }
    } catch (errer) {
      console.log("error occured");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Set loading state to true
    setSubmitted(true);
    const password = handleGeneratePassword();
    console.log("Attempting to sign up with:", { email, password });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          first_name: firstName.toLowerCase(),
          last_name: lastName.toLowerCase(),
          email: email.toLowerCase(),
          phone: phone,
          type_of_user: "client",
        },
      },
    });

    if (error) {
      setError(error.message);
      console.log("Error signing up:", error.message);

      return;
    }
    const userId = data.user?.id;
    const { data: insertData, error: insertError } = await supabase
      .from("clients")
      .insert({
        auth_id: userId,
        first_name: firstName.toLowerCase(),
        last_name: lastName.toLowerCase(),
        sobriety_date: sobrietyDate,
        email: email,
        phone: phone,
        zip_code: zipCode,
        case_manager: caseManagerID,
      });

    if (insertError) {
      setError(insertError.message);
      console.log("Error inserting client:", insertError.message);
      setLoading(false);
      return;
    }

    console.log("Signup successful, user data:", data);

    // Send email with password
    await handleEmail(email, password);

    setLoading(false);
    setSuccess(`Case manager ${firstName} added successfully!`);
  };

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setZipCode("");
    setSobrietyDate("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-sm z-0" />
      
      <h2 className="relative z-10 text-center text-4xl font-extrabold text-slate-800 mt-20 mb-8 tracking-tight">
        Client Upload
      </h2>

      <div className="relative z-10 w-full max-w-2xl mx-auto p-10 rounded-3xl shadow-xl bg-white/90 backdrop-blur-sm border border-slate-200">
        <form onSubmit={handleSignup} className="flex flex-col w-full gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-semibold text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-xl px-5 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white placeholder-slate-400 text-base outline-none"
                name="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-slate-700" htmlFor="firstName">
                First Name
              </label>
              <input
                className="w-full rounded-xl px-5 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white placeholder-slate-400 text-base outline-none"
                name="firstName"
                placeholder="Bob"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-slate-700" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="w-full rounded-xl px-5 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white placeholder-slate-400 text-base outline-none"
                name="lastName"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-slate-700" htmlFor="phone">
                Phone
              </label>
              <input
                className="w-full rounded-xl px-5 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white placeholder-slate-400 text-base outline-none"
                name="phone"
                placeholder="123-456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-slate-700" htmlFor="zip_code">
                Zip Code
              </label>
              <input
                className="w-full rounded-xl px-5 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white placeholder-slate-400 text-base outline-none"
                name="zip_code"
                placeholder="90210"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-slate-700" htmlFor="sobriety_date">
                Sobriety Date
              </label>
              <input
                required
                type="date"
                className="w-full rounded-xl px-5 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white placeholder-slate-400 text-base outline-none"
                name="sobriety_date"
                value={sobrietyDate}
                onChange={(e) => setSobrietyDate(e.target.value)}
              />
            </div>
          </div>

          {!success && (
            <button
              disabled={submitted}
              type="submit"
              className="bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white py-3 rounded-xl font-bold text-lg shadow-lg mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Upload Client"}
            </button>
          )}

          {success && (
            <div className="space-y-4">
              <p className="text-center text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg py-2 px-4 shadow">
                Client added successfully!
              </p>
              <button
                onClick={resetForm}
                className="w-full bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white py-3 rounded-xl font-bold text-lg shadow-lg"
              >
                Add Another Client
              </button>
            </div>
          )}

          {error && (
            <p className="text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-4 shadow">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClientSignUp;
