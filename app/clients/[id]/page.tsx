"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

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

const ClientPage: React.FC<ClientPageProps> = () => {
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
    if (client?.entries === null){
      setIsAssessmentDue(true)
    }
    else if (client?.entries && client?.entries[client.entries.length - 1]) {
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

  return (
    <div>
      {client ? (
        <div className="mt-24">
          <h1>
            {client.first_name} {client.last_name}
          </h1>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone}</p>
          {client.entries && client.entries.length > 0  ? 
             <p>
             Last Entry: {client.entries[client.entries.length - 1].toString()}
           </p>
          :<p>No assessment recorded</p>}
       
          <p>Sobriety Date: {client.sobriety_date.toString()}</p>
          <p>Zip Code: {client.zip_code}</p>
          {isAssessmentDue ? (
            <Link
              className="underline  text-red-500"
              href={`/questions/${id}`}
            >
              {" "}
              Assessment Due!{" "}
            </Link>
          ) : (
            <p>No Assessment due!</p>
          )}
          <Link className="underline text-center" href={`/clients/progress/${id}`}>
            Progress
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClientPage;
