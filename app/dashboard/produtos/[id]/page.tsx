"use server";

import { readProdutoById } from "@/app/client";
import { Params } from "@/app/lib/definitions";
import ItemDetails from "@/app/ui/item-details";

export default async function ProdutoDetalhes(
    { params }: { params: Params },
) {
    const id = (await params).id;
    return (
        <ItemDetails
            readItemByIdFunction={readProdutoById}
            id={Number(id)}
        />
    );
}
