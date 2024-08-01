"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { useState } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [isSignUp, setIsSignUp] = useState(false);
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

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      router.push("/login?message=Could not authenticate user");
    }

    router.push("/");
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
      console.log("User already exists");

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
      console.log(error);
      if (error.code === "23505") {
        console.log("Email already exists");
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
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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

      <form
        onSubmit={handleSubmit}
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
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
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
        <SubmitButton className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </SubmitButton>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-2 text-sm text-blue-600"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </form>

      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
