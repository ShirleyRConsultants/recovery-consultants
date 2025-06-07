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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Case Manager List
          </h1>
          {pageLoading ? (
            <p className="text-center text-slate-500">Loading Case Managers...</p>
          ) : (
            <ul className="space-y-6">
              {casemanagers.map((caseManager) => (
                <li
                  key={caseManager.id}
                  className="rounded-2xl bg-white/90 shadow-xl border border-slate-200 p-6 transition-transform duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        {`${capitalize(caseManager.first_name)} ${capitalize(caseManager.last_name)}`}
                      </h2>
                      <p className="text-slate-500">{caseManager.email}</p>
                      <p className="text-slate-500">{caseManager.phone}</p>
                    </div>
                    <button
                      onClick={() => deleteCaseManager(caseManager.auth_id)}
                      className="px-5 py-2 rounded-xl font-semibold shadow transition-all duration-200 text-white text-base bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-purp/30 focus:ring-offset-2"
                    >
                      Delete
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

export default AdminCaseManagerPage;
