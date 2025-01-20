import { getUser } from "@/app/lib/api";
import "@/app/ui/globals.css";
import NavLinks from "@/app/ui/nav-links";
import { auth, signOut } from "@/auth";
import Image from "next/image"; // Importar o componente Image
import { SlLogout } from "react-icons/sl";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  const user = await getUser();

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-800 text-white p-4">
        <div className="flex flex-col items-center justify-center grid-cols-1 mb-4 space-y-2">
          <Image
            src="/capril_logo.jpeg"
            alt="Logo da Empresa"
            width={150}
            height={100}
          />
          <div className="flex space-x-2">
            <p>{user.email}</p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button>
                <SlLogout />
              </button>
            </form>
          </div>
        </div>
        <NavLinks />
      </aside>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
