"use client";

import { useEffect, useState } from "react";
import { buscarProdutos } from "@/app/lib/api";
import { Produto } from "../../lib/definitions";
import ItemList from "@/app/ui/item-list";

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchProdutos = async () => {
            const results = await buscarProdutos(query);
            setProdutos(results);
        };
        fetchProdutos();
    }, [query]);

    return (
        <div>
            <ItemList
                setQueryFunction={setQuery}
                queryValue={query}
                items={produtos}
                mainProperty="nome"
                subProperties={[{
                    key: "peso_em_gramas",
                    callback: (item: string) => item + "g",
                }]}
                routeName="produtos"
            />
        </div>
    );
}
