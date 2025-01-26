import FornecedorForm from "@/app/ui/forms/new-fornecedor";
import { HeaderWithBackButton } from "@/app/ui/header-with-back-button";
import Container from "@mui/material/Container";

export default async function NovoFornecedor() {
    return (
        <Container maxWidth="sm">
            <HeaderWithBackButton text="Novo fornecedor" />
            <FornecedorForm />
        </Container>
    );
}
