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
      <div className="">
        <div className=" ">
          <div className=" py-12 bg-mint text-white">
            <main className="text-center">
              <h2 className="font- text-4xl mb-4 mt-">Clients</h2>
              <div className="flex flex-1 justify-center items-center space-x-4">
                <Link className="no-underline" href="/clients/myclients">
                  My Clients
                </Link>
                <Link className="no-underline" href="/clients/upload">
                  Add New
                </Link>
              </div>
            </main>
          </div>
        </div>
        <Wave className="relative" />
      </div>
    </>
  );
}
