import { readFornecedores } from "@/app/client";
import CompraForm from "@/app/ui/forms/new-compra";
import { HeaderWithBackButton } from "@/app/ui/header-with-back-button";
import Container from "@mui/material/Container";

export default async function NovaCompra() {
    let result;
    try {
        result = await readFornecedores({
            query: { limit: 10000, skip: 0, query: "" },
        });
    } catch {
        result = { data: [] };
    }

    const { data } = result || {};

    const fornecedores = data || [];

    return (
        <Container maxWidth="sm">
            <HeaderWithBackButton text="Nova compra" />
            <CompraForm fornecedores={fornecedores} />
        </Container>
    );
}
