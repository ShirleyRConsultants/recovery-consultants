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
      <NavBar />
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="mt-2 text-slate-600">
                {isSignUp ? "Join our recovery community" : "Sign in to your account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/30 transition-all shadow-sm bg-white/90 placeholder-slate-400 text-base outline-none"
                  name="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/30 transition-all shadow-sm bg-white/90 placeholder-slate-400 text-base outline-none"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>

              <SubmitButton className="w-full bg-slate-800 hover:bg-slate-700 active:bg-slate-900 transition-all text-white py-3 rounded-xl font-bold text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                {isSignUp ? "Create Account" : "Sign In"}
              </SubmitButton>

              {success && (
                <div className="mt-6 text-center text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg py-2 px-4 shadow">
                  {success}
                </div>
              )}
              {errors && (
                <div className="mt-6 text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-4 shadow">
                  {errors}
                </div>
              )}
              {message && (
                <div className="mt-6 text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-4 shadow">
                  {message}
                </div>
              )}

              <div className="flex items-center justify-between mt-6">
                <Link 
                  className="text-sm text-slate-600 hover:text-slate-800 transition-colors font-medium" 
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
                <button
                  type="button"
                  onClick={toggleOptions}
                  className="text-sm text-slate-600 hover:text-slate-800 transition-colors font-medium"
                >
                  {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
