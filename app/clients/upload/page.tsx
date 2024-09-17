
import React from 'react';
import ClientSignUp from '@/app/client-pages/ClientSignUp';
import NavBar from '@/components/NavBar';
import Wave from '@/components/Wave';


interface UploadProps {
    
}


const Upload: React.FC<UploadProps> = () => {

    return (
        <>
        <NavBar/>
       
        <div className="flex-1 w-full flex flex-col  items-center mb-48">

        <Wave/>
            <h2 className="bg-mint rounded-2xl text-2xl lg:text-4xl mb-4 absolute text-white">Client Upload</h2>
            <ClientSignUp />
     
        </div>
        </>
    );
};

export default Upload;