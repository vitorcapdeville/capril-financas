"use server";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LinearProgress } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HeaderWithBackButton } from "./header-with-back-button";

type ItemDetailsProps = {(error)
    readItemByIdFunction: any;
    id: number;
};

async function ReadOnlyFields({ readItemByIdFunction, id }: ItemDetailsProps) {
    let result;

    try {
        result = await readItemByIdFunction({
            path: { id: Number(id) },
        });
    } catch {
        return (
            <Typography>
                Falha de comunicação com a API.
            </Typography>
        );
    }

    const { data: item } = result;

    if (!item) {
        return notFound();
    }

    const renderFields = (obj: any, parentKey = ""): any => {
        return Object.entries(obj).map(([key, value]) => {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof value === "object" && value !== null) {
                return (
                    <Accordion key={fullKey}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{key}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderFields(value, fullKey)}
                        </AccordionDetails>
                    </Accordion>
                );
            }
            return (
                <TextField
                    key={fullKey}
                    fullWidth
                    margin="normal"
                    label={key}
                    value={String(value)}
                    slotProps={{ input: { readOnly: true } }}
                />
            );
        });
    };

    return <>{renderFields(item)}</>;
}

export default async function ItemDetails(
    props: ItemDetailsProps,
) {
    return (
        <Container maxWidth="sm">
            <HeaderWithBackButton text="Detalhes" />

            <Box sx={{ mb: 2 }}>
                <Suspense fallback={<LinearProgress />}>
                    <ReadOnlyFields
                        {...props}
                    />
                </Suspense>
            </Box>
        </Container>
    );
}
