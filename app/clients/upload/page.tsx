
import React from 'react';
import ClientSignUp from '@/app/client-pages/ClientSignUp';
import NavBar from '@/components/NavBar';


interface UploadProps {
    
}


const Upload: React.FC<UploadProps> = () => {

    return (
        <>
        <NavBar/>
        <div className="flex-1 w-full flex flex-col gap-20 items-center mb-48">
        <main className="flex-1 flex flex-col gap-6 text-center">
            <h2 className="font- text-4xl mb-4">Client Upload</h2>
            <ClientSignUp />
          </main>
        </div>
        </>
    );
};

export default Upload;