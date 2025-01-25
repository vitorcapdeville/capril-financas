"use server";

import { readVendaById } from "@/app/client";
import { Params } from "@/app/lib/definitions";
import ItemDetails from "@/app/ui/item-details";

export default async function VendaDetalhes(
    { params }: { params: Params },
) {
    const id = (await params).id;

    return (
        <ItemDetails
            readItemByIdFunction={readVendaById}
            id={Number(id)}
        />
    );
}
