"use client";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "@/components/Auth";
import { createClient } from "@/utils/supabase/client";
import Card from "@/components/Card";
import Link from "next/link";

interface ClientListProps {}

type Client = {
  first_name: string;
  last_name: string;
  case_manager: number;
  entries: Date[];
  id: number;
};

const ClientList: React.FC<ClientListProps> = () => {
  const { profile, caseManagerID } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (caseManagerID) {
          const { data: clientsData, error } = await supabase
            .from("clients")
            .select("id, first_name, last_name, case_manager, entries")
            .eq("case_manager", caseManagerID);

          if (error) {
            console.error("Error fetching clients:", error);
          } else {
            setClients(clientsData);
          }
        }
      } catch (error) {
        console.error("Unexpected error fetching clients:", error);
      }
    };

    fetchClients();
  }, [caseManagerID]);

  console.log(clients);
  return (
    <div className="text-center mt-10">
      {profile && (
        <p className="text-3xl">{profile.first_name + "'s" + " Clients"} </p>
      )}

      {clients.map((client) => (
        <div key={client.id}>
          <Link href={`/clients/${client.id}`}>
            <Card
              first_name={client.first_name}
              last_name={client.last_name}
              last_update={client.entries?.[client.entries.length - 1] ?? null}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ClientList;
