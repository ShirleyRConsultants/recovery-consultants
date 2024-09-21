import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientSignUp from "@/app/client-pages/ClientSignUp";
import NavBar from "@/components/NavBar";
import Wave from "@/components/Wave";

async function Upload() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return (
    <>
      <NavBar />

      <div className="  items-center ">
        <Wave />

        <ClientSignUp />
      </div>
    </>
  );
}

export default Upload;
