import { Grid2, Typography } from "@mui/material";
import { BackButton, DeleteButton } from "./buttons";

export function HeaderWithBackButton(
    { text, id, deleteAction }: {
        text: string;
        id?: number;
        deleteAction?: any;
    },
) {
    return (
        <Grid2 container spacing={0}>
            <Grid2 size={1}>
                <BackButton />
            </Grid2>
            <Grid2 size={10}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {text}
                </Typography>
            </Grid2>
            {!id ? null : (
                <Grid2 size={1}>
                    <DeleteButton id={id} deleteAction={deleteAction} />
                </Grid2>
            )}
        </Grid2>
    );
}
