"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/Auth";
import { createClient } from "@/utils/supabase/client";
import Card from "@/components/Card";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";

interface ClientListProps {}

type Client = {
  first_name: string;
  last_name: string;
  case_manager: number;
  entries: Date[];
  id: number;
  active: boolean;
};

const MyClients: React.FC<ClientListProps> = () => {
  const { profile, caseManagerID } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (profile && profile.type_of_user !== "admin") {
      router.push("/");
    }
  }, [profile, router]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data: clientsData, error } = await supabase
          .from("clients")
          .select("id, first_name, last_name, case_manager, entries, active");

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
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">All Clients</h1>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-purp text-white rounded-lg hover:bg-purp/90 active:bg-purp/80 transition-colors"
              >
                Back to Admin
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <Link 
                  key={client.id} 
                  href={`/clients/${client.id}`}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <Card
                    first_name={client.first_name}
                    last_name={client.last_name}
                    last_update={client.entries?.[client.entries.length - 1] ?? null}
                  />
                </Link>
              ))}
            </div>

            {clients.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">No clients found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyClients;
