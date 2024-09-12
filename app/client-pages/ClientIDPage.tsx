"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Wave from "@/components/Wave";


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
};

const ClientIDPage: React.FC<ClientPageProps> = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [isAssessmentDue, setIsAssessmentDue] = useState(false);
  const params = useParams();
  const { id } = params;
  const supabase = createClient();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data: clientData, error } = await supabase
          .from("clients") // Replace 'clients' with the actual table name
          .select(
            "first_name, last_name, phone, email, sobriety_date, zip_code, entries"
          ) // Select all fields or specify the fields you need
          .eq("id", id);

        if (error) {
          console.error("Error fetching clients:", error);
        } else {
          setClient(clientData[0] as Client);
        }
      } catch (error) {
        console.error("Unexpected error fetching client:", error);
      }
    };

    fetchClients();
  }, [id]);

  useEffect(() => {
    if (client?.entries === null) {
      setIsAssessmentDue(true);
    } else if (client?.entries && client?.entries[client.entries.length - 1]) {
      const lastEntryDate = new Date(client.entries[client.entries.length - 1]);
      const currentDate = new Date();
      // Calculate the difference in milliseconds
      const differenceInTime = currentDate.getTime() - lastEntryDate.getTime();

      // Convert to days
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      // Check if the difference is 7 days or more
      if (differenceInDays >= 7) {
        setIsAssessmentDue(true);
      } else {
        setIsAssessmentDue(false);
      }
    }
  }, [client?.entries]);

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove any non-digit characters
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Match and format the cleaned string
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    // Return the original if formatting is not possible
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
      <div className="absolute top-0 left-0 w-full text-center mt-8 z-10">
        <p className="text-4xl">
          {client.first_name} {client.last_name}
        </p>
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
            <p>{formatDate(client.entries[client.entries.length - 1].toString())}</p>{" "}
          </div>
        ) : (
          <p>No assessment recorded</p>
        )}
  
  <div className="flex justify-center items-center space-x-4 mt-4">
  <Link
    className="border border-white border-1 underline hover:font-bold rounded text-2xl text-center"
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
    ) : (
      <p>Loading...</p>
    )}
  </div>
  
  );
};

export default ClientIDPage;
