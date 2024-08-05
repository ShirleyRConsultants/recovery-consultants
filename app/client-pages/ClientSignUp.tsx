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
  const { profile, loadingProfile } = useAuth();

  console.log(loadingProfile, "loading")




  useEffect(() => {
    if (
    profile?.type_of_user === "client"
    ) {
      router.push("/");
    }
  }, [profile]);

  if (profile?.type_of_user !== "admin" && profile?.type_of_user !== "case_manager") {
    return <>Loading.......</>
  }

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
    const { data, error } = await supabase.auth.signUp({ email, password });

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
        first_name: firstName,
        last_name: lastName,
        sobriety_date: sobrietyDate,
        email: email,
        phone: phone,
        zip_code: zipCode,
      });

    if (insertError) {
      setError(insertError.message);
      console.log("Error inserting client:", insertError.message);
      setLoading(false);
      return;
    }

    const { error: userInsertError } = await supabase.from("users").insert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      type_of_user: "client",
      email: email,
      phone: phone,
    });

    if (userInsertError) {
      setError(userInsertError.message);
      console.log("Error inserting user:", userInsertError.message);
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



  return  (

    <div className="">
      <form
        onSubmit={handleSignup}
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-md" htmlFor="firstName">
          First Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="firstName"
          placeholder="bob"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="text-md" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="lastName"
          placeholder="smith"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="text-md" htmlFor="phone">
          Phone
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="phone"
          placeholder="123-456-7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="text-md" htmlFor="zip_code">
          Zip Code
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="zip_code"
          placeholder="90210"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />

        <label className="text-md" htmlFor="sobriety_date">
          Sobriety Date
        </label>
        <input
          required
          type="date"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="sobriety_date"
          placeholder="00-00-0000"
          value={sobrietyDate}
          onChange={(e) => setSobrietyDate(e.target.value)}
        />
        {!success && (
          <button
            disabled={submitted}
            type="submit"
            className="mt-2 text-sm border border-1 rounded-lg p-2"
          >
            Upload
          </button>
        )}

        {success && (
          <div className="">
            <p className="text-blue-500 mt-4">Client added successfully!</p>
            <button
              onClick={resetForm}
              className="w-[100%] border border-1 p-2 rounded-lg mt-4"
            >
              Reset
            </button>
          </div>
        )}

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default ClientSignUp;
