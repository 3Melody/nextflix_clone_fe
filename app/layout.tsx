
import "./globals.css";
import Navbar from "../components/navbar_component";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
         <div className="relative">
          <div className="absolute top-0 w-full z-10"> <Navbar  /> </div>
           {children}
         </div>
      </body>
    </html>
  );
}
