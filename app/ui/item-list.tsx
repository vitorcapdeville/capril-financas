import { Pagination } from "@mui/material";
import Link from "next/link";
interface SubProperties {
    key: string;
    callback: any;
}

interface ItemListProps {
    readItemsFunction: any;
    pageSize: number;
    routeName: string;
    mainProperty: string;
    subProperties: SubProperties[];
}
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const capitalize = function (string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function ItemList<T>(
    {
        readItemsFunction,
        pageSize,
        routeName,
        mainProperty,
        subProperties,
    }: ItemListProps,
) {
    const [items, setItems] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        const fetchItems = async () => {
            const { data } = await readItemsFunction({
                query: {
                    query: debouncedQuery,
                    skip: (page - 1) * pageSize,
                    limit: pageSize,
                },
            });
            if (data) {
                setItems(data.data);
                setCount(data.count);
            }
        };
        fetchItems();
    }, [page, debouncedQuery]);

    const pageCount = Math.ceil(count / pageSize);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">
                {capitalize(routeName)}
            </h1>

            <input
                type="text"
                placeholder={`Buscar ${routeName}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-4 p-3 border border-gray-300 rounded w-full"
            />
            <ul className="bg-gray-100 p-5 rounded-lg w-full">
                {items.map((item) => (
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
                count={pageCount}
                page={page}
                onChange={handlePageChange}
            />

            <Link href={`/dashboard/${routeName}/novo`}>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Adicionar
                </Button>
            </Link>
        </>
    );
}
