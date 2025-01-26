import { Grid2, Typography } from "@mui/material";
import { BackButton } from "./buttons";

export function HeaderWithBackButton({ text }: { text: string }) {
    return (
        <Grid2 container spacing={0}>
            <Grid2 size={1}>
                <BackButton />
            </Grid2>
            <Grid2 size={11}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {text}
                </Typography>
            </Grid2>
        </Grid2>
    );
}
