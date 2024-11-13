"use client";
import React, {  useEffect, useState } from "react";
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

const MyClients: React.FC<ClientListProps> = () => {
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
    <>
 
    <div className=" w-full text-center ">
    
      <div className="py-10 ">
      {profile && (
     <p className="text-3xl text-white">
     {profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1) + "'s Clients"}
   </p>
      )}
      {clients.length == 0 && <p className="text-white">You have no clients signed up! </p> }
  <div className="flex justify-center flex-wrap gap-6  ">
      {clients.map((client) => (
        <div key={client.id} className="relative z-10 ">
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
    </div>
    </div>
    </>
  );
};

export default MyClients;
