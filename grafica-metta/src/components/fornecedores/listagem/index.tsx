import { Fornecedor } from 'app/models/fornecedores'
import { Layout } from "components"
import { Input } from 'components'
import { useFormik } from 'formik'
import { useState } from 'react'
import { DataTable, DataTablePageParams } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Page } from 'app/models/common/page'
import { useFornecedorService } from 'app/services'
import Router from 'next/router'


interface ConsultaFornecedoresForm {
    razaoSocial?: string;
    cpfCnpj?: string;
}

export const ListagemFornecedores: React.FC = () => {


    const service = useFornecedorService();
    const [loading, setLoading] = useState<boolean>(false)
    const [fornecedores, setFornecedores] = useState<Page<Fornecedor>>({
        content: [],
        first: 0,
        number: 0,
        size: 5,
        totalElements: 0

    });

    const handleSubmit = (filtro: ConsultaFornecedoresForm) => {
        handlePage(null);
    }

    const {
        handleSubmit: formikSubmit,
        values: filtro,
        handleChange
    } = useFormik<ConsultaFornecedoresForm>({
        onSubmit: handleSubmit,
        initialValues: { razaoSocial: '', cpfCnpj: '' }
    })

    const handlePage = (event: DataTablePageParams) => {
        setLoading(true)
        service.find(filtro.razaoSocial, filtro.cpfCnpj, event?.page, event?.rows)
            .then(result => {
                setFornecedores({ ...result, first: event?.first })
            }).finally(() => setLoading(false))
    }

    const deletar = (fornecedor: Fornecedor) => {
        service.deletar(fornecedor.id).then(result => {
            handlePage(null)
        })
    }
    const actionTemplate = (registro: Fornecedor) => {
        const url = `/cadastros/fornecedores?id=${registro.id}`
       
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
        <Layout titulo="Fornecedores" subtitulo="Listagem de Fornecedores">

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
                                onClick={e => Router.push("/cadastros/fornecedores")}
                                className={`bg-blue-700 text-white px-4 py-2 rounded-md`}
                                type="submit">
                                NOVO FORNECEDOR
                            </button>
                        </div>
                    </div>

                </form>
                <br />
                <div className="columns">
                    <div className=" column is-full">
                        <DataTable value={fornecedores.content}
                            totalRecords={fornecedores.totalElements}
                            lazy paginator
                            first={fornecedores.first}
                            rows={fornecedores.size}
                            onPage={handlePage}
                            loading={loading}
                            emptyMessage="Nenhum registro Listado">
                            <Column field="id" header="Código" />
                            <Column field="razaoSocial" header="Nome/Razão Social"/>
                            <Column field="produtoServico" header="Produto / Serviço"/>
                            <Column field="telefone" header="Telefone"/>
                            <Column field="email" header="Email"/>
                            <Column body={actionTemplate} />
                        </DataTable>
                    </div>
                </div>
            </div>


        </Layout>
    )

}