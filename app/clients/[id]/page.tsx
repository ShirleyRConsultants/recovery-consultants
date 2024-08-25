'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState} from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

interface ClientPageProps {
    
}

type Client = {
    id: string,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    sobriety_date: Date,
    zip_code: string
}


const ClientPage: React.FC<ClientPageProps> = () => {
    const [client, setClient] = useState<Client | null>(null)
    const params = useParams();
    const { id } = params;
    const supabase = createClient()


    useEffect(() => {
        const fetchClients = async () => {
          try {
          
              const { data: clientData, error } = await supabase
                .from("clients") // Replace 'clients' with the actual table name
                .select("first_name, last_name, phone, email, sobriety_date, zip_code") // Select all fields or specify the fields you need
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



    return (
        <div>
            {client ? (
                <div>
                    <h1>{client.first_name} {client.last_name}</h1>
                    <p>Email: {client.email}</p>
                    <p>Phone: {client.phone}</p>
                    <p>Sobriety Date: {client.sobriety_date.toString()}</p>
                    <p>Zip Code: {client.zip_code}</p>
                    <Link className='underline mx-2' href={`/questions/${id}`}>Assessment</Link>
                    <Link className='underline mx-2' href={`/clients/progress/${id}`}>Progress</Link>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ClientPage;