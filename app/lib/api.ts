interface Fornecedor {
    nome: string;
    id: number;
}

export const buscarFornecedores = async (query: string) => {
    const response = await fetch("http://localhost:8001/fornecedores");
    const fornecedores: Fornecedor[] = await response.json();

    const results = fornecedores.map((fornecedor) => fornecedor.nome).filter((
        nome,
    ) => nome.toLowerCase().includes(query.toLowerCase()));

    return results;
};

export const cadastrarFornecedor = async (nome: string) => {
    const response = await fetch("http://localhost:8001/fornecedor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome }),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar fornecedor");
    }

    const fornecedor: Fornecedor = await response.json();
    return fornecedor;
};

export const deletarFornecedor = async (id: number) => {
    const response = await fetch(`http://localhost:8001/fornecedor/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar fornecedor");
    }

    return;
};
