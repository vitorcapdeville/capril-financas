import { readClientes } from "@/app/client";
import { SearchParams } from "@/app/lib/definitions";
import ItemList from "@/app/ui/item-list";

export default function Clientes(
    { searchParams }: { searchParams: SearchParams },
) {
    const pageSize = 5;
    return (
        <div>
            <ItemList
                searchParams={searchParams}
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
