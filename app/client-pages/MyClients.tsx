"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/Auth";
import { createClient } from "@/utils/supabase/client";
import Card from "@/components/Card";
import Link from "next/link";
import NavBar from "@/components/NavBar";

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

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-sm z-0" />
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="w-full max-w-6xl mx-auto p-10 rounded-3xl shadow-xl bg-white/90 backdrop-blur-sm border border-slate-200">
            {profile && (
              <h1 className="text-center text-4xl font-extrabold text-slate-800 mb-8 tracking-tight">
                {profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1) + "'s Clients"}
              </h1>
            )}
            
            {clients.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-slate-600 font-medium">
                  You have no clients signed up yet!
                </p>
                <Link 
                  href="/clients/upload" 
                  className="inline-block mt-6 px-8 py-4 bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white rounded-xl font-bold text-lg shadow-lg"
                >
                  Add New Client
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <div key={client.id} className="transform transition-transform hover:scale-105">
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyClients;
