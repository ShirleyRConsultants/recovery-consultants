"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [password, setPassword] = useState("")
  const supabase = createClient();

  const handleEmail = async (email: string, password: string) => {
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
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    for (let i = 0, n = charset.length; i < 10; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleSignup = async () => {
    setError(null); // Reset error state
    const password = handleGeneratePassword();
    console.log('Attempting to sign up with:', { email, password });
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error);
      console.log('Error signing up:', error.message);
    } else {
      console.log('Signup successful, user data:', data);

      // Send email with password
      await handleEmail(email, password);

      alert('User signed up successfully!');
    }
  };

  return (
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
        required
      />
      <label className="text-md" htmlFor="last_name">
        Last Name
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="last_name"
        placeholder="Smith"
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
        required
      />

      <button onClick={() => handleSignup()}>Sign Up</button>
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  );
}
