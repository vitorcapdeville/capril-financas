import CompraForm from "@/app/ui/forms/new-compra";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function NovaCompra() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Nova Compra
            </Typography>
            <CompraForm />
        </Container>
    );
}
