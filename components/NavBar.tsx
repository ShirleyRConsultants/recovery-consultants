import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";
import Link from "next/link";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className="w-full bg-mint flex justify-center border-b border-black/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/">
        <Image
          className="flex-shrink-0 w-32 h-auto"
          src="https://recovery-consultants.com/wp-content/uploads/2024/04/RC-Logo-White.svg"
          height={"10"} // adjust as needed
          width={"100"} // adjust width according to your design
          alt="logo"
          priority={true}
        />
</Link>
        <AuthButton />
      </div>
    </nav>
  );
};

export default NavBar;
