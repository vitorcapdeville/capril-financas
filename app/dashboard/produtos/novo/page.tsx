import ProdutoForm from "@/app/ui/forms/new-produto";
import { HeaderWithBackButton } from "@/app/ui/header-with-back-button";
import Container from "@mui/material/Container";

export default async function NovoProduto() {
    return (
        <Container maxWidth="sm">
            <HeaderWithBackButton text="Novo produto" />

            <ProdutoForm />
        </Container>
    );
}
