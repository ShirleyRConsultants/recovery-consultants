"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/Auth";
import { createClient } from "@/utils/supabase/client";
import Card from "@/components/Card";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Wave from "@/components/Wave";
import { useRouter } from "next/navigation"; // Import useRouter

interface ClientListProps {}

type Client = {
  first_name: string;
  last_name: string;
  case_manager: number;
  entries: Date[];
  id: number;
};

const MyClients: React.FC<ClientListProps> = () => {
  const { profile, caseManagerID } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const router = useRouter(); // Initialize useRouter
  const supabase = createClient();

  useEffect(() => {
    if (profile && profile.type_of_user !== "admin") {
      // Redirect non-admin users
      router.push("/");
    }
  }, [profile, router]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data: clientsData, error } = await supabase
          .from("clients")
          .select("id, first_name, last_name, case_manager, entries");

        if (error) {
          console.error("Error fetching clients:", error);
        } else {
          setClients(clientsData);
        }
      } catch (error) {
        console.error("Unexpected error fetching clients:", error);
      }
    };

    fetchClients();
  }, [caseManagerID]);

  return (
    <>
      <NavBar />
      {/* Container for wave and cards */}

        {/* Wave component */}
        <Wave
        className="h-20" />

        {/* Cards section, positioned above the wave */}
        <div className="relative z-10 w-full text-center py-10 " >
          {profile?.type_of_user === "case_manager" && (
            <p className="text-3xl text-white">
              {profile.first_name + "'s" + " Clients"}
            </p>
          )}

          <div className="flex justify-center flex-wrap gap-6  ">
            {clients.map((client) => (
              <Link key={client.id} href={`/clients/${client.id}`}>
                <Card
                  first_name={client.first_name}
                  last_name={client.last_name}
                  last_update={client.entries?.[client.entries.length - 1] ?? null}
                />
              </Link>
            ))}
          </div>
        </div>
    
    </>
  );
};

export default MyClients;
