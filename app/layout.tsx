import { client } from "@/app/client/sdk.gen";
import { getToken } from "@/app/lib/actions";
import "@/app/ui/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Capril Finanças",
};

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  auth: () => getToken(),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
