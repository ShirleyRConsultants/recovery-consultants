
import { createClient } from "@/utils/supabase/server";
import QuestionsComponent from "./Questions";

export default async function QuestionsPage() {
  const supabase = createClient();




  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center mt-10">
      <p>Questions</p>
      <QuestionsComponent />
    </div>
  );
}
