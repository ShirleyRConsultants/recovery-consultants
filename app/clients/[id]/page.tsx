"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import ClientIDPage from "@/app/client-pages/ClientIDPage";
import NavBar from "@/components/NavBar";

export default function ClientPage() {
  const { profile, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <ClientIDPage />
    </div>
  );
}
