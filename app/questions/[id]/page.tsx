
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";

import NavBar from "@/components/NavBar";
import QuestionsComponent from "./Questions";

export default async function QuestionsPage() {
  const supabase = createClient();




  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <NavBar />
      </div>

      <p>Questions</p>
      <QuestionsComponent />
    </div>
  );
}
