"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Auth";

interface CaseManager {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  auth_id: string;
}

const AdminCaseManagerPage: React.FC = () => {
  const [casemanagers, setCaseManagers] = useState<CaseManager[]>([]);
  const [pageLoading, setLoading] = useState(false);

  const { profile, session, loading } = useAuth();
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    if (loading && profile?.type_of_user !== "admin") {
      router.push("/");
    }
    if (loading && session) {
      router.push("/")
    }
  }, [profile]);

  useEffect(() => {
    fetchCaseManagers();
  }, []);

  const fetchCaseManagers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("case_managers")
      .select("*");

    if (error) {
      console.error("Error fetching case managers:", error);
    } else {
      setCaseManagers(data as CaseManager[]);
    }
    setLoading(false);
  };

  const deleteCaseManager = async (auth_id: string) => {
    try {
      const response = await fetch(`/admin/api/authDelete?id=${auth_id}`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        console.error("Error deleting case manager:", response.statusText);
        return;
      }
  
      // Filter out the deleted case manager from the local state
      setCaseManagers((prevManagers) =>
        prevManagers.filter((manager) => manager.auth_id !== auth_id)
      );
    } catch (error) {
      console.error("Error in deleteCaseManager:", error);
    }
  };
  

  const capitalize = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <>
      <NavBar />
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Case Manager List
        </h1>
        {pageLoading ? (
          <p className="text-center text-white">Loading Case Managers...</p>
        ) : (
          <ul className="space-y-4">
            {casemanagers.map((caseManager) => (
              <li
                key={caseManager.id}
                className="rounded-lg bg-gradient-to-r from-mint to-purp shadow-lg transition-transform duration-300 p-4 border border-white text-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">
                      {`${capitalize(caseManager.first_name)} ${capitalize(caseManager.last_name)}`}
                    </h2>
                    <p>{caseManager.email}</p>
                    <p>{caseManager.phone}</p>
                  </div>
                  <button
                    onClick={() => deleteCaseManager(caseManager.auth_id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
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

export default AdminCaseManagerPage;
