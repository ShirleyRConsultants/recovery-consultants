"use client";
import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./Auth";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { profile } = useAuth();
  
  // Determine text color based on user type
  const getTextColor = () => {
    return "text-white";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-200/20 transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-90 active:opacity-80"
          >
            <Image
              className="h-8 w-auto"
              src="https://recovery-consultants.com/wp-content/uploads/2024/04/RC-Logo-White.svg"
              height={32}
              width={128}
              alt="Recovery Consultants Logo"
              priority={true}
            />
          </Link>
          
          <div className="flex items-center space-x-4">
            {profile && (
              <>
                <Link 
                  href="/clients" 
                  className={`hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium ${getTextColor()} hover:opacity-80 transition-colors`}
                >
                  Clients
                </Link>
                <Link 
                  href="/settings" 
                  className={`hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium ${getTextColor()} hover:opacity-80 transition-colors`}
                >
                  Settings
                </Link>
              </>
            )}
            <div className="ml-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
