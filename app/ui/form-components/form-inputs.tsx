import TextField from "@mui/material/TextField";

export const FormInputText = (
    { name, label }: { name: string; label: string },
) => {
    return (
        <TextField
            fullWidth
            margin="normal"
            type="text"
            label={label}
            name={name}
        />
    );
};

export const FormInputDate = (
    { name, label }: { name: string; label: string },
) => {
    return (
        <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
            margin="normal"
            type="date"
            label={label}
            name={name}
        />
    );
};

export const FormInputNumber = (
    { name, label }: { name: string; label: string },
) => {
    return (
        <TextField
            fullWidth
            margin="normal"
            type="number"
            label={label}
            name={name}
        />
    );
};
