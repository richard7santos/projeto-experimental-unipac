import { httpClient } from 'app/http'
import { Fornecedor } from 'app/models/fornecedores'
import { AxiosResponse } from 'axios'
import { Page } from 'app/models/common/page'

const resourceURL: string = "/api/fornecedor"

export const useFornecedorService = () => {

    const salvar = async (fornecedor: Fornecedor): Promise<Fornecedor> => {
        const response: AxiosResponse<Fornecedor> = await httpClient.post<Fornecedor>(resourceURL, fornecedor);
        return response.data;
    }

    const atualizar = async (fornecedor: Fornecedor): Promise<void> => {
        const url: string = `${resourceURL}/${fornecedor.id}`
        await httpClient.put<Fornecedor>(url, fornecedor)
    }

    const carregarFornecedor = async (id: any): Promise<Fornecedor> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Fornecedor> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (id: any): Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
    }

    const find = async (
        razaoSocial: string = '',
        cpfCnpj: string = '',
        page: number = 0,
        size: number =10): Promise<Page<Fornecedor>> => {
            const url =`${resourceURL}?razaoSocial=${razaoSocial}&cpfCnpj=${cpfCnpj}&page=${page}&size=${size}`
            const response: AxiosResponse<Page<Fornecedor>> = await httpClient.get(url);
            return response.data;
        }
 

    return {
        salvar,
        atualizar,
        carregarFornecedor,
        deletar,
        find
    }
}