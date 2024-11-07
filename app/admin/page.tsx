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
            <div>
                <Link href={"/admin/signup"}>Case Manager Sign Up</Link>
                <Link href={"/admin/clients"}>Manage Clients</Link>
            </div>
        </div>
    );
};

export default AdminHome;