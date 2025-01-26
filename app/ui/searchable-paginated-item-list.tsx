import { SearchParams } from "@/app/lib/definitions";
import Search from "@/app/ui/search";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Suspense } from "react";
import PaginationMUI from "./pagination";

interface SubProperties {
    key: string;
    callback: any;
}

interface BaseProps {
    readItemsFunction: any;
    pageSize: number;
    routeName: string;
    mainProperty: string;
    subProperties: SubProperties[];
}

interface SearchablePaginatedItemListProps extends BaseProps {
    searchParams: SearchParams;
    countItemsFunction: any;
}
interface PaginatedItemList extends BaseProps {
    search: string;
    page: number;
}

const capitalize = function (string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

async function Pagination(
    { countItemsFunction, selectedSearch, selectedPage, pageSize, pathname }: {
        countItemsFunction: any;
        selectedSearch: string;
        selectedPage: number;
        pageSize: number;
        pathname: string;
    },
) {
    const { data: count } = await countItemsFunction({
        query: {
            query: selectedSearch,
        },
    });
    const pageCount = Math.ceil(count / pageSize);

    return (
        <PaginationMUI
            pageCount={pageCount}
            pathname={pathname}
            selectedPage={selectedPage}
            selectedSearch={selectedSearch}
        />
    );
}

async function ItemList(
    {
        search,
        page,
        pageSize,
        readItemsFunction,
        routeName,
        mainProperty,
        subProperties,
    }: PaginatedItemList,
) {
    const { data: items } = await readItemsFunction({
        query: {
            query: search,
            skip: (page - 1) * pageSize,
            limit: pageSize,
        },
    });

    return (
        <>
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
        </>
    );
}

export default async function SearchablePaginatedItemList(
    props: SearchablePaginatedItemListProps,
) {
    const params = await props.searchParams;
    const page = typeof params.page === "string" ? Number(params.page) : 1;

    const search = typeof params.search === "string"
        ? params.search
        : undefined;

    const keyString = `search=${search}&page=${page}`; //  <-- Construct key from searchParams

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">
                {capitalize(props.routeName)}
            </h1>

            <Search routeName={props.routeName} />
            <Suspense fallback={<LinearProgress />} key={keyString}>
                <ItemList
                    search={search || ""}
                    page={page}
                    readItemsFunction={props.readItemsFunction}
                    pageSize={props.pageSize}
                    routeName={props.routeName}
                    mainProperty={props.mainProperty}
                    subProperties={props.subProperties}
                />
                <Pagination
                    countItemsFunction={props.countItemsFunction}
                    selectedSearch={search || ""}
                    selectedPage={page}
                    pageSize={props.pageSize}
                    pathname={`/dashboard/${props.routeName}`}
                />
            </Suspense>
            <Link href={`/dashboard/${props.routeName}/novo`}>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Adicionar
                </Button>
            </Link>
        </>
    );
}
