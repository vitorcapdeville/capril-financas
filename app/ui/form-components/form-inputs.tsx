import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export const FormInputText = (
    { name, label, control, type }: {
        name: string;
        label: string;
        control: any;
        type?: string;
    },
) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    slotProps={type === "date"
                        ? { inputLabel: { shrink: true } }
                        : {}}
                    fullWidth
                    margin="normal"
                    type={type}
                    label={label}
                    error={!!error}
                    helperText={error ? error.message : null}
                />
            )}
        />
    );
};

import { Control, FieldValues, Path } from "react-hook-form";

interface RHFAutocompleteFieldProps<
    O extends { id: string; label: string },
    TField extends FieldValues,
> {
    control: Control<TField>;
    name: Path<TField>;
    options: O[];
    placeholder?: string;
}

export const RHFAutocompleteField = <
    O extends { id: string; label: string },
    TField extends FieldValues,
>(
    props: RHFAutocompleteFieldProps<O, TField>,
) => {
    const { control, options, name } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const { onChange, value, ref } = field;
                return (
                    <>
                        <Autocomplete
                            value={value
                                ? options.find((option) => {
                                    return value === option.id;
                                }) ?? null
                                : null}
                            getOptionLabel={(option) => {
                                return option.label;
                            }}
                            onChange={(event: any, newValue) => {
                                onChange(newValue ? newValue.id : null);
                            }}
                            id="controllable-states-demo"
                            options={options}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={props.placeholder}
                                    inputRef={ref}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                    </>
                );
            }}
        />
    );
};
