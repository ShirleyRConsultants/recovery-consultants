"use client"; // Ensure this is a client component

import { useAuth } from "./Auth";// Adjust the path if needed
import Link from "next/link";
import DisplayNameLinks from "./DisplayNameLinks";

export default function AuthButton() {
  const { profile, signOut } = useAuth(); // Use profile and signOut from your AuthProvider

  return profile ? (
    <div className="flex items-center ">
      <DisplayNameLinks />
      <button
        onClick={signOut}
        className="py-1 px-1 rounded-md no-underline text-white hover:bg-purp"
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-1 px-1 flex rounded-md no-underline text-white hover:bg-purp"
    >
      Login
    </Link>
  );
}
