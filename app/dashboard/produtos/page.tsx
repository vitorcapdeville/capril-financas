import { readProdutos } from "@/app/client";
import { SearchParams } from "@/app/lib/definitions";
import ItemList from "@/app/ui/item-list";

export default async function Produtos(
    { searchParams }: { searchParams: SearchParams },
) {
    const pageSize = 5;
    return (
        <div>
            <ItemList
                searchParams={searchParams}
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
