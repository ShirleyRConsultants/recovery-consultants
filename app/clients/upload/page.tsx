import React from "react";
import ClientSignUp from "@/app/client-pages/ClientSignUp";
import NavBar from "@/components/NavBar";
import Wave from "@/components/Wave";

interface UploadProps {}

const Upload: React.FC<UploadProps> = () => {
  return (
    <>
      <NavBar />

      <div className="  items-center ">
        <Wave />

        <ClientSignUp />
      </div>
    </>
  );
};

export default Upload;
