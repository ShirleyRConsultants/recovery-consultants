"use client"
import React from 'react';
import Link from 'next/link';
import Wave from '@/components/Wave';
import { useAuth } from '@/components/Auth';
import NavBar from '@/components/NavBar';

interface SettingsProps {
    
}

const Settings: React.FC<SettingsProps> = () => {
    const {profile} = useAuth()

    return (
        <div className='text-center text-white'>
            <NavBar/>
            <div className='bg-mint'>
           <p className='text-2xl py-10'>Hello {profile?.first_name}!</p>
            <Link className='hover:font-bold'  href="/password-reset">Password Reset</Link>
            </div>
            <Wave/>
        </div>
    );
};

export default Settings;