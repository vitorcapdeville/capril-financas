"use client";

import { readProdutos } from "@/app/client";
import ItemList from "@/app/ui/item-list";

export default function Produtos() {
    const pageSize = 5;
    return (
        <div>
            <ItemList
                readItemsFunction={readProdutos}
                pageSize={pageSize}
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
