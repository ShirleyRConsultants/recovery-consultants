import React from 'react';
import MyClients from '@/app/client-pages/MyClients';
import NavBar from '@/components/NavBar';
import Wave from '@/components/Wave';
interface myClientsPageProps {
  
}

const myClientsPage: React.FC<myClientsPageProps> = () => {
  return (
    <div>
      <NavBar/>
      <div className='bg-mint h-48'>
      <MyClients/>
      </div>
      <Wave/>
 
    </div>
  );
};

export default myClientsPage;