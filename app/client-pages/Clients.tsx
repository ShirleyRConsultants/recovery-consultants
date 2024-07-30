"use client";
import React, { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
interface ClientsProps {}

const Clients: React.FC<ClientsProps> = () => {
  const router = useRouter();
  const { profile, session } = useAuth();
  
  useEffect(() => {
    if (
      profile?.type_of_user !== "admin" &&
      profile?.type_of_user !== "case_manager"
    ) {
      router.push("/");
    }
  }, [profile]);
  const supabase = createClient();

  const handleNew = () => {};

  return (
    <div className="">
      <button className="hover:underline " onClick={handleNew}>
        Add New
      </button>
    </div>
  );
};

export default Clients;
