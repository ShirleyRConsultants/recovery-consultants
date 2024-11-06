"use client"
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io'; 

const BackButton: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname() // Get the current path

  if (currentPath === '/') {
    return null;
  }

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBackClick}
      className=" text-purple-700 hover:text-purple-950 text-xl py-1 px-1 ml-4 mt-20 z-30 absolute rounded hover:bg-mint  transition-colors duration-300"
    >
    <IoIosArrowBack className="text-xl hover:text-2xl" /> {/* React Icon Left Arrow */}
    </button>
  );
};

export default BackButton;
