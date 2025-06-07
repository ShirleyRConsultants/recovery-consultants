"use client"; // Ensure this is a client component

import { useAuth } from "./Auth";// Adjust the path if needed
import Link from "next/link";
import DisplayNameLinks from "./DisplayNameLinks";

export default function AuthButton() {
  const { profile, signOut } = useAuth(); // Use profile and signOut from your AuthProvider

  // Determine button style based on user type
  const getButtonStyle = () => {
    if (!profile) return "bg-slate-800 hover:bg-slate-700";
    switch (profile.type_of_user) {
      case "admin":
        return "bg-slate-800 hover:bg-slate-700";
      case "case_manager":
        return "bg-white/20 hover:bg-white/30";
      default:
        return "bg-slate-800 hover:bg-slate-700";
    }
  };

  return profile ? (
    <div className="flex items-center space-x-4">
      <DisplayNameLinks />
      <button
        onClick={signOut}
        className={`py-2 px-4 rounded-xl text-sm font-medium text-white ${getButtonStyle()} transition-all duration-200 shadow-sm`}
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className={`py-2 px-4 rounded-xl text-sm font-medium text-white ${getButtonStyle()} transition-all duration-200 shadow-sm`}
    >
      Login
    </Link>
  );
}
