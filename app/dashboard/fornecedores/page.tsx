"use client";

import { readFornecedores } from "@/app/client";
import ItemList from "@/app/ui/item-list";

export default function Fornecedores() {
    const pageSize = 5;
    return (
        <div>
            <ItemList
                readItemsFunction={readFornecedores}
                pageSize={pageSize}
                mainProperty="nome"
                subProperties={[{
                    key: "id",
                    callback: (item: number) => item.toString(),
                }]}
                routeName="fornecedores"
            />
        </div>
    );
}
