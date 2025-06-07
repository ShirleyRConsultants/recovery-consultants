"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  
  const supabase = createClient();
  const { profile, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile && profile?.type_of_user !== "admin") {
      router.push("/");
    }
    if (!session) {
      router.push("/")
    }
  }, [profile, loading]);

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

  const handleGeneratePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < 10; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Set loading state to true
    const password = handleGeneratePassword();
    console.log("Attempting to sign up with:", { email, password });

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          first_name: firstName.toLowerCase(),
          last_name: lastName.toLowerCase(),
          email: email,
          phone: phone,
          type_of_user: "case_manager"
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      console.log("Error signing up:", signupError.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;

    const { error: caseManagerInsertError } = await supabase
      .from("case_managers")
      .insert({
        auth_id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      });

    if (caseManagerInsertError) {
      setError(caseManagerInsertError.message);
      console.log("Error inserting case manager:", caseManagerInsertError.message);
      setLoading(false);
      return;
    }

    console.log("Signup and insertion successful, user data:", data);

    // Send email with password
    await handleEmail(email, password);

    setLoading(false);
    setSuccess(`Case manager ${firstName} added successfully!`);
  };
  
  return profile?.type_of_user != "admin" ? (
    <>
      <NavBar />
      <div className="flex-1 flex flex-col justify-center gap-2 mt-24 text-black mx-auto text-center">
        <p>Loading...</p>
      </div>
    </>
  ) : (
    <>
      <NavBar />
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="relative z-10 w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-purp text-center mb-8 tracking-tight">
              Case Manager Signup
            </h1>
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-slate-700 mb-1">
                  First Name
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white/90 placeholder-slate-400 text-base outline-none"
                  name="first_name"
                  placeholder="Jane"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-slate-700 mb-1">
                  Last Name
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white/90 placeholder-slate-400 text-base outline-none"
                  name="last_name"
                  placeholder="Smith"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white/90 placeholder-slate-400 text-base outline-none"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 border border-slate-200 focus:border-purp focus:ring-2 focus:ring-purp/30 transition-all shadow-sm bg-white/90 placeholder-slate-400 text-base outline-none"
                  name="phone"
                  placeholder="123-456-7890"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white py-3 rounded-xl font-bold text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            {success && (
              <div className="mt-6 text-center text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg py-2 px-4 shadow">
                {success}
              </div>
            )}
            {error && (
              <div className="mt-6 text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-4 shadow">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
