import Header from "@/components/Header";
import NavBar from "@/components/NavBar";


export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-0 items-center">
         <NavBar/>

     
        <Header />
    
{/* 
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
      </footer> */}
    </div>
  );
}
