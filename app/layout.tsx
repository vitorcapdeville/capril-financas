import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
            <nav>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/fornecedores">Fornecedores</Link></li>
                <li><Link href="/clientes">Clientes</Link></li>
                <li><Link href="/produtos">Produtos</Link></li>
                <li><Link href="/categorias">Categorias</Link></li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
