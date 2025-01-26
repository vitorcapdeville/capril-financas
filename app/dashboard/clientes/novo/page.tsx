import ClienteForm from "@/app/ui/forms/new-client";
import { HeaderWithBackButton } from "@/app/ui/header-with-back-button";
import Container from "@mui/material/Container";

export default async function NovoCliente() {
    return (
        <Container maxWidth="sm">
            <HeaderWithBackButton text="Novo cliente" />

            <ClienteForm />
        </Container>
    );
}
