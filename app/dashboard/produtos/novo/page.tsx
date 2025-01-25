import ProdutoForm from "@/app/ui/forms/new-produto";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function NovoProduto() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Novo Produto
            </Typography>
            <ProdutoForm />
        </Container>
    );
}
