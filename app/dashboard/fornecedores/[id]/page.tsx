"use server";

import { readFornecedorById } from "@/app/client";
import { Params } from "@/app/lib/definitions";
import ItemDetails from "@/app/ui/item-details";

export default async function FornecedorDetalhes(
    { params }: { params: Params },
) {
    const id = (await params).id;
    return (
        <ItemDetails
            readItemByIdFunction={readFornecedorById}
            id={Number(id)}
        />
    );
}
