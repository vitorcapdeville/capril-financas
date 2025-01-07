interface Fornecedor {
    nome: string;
    id: number;
}

export interface Cliente {
    nome: string;
    email: string;
    categoria: string;
    endereco: string;
    id: number;
}

export interface CadastrarCliente {
    nome: string;
    email: string;
    categoria: string;
    endereco: string;
}

export interface Produto {
    nome: string;
    peso_em_gramas: number;
    id: number;
}

interface CadastrarProduto {
    nome: string;
    peso_em_gramas: number;
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

export const buscarClientes = async (query: string) => {
    const response = await fetch("http://localhost:8001/clientes");
    const clientes: Cliente[] = await response.json();

    const results = clientes.filter((
        cliente,
    ) => cliente.nome.toLowerCase().includes(query.toLowerCase()));

    return results;
};

export const cadastrarCliente = async (cliente: CadastrarCliente) => {
    const response = await fetch("http://localhost:8001/cliente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar cliente");
    }

    const novoCliente: Cliente = await response.json();
    return novoCliente;
};

export const deletarCliente = async (id: number) => {
    const response = await fetch(`http://localhost:8001/cliente/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar cliente");
    }

    return;
};

export const buscarProdutos = async (query: string) => {
    const response = await fetch("http://localhost:8001/produtos");
    const produtos: Produto[] = await response.json();

    const results = produtos.filter((
        produto,
    ) => produto.nome.toLowerCase().includes(query.toLowerCase()));

    return results;
};

export const cadastrarProduto = async (produto: CadastrarProduto) => {
    const response = await fetch("http://localhost:8001/produto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar produto");
    }

    const novoProduto: Produto = await response.json();
    return novoProduto;
};

export const deletarProduto = async (id: number) => {
    const response = await fetch(`http://localhost:8001/produto/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar produto");
    }

    return;
};
