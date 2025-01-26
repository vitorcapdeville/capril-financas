"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();
    return (
        <IconButton aria-label="delete" onClick={() => router.back()}>
            <ArrowBackIcon />
        </IconButton>
    );
}
