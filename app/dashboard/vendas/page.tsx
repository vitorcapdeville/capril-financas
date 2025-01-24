"use client";

import { readVendas } from "@/app/client";
import ItemList from "@/app/ui/item-list";

export default function Vendas() {
    const pageSize = 5;

    return (
        <div>
            <ItemList
                readItemsFunction={readVendas}
                pageSize={pageSize}
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
