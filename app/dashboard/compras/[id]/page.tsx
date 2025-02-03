"use server";

import { deleteCompraAction } from "@/app/actions/compra";
import { readCompraById } from "@/app/client";
import { Params } from "@/app/lib/definitions";
import ItemDetails from "@/app/ui/item-details";

export default async function CompraDetalhes({ params }: { params: Params }) {
    const id = (await params).id;
    return (
        <ItemDetails
            readItemByIdFunction={readCompraById}
            deleteAction={deleteCompraAction}
            id={Number(id)}
        />
    );
}
