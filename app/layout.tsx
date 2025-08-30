
import "./globals.css";
import Navbar from "../components/navbar_component";
import '@fortawesome/fontawesome-free/css/all.min.css';
import UiState from "@/components/stateMenage/UiState";
import { UiProvider } from "@/components/stateMenage/UiProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UiProvider>
         <div className="relative">
          <div className="absolute top-0 w-full z-10"> <Navbar  /> </div>
           {children}
             <UiState />
         </div>
         </UiProvider>
      </body>
    </html>
  );
}
