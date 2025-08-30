import "./globals.css";
import Navbar from "../components/navbar_component";
import '@fortawesome/fontawesome-free/css/all.min.css';
import UiState from "@/components/stateMenage/UiState";
import { UiProvider } from "@/components/stateMenage/UiProvider";
import I18nProvider from "@/components/I18nProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Netflix Clone 101",
  description: "This My Project Netflix Clone",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
         <I18nProvider>
           <UiProvider>
             <div className="relative">
               <div className="absolute top-0 w-full z-10">
                 <Navbar /> {/* Navbar เป็น Client Component เรียก useTranslation() */}
               </div>
               {children}
               <UiState />
             </div>
           </UiProvider>
         </I18nProvider>
      </body>
    </html>
  );
}
