
import { createClient } from "@/utils/supabase/server";
import QuestionsComponent from "./Questions";
import NavBar from "@/components/NavBar";
import Wave from "@/components/Wave";

export default async function QuestionsPage() {
  const supabase = createClient();




  return (
    <>
     <NavBar/>
     <Wave className="h-16"/>
    <div className="flex-1 w-full flex flex-col gap-2 items-center mb-24 mt-2 xl:mt-16 ">
     
      <QuestionsComponent />
    </div>
    </>
  );
}
