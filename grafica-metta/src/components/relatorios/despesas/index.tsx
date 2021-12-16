import { Layout } from 'components'
import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { InputMask } from 'primereact/inputmask';

import React from 'react'
import { useDespesaService } from 'app/services'
import { Despesa } from 'app/models/despesas';

interface RelatorioDespesasForm {
    despesa?: Despesa,
    dataInicio: string;
    dataFim: string;
}

export const RelatorioDespesas: React.FC = () => {

    const despesasService = useDespesaService()
  
    const handleSubmit = (formData: RelatorioDespesasForm) => {
        despesasService.gerarRelatorioDespesa(
            formData.dataInicio,
            formData.dataFim

        ).then(blob => {
            console.log(formData)
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL)
        })
    }

    const formik = useFormik<RelatorioDespesasForm>({
        onSubmit: handleSubmit,
        initialValues: {dataFim: '', dataInicio: '' }
    })

    return (
        <Layout titulo="Relatório de Despesas">
            <div className="bg-gray-200 p-7 rounded-md ml-auto mr-auto w-6/12">
            <h2 className=" text-2xl">RELATÓRIO POR PERÍODO</h2><hr/>
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-fluid">
                        <div className="p-grid">
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