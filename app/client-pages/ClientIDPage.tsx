"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Wave from "@/components/Wave";
import { useAuth } from "@/components/Auth"; // Import useAuth to get profile

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
};

type CaseManager = {
  first_name: string;
  last_name: string;
};

const ClientIDPage: React.FC<ClientPageProps> = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [caseManager, setCaseManager] = useState<CaseManager | null>(null); // Store case manager details
  const [isAssessmentDue, setIsAssessmentDue] = useState(false);
  const params = useParams();
  const { id } = params;
  const { profile } = useAuth(); // Get profile from useAuth
  const supabase = createClient();




  useEffect(() => {
    const fetchClient = async () => {
      try {
        const { data: clientData, error } = await supabase
          .from("clients")
          .select(
            "id, first_name, last_name, phone, email, sobriety_date, zip_code, entries, case_manager"
          )
          .eq("id", id);

        if (error) {
          console.error("Error fetching clients:", error);
        } else if (clientData.length > 0) {
          setClient(clientData[0] as Client);

          // Fetch case manager if user is admin and client data exists
          if (profile?.type_of_user === "admin") {
            const { data: caseManagerData, error: caseManagerError } =
              await supabase
                .from("case_managers") // Replace with the correct table name for case managers
                .select("first_name, last_name")
                .eq("id", clientData[0].case_manager); // Match case_manager ID

            if (caseManagerError) {
              console.error("Error fetching case manager:", caseManagerError);
            } else if (caseManagerData.length > 0) {
              setCaseManager(caseManagerData[0] as CaseManager);
            }
          }
        }
      } catch (error) {
        console.error("Unexpected error fetching client:", error);
      }
    };

    fetchClient();
  }, [id, profile]);

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
  const capitalize = (name : string) => name.charAt(0).toUpperCase() + name.slice(1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  return (
    <div className="relative font- ">
      <div className="bg-mint py-20"></div>
      <Wave />

      {client ? (
        <div className="absolute top-0 left-0 w-full text-center z-10 mt-8 animate-fadeIn ">
         <div className="mx-auto mt-4 py-4 max-w-sm rounded-lg bg-gradient-to-r from-mint to-purp transition-transform duration-300 hover:scale-105 shadow-lg overflow-hidden border border-white">
            <h2 className="text-4xl text-white mb-4">
              {capitalize(client.first_name)} {capitalize(client.last_name)}
            </h2>

         

            <div className="text-white text-lg space-y-2 ml-6">
            {caseManager && (
                   <div className="flex ">
              <p className="text-xl text-white mb-2 ">
                C M: {capitalize(caseManager.first_name)} {capitalize(caseManager.last_name)}
              </p>
              </div>
            )}
              <div className="flex ">
                <span className=" mr-2">Email:</span>
                <a className="underline" href={`mailto:${client.email}`}>
                  {client.email}
                </a>
              </div>
              <div className="flex ">
                <span className="mr-2">Phone:</span>
                <span>{formatPhoneNumber(client.phone)}</span>
              </div>
              <div className="flex ">
                <span className=" mr-2">Sobriety Date:</span>
                <span>{formatDate(client.sobriety_date.toString())}</span>
              </div>
              <div className="flex ">
                <span className=" mr-2">Zip Code:</span>
                <span>{client.zip_code}</span>
              </div>

              {client.entries && client.entries.length > 0 ? (
                <div className="flex ">
                  <span className="mr-2">Last Assessment:</span>
                  <span>{formatDate(client.entries[client.entries.length - 1].toString())}</span>
                </div>
              ) : (
                <p className="text-sm text-red-400">No assessment recorded</p>
              )}
            </div>

            <div className="flex justify-center items-center space-x-4 mt-6">
              <Link href={`/clients/progress/${id}`}>
                <p className="border border-white px-4 py-2 rounded-lg text-xl text-white hover:bg-blue-500 transition-colors">
                  Progress
                </p>
              </Link>
              {isAssessmentDue ? (
                <Link href={`/questions/${id}`}>
                  <p className="border border-white px-4 py-2 rounded-lg text-xl text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                    Assessment Due!
                  </p>
                </Link>
              ) : (
                <p className="text-lg text-green-300 font-semibold">No Assessment due!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-white mt-8">Loading...</p>
      )}
    </div>
  );
}

export default ClientIDPage;
