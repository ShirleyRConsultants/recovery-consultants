
import React from 'react';
import ClientIDPage from '@/app/client-pages/ClientIDPage';
import NavBar from '@/components/NavBar';

interface ClientPageProps {
  
}

const ClientPage: React.FC<ClientPageProps> = () => {
  return (
    <div>
      <NavBar/>
      <ClientIDPage/>
    </div>
  );
};

export default ClientPage;