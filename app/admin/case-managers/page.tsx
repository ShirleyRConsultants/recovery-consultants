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
 
}

const AdminCaseManagerPage: React.FC = () => {
  const [casemanagers, setCaseManagers] = useState<CaseManager[]>([]);
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
    fetchCaseManagers();
  }, []);

  const fetchCaseManagers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("case_managers")
      .select("*")
      // .order("active", { ascending: false }); // Sorts by active status

    if (error) {
      console.error("Error fetching clients:", error);
    } else {
      setCaseManagers(data as CaseManager[]);
    }
    setLoading(false);
  };

  // const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
  //   const { error } = await supabase
  //     .from("clients")
  //     .update({ active: !currentStatus })
  //     .eq("id", id);

  //   if (error) {
  //     console.error("Error updating client status:", error);
  //   } else {
  //     setCaseManagers((preCaseManagers) =>
  //       preCaseManagers.map((caseManager) =>
  //         caseManager.id === id ? { ...caseManager, active: !currentStatus } : caseManager
  //       )
  //     );
  //   }
  // };

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
                className="rounded-lg bg-gradient-to-r from-mint to-purp shadow-lg transition-transform duration-300  p-4 border border-white text-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">
                      {`${capitalize(caseManager.first_name)} ${capitalize(caseManager.last_name)}`}
                    </h2>
                    <p>{caseManager.email}</p>
                    <p>{caseManager.phone}</p>
                    {/* <p className="text-sm mt-1">
                      Status:{" "}
                      <span
                        className={
                          caseManager.active ? "text-green-300" : "text-red-400"
                        }
                      >
                        {caseManager.active ? "Active" : "Inactive"}
                      </span>
                    </p> */}
                  </div>
                  {/* <button
                    onClick={() => toggleActiveStatus(caseManager.id, caseManager.active)}
                    className={`px-3 py-1 rounded ${
                      client.active
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {client.active ? "Deactivate" : "Activate"}
                  </button> */}
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
