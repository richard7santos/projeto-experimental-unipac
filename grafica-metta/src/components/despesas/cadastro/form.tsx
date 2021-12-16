/* eslint-disable @next/next/link-passhref */
import { Despesa } from "app/models/despesas"
import { useFormik } from 'formik'
import { Input, } from 'components'
import { validationScheme } from './validationScheme'
import Router from 'next/router'




interface DespesaFormProps {
    despesa: Despesa;
    onSubmit: (despesa: Despesa) => void;

}
const formScheme: Despesa = {
    tipoDespesa: '',
    valor: 0,
    motivo: '',
    dataDespesa: '',
    responsavel: '',

}

export const DespesaForm: React.FC<DespesaFormProps> = ({
    despesa,
    onSubmit
}) => {

    const formik = useFormik<Despesa>({
        initialValues: { ...formScheme, ...despesa },
        onSubmit,
        enableReinitialize: true,
        validationSchema: validationScheme,
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="bg-gray-200 p-7 rounded-md ml-auto mr-auto w-8/12">
                <div className="flex justify-between">
                    <Input id="id"
                        name="id"
                        label="Código"
                        placeholder="Gerado automaticamente"
                        columnClasses=""
                        autoComplete="off"
                        disabled
                        onChange={formik.handleChange}
                        value={formik.values.id} />

                    <Input
                        id="dataDespesa"
                        name="dataDespesa"
                        label="Data da Despesa"
                        placeholder="dd/MM/aaaa"
                        columnClasses=" is-one-three"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.dataDespesa} />

                    <Input id="tipoDespesa"
                        name="tipoDespesa"
                        label="Tipo de Despesa: *"
                        placeholder="Ex. Lanche... Combustível..."
                        columnClasses=""
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.tipoDespesa}
                        value={formik.values.tipoDespesa}
                    />
                </div>

                <div className="flex justify-between">
                    <Input
                        type="number"
                        id="valor"
                        name="valor"
                        label="Valor: *"
                        columnClasses="is-one-fifth"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.valor}
                        value={formik.values.valor}
                    />

                    <Input id="motivo"
                        name="motivo"
                        label="Motivo *"
                        columnClasses=""
                        placeholder="Escreva o motivo da despesa"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.motivo}
                        value={formik.values.motivo}
                    />
                </div>
                <div className="flex justify-between">

                    <Input id="responsavel"
                        name="responsavel"
                        label="Responsável: *"
                        columnClasses="is-half"
                        autoComplete="off"
                        placeholder="Responsável pela despesa"
                        onChange={formik.handleChange}
                        value={formik.values.responsavel}
                        error={formik.errors.responsavel}
                    />
                </div>
                <hr/>
                <div className="flex is-justify-content-flex-end">
                    <div className="control ">
                        <button type="submit" className={`bg-blue-700 text-white px-4 py-2 rounded-md mr-4`}>
                            {formik.values.id ? "ATUALIZAR DESPESA" : "SALVAR DESPESA"}
                        </button>
                    </div>
                    <div className="control">
                        <button onClick={e => Router.push("/consultas/despesas")}
                            className={`bg-gray-600 text-white px-4 py-2 rounded-md`}>
                            VOLTAR
                        </button>
                    </div>
                </div>
            </div>




        </form >
    )

}