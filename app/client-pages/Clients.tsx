"use client"
import React from 'react';
import { createClient } from '@/utils/supabase/client';

interface ClientsProps {
    
}

const Clients: React.FC<ClientsProps> = () => {

    const supabase = createClient()

    const handleNew = () =>{

    }

    return (
        <div className=''>
            <button className="hover:underline " onClick={handleNew}>Add New</button>
        </div>
    );
};

export default Clients;