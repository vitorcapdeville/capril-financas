import { readCompras } from "@/app/client";
import { SearchParams } from "@/app/lib/definitions";
import ItemList from "@/app/ui/item-list";

export default function Compras(
    { searchParams }: { searchParams: SearchParams },
) {
    const pageSize = 5;
    return (
        <div>
            <ItemList
                searchParams={searchParams}
                readItemsFunction={readCompras}
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
        </div>
    );
}
