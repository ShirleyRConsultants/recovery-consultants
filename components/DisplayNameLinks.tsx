"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const DisplayNameLinks: React.FC = () => {
  const { profile } = useAuth();
  const [clientId, setClientId] = useState<string | null>(null);
  const supabase = createClient();

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
      {profile.type_of_user === "admin" && (
        <Link className="mx-4 hover:underline" href="/admin">
          Admin
        </Link>
      )}
      {profile.type_of_user !== "client" && (
        <Link className="mx-4 hover:underline" href="/clients">
          Clients
        </Link>
      )}
      {profile.type_of_user === "client" && clientId && (
        <Link
          className="mx-4 hover:underline"
          href={`/questions/${clientId}`}
        >
          Assessment
        </Link>
      )}
      <p>{profile.first_name}</p>
    </div>
  );
};

export default DisplayNameLinks;
