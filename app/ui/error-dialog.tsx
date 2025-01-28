import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Message } from "react-hook-form";

type TError =
    | (
        & Record<
            string,
            Partial<{
                type: string | number;
                message: Message;
            }>
        >
        & Partial<{
            type: string | number;
            message: Message;
        }>
    )
    | undefined;

export function ErrorDialog({ error }: { error: TError }) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (error?.message) {
            setOpen(true);
        }
    }, [error]);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Erro</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error?.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
