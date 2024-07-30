"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<Error | null>(null);
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

  const handleSignup = async () => {
    setError(null); // Reset error state
    const password = handleGeneratePassword();
    console.log("Attempting to sign up with:", { email, password });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error);
      console.log("Error signing up:", error.message);
    } else {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert({
          id: data.user?.id,
          first_name: firstName,
          last_name: lastName,
          type_of_user: "case_manager",
          email: email,
          phone: phone,
        });

      if (insertError) {
        throw insertError;
      }
      try {
      } catch (error: any) {
        console.log(error);
        if (error.code === "23505") {
          console.log("Email already exists");
        } else {
          console.log("handle error");
        }
        console.error("Error during user registration:");
      }
      console.log("Signup successful, user data:", data);

      // Send email with password
      await handleEmail(email, password);

     
      setLoading(false);
      setSuccess(`Case manager ${firstName} added successfully!`);
    }
  };

  return profile?.type_of_user != "admin" ? (
    <div className="w-1/3 flex-1 flex flex-col justify-center gap-2 text-foreground text-center">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="w-1/3 flex-1 flex flex-col justify-center gap-2 text-foreground">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline  group-hover:-translate-x-1 text-foreground flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <p className="text-center text-2xl mb-2">Case Manager Signup</p>
      <label className="text-md" htmlFor="first_name">
        First Name
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="first_name"
        placeholder="Jane"
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <label className="text-md" htmlFor="last_name">
        Last Name
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="last_name"
        placeholder="Smith"
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="text-md" htmlFor="phone">
        phone
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="phone"
        placeholder="123-456-7890"
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button disabled={loading} onClick={() => handleSignup()}>
        Sign Up
      </button>
      {success && <p className="text-center text-blue-600">{success}</p>}
      {error && <p className="text-center text-red-600">{error.message}</p>}
    </div>
  );
}
