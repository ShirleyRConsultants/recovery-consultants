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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  return (
    <div className="relative">
      <div className="bg-mint py-20"></div>
      <Wave />

      {client ? (
        <div className="absolute top-0 left-0 w-full text-center mt-8  z-10 text-white">
          <div className="bg-mint w-5/6 mt-4 md:w-1/2 lg:w-1/3 border rounded-lg border-white mx-auto p-2">
            <p className="text-4xl text-white">
              {client.first_name.charAt(0).toUpperCase() +
                client.first_name.slice(1)}{" "}
              {client.last_name.charAt(0).toUpperCase() +
                client.last_name.slice(1)}
            </p>

            {caseManager && (
              <p className="text-xl text-white font-bold mt-2">
                Case Manager: {caseManager.first_name} {caseManager.last_name}
              </p>
            )}

            <div className="flex flex-1 justify-center">
              <p className="font-bold mr-1">Email:</p>
              <a className="underline" href={`mailto:${client.email}`}>
                {client.email}
              </a>
            </div>
            <div className="flex flex-1 justify-center">
              <p className="font-bold mr-1">Phone:</p>
              <p>{formatPhoneNumber(client.phone)}</p>
            </div>
            <div className="flex flex-1 justify-center">
              <p className="font-bold mr-1">Sobriety Date:</p>
              <p>{formatDate(client.sobriety_date.toString())}</p>
            </div>
            <div className="flex flex-1 justify-center">
              <p className="font-bold mr-1">Zip Code:</p>
              <p> {client.zip_code}</p>
            </div>

            {client.entries && client.entries.length > 0 ? (
              <div className="flex flex-1 justify-center">
                <p className="font-bold mr-1">Last Assessment: </p>
                <p>
                  {formatDate(
                    client.entries[client.entries.length - 1].toString()
                  )}
                </p>
              </div>
            ) : (
              <p>No assessment recorded</p>
            )}

            <div className="flex justify-center items-center space-x-4 mt-4">
              <Link
                className="border border-white border-1  hover:font-bold rounded text-2xl text-center"
                href={`/clients/progress/${id}`}
              >
                Progress
              </Link>
              {isAssessmentDue ? (
                <Link
                  className="border border-white border-1 rounded text-2xl text-red-500"
                  href={`/questions/${id}`}
                >
                  {" "}
                  Assessment Due!{" "}
                </Link>
              ) : (
                <p className="text-blue-500">No Assessment due!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ClientIDPage;
