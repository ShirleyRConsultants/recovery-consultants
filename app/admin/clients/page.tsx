"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import NavBar from "@/components/NavBar";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  active: boolean;
}

const AdminClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

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
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Client List
        </h1>
        {loading ? (
          <p className="text-center text-white">Loading clients...</p>
        ) : (
          <ul className="space-y-4">
            {clients.map((client) => (
              <li
                key={client.id}
                className="rounded-lg bg-gradient-to-r from-mint to-purp shadow-lg transition-transform duration-300  p-4 border border-white text-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">
                      {`${capitalize(client.first_name)} ${capitalize(client.last_name)}`}
                    </h2>
                    <p className="text-sm mt-1">
                      Status:{" "}
                      <span
                        className={
                          client.active ? "text-green-300" : "text-red-400"
                        }
                      >
                        {client.active ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => toggleActiveStatus(client.id, client.active)}
                    className={`px-3 py-1 rounded ${
                      client.active
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {client.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AdminClientsPage;
