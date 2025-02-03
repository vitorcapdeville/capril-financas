"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ErrorDialog } from "./error-dialog";

export function BackButton() {
    const router = useRouter();
    return (
        <IconButton aria-label="delete" onClick={() => router.back()}>
            <ArrowBackIcon />
        </IconButton>
    );
}

export function DeleteButton(
    { deleteAction, id }: { deleteAction: any; id: number },
) {
    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm({
        defaultValues: {
            id,
        },
    });

    const onSubmit = async (data: { id: number }) => {
        const error = await deleteAction(data.id);

        if (error) {
            setError("root", {
                type: "custom",
                message: error,
            });
        }
    };
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <IconButton type="submit" disabled={isSubmitting}>
                <DeleteIcon color="error" />
            </IconButton>
            <ErrorDialog
                error={errors.root}
            />
        </Box>
    );
}
