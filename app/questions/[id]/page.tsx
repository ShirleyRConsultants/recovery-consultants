
import { createClient } from "@/utils/supabase/server";
import QuestionsComponent from "./Questions";
import NavBar from "@/components/NavBar";
import { redirect } from "next/navigation";
import Wave from "@/components/Wave";

export default async function QuestionsPage() {
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
     {/* <Wave className="h-20"/> */}
    <div className="flex-1 w-full flex flex-col gap-2 items-center mb-24 mt-2 lg:mt-20 xl:mt-24 ">
     
      <QuestionsComponent />
    </div>
    </>
  );
}
