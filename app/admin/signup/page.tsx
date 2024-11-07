"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Wave from "@/components/Wave";

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
    <NavBar/>
    <div className=" flex-1 flex flex-col justify-center gap-2 mt-24 text-black mx-auto text-center">
      <p>Loading...</p>
    </div>
    </>
  ) : (
    <>
      <NavBar />
      <div className="relative h-screen "> 
        <Wave /> 
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-1/3 md:w-1/2 w-5/6 bg-white p-8 shadow-lg rounded-lg z-10">
          <p className="text-center text-2xl mb-2">Case Manager Signup</p>
          <form
            onSubmit={handleSignup}
            className="flex flex-col w-full gap-4"
          >
            <label htmlFor="first_name">First Name</label>
            <input
              className="rounded-md px-4 py-2 border"
              name="first_name"
              placeholder="Jane"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              className="rounded-md px-4 py-2 border"
              name="last_name"
              placeholder="Smith"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              className="rounded-md px-4 py-2 border"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="phone">Phone</label>
            <input
              className="rounded-md px-4 py-2 border"
              name="phone"
              placeholder="123-456-7890"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-purp text-white py-2 rounded-md"
            >
              Sign Up
            </button>
          </form>
          {success && <p className="text-center text-purp">{success}</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
        </div>
      </div>
    </>
  );
}
