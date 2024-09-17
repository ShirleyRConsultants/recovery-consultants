"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import Wave from "@/components/Wave";
import NavBar from "@/components/NavBar";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setError] = useState("");
  const [sent, setSent] = useState(false);
  const { profile, session } = useAuth();

  const router = useRouter();

  if (session === null) {
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
      <div className=" text-center ">
        <NavBar/>
        <Wave/>
        {profile && (
          <div className="">
            <h1>Password Reset</h1>
            <input
              className="border border-black  rounded-md "
              type="password"
              placeholder="new password...."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {message && <p className="text-center  text-blue-600">{message}</p>}

            {errors && message !== "" && (
              <p className="text-center  text-red-600">{errors}</p>
            )}
            {!sent && (
              <button
                className="border border-black rounded-md"
                disabled={sent}
                onClick={handleResetPassword}
              >
                Reset
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
