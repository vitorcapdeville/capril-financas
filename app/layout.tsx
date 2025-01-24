import "@/app/ui/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { client } from "@/app/client/sdk.gen";
import { getToken } from "@/app/lib/actions";
export const metadata = {
  title: "Capril Finanças",
};

client.setConfig({
  baseUrl: process.env.BACKEND_URL_SERVER,
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
