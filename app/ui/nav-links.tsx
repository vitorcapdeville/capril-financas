"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SlBasket,
    SlBriefcase,
    SlHome,
    SlPresent,
    SlUser,
    SlWallet,
} from "react-icons/sl";

const links = [
    { name: "Home", href: "/", icon: SlHome },
    {
        name: "Fornecedores",
        href: "/fornecedores",
        icon: SlBriefcase,
    },
    { name: "Clientes", href: "/clientes", icon: SlUser },
    { name: "Produtos", href: "/produtos", icon: SlPresent },
    { name: "Vendas", href: "/vendas", icon: SlWallet },
    { name: "Compras", href: "/compras", icon: SlBasket },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex grow gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-100 hover:text-black ",
                            {
                                "bg-gray-100 text-black":
                                    pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
