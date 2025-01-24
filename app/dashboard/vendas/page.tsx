import { readVendas } from "@/app/client";
import { SearchParams } from "@/app/lib/definitions";
import ItemList from "@/app/ui/item-list";

export default async function Vendas(
    { searchParams }: { searchParams: SearchParams },
) {
    const pageSize = 5;

    return (
        <div>
            <ItemList
                searchParams={searchParams}
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
