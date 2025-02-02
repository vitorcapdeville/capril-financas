import { SearchParams } from "@/app/lib/definitions";
import Search from "@/app/ui/search";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Grid2, LinearProgress, Stack, Typography } from "@mui/material";
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
    let count;
    try {
        const { data } = await countItemsFunction({
            query: {
                query: selectedSearch,
            },
        });
        count = data;
    } catch {
        count = 0;
    }

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
    let result;
    try {
        result = await readItemsFunction({
            query: {
                query: search,
                skip: (page - 1) * pageSize,
                limit: pageSize,
            },
        });
    } catch {
        return (
            <Typography>
                Falha de comunicação com a API.
            </Typography>
        );
    }

    const { data: items, error } = result;

    if (error) {
        return <Typography>Erro ao obter os itens.</Typography>;
    }

    return (
        <>
            {items.length > 0
                ? items.map((item: any) => (
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
                ))
                : <Typography>Nenhum item encontrado.</Typography>}
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

    const keyString = `search=${search}&page=${page}`;

    return (
        <Stack spacing={0.7}>
            <h1 className="text-2xl font-bold mb-4">
                {capitalize(props.routeName)}
            </h1>
            <Grid2 container spacing={1}>
                <Grid2
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    size={11.5}
                >
                    <Search routeName={props.routeName} />
                </Grid2>
                <Grid2
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    size={0.5}
                >
                    <Link href={`/dashboard/${props.routeName}/novo`}>
                        <Fab color="primary" aria-label="add" size="small">
                            <AddIcon />
                        </Fab>
                    </Link>
                </Grid2>
            </Grid2>
            <Suspense fallback={<LinearProgress />} key={keyString}>
                <ul className="bg-gray-100 p-5 rounded-lg w-full">
                    <ItemList
                        search={search || ""}
                        page={page}
                        readItemsFunction={props.readItemsFunction}
                        pageSize={props.pageSize}
                        routeName={props.routeName}
                        mainProperty={props.mainProperty}
                        subProperties={props.subProperties}
                    />
                </ul>
            </Suspense>
            <Grid2 container>
                <Grid2
                    display="flex"
                    justifyContent="right"
                    alignItems="center"
                    size={12}
                >
                    <Suspense
                        fallback={<LinearProgress />}
                        key={keyString + "2"}
                    >
                        <Pagination
                            countItemsFunction={props.countItemsFunction}
                            selectedSearch={search || ""}
                            selectedPage={page}
                            pageSize={props.pageSize}
                            pathname={`/dashboard/${props.routeName}`}
                        />
                    </Suspense>
                </Grid2>
            </Grid2>
        </Stack>
    );
}
