import { httpClient } from 'app/http'
import { Despesa } from 'app/models/despesas'
import { AxiosResponse } from 'axios'
import { Page } from 'app/models/common/page'

const resourceURL: string = "/api/despesas"

export const useDespesaService = () => {

    const gerarRelatorioDespesa = async (
        dataInicio: string = '',
        dataFim: string = ''): Promise<Blob> => {
        const url = `${resourceURL}/inicio=${dataInicio}&fim=${dataFim}`
        const response: AxiosResponse = await httpClient.get(url, { responseType: 'blob' })
        const bytes = response.data
        return new Blob([bytes], { type: 'application/pdf' })

    }


    const salvar = async (despesa: Despesa): Promise<Despesa> => {
        const response: AxiosResponse<Despesa> = await httpClient.post<Despesa>(resourceURL, despesa);
        return response.data;
    }

    const atualizar = async (despesa: Despesa): Promise<void> => {
        const url: string = `${resourceURL}/${despesa.id}`
        await httpClient.put<Despesa>(url, despesa)
    }

    const carregarDespesa = async (id: any): Promise<Despesa> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Despesa> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (id: any): Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
    }

    const find = async (
        dataDespesa: string = '',
        page: number = 0,
        size: number = 10): Promise<Page<Despesa>> => {
        const url = `${resourceURL}?dataDespesa=${dataDespesa}&page=${page}&size=${size}`
        const response: AxiosResponse<Page<Despesa>> = await httpClient.get(url);
        return response.data;
    }


    return {
        salvar,
        atualizar,
        carregarDespesa,
        deletar,
        find,
        gerarRelatorioDespesa
    }
}