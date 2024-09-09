import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className="w-full bg-mint flex justify-center border-b border-black/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Image
          className="flex-shrink-0"
          src="https://recovery-consultants.com/wp-content/uploads/2024/04/RC-Logo-White.svg"
          width={100}
          height={100}
          alt="logo"
        />
        <AuthButton />
      </div>
    </nav>
  );
};

export default NavBar;
