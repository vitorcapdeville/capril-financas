import { client } from "@/app/clientConfig";
import "@/app/ui/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Capril Finanças",
};

// Adicioanr lag nas requests para testar comportamento do app
client.interceptors.request.use(async (request) => {
  console.log("sleeping...");
  await new Promise((r) => setTimeout(r, 500));
  return request;
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
