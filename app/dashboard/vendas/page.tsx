import { countVendas, readVendas } from "@/app/client";
import { SearchParams } from "@/app/lib/definitions";
import SearchablePaginatedItemList from "@/app/ui/searchable-paginated-item-list";

export default async function Vendas(
    { searchParams }: { searchParams: SearchParams },
) {
    const pageSize = 5;
    return (
        <SearchablePaginatedItemList
            searchParams={searchParams}
            readItemsFunction={readVendas}
            countItemsFunction={countVendas}
            pageSize={pageSize}
            mainProperty="id"
            subProperties={[{
                key: "data_venda",
                callback: (item: string) =>
                    new Date(item).toLocaleDateString("pt-BR"),
            }]}
            routeName="vendas"
        />
    );
}
