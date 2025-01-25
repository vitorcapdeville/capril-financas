import ClienteForm from "@/app/ui/forms/new-client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function NovoCliente() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Novo Cliente
            </Typography>
            <ClienteForm />
        </Container>
    );
}
