import { Cliente } from 'app/models/clientes'
import { Layout } from "components"
import { Input } from 'components'
import { useFormik } from 'formik'
import { useState } from 'react'
import { DataTable, DataTablePageParams } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Page } from 'app/models/common/page'
import { useClienteService } from 'app/services'
import Router from 'next/router'


interface ConsultaClientesForm {
    razaoSocial?: string;
    cpfCnpj?: string;
}

export const ListagemClientes: React.FC = () => {


    const service = useClienteService();
    const [loading, setLoading] = useState<boolean>(false)
    const [clientes, setClientes] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 5,
        totalElements: 0

    });

    const handleSubmit = (filtro: ConsultaClientesForm) => {
        handlePage(null);
    }

    const {
        handleSubmit: formikSubmit,
        values: filtro,
        handleChange
    } = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: { razaoSocial: '', cpfCnpj: '' }
    })

    const handlePage = (event: DataTablePageParams) => {
        setLoading(true)
        service.find(filtro.razaoSocial, filtro.cpfCnpj, event?.page, event?.rows)
            .then(result => {
                setClientes({ ...result, first: event?.first })
            }).finally(() => setLoading(false))
    }

    const deletar = (cliente: Cliente) => {
        service.deletar(cliente.id).then(result => {
            handlePage(null)
        })
    }
    const actionTemplate = (registro: Cliente) => {
        const url = `/cadastros/clientes?id=${registro.id}`
        return (
            <div>
                <Button label="Editar"
                    className="p-button-rounded p-button-info"
                    onClick={e => Router.push(url)}
                />
                <Button label="Deletar" onClick={event => {
                    confirmDialog({
                        message: "Confirma a exclusão deste registro?",
                        acceptLabel: "Sim",
                        rejectLabel: "Não",
                        accept: () => deletar(registro),
                        header: "Confirmação"
                    })
                }}
                    className="p-button-rounded p-button-danger ml-3" />
            </div>
        )
    }



    return (
        <Layout titulo="Clientes" subtitulo="Listagem de Clientes">

            <div className="bg-gray-200 p-7 rounded-md ml-auto mb-3 mr-auto w-11/12">

                <form onSubmit={formikSubmit}>
                    <div className="columns">
                        <Input label="Nome" id="razaoSocial"
                            columnClasses="is-half"
                            autoComplete="off"
                            onChange={handleChange}
                            name="razaoSocial"
                            value={filtro.razaoSocial} />

                        <Input label="CPF / CNPJ" id="cpfCnpj"
                            columnClasses="is-half"
                            onChange={handleChange}
                            name="cpfCnpj" value={filtro.cpfCnpj} />

                    </div>

                    <div className="field is-grouped flex is-justify-content-flex-end">
                        <div className="control is-link">
                            <button className={`bg-blue-700 text-white px-4 py-2 rounded-md`}
                                type="submit">
                                CONSULTAR
                            </button>
                        </div>
                        <div className="control is-link">
                            <button
                                onClick={e => Router.push("/cadastros/clientes")}
                                className={`bg-blue-700 text-white px-4 py-2 rounded-md`}
                                type="submit">
                                NOVO CLIENTE
                            </button>
                        </div>
                    </div>

                </form>
                <br />
                <div className="columns">
                    <div className=" column is-full">
                        <DataTable value={clientes.content}
                            totalRecords={clientes.totalElements}
                            lazy paginator
                            first={clientes.first}
                            rows={clientes.size}
                            onPage={handlePage}
                            loading={loading}
                            emptyMessage="Nenhum registro Listado">
                            <Column field="id" header="Código" />
                            <Column field="razaoSocial" header="Nome/Razão Social"/>
                            <Column field="cpfCnpj" header="CPF/CNPJ"/>
                            <Column field="email" header="Email"/>
                            <Column body={actionTemplate} />
                        </DataTable>
                    </div>
                </div>
            </div>


        </Layout>
    )

}