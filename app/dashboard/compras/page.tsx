"use client";

import { buscarCompras } from "@/app/lib/api";
import { Compra } from "../../lib/definitions";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";

export default function Compras() {
    const [compras, setCompras] = useState<Compra[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchCompras = async () => {
            const results = await buscarCompras();
            setCompras(results);
        };
        fetchCompras();
    }, []);

    const filteredCompras = compras.filter((compra) => {
        return compra.categoria.toLowerCase().includes(query.toLowerCase()) ||
            query == "";
    });

    return (
        <div>
            <ItemList
                setQueryFunction={setQuery}
                queryValue={query}
                items={filteredCompras}
                mainProperty="categoria"
                subProperties={[{
                    key: "data_compra",
                    callback: (item: string) =>
                        new Date(item).toLocaleDateString("pt-BR"),
                }, {
                    key: "valor",
                    callback: (item: number) => `R$ ${item.toFixed(2)}`,
                }]}
                routeName="compras"
            />
        </div>
    );
}
