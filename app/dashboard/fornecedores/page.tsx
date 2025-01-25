import { readFornecedores } from "@/app/client";
import SearchablePaginatedItemList from "@/app/ui/searchable-paginated-item-list";

import { SearchParams } from "@/app/lib/definitions";
export default function Fornecedores(
    { searchParams }: { searchParams: SearchParams },
) {
    const pageSize = 5;
    return (
        <div>
            <SearchablePaginatedItemList
                searchParams={searchParams}
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
