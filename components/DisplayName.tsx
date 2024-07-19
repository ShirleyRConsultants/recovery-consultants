"use client"

import React from 'react';
import { useAuth } from './Auth';
interface DisplayNameProps {
    
}

const DisplayName: React.FC<DisplayNameProps> = () => {
    const {profile} = useAuth()
    return (
        <div>
            <p>{profile?.first_name}</p>
        </div>
    );
};

export default DisplayName;