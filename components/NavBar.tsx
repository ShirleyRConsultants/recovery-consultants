import React from "react";
import AuthButton from "./AuthButton";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-end p-3 text-sm">
        <AuthButton />
      </div>
    </nav>
  );
};

export default NavBar;
