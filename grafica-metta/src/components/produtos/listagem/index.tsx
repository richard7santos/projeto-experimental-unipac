import { useEffect } from "react"
import { Layout } from "components"
import Link from "next/link"
import Router from "next/router"
import { TabelaProdutos } from "./tabela"
import { Produto } from "app/models/produtos"
import useSWR from "swr"
import { httpClient } from "app/http"
import { AxiosResponse } from "axios"
import { useProdutoService } from "app/services"
import React, { useState } from "react"
import { Alert } from "components/common/message"


export const ListagemProdutos: React.FC = () => {

    const service = useProdutoService();
    const [messages, setMessages] = useState<Array<Alert>>([])
    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>
        ('/api/produtos', url => httpClient.get(url))

    const [lista, setLista] = useState<Produto[]>([])

    useEffect(() => {
        setLista(result?.data || [])
    }, [result])

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`
        Router.push(url)
    }

    const deletar = (produto: Produto) => {
        service.deletar(produto.id).then(response => {
            setMessages([
                { tipo: "success", texto: "Produto excluído com sucesso!" }
            ])
            const listaAlterada: Produto[] = lista?.filter(p => p.id !== produto.id)
            setLista(listaAlterada)
        })
    }

    return (
        <Layout titulo="Produtos" subtitulo="Listagem de Produtos" mensagens={messages}>
            <div className="bg-gray-200 p-7 rounded-md ml-auto mb-3 mr-auto w-11/12">
                <div className="control is-link float-right">
                    <button
                        onClick={e => Router.push("/cadastros/produtos")}
                        className={`bg-blue-700 text-white px-4 py-2 rounded-md mb-4`}
                        type="submit">
                        CADASTRAR PRODUTO
                    </button>
                </div>
                <br/>

                <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
            </div>
        </Layout>
    )
}