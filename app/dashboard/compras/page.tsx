"use client";

import { readCompras } from "@/app/client";
import ItemList from "@/app/ui/item-list";

export default function Compras() {
    const pageSize = 5;
    return (
        <div>
            <ItemList
                readItemsFunction={readCompras}
                pageSize={pageSize}
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
