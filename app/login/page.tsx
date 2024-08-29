"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/Auth";
import { profile } from "console";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState("");
  const router = useRouter();

  
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

  
    if (isSignUp) {
      await signUp(formData);
    } else {
      await signIn(formData);
    }
  };

  const toggleOptions = () => {
    setIsSignUp((prev) => !prev);
    router.push("/login");
  };

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      router.push(`/login?message=${error.message}`);
    } else {
      router.push("/");
    }
  };


  const signUp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      router.push("/login?message=User already exists");

      return;
    }
    if (error) {
      console.log(error);
      throw error;
    }

    const user = data.user;
    console.log(user, "THIS IS THE USER");
    // Insert additional user information into the "users" table
    const { data: insertData, error: insertError } = await supabase
      .from("users")
      .insert({
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      });

    if (insertError) {
      throw insertError;
    }
    try {
    } catch (error: any) {
      if (error.code === "23505") {
        setErrors("Email already exists");
      } else {
        console.log("handle error");
      }
      console.error("Error during user registration:");
    }

    if (error) {
      router.push("/login?message=Could not signup user");
    }

    router.push("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex-1 flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col mt-20 w-full justify-center gap-2 text-black"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg- border mb-6"
          name="email"
          placeholder="you@example.com"
          required
          autoComplete="username"
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2  border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
        {isSignUp && (
          <>
            <label className="text-md" htmlFor="firstName">
              First Name
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="firstName"
              placeholder="bob"
            />
            <label className="text-md" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="lastName"
              placeholder="smith"
            />
            <label className="text-md" htmlFor="phone">
              Phone
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="phone"
              placeholder="123-456-7890"
            />
          </>
        )}
        <SubmitButton className="rounded-md px-4 py-2 text-black mb-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </SubmitButton>
        {errors && <p className="text-red-500 text-center">{errors}</p>}
        <button
          type="button"
          onClick={() => toggleOptions()}
          className="mt-2 text-sm text-blue-600"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </form>

      {searchParams?.message && (
        <p className=" p-4 text-red-500 text-center">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
