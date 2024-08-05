import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";


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
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="w-full">
          <NavBar />
        </div>

        <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
          <main className="flex-1 flex flex-col gap-6 text-center">
            <h2 className="font- text-4xl mb-4">Clients</h2>

          </main>
        </div>

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Built by{" "}
            <a
              href="https://www.jordonmarchesano.com"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Jordon Marchesano
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
