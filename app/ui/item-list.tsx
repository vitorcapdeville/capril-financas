import { SearchParams } from "@/app/lib/definitions";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Button from "@mui/material/Button";
import Link from "next/link";

interface SubProperties {
    key: string;
    callback: any;
}

interface ItemListProps {
    searchParams: SearchParams;
    readItemsFunction: any;
    pageSize: number;
    routeName: string;
    mainProperty: string;
    subProperties: SubProperties[];
}

const capitalize = function (string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default async function ItemList(
    {
        searchParams,
        readItemsFunction,
        pageSize,
        routeName,
        mainProperty,
        subProperties,
    }: ItemListProps,
) {
    const params = await searchParams;
    const page = typeof params.page === "string" ? Number(params.page) : 1;

    const search = typeof params.search === "string"
        ? params.search
        : undefined;

    const { data } = await readItemsFunction({
        query: {
            query: search,
            skip: (page - 1) * pageSize,
            limit: pageSize,
        },
    });

    const items: any = data.data;

    const pageCount = Math.ceil(data.count / pageSize);

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">
                {capitalize(routeName)}
            </h1>

            <Search search={search} routeName={routeName} />
            <ul className="bg-gray-100 p-5 rounded-lg w-full">
                {items.map((item: any) => (
                    <li key={item.id} className="my-2">
                        <Link
                            href={`/dashboard/${routeName}/${item.id}`}
                            className="block bg-white p-3 rounded-md transition-colors hover:bg-gray-200"
                        >
                            <div className="font-bold">
                                {item[mainProperty]}
                            </div>
                            {subProperties.map((subProperty) => (
                                <div
                                    className="text-sm text-gray-600"
                                    key={subProperty.key}
                                >
                                    {subProperty.callback(
                                        item[subProperty.key],
                                    )}
                                </div>
                            ))}
                        </Link>
                    </li>
                ))}
            </ul>

            <Pagination
                pageNumber={page}
                count={pageCount}
            />

            <Link href={`/dashboard/${routeName}/novo`}>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Adicionar
                </Button>
            </Link>
        </>
    );
}
