"use client"
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/Auth';

interface SettingsProps {
    
}

const Settings: React.FC<SettingsProps> = () => {
    const {profile} = useAuth()

    return (
        <div className='text-center'>
           <p className='text-2xl'> {profile?.first_name}</p>
            Settings page 
            <Link href="/password-reset">Password Reset</Link>
        </div>
    );
};

export default Settings;