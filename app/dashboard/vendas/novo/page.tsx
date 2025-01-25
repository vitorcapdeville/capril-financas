import VendaForm from "@/app/ui/forms/new-venda";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function NovaVenda() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Nova Venda
            </Typography>
            <VendaForm />
        </Container>
    );
}
