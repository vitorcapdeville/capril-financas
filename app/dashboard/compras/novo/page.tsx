import { readFornecedores } from "@/app/client";
import CompraForm from "@/app/ui/forms/new-compra";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function NovaCompra() {
    const { data } = await readFornecedores({
        query: { limit: 10000, skip: 0, query: "" },
    });
    const fornecedores = data || [];

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Nova Compra
            </Typography>
            <CompraForm fornecedores={fornecedores} />
        </Container>
    );
}
