import { Button } from "@mui/material";

export default function PendingButton(
    { isPending, text, pendingText }: {
        isPending: boolean;
        text: string;
        pendingText: string;
    },
) {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
            disabled={isPending}
        >
            {isPending ? pendingText : text}
        </Button>
    );
}
