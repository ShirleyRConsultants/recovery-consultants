"use client";

import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function ClientsPage() {
  const { profile, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (profile?.type_of_user === "client") {
      router.push("/");
    }
  }, [profile, session]);

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-sm z-0" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
          <div className="w-full max-w-4xl mx-auto p-10 rounded-3xl shadow-xl bg-white/90 backdrop-blur-sm border border-slate-200">
            <h2 className="text-center text-4xl font-extrabold text-slate-800 mb-8 tracking-tight">
              Client Management
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-lg">
              {profile?.type_of_user === "case_manager" && (
                <>
                  <Link 
                    href="/clients/myclients" 
                    className="w-full md:w-auto px-8 py-4 bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white rounded-xl font-bold text-lg shadow-lg text-center"
                  >
                    View My Clients
                  </Link>
                  <Link 
                    href="/clients/upload" 
                    className="w-full md:w-auto px-8 py-4 bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white rounded-xl font-bold text-lg shadow-lg text-center"
                  >
                    Add New Client
                  </Link>
                </>
              )}
              {profile?.type_of_user === "admin" && (
                <Link 
                  href="/all-clients" 
                  className="w-full md:w-auto px-8 py-4 bg-purp hover:bg-purp/90 active:bg-purp/80 transition-all text-white rounded-xl font-bold text-lg shadow-lg text-center"
                >
                  View All Clients
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
