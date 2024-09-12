import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import Wave from "@/components/Wave";

export default async function ClientsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
    {/* <NavBar/> */}
      <div className="">
    <div className=" ">
        <div className=" py-12 bg-mint">
          <main className="text-center">
            <h2 className="font- text-4xl mb-4 mt-">Clients</h2>
            <div className="">
              <div>
                <Link className="m-4" href="/clients/myclients">My Clients</Link>
              </div>
              <div>
                <Link className="m-4" href="/clients/upload">Add New</Link>
              </div>
            </div>
          </main>
          </div>
        </div>
        <Wave className="relative"/>


      </div>
    </>
  );
}

