import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import ClientsPage from "../client-pages/ClientPage";

export default async function Clients() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
    <NavBar/>
     <ClientsPage/>

      
     
    </>
  );
}
