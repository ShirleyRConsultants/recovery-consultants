import { Montserrat } from "next/font/google";
import "./globals.css";
import "ag-grid-community/styles/ag-grid.css"; // AG Grid Structural Styles
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AuthProvider } from "@/components/Auth";
import BackButton from "@/components/BackButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Recovery Consultants",
  description: "Client Progress Tracker",
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
      <body className="bg-white text-black">
        <AuthProvider>
          <main className="min-h-screen items-center">
            <BackButton />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
