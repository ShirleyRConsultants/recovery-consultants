
import { createClient } from "@/utils/supabase/server";
import QuestionsComponent from "./Questions";
import NavBar from "@/components/NavBar";
import { redirect } from "next/navigation";

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
     {/* <Wave className="mb"/> */}
    <div className="flex-1 w-full flex flex-col gap-2 items-center mb-24 mt-2 xl:mt-16 ">
     
      <QuestionsComponent />
    </div>
    </>
  );
}
