"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => router.back()}
            sx={{ mt: 2 }}
        >
            Voltar
        </Button>
    );
}
