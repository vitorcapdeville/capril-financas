"use client";

import { useEffect, useState } from "react";
import { buscarVendas, Venda } from "@/app/lib/api";
import ItemList from "@/app/ui/item-list";

export default function Vendas() {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchVendas = async () => {
            const results = await buscarVendas();
            setVendas(results);
        };
        fetchVendas();
    }, []);

    const filteredVendas = vendas.filter((venda) =>
        venda.id == Number(query) || query == ""
    );

    return (
        <div>
            <ItemList
                setQueryFunction={setQuery}
                queryValue={query}
                items={filteredVendas}
                mainProperty="id"
                subProperties={[{
                    key: "data_venda",
                    callback: (item: string) =>
                        new Date(item).toLocaleDateString("pt-BR"),
                }]}
                routeName="vendas"
            />
        </div>
    );
}
