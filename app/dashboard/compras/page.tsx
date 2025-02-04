import { countCompras, readCompras } from "@/app/client";
import { SearchParams } from "@/app/lib/definitions";
import SearchablePaginatedItemList from "@/app/ui/searchable-paginated-item-list";

export default async function Compras(
    { searchParams }: { searchParams: SearchParams },
) {
    const pageSize = 5;
    return (
        <SearchablePaginatedItemList
            searchParams={searchParams}
            readItemsFunction={readCompras}
            countItemsFunction={countCompras}
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
    );
}
