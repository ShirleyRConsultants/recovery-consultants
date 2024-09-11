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

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Built by{" "}
            <a
              href="https://www.jordonmarchesano.com"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Jordon Marchesano
            </a>
          </p>
        </footer>
     
    </>
  );
}
