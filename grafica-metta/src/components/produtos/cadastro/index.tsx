/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from 'react'
import { Layout, Input, InputMoney} from 'components'
import { useProdutoService, useClienteService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from "next/router"
import{ Message} from '../../common/message'
import { InputText } from 'primereact/inputtext';
import { Cliente } from 'app/models/clientes'
import { Page } from 'app/models/common/page'
import {
    AutoComplete, AutoCompleteChangeParams, AutoCompleteCompleteMethodParams
} from 'primereact/autocomplete'
import { converterEmBigDecimal, formatReal  } from 'app/util/money';

const msgCampoObrigatorio = "Campo Obrigatório";

const validationSchema = yup.object().shape({
    nomeArquivo: yup.string().trim().required(msgCampoObrigatorio),
    nomeCliente: yup.string().trim().required(msgCampoObrigatorio),
    observacao: yup.string(),

});

interface formErrors {
    nomeArquivo?: string;
    nomeCliente?: string;
}


export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const clienteService = useClienteService();
    const [nomeArquivo, setNomeArquivo] = useState('')
    const [tipoProduto, setTipoProduto] = useState('')
    const [nomeCliente, setNomeCliente] = useState('')
    const [preco, setPreco] = useState('')
    const [dataEntrada, setDataEntrada] = useState('')
    const [observacao, setObservacao] = useState('')
    const [id, setId] = useState<string>()
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [errors, setErrors] = useState<formErrors>({})
    const router = useRouter();
    const { id: queryId } = router.query;
    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 0,
        totalElements: 0
    })

    useEffect(() => {
        if (queryId) {
            service.carregarProduto(queryId).then(produtoEncontrado => {
                setId(produtoEncontrado.id)
                setNomeArquivo(produtoEncontrado.nomeArquivo)
                setNomeCliente(produtoEncontrado.nomeCliente)
                setDataEntrada(produtoEncontrado.dataEntrada || '')
                setTipoProduto(produtoEncontrado.tipoProduto)
                setPreco(formatReal(`${produtoEncontrado.preco}`))
                setObservacao(produtoEncontrado.observacao)
            })
        }
    }, [queryId])

    const submit = () => {
        const produto: Produto = {
            id, 
            nomeArquivo, 
            tipoProduto, 
            nomeCliente, 
            dataEntrada,
            preco:converterEmBigDecimal(preco), 
            observacao
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})
            if (id) {
                service.atualizar(produto)
                        .then(response => {
                            setMessages([{
                                tipo: "success", texto: "Produto atualizado com sucesso!"
                    }])
                })

            } else {
                service.salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id)
                        setDataEntrada(produtoResposta.dataEntrada)
                        setMessages([{
                            tipo: "success", texto: "Produto Salvo com sucesso!"
                        }])
                    })
            }

        }).catch(err => {
            const field = err.path;
            const message = err.message;

            setErrors({ [field]: message })
        })
    }
    const handleClienteAutocomplete = (e: AutoCompleteCompleteMethodParams) => {
        const nome = e.query
        clienteService
            .find(nome, '', 0, 20)
            .then(clientes => setListaClientes(clientes))
    }
    const handleClienteChange = (e: AutoCompleteChangeParams) => {
        const clienteSelecionado: Cliente = e.value;
        setNomeCliente(clienteSelecionado.razaoSocial)
    }

    return (

        <Layout titulo="Produtos" subtitulo="Cadastro de Produtos" mensagens={messages}>
            <div className="bg-gray-200 p-7 rounded-md ml-auto mr-auto w-8/12">

                {id &&
                    <div className="columns">
                        <Input label="Código:"
                            columnClasses=" column is-one-quarter"
                            id="inputId"
                            value={id}
                            disabled
                        />
                        <Input label="Data de Entrada"
                            columnClasses=" column is-one-quarter"
                            id="inputDate"
                            value={dataEntrada}
                            disabled
                        />
                    </div>
                }
                <div className="p-fluid">

                    <div className="p-field">
                        <label htmlFor="cliente" className="label">Cliente: *</label>
                        <AutoComplete dropdown
                            suggestions={listaClientes.content}
                            completeMethod={handleClienteAutocomplete}
                            value={nomeCliente}
                            field="razaoSocial"
                            id="razaoSocial"
                            name="razaoSocial"
                            placeholder="Selecione um Cliente"
                            onChange={handleClienteChange}
                        />
                    </div>

                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="cliente" className="label">Arquivo *</label>
                            <InputText
                                onChange={e => setNomeArquivo(e.target.value)}
                                id="inputNomeArquivo"
                                value={nomeArquivo}
                                placeholder="Digite o nome do Arquivo"
                                 />
                        </div>
                    </div>
                </div>

                <div className=" columns">
                    <div className="field column">
                        <label htmlFor="selectTipe" className="label">Tipo de Produto</label>
                        <div className="control">
                            <div className="select">
                                <select id="selectTipe" value={tipoProduto} onChange={event => setTipoProduto(event.target.value)}>
                                    <option>---Selecione um tipo de Produto---</option>
                                    <option>CV 4x1 cores</option>
                                    <option>CV 4x4 cores</option>
                                    <option>CV BOPP</option>
                                    <option>Panf F16 4x0</option>
                                    <option>Panf F16 4x4</option>
                                    <option>Panf F32 4x0</option>
                                    <option>Panf F32 4x4</option>
                                    <option>Impressos Diversos</option>

                                </select>
                            </div>

                        </div>
                    </div>
                    <div className=" float-left">
                        <InputMoney label="Preço: *"
                            onChange={e => setPreco(e.target.value)}
                            value={preco}
                            id="inputPreco"
                            placeholder="Digite o Preço do produto"
                            maxLength={16}
                            />
                    </div>

                </div>
                <div className="field column">
                    <label htmlFor="inputOb" className="label">Observação</label>
                    <div className="control">
                        <textarea className="textarea" value={observacao}
                            onChange={event => setObservacao(event.target.value)} id="inputOb" />
                    </div>
                </div>
                <div className="flex float-right">
                    <div className="control ">
                        <button onClick={submit} className={`bg-blue-700 text-white px-4 py-2 rounded-md mr-4`}>
                            {id ? "ATUALIZAR PRODUTO" : "SALVAR PRODUTO"}
                        </button>
                    </div>

                    <div className="control">
                        <Link href="/consultas/produtos">
                            <button className={`bg-gray-600 text-white px-4 py-2 rounded-md`}>
                                VOLTAR
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </Layout>

    )
}