"use client";
//log in page
// new images
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/Auth";
import { useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Login({}: {
  searchParams: { message: string; success: string };
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState("");
  const router = useRouter();
  const { signIn } = useAuth();
  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const success = searchParams.get("success");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (isSignUp) {
      await signUp(formData);
    } else {
      signIn(email, password);
    }
  };

  const toggleOptions = () => {
    setIsSignUp((prev) => !prev);
    router.push("/login");
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
        data: {
          first_name: firstName.toLowerCase(),
          last_name: lastName.toLowerCase(),
          email: email,
          phone: phone,
          type_of_user: "client",
        },
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

    router.push("/login?success=Check email to continue sign in process");
  };

  return (
    <>
    <NavBar/>
    <div className=" sm:max-w-md mx-auto mt-20 ">
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col w-full justify-center gap-2 text-black "
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
        {/* {isSignUp && (
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
        )} */}
        <SubmitButton className="rounded-md px-4 py-2 text-black mb-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </SubmitButton>
        {success && (
        <p className="p-2 text-center text-purple-400  border-1 border border-black rounded-xl">
          {success}
        </p>
      )}
        {errors && <p className="text-red-500 text-center">{errors}</p>}
        {/* <button
          type="button"
          onClick={() => toggleOptions()}
          className="mt-2 text-sm text-blue-600"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button> */}
        <Link className="text-center hover:font-bold" href="/forgot-password">
        Forgot Password?
      </Link>
      </form>
 

   
      {message && <p className=" p-4 text-red-500 text-center">{message}</p>}
    </div>
    </>
  );
}
