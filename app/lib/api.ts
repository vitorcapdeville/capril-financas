import { getToken } from "@/app/lib/actions";
import {
    CadastrarCliente,
    CadastrarCompra,
    CadastrarProduto,
    CadastrarVenda,
    Cliente,
    Compra,
    Fornecedor,
    Item,
    Items,
    Produto,
    Token,
    Venda,
} from "@/app/lib/definitions";

export async function login(email: string, password: string): Promise<Token> {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const token = await fetch(`http://localhost:8001/login/access-token`, {
        method: "POST",
        body: formData,
    });

    if (!token.ok) {
        throw new Error("Failed to fetch data");
    }
    return token.json();
}

export const buscarFornecedores = async (query: string, page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/fornecedores?query=${query}&skip=${skip}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const fornecedores: Items<Fornecedor> = await response.json();
    return fornecedores;
};

export const cadastrarFornecedor = async (nome: string) => {
    const token = await getToken();
    const response = await fetch("http://localhost:8001/fornecedores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome }),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar fornecedor");
    }

    const fornecedor: Fornecedor = await response.json();
    return fornecedor;
};

export const buscarFornecedorPorId = async (id: number) => {
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/fornecedores/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Erro ao buscar cliente");
    }
    const fornecedor: Fornecedor = await response.json();
    return fornecedor;
};

export const deletarFornecedor = async (id: number) => {
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/fornecedores/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar fornecedor");
    }

    return;
};

export const buscarClientes = async (query: string, page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/clientes?query=${query}&skip=${skip}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const clientes: Items<Cliente> = await response.json();
    return clientes;
};

export const buscarClientePorId = async (id: number) => {
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/clientes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Erro ao buscar cliente");
    }
    const cliente: Cliente = await response.json();
    return cliente;
};

export const cadastrarCliente = async (
    cliente: CadastrarCliente,
) => {
    const token = await getToken();
    const response = await fetch("http://localhost:8001/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/clientes/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar cliente");
    }

    return;
};

export const buscarProdutos = async (query: string, page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/produtos?query=${query}&skip=${skip}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const produtos: Items<Produto> = await response.json();
    return produtos;
};

export const buscarProdutoPorId = async (id: number) => {
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/produtos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Erro ao buscar produto");
    }
    const produto: Produto = await response.json();
    return produto;
};

export const cadastrarProduto = async (
    produto: CadastrarProduto,
) => {
    const token = await getToken();
    const response = await fetch("http://localhost:8001/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/produtos/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar produto");
    }

    return;
};

export const buscarCompras = async (
    query: string,
    page: number,
    pageSize: number,
) => {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const token = await getToken();
    const response = await fetch(
        `http://localhost:8001/compras?query=${query}&skip=${skip}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    const compras: Items<Compra> = await response.json();
    return compras;
};

export const buscarCompraPorId = async (id: number) => {
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/compras/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Erro ao buscar compra");
    }
    const compra: Compra = await response.json();
    return compra;
};

export const cadastrarCompra = async (
    compra: CadastrarCompra,
) => {
    const token = await getToken();
    const response = await fetch("http://localhost:8001/compras", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(compra),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar compra");
    }

    const novaCompra: Compra = await response.json();
    return novaCompra;
};

export const buscarVendas = async (query: string, page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/vendas?query=${query}&skip=${skip}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const vendas: Items<Venda> = await response.json();
    return vendas;
};

export const buscarVendaPorId = async (id: number) => {
    const token = await getToken();
    const response = await fetch(`http://localhost:8001/vendas/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Erro ao buscar venda");
    }
    const venda: Venda = await response.json();
    return venda;
};

export const cadastrarVenda = async (
    venda: CadastrarVenda,
    items: Item[],
) => {
    const token = await getToken();
    const body = { venda, items };
    const response = await fetch("http://localhost:8001/vendas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar venda");
    }

    const novaVenda: Venda = await response.json();
    return novaVenda;
};

export async function getUser() {
    const token = await getToken();
    const response = await fetch("http://localhost:8001/login/test-token", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}
