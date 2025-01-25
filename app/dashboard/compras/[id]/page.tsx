"use server";

import { readCompraById } from "@/app/client";
import { Params } from "@/app/lib/definitions";
import ItemDetails from "@/app/ui/item-details";

export default async function CompraDetalhes({ params }: { params: Params }) {
    const id = (await params).id;
    return <ItemDetails
        readItemByIdFunction={readCompraById}
        id={Number(id)}
    />;
}
