import { useEffect } from "react"
import { Layout } from "components"
import Link from "next/link"
import Router from "next/router"
import { TabelaDespesas } from "./tabela"

import { Despesa } from "app/models/despesas"
import useSWR from "swr"
import { httpClient } from "app/http"
import { AxiosResponse } from "axios"
import { useDespesaService } from "app/services"
import React, { useState } from "react"
import { Alert } from "components/common/message"


export const ListagemDespesas: React.FC = () => {

    const service = useDespesaService();
    const [messages, setMessages] = useState<Array<Alert>>([])
    const { data: result, error } = useSWR<AxiosResponse<Despesa[]>>
        ('/api/despesas', url => httpClient.get(url))

    const [lista, setLista] = useState<Despesa[]>([])

    useEffect(() => {
        setLista(result?.data || [])
    }, [result])

    const editar = (despesa: Despesa) => {
        const url = `/cadastros/despesas?id=${despesa.id}`
        Router.push(url)
    }

    const deletar = (despesa: Despesa) => {
        service.deletar(despesa.id).then(response => {
            setMessages([
                { tipo: "success", texto: "Registro excluído com sucesso!" }
            ])
            const listaAlterada: Despesa[] = lista?.filter(p => p.id !== despesa.id)
            setLista(listaAlterada)
        })
    }

    return (
        <Layout titulo="Despesas" subtitulo="Despesas Registradas" mensagens={messages}>
            <div className="bg-gray-200 p-7 rounded-md ml-auto mb-3 mr-auto w-11/12">

                <div className="control is-link float-right">
{/*                     <button
                        onClick={e => Router.push("/consultas/despesas/relatorio-despesas")}
                        className={`bg-blue-700 text-white px-4 py-2 rounded-md mb-4 mr-4`}
                        type="submit">
                        RELATÓRIO DE DESPESAS
                    </button>
 */}                    <button
                        onClick={e => Router.push("/cadastros/despesas")}
                        className={`bg-blue-700 text-white px-4 py-2 rounded-md mb-4`}
                        type="submit">
                        REGISTRAR NOVA DESPESA
                    </button>
                </div>
                <br />

                <TabelaDespesas onEdit={editar} onDelete={deletar} despesas={lista} />
            </div>
        </Layout>
    )
}