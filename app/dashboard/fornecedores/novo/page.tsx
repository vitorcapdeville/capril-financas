import FornecedorForm from "@/app/ui/forms/new-fornecedor";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function NovoFornecedor() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Novo Fornecedor
            </Typography>
            <FornecedorForm />
        </Container>
    );
}
