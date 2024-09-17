
import { createClient } from "@/utils/supabase/server";
import QuestionsComponent from "./Questions";
import NavBar from "@/components/NavBar";
import Wave from "@/components/Wave";

export default async function QuestionsPage() {
  const supabase = createClient();




  return (
    <>
     <NavBar/>
     <Wave/>
    <div className="flex-1 w-full flex flex-col gap-2 items-center mb-24 ">
     
      <p>Weekly Assessment</p>
      <QuestionsComponent />
    </div>
    </>
  );
}
