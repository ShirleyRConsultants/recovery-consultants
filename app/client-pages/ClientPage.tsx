"use client";

import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Wave from "@/components/Wave";

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
      <div className="relative min-h-screen">
        <div className="bg-mint text-white py-12">
          <main className="text-center">
            <h2 className="text-4xl font-semibold mb-6">Clients</h2>
            <div className="flex justify-center items-center space-x-6 text-lg font-medium">
              {profile?.type_of_user === "case_manager" && (
                <>
                  <Link href="/clients/myclients" className="hover:text-blue-300 transition-colors duration-200">
                    My Clients
                  </Link>
                  <Link href="/clients/upload" className="hover:text-blue-300 transition-colors duration-200">
                    Add New
                  </Link>
                </>
              )}
              {profile?.type_of_user === "admin" && (
                <Link href="/all-clients" className="hover:text-purp transition-colors duration-200">
                  All Clients
                </Link>
              )}
            </div>
          </main>
        </div>
        <Wave className="absolute bottom-0 w-full" />
      </div>
    </>
  );
}
