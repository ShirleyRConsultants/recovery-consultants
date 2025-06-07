"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Auth";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  active: boolean;
}

const AdminClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [pageLoading, setLoading] = useState(false);

  const { profile, session, loading } = useAuth();
  const router = useRouter();
  
  
  useEffect(() => {
    if (!loading && profile && profile?.type_of_user !== "admin") {
      router.push("/");
    }
    if (!session) {
      router.push("/")
    }
  }, [profile, loading]);
  const supabase = createClient();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("active", { ascending: false }); // Sorts by active status

    if (error) {
      console.error("Error fetching clients:", error);
    } else {
      setClients(data as Client[]);
    }
    setLoading(false);
  };

  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("clients")
      .update({ active: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating client status:", error);
    } else {
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === id ? { ...client, active: !currentStatus } : client
        )
      );
    }
  };

  const capitalize = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Client List
          </h1>
          {pageLoading ? (
            <p className="text-center text-slate-500">Loading clients...</p>
          ) : (
            <ul className="space-y-6">
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="rounded-2xl bg-white/90 shadow-xl border border-slate-200 p-6 transition-transform duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        {`${capitalize(client.first_name)} ${capitalize(client.last_name)}`}
                      </h2>
                      <p className="text-sm mt-1 text-slate-500">
                        Status: {" "}
                        <span
                          className={
                            client.active ? "text-green-600 font-semibold" : "text-red-500 font-semibold"
                          }
                        >
                          {client.active ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => toggleActiveStatus(client.id, client.active)}
                      className={`px-5 py-2 rounded-xl font-semibold shadow transition-all duration-200 text-white text-base focus:outline-none focus:ring-2 focus:ring-purp/30 focus:ring-offset-2 ${client.active ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                      {client.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminClientsPage;
