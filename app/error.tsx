"use client";

import { Container, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Container sx={{ alignContent: "center", textAlign: "center" }}>
            <Typography variant="h3">
                Algo deu errado. Por favor, tente novamente.
            </Typography>
        </Container>
    );
}
