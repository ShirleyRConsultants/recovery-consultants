"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
const DisplayNameLinks: React.FC = () => {
  const { profile, session, loading } = useAuth();
  const [clientId, setClientId] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchClientId = async () => {
      if (profile?.type_of_user === "client") {
        const { data, error } = await supabase
          .from("clients") // Assuming your table is called 'clients'
          .select("id")
          .eq("auth_id", profile.id) // Assuming 'profile.id' is the user ID
          .single();

        if (data) {
          setClientId(data.id);
        } else {
          console.error("Error fetching client ID:", error);
        }
      }
    };

    fetchClientId();
  }, [profile, supabase]);

  if (!profile) {
    return null;
  }

  return (
    <div className="flex">
            {/* {profile && <p className="text-white">Hi </p>}&nbsp;<p className="lg:mr-2 text-white"> {profile.first_name}!</p> */}
      {profile.type_of_user === "admin" && (
        <Link className="mx-1 ml-2 lg:mx-4 hover:underline text-white" href="/admin">
          Admin
        </Link>
      )}
      {profile.type_of_user !== "client" && (
        <Link className="mx-1 lg:mx-4 hover:underline text-white" href="/clients">
          Clients
        </Link>
      )}
      {profile.type_of_user === "client" && clientId && (
        <Link className="mx-1 lg:mx-4 hover:underline text-white" href={`/questions/${clientId}`}>
          Assessment
        </Link>
      )}
      <Link className="mx-1 lg:mx-4 hover:underline text-white" href="/settings">
        Settings
      </Link>

    </div>
  );
};

export default DisplayNameLinks;
