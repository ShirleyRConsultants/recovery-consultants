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
    <div className="">
      <h2 className=" text-black font-thin lg:mt-20 mt-28  absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl lg:text-4xl  text-center">
        Client Upload
      </h2>

      <div className="mt-48 lg:mt-28 pb-36 ">
        <div className=" mx-auto lg:mx-auto lg:w-1/3 w-3/4 mt-36  bg-white p-8 shadow-lg rounded-lg z-10">
          <form onSubmit={handleSignup} className="flex flex-col w-full gap-4 ">
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 border"
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
              className="rounded-md px-4 py-2 border"
              name="firstName"
              placeholder="Bob"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="text-md" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="rounded-md px-4 py-2 border"
              name="lastName"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="text-md" htmlFor="phone">
              Phone
            </label>
            <input
              className="rounded-md px-4 py-2 border"
              name="phone"
              placeholder="123-456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label className="text-md" htmlFor="zip_code">
              Zip Code
            </label>
            <input
              className="rounded-md px-4 py-2 border"
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
              className="rounded-md px-4 py-2 border"
              name="sobriety_date"
              value={sobrietyDate}
              onChange={(e) => setSobrietyDate(e.target.value)}
            />

            {!success && (
              <button
                disabled={submitted}
                type="submit"
                className="mt-2 text-sm bg-purple-500 text-white p-2 rounded-lg"
              >
                Upload
              </button>
            )}

            {success && (
              <div>
                <p className="text-blue-500 mt-4 text-center">
                  Client added successfully!
                </p>
                <button
                  onClick={resetForm}
                  className="mt-2 text-sm bg-purple-500 text-white p-2 rounded-lg w-full"
                >
                  Reset
                </button>
              </div>
            )}

            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientSignUp;
