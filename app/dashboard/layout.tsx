"use client";

import { getCurrentUser } from "@/app/client/sdk.gen";
import { signOutAction } from "@/app/lib/actions";
import "@/app/ui/globals.css";
import NavLinks from "@/app/ui/nav-links";
import Image from "next/image"; // Importar o componente Image
import { useEffect, useState } from "react";
import { SlLogout } from "react-icons/sl";
import { UserPublic } from "../client";
import { client } from "../client/sdk.gen";
import { getToken } from "../lib/actions";

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  auth: () => getToken(),
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<UserPublic | null | undefined>(null);
  console.log(client.getConfig());

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getCurrentUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Not authenticated</div>;

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
              action={signOutAction}
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
