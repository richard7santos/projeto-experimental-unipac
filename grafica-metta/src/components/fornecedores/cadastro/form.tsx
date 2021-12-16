/* eslint-disable @next/next/link-passhref */
import { Fornecedor } from "app/models/fornecedores"
import { useFormik } from 'formik'
import { Input, InputCPF } from 'components'
import { validationScheme } from './validationScheme'
import Router from 'next/router'




interface FornecedorFormProps {
    fornecedor: Fornecedor;
    onSubmit: (fornecedor: Fornecedor) => void;

}
const formScheme: Fornecedor = {
    cpfCnpj: '',
    razaoSocial: '',
    produtoServico: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    email: '',
    telefone: '',
    observacao:'',
}

function onblurCep(ev,setFieldValue) {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g, '');
    if (value.length !== 8) {
        return;
    }
    fetch(`http://viacep.com.br/ws/${cep}/json`)
        .then((res) => res.json())
        .then((data) => {
            setFieldValue('bairro', data.bairro)
            setFieldValue('logradouro', data.logradouro)
            setFieldValue('cidade', data.localidade)
            setFieldValue('estado', data.uf)
            setFieldValue('telefone', data.ddd)
        })
        
}

export const FornecedorForm: React.FC<FornecedorFormProps> = ({
    fornecedor,
    onSubmit
}) => {

    const formik = useFormik<Fornecedor>({
        initialValues: { ...formScheme, ...fornecedor },
        onSubmit,
        enableReinitialize: true,
        validationSchema: validationScheme,
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="bg-gray-200 p-7 rounded-md ml-auto mr-auto w-11/12">
                {formik.values.id &&
                    <div className="columns">
                        <Input id="id"
                            name="id"
                            label="Código"
                            columnClasses="is-one-fifth"
                            autoComplete="off"
                            disabled
                            onChange={formik.handleChange}
                            value={formik.values.id} />
                    </div>
                }

                <div className="columns mb-1">

                    <InputCPF id="cpfCnpj"
                        maxLength="18"
                        name="cpfCnpj"
                        label="CPF/CNPJ: *"
                        placeholder="Digite o CPF ou CNPJ do cliente"
                        columnClasses="is-one-quarter"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.cpfCnpj}
                        value={formik.values.cpfCnpj}
                    />
                    <Input id="razaoSocial"
                        name="razaoSocial"
                        label="Nome/Razão Social: *"
                        placeholder="Digite o nome ou razão social do cliente"
                        columnClasses=""
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.razaoSocial}
                        value={formik.values.razaoSocial}
                    />
                    <Input id="produtoServico"
                        name="produtoServico"
                        label="Produto / Serviço: *"
                        placeholder="Digite o produto ou serviço oferecido"
                        columnClasses=""
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.produtoServico}
                        value={formik.values.produtoServico}
                    />

                </div>
                <div className="columns mb-1">
                    <Input id="cep"
                        onBlur={(ev) => onblurCep(ev, formik.setFieldValue)}
                        name="cep"
                        label="CEP: *"
                        placeholder="Digite o CEP (apenas numeros)"
                        columnClasses="is-one-quarter"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.cep}
                        value={formik.values.cep}
                    />

                    <Input id="logradouro"
                        name="logradouro"
                        label="Endereço: *"
                        columnClasses=""
                        placeholder="Endereço completo"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.logradouro}
                        value={formik.values.logradouro}
                    />

                    <Input id="numero"
                        name="numero"
                        label="Número: *"
                        columnClasses="is-one-fifth"
                        autoComplete="off"
                        placeholder="Digite o número"
                        onChange={formik.handleChange}
                        value={formik.values.numero}
                        error={formik.errors.numero}
                    />
                </div>
                <div className="columns mb-1">

                    <Input id="complemento"
                        name="complemento"
                        label="Complemento:"
                        placeholder="Se necessário, digite um complemento"
                        columnClasses=""
                        autoComplete="off"
                        onChange={formik.handleChange}

                        value={formik.values.complemento}
                    />

                    <Input id="bairro"
                        name="bairro"
                        label="Bairro: *"
                        placeholder="Bairro"
                        columnClasses=""
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.bairro}
                        value={formik.values.bairro}
                    />

                    <Input id="cidade"
                        name="cidade"
                        label="Cidade: *"
                        placeholder="Cidade"
                        columnClasses=""
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.cidade}
                        value={formik.values.cidade}
                    />

                    <Input id="estado"
                        name="estado"
                        label="UF: *"
                        placeholder="Estado"
                        columnClasses="is-one-fifth"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.estado}
                        value={formik.values.estado}
                    />
                </div>
                <div className="columns mb-1">
                    <Input id="email"
                        name="email"
                        label="E-mail: *"
                        placeholder="Digite o E-mail"
                        columnClasses="is-two-fifth"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.email}
                        value={formik.values.email}
                    />

                    <Input id="telefone"
                        name="telefone"
                        label="Telefone: *"
                        columnClasses=""
                        placeholder="Informe um telefone fixo ou celular"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.telefone}
                        value={formik.values.telefone}
                    />

                    <Input id="observacao"
                        name="observacao"
                        label="Observação: (Opcional)"
                        placeholder="Registre observações aqui"
                        columnClasses=""
                        autoComplete="off"
                        onChange={formik.handleChange}
                        error={formik.errors.observacao}
                        value={formik.values.observacao}
                    />

                </div>
                <div className="flex is-justify-content-flex-end">
                    <div className="control ">
                        <button type="submit" className={`bg-blue-700 text-white px-4 py-2 rounded-md mr-4`}>
                            {formik.values.id ? "ATUALIZAR FORNECEDOR" : "SALVAR FORNECEDOR"}
                        </button>

                    </div>
                    <div className="control">
                        <button onClick={e => Router.push("/consultas/fornecedores")}
                            className={`bg-gray-600 text-white px-4 py-2 rounded-md`}>
                            VOLTAR
                        </button>
                    </div>
                </div>

            </div>
        </form>
    )

}