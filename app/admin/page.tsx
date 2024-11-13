"use client"
import React, { use } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Wave from '@/components/Wave';
import { useAuth } from '@/components/Auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
interface AdminHomeProps {
    
}

const AdminHome: React.FC<AdminHomeProps> = () => {

    const { profile, session, loading } = useAuth();
    const router = useRouter();
    
    
    useEffect(() => {
      if (loading && profile?.type_of_user !== "admin") {
        router.push("/");
      }
      if (loading && session) {
        router.push("/")
      }
    }, [profile, loading]);


    return (
        <div>
            <NavBar/>
            <Wave/>
            <div className="flex justify-center items-center space-x-4 mx-auto text-lg font-medium text-center">
    <Link
        className="w-48 h-16 px-4 py-2  bg-purp text-white rounded-md hover:bg-mint transition-colors duration-200 flex justify-center items-center"
        href="/admin/signup"
    >
        CM Register
    </Link>
    <Link
        className="w-48 h-16 px-4 py-2 bg-purp text-white rounded-md hover:bg-mint transition-colors duration-200 flex justify-center items-center"
        href="/admin/case-managers"
    >
        CM Dashboard
    </Link>
    <Link
        className="w-48 h-16 px-4 py-2 bg-purp text-white rounded-md hover:bg-mint transition-colors duration-200 flex justify-center items-center"
        href="/admin/clients"
    >
        Client Dashboard
    </Link>
</div>



        </div>
    );
};

export default AdminHome;