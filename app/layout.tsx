import { Inter } from "next/font/google";
import { SlLogout } from "react-icons/sl";
import "@/app/ui/globals.css";
const inter = Inter({ subsets: ["latin"] });
import NavLinks from "@/app/ui/nav-links";

export const metadata = {
  title: "Capril Finanças",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex">
          <aside className="w-64 h-screen bg-gray-800 text-white p-4">
            <div className="flex flex-col items-center justify-center grid-cols-1 mb-4 space-y-2">
              <img src="/capril_logo.jpeg" alt="Logo" className="h-20" />
              <div className="flex space-x-2">
                <p>Rômulo Capdeville</p>
                <button>
                  <SlLogout />
                </button>
              </div>
            </div>
            <NavLinks />
          </aside>
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

