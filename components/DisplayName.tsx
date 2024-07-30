"use client"

import React from 'react';
import { useAuth } from './Auth';
import Link from 'next/link';
interface DisplayNameProps {
    
}

const DisplayName: React.FC<DisplayNameProps> = () => {
    const {profile} = useAuth()
    if (!profile){
        return null
    }
    
    return (
        <div className='flex'>
            {profile.type_of_user == "admin" &&
            <>
             <Link  className='mx- hover:underline' href="/admin">Admin</Link>
            </>}
            <Link  className='mx-4 hover:underline' href="/clients">Clients</Link>
            <p>{profile?.first_name}</p>
        </div>
    )
};

export default DisplayName;