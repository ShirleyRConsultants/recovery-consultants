"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setError] = useState("");
  const [sent, setSent] = useState(false);
  const { profile, session } = useAuth();

  const router = useRouter();

  if (session === null ) {
    router.push("/");
  }

  const handleResetPassword = async () => {
    setSent(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error as Error) {
        throw error as Error;
      }
      setMessage("Password has been updated");
      setError("");
    } catch (error) {
      setError("Try using a new 8 character password ");
      setSent(false);
    }
  };

  return (
    <>
      <div className="animate-in flex-1 lg:w-1/5 md:w-1/3 w-3/4  flex flex-col mx-auto justify-center ">
        {profile && (
          <>
            <h1>Password Reset</h1>
            <input
              className=""
              type="password"
              placeholder="new password...."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {message && <p className="text-center  text-blue-600">{message}</p>}

            {errors && message !== "" && (
              <p className="text-center  text-red-600">{errors}</p>
            )}
            <button disabled={sent} onClick={handleResetPassword}>
              Reset
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
