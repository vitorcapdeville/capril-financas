// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options, urlSearchParamsBodySerializer } from '@hey-api/client-fetch';
import type { ReadClientesData, ReadClientesResponse, ReadClientesError, CreateClienteData, CreateClienteResponse, CreateClienteError, DeleteClienteData, DeleteClienteResponse, DeleteClienteError, ReadClienteByIdData, ReadClienteByIdResponse, ReadClienteByIdError, ReadComprasData, ReadComprasResponse, ReadComprasError, CreateCompraData, CreateCompraResponse, CreateCompraError, ReadCompraByIdData, ReadCompraByIdResponse, ReadCompraByIdError, ReadFornecedoresData, ReadFornecedoresResponse, ReadFornecedoresError, CreateFornecedorData, CreateFornecedorResponse, CreateFornecedorError, DeleteFornecedorData, DeleteFornecedorResponse, DeleteFornecedorError, ReadFornecedorByIdData, ReadFornecedorByIdResponse, ReadFornecedorByIdError, ReadProdutosData, ReadProdutosResponse, ReadProdutosError, CreateProdutoData, CreateProdutoResponse, CreateProdutoError, DeleteProdutoData, DeleteProdutoResponse, DeleteProdutoError, ReadProdutoByIdData, ReadProdutoByIdResponse, ReadProdutoByIdError, ReadVendasData, ReadVendasResponse, ReadVendasError, CreateVendaData, CreateVendaResponse, CreateVendaError, ReadVendaByIdData, ReadVendaByIdResponse, ReadVendaByIdError, LoginData, LoginResponse, LoginError, GetCurrentUserData, GetCurrentUserResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Read Clientes
 */
export const readClientes = <ThrowOnError extends boolean = false>(options?: Options<ReadClientesData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadClientesResponse, ReadClientesError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/clientes',
        ...options
    });
};

/**
 * Cadastrar Cliente
 */
export const createCliente = <ThrowOnError extends boolean = false>(options: Options<CreateClienteData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateClienteResponse, CreateClienteError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/clientes',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete Cliente
 */
export const deleteCliente = <ThrowOnError extends boolean = false>(options: Options<DeleteClienteData, ThrowOnError>) => {
    return (options?.client ?? client).delete<DeleteClienteResponse, DeleteClienteError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/clientes/{id}',
        ...options
    });
};

/**
 * Read Cliente
 */
export const readClienteById = <ThrowOnError extends boolean = false>(options: Options<ReadClienteByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadClienteByIdResponse, ReadClienteByIdError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/clientes/{id}',
        ...options
    });
};

/**
 * Read Compras
 */
export const readCompras = <ThrowOnError extends boolean = false>(options?: Options<ReadComprasData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadComprasResponse, ReadComprasError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/compras',
        ...options
    });
};

/**
 * Cadastrar Compra
 */
export const createCompra = <ThrowOnError extends boolean = false>(options: Options<CreateCompraData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateCompraResponse, CreateCompraError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/compras',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Read Compra
 */
export const readCompraById = <ThrowOnError extends boolean = false>(options: Options<ReadCompraByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadCompraByIdResponse, ReadCompraByIdError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/compras/{id}',
        ...options
    });
};

/**
 * Read Fornecedores
 */
export const readFornecedores = <ThrowOnError extends boolean = false>(options?: Options<ReadFornecedoresData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadFornecedoresResponse, ReadFornecedoresError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/fornecedores',
        ...options
    });
};

/**
 * Cadastrar Fornecedor
 */
export const createFornecedor = <ThrowOnError extends boolean = false>(options: Options<CreateFornecedorData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateFornecedorResponse, CreateFornecedorError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/fornecedores',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete Fornecedor
 */
export const deleteFornecedor = <ThrowOnError extends boolean = false>(options: Options<DeleteFornecedorData, ThrowOnError>) => {
    return (options?.client ?? client).delete<DeleteFornecedorResponse, DeleteFornecedorError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/fornecedores/{id}',
        ...options
    });
};

/**
 * Read Fornecedor
 */
export const readFornecedorById = <ThrowOnError extends boolean = false>(options: Options<ReadFornecedorByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadFornecedorByIdResponse, ReadFornecedorByIdError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/fornecedores/{id}',
        ...options
    });
};

/**
 * Read Produtos
 */
export const readProdutos = <ThrowOnError extends boolean = false>(options?: Options<ReadProdutosData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadProdutosResponse, ReadProdutosError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/produtos',
        ...options
    });
};

/**
 * Cadastrar Produto
 */
export const createProduto = <ThrowOnError extends boolean = false>(options: Options<CreateProdutoData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateProdutoResponse, CreateProdutoError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/produtos',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete Produto
 */
export const deleteProduto = <ThrowOnError extends boolean = false>(options: Options<DeleteProdutoData, ThrowOnError>) => {
    return (options?.client ?? client).delete<DeleteProdutoResponse, DeleteProdutoError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/produtos/{id}',
        ...options
    });
};

/**
 * Read Produto
 */
export const readProdutoById = <ThrowOnError extends boolean = false>(options: Options<ReadProdutoByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadProdutoByIdResponse, ReadProdutoByIdError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/produtos/{id}',
        ...options
    });
};

/**
 * Read Vendas
 */
export const readVendas = <ThrowOnError extends boolean = false>(options?: Options<ReadVendasData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadVendasResponse, ReadVendasError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/vendas',
        ...options
    });
};

/**
 * Cadastrar Venda
 */
export const createVenda = <ThrowOnError extends boolean = false>(options: Options<CreateVendaData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateVendaResponse, CreateVendaError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/vendas',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Read Venda
 */
export const readVendaById = <ThrowOnError extends boolean = false>(options: Options<ReadVendaByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<ReadVendaByIdResponse, ReadVendaByIdError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/vendas/{id}',
        ...options
    });
};

/**
 * Login Access Token
 * OAuth2 compatible token login, get an access token for future requests
 */
export const login = <ThrowOnError extends boolean = false>(options: Options<LoginData, ThrowOnError>) => {
    return (options?.client ?? client).post<LoginResponse, LoginError, ThrowOnError>({
        ...urlSearchParamsBodySerializer,
        url: '/login/access-token',
        ...options,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options?.headers
        }
    });
};

/**
 * Test Token
 * Test access token
 */
export const getCurrentUser = <ThrowOnError extends boolean = false>(options?: Options<GetCurrentUserData, ThrowOnError>) => {
    return (options?.client ?? client).post<GetCurrentUserResponse, unknown, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/login/test-token',
        ...options
    });
};