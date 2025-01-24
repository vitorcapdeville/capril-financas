"use client";

import { readClientes } from "@/app/client";
import ItemList from "@/app/ui/item-list";

export default function Clientes() {
    const pageSize = 5;
    return (
        <div>
            <ItemList
                readItemsFunction={readClientes}
                pageSize={pageSize}
                mainProperty="nome"
                subProperties={[{
                    key: "email",
                    callback: (item: string) => item,
                }, { key: "categoria", callback: (item: string) => item }]}
                routeName="clientes"
            />
        </div>
    );
}
