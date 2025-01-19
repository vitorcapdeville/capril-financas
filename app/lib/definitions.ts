export type User = {
    id: string;
    access_token: string;
};

export type Token = {
    access_token: string;
    token_type: string;
};
export interface Fornecedor {
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
export interface CadastrarProduto {
    nome: string;
    peso_em_gramas: number;
}

export interface Compra {
    data_compra: string;
    valor: number;
    categoria: string;
    fornecedor_id: number;
    id: number;
}

export interface CadastrarCompra {
    data_compra: string;
    valor: number;
    categoria: string;
    fornecedor_id: number;
}

export interface Venda {
    data_venda: string;
    data_pagamento?: string;
    cliente_id: number;
    id: number;
}
export interface Item {
    produto_id: number;
    preco_unitario: number;
    quantidade: number;
}
export interface CadastrarVenda {
    data_venda: string;
    data_pagamento?: string;
    cliente_id: number;
}

export interface UserInfo {
    id: number;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
}
