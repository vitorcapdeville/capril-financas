"use server";

import { BackButton } from "@/app/ui/buttons";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type ItemDetailsProps = {
    readItemByIdFunction: any;
    id: number;
};

async function ReadOnlyFields({ readItemByIdFunction, id }: ItemDetailsProps) {
    const { data: item } = await readItemByIdFunction({
        path: { id: Number(id) },
    });

    if (!item) {
        return notFound();
    }

    const renderFields = (obj: any, parentKey = ''): any => {
        return Object.entries(obj).map(([key, value]) => {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof value === 'object' && value !== null) {
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
            <Typography variant="h4" component="h1" gutterBottom>
                Detalhes
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Suspense fallback={<div>Carregando...</div>}>
                    <ReadOnlyFields
                        {...props}
                    />
                </Suspense>
            </Box>
            <BackButton />
        </Container>
    );
}
