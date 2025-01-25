"use client";

import { createVendaAction } from "@/app/actions/venda";
import { ErrorDialog } from "@/app/ui/error-dialog";
import { FormInputDate } from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import Box from "@mui/material/Box";
import { useActionState } from "react";

export default function CompraForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        createVendaAction,
        "",
    );
    return (
        <Box component="form" noValidate autoComplete="off" action={formAction}>
            <FormInputDate
                name="dataVenda"
                label="Data da venda"
            />
            <FormInputDate
                name="dataPagamento"
                label="Data do pagamento"
            />

            {
                /*

                <input
                hidden
                name="cliente_id"
                value={Number(clienteId)}
                readOnly
            />
                <Autocomplete
                disablePortal
                options={clientes}
                getOptionLabel={(option: ClientePublic) =>
                    option.nome}
                fullWidth
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Cliente"
                        required
                    />
                )}
                onChange={(_, value) => {
                    setClienteId(value?.id || null);
                }}
            /> */
            }
            {
                /*
                <Typography variant="h6" component="h2" gutterBottom>
                    Itens
                </Typography>
                {items.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Autocomplete
                            disablePortal
                            options={produtos}
                            getOptionLabel={(option: Produto) =>
                                `${option.nome} - ${option.peso_em_gramas}g`}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Produto"
                                    required
                                />
                            )}
                            onChange={(_, value) => {
                                if (value) {
                                    handleProdutoIdChange(
                                        index,
                                        value.id.toString(),
                                    );
                                } else {
                                    handleProdutoIdChange(index, "0");
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            type="number"
                            label="Preço Unitário"
                            value={item.preco_unitario}
                            onChange={(e) =>
                                handlePrecoUnitarioChange(
                                    index,
                                    e.target.value,
                                )}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            type="number"
                            label="Quantidade"
                            value={item.quantidade}
                            onChange={(e) =>
                                handleQuantidadeChange(
                                    index,
                                    e.target.value,
                                )}
                        />
                        {items.length > 1 && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemoveItem(index)}
                                sx={{ mt: 1 }}
                            >
                                Remover Item
                            </Button>
                        )}
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    onClick={handleAddItem}
                    sx={{ mt: 2 }}
                >
                    Adicionar Item
                </Button> */
            }
            <PendingButton
                isPending={isPending}
                text="Adicionar"
                pendingText="Adicionando..."
            />
            <ErrorDialog errorMsg={errorMessage || null} />
        </Box>
    );
}
