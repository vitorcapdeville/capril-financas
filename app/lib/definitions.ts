export type User = {
    id: string;
    access_token: string;
};

export type SearchParams = Promise<
    { [key: string]: string | string[] | undefined }
>;

export type Params = Promise<{ id: string }>;
