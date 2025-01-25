"use server";

import { readClienteById } from "@/app/client";
import { Params } from "@/app/lib/definitions";
import ItemDetails from "@/app/ui/item-details";

export default async function ClienteDetalhes(
    { params }: { params: Params },
) {
    const id = (await params).id;
    return (
        <ItemDetails readItemByIdFunction={readClienteById} id={Number(id)} />
    );
}
