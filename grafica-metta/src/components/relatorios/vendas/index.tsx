import { Input, Layout } from 'components'
import { useFormik } from 'formik'
import { Page } from 'app/models/common/page'
import { Cliente } from 'app/models/clientes'
import { Button } from 'primereact/button'
import { InputMask } from 'primereact/inputmask';

import { AutoComplete, AutoCompleteChangeParams, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete'
import React, { useState } from 'react'
import { useClienteService, useVendaService } from 'app/services'
import Link from 'next/link'
import { InputText } from 'primereact/inputtext'

interface RelatorioVendasForm {
    cliente: Cliente;
    dataInicio: string;
    dataFim: string;
}

export const RelatorioVendas: React.FC = () => {

    const vendasService = useVendaService()
    const clienteService = useClienteService()
    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [], first: 0, number: 0, size: 20, totalElements: 0
    })

    const handleSubmit = (formData: RelatorioVendasForm) => {
        vendasService.gerarRelatorioVendas(
            formData.cliente?.id,
            formData.dataInicio,
            formData.dataFim,

        ).then(blob => {
            console.log(formData)
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL)
        })
    }

    const formik = useFormik<RelatorioVendasForm>({
        onSubmit: handleSubmit,
        initialValues: { cliente: null, dataFim: '', dataInicio: '' }
    })

    const handleClienteAutoComplete = (e: AutoCompleteCompleteMethodParams) => {
        const nome = e.query
        clienteService
            .find(nome, '', 0, 20)
            .then(clientes => setListaClientes(clientes))
    }

    return (
        <Layout titulo="Relatório de Vendas">
            <div className="bg-gray-200 p-7 rounded-md ml-auto mr-auto w-6/12">
                <Link href="/vendas/nova-venda">
                    <button className={`bg-green-600 mb-3 text-white px-4 py-2 rounded-md`}>
                        NOVA VENDA
                    </button>
                </Link>

                <form onSubmit={formik.handleSubmit}>
                    <div className="p-fluid">
                        <div className="p-grid">
                            <div className="p-col-12">
                                <label><h3>Relatório por Cliente</h3></label>
                                <AutoComplete dropdown
                                    suggestions={listaClientes.content}
                                    completeMethod={handleClienteAutoComplete}
                                    value={formik.values.cliente}
                                    field="razaoSocial"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e: AutoCompleteChangeParams) => {
                                        formik.setFieldValue("cliente", e.value)
                                    }}
                                />
                            </div>
                            <div className="p-col-6">
                                <label><h3>Data Início</h3></label>
                                <InputMask
                                    mask="99/99/9999"
                                    id="dataInicio"
                                    name="dataInicio"
                                    value={formik.values.dataInicio}
                                    onChange={formik.handleChange} />
                            </div>
                            <div className="p-col-6">
                                <label><h3>Data Fim</h3></label>
                                <InputMask
                                    mask="99/99/9999"
                                    id="dataFim"
                                    name="dataFim"
                                    value={formik.values.dataFim}
                                    onChange={formik.handleChange} />
                            </div>
                            <div className="p-col">
                                <Button label="Gerar Relatório" type="submit" />
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </Layout>
    )
}