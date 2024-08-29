"use client"
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
      className=" text-black  text-xs py-1 px-1 ml-2 mt-4 absolute rounded hover:bg-black hover:text-white transition-colors duration-300"
    >
      Back
    </button>
  );
};

export default BackButton;
