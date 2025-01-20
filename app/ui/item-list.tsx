import { Pagination } from "@mui/material";
import Link from "next/link";
interface SubProperties {
    key: string;
    callback: any;
}

interface ItemListProps {
    setQueryFunction: any;
    queryValue: string;
    setPageFunction: any;
    countValue: number;
    pageValue: number;
    pageSize: number;
    items: any[];
    routeName: string;
    mainProperty: string;
    subProperties: SubProperties[];
}

const capitalize = function (string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function ItemList(
    {
        setQueryFunction,
        queryValue,
        pageValue,
        setPageFunction,
        countValue,
        pageSize,
        items,
        routeName,
        mainProperty,
        subProperties,
    }: ItemListProps,
) {
    const pageCount = Math.ceil(countValue / pageSize);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageFunction(value);
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">
                {capitalize(routeName)}
            </h1>

            <input
                type="text"
                placeholder={`Buscar ${routeName}...`}
                value={queryValue}
                onChange={(e) => setQueryFunction(e.target.value)}
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
                page={pageValue}
                onChange={handlePageChange}
            />

            <Link href={`/dashboard/${routeName}/novo`}>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Adicionar
                </button>
            </Link>
        </>
    );
}
