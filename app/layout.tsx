import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/Auth";
import NavBar from "@/components/NavBar";
import BackButton from "@/components/BackButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Recovery Consultants Admin",
  description: "Client Management System",
};
const montserrat = Montserrat({
  subsets: ["latin"],
  // variable: "--font-mont",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>

      <body className="bg-background text-foreground">
      <AuthProvider>
          <BackButton/>
        <main className="min-h-screen flex flex-col items-center">
        
          {children}
        </main>
        </AuthProvider>
      </body>
    
    </html>
  );
}
