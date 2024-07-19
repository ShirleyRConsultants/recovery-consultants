'use client'
import React from "react";
import { useState } from "react";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [signUp, setSignUp] = useState(false);

  const handleSignUp = () => {
    if (signUp) {
      setSignUp(false);
    } else {
      setSignUp(true);
    }
    console.log(signUp)
  };
  return <div>
    <button onClick={handleSignUp}>click me</button>
  </div>;
};

export default SignUp;
