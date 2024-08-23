import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import Questions from "./Questions";
import { useRouter } from 'next/router'

export default async function QuestionsPage() {
  const supabase = createClient();
  const router = useRouter()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const clientId = router.query.id
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <NavBar />
      </div>

      <p>Questions</p>
      <Questions />
    </div>
  );
}
