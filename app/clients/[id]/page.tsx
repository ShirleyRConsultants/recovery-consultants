import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientIDPage from "@/app/client-pages/ClientIDPage";
import NavBar from "@/components/NavBar";



async function ClientPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return (
    <div>
      <NavBar />
      <ClientIDPage />
    </div>
  );
}

export default ClientPage;
