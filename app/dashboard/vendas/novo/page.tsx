import VendaForm from "@/app/ui/forms/new-venda";
import { HeaderWithBackButton } from "@/app/ui/header-with-back-button";
import Container from "@mui/material/Container";

export default async function NovaVenda() {
    return (
        <Container maxWidth="sm">
            <HeaderWithBackButton text="Nova venda" />

            <VendaForm />
        </Container>
    );
}
