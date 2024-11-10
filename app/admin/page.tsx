import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Wave from '@/components/Wave';
interface AdminHomeProps {
    
}

const AdminHome: React.FC<AdminHomeProps> = () => {
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