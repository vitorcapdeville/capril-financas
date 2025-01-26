import { countFornecedores, readFornecedores } from "@/app/client";
import { SearchParams } from "@/app/lib/definitions";
import SearchablePaginatedItemList from "@/app/ui/searchable-paginated-item-list";

export default async function Fornecedores(
    { searchParams }: { searchParams: SearchParams },
) {
    const pageSize = 5;
    return (
        <SearchablePaginatedItemList
            searchParams={searchParams}
            readItemsFunction={readFornecedores}
            countItemsFunction={countFornecedores}
            pageSize={pageSize}
            mainProperty="nome"
            subProperties={[{
                key: "id",
                callback: (item: number) => item.toString(),
            }]}
            routeName="fornecedores"
        />
    );
}
