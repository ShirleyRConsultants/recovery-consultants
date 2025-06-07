"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useAuth } from "@/components/Auth";
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';

interface ClientPageProps {}

type Client = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  sobriety_date: Date;
  zip_code: string;
  entries: Date[];
  case_manager: number;
  active: boolean;
  auth_id: string;
};

type CaseManager = {
  id: number;
  first_name: string;
  last_name: string;
  auth_id: string;
};

const ClientIDPage: React.FC<ClientPageProps> = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [caseManager, setCaseManager] = useState<CaseManager | null>(null);
  const [isAssessmentDue, setIsAssessmentDue] = useState(false);
  const params = useParams();
  const { id } = params;
  const { profile, session } = useAuth();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (!profile || (profile.type_of_user !== "client" && profile.type_of_user !== "admin" && profile.type_of_user !== "case_manager")) {
      router.push("/");
    }
  }, [profile, router]);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const { data: clientData, error } = await supabase
          .from("clients")
          .select(
            "id, first_name, last_name, phone, email, sobriety_date, zip_code, entries, case_manager, active, auth_id"
          )
          .eq("id", id);

        if (error) {
          console.error("Error fetching clients:", error);
          router.push("/");
          return;
        }

        if (clientData.length === 0) {
          router.push("/");
          return;
        }

        const client = clientData[0] as Client;

        // Check if user has permission to view this client
        if (profile?.type_of_user === "client") {
          // Clients can only view their own data
          if (client.auth_id !== session?.user.id) {
            router.push("/");
            return;
          }
        } else if (profile?.type_of_user === "case_manager") {
          // Case managers can only view their assigned clients
          const { data: caseManagerData, error: caseManagerError } = await supabase
            .from("case_managers")
            .select("id, first_name, last_name, auth_id")
            .eq("auth_id", session?.user.id)
            .single();

          if (caseManagerError || !caseManagerData) {
            router.push("/");
            return;
          }

          if (caseManagerData.id !== client.case_manager) {
            router.push("/");
            return;
          }

          setCaseManager(caseManagerData);
        } else if (profile?.type_of_user === "admin") {
          // Admins can view any client
          const { data: caseManagerData, error: caseManagerError } = await supabase
            .from("case_managers")
            .select("id, first_name, last_name, auth_id")
            .eq("id", client.case_manager)
            .single();

          if (!caseManagerError && caseManagerData) {
            setCaseManager(caseManagerData);
          }
        }

        setClient(client);
      } catch (error) {
        console.error("Unexpected error fetching client:", error);
        router.push("/");
      }
    };

    if (session) {
      fetchClient();
    }
  }, [id, profile, session, router]);

  useEffect(() => {
    if (client?.entries === null) {
      setIsAssessmentDue(true);
    } else if (client?.entries && client?.entries[client.entries.length - 1]) {
      const lastEntryDate = new Date(client.entries[client.entries.length - 1]);
      const currentDate = new Date();
      const differenceInTime = currentDate.getTime() - lastEntryDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays >= 7) {
        setIsAssessmentDue(true);
      } else {
        setIsAssessmentDue(false);
      }
    }
  }, [client?.entries]);

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Client Dashboard</h1>
            {profile?.type_of_user === "admin" && (
              <Link 
                href="/all-clients"
                className="px-4 py-2 bg-purp text-white rounded-lg hover:bg-purp/90 active:bg-purp/80 transition-colors"
              >
                Back to Clients
              </Link>
            )}
          </div>

          {client ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  {capitalize(client.first_name)} {capitalize(client.last_name)}
                </h2>
                {caseManager && (
                  <p className="text-lg text-slate-600">
                    Case Manager: {capitalize(caseManager.first_name)} {capitalize(caseManager.last_name)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-slate-600 w-32">Email:</span>
                    <a className="text-purp hover:text-purp/80" href={`mailto:${client.email}`}>
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-32">Phone:</span>
                    <span>{formatPhoneNumber(client.phone)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-32">Sobriety Date:</span>
                    <span>{formatDate(client.sobriety_date.toString())}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-32">Zip Code:</span>
                    <span>{client.zip_code}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-32">Status:</span>
                    <span className={client.active ? "text-green-600" : "text-red-600"}>
                      {client.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {client.entries && client.entries.length > 0 ? (
                    <div className="flex items-center">
                      <span className="text-slate-600 w-32">Last Assessment:</span>
                      <span>{formatDate(client.entries[client.entries.length - 1].toString())}</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-slate-600 w-32">Last Assessment:</span>
                      <span className="text-red-600">No assessment recorded</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center space-x-4">
                <Link 
                  href={`/clients/progress/${id}`}
                  className="px-6 py-3 bg-purp text-white rounded-lg hover:bg-purp/90 active:bg-purp/80 transition-colors"
                >
                  View Progress
                </Link>
                {isAssessmentDue && client?.active && (
                  <Link 
                    href={`/questions/${id}`}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors"
                  >
                    Assessment Due!
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ClientIDPage;
