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
      if (!loading && profile && profile?.type_of_user !== "admin") {
        router.push("/");
      }
      if (!session) {
        router.push("/")
      }
    }, [profile, loading]);


    return (
        <div>
            <NavBar/>
            <Wave/>
            <div className="flex justify-center items-center space-x-6 text-lg font-medium">
                <Link className="hover:text-blue-300 transition-colors duration-200" href={"/admin/signup"}>Case Manager Sign Up</Link>
                <Link className="hover:text-blue-300 transition-colors duration-200" href={"/admin/case-managers"}>Manage Case Managers</Link>
                <Link className="hover:text-blue-300 transition-colors duration-200" href={"/admin/clients"}>Manage Clients</Link>
            </div>
        </div>
    );
};

export default AdminHome;