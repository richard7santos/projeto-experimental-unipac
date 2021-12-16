import * as Yup from 'yup'

const campoObrigatorioMensagem = "Campo obrigatório";
const campoObrigatorioValidation = Yup.string().trim().required(campoObrigatorioMensagem);

export const validationScheme = Yup.object().shape({
    cep: Yup.string().trim()
        .required(campoObrigatorioMensagem),
        

    cpfCnpj: Yup.string().trim()
        .required(campoObrigatorioMensagem),
        

    email: Yup.string().trim()
        .required("Campo obrigatório")
        .email("Email inválido!"),
    logradouro: campoObrigatorioValidation,
    razaoSocial: campoObrigatorioValidation,
    telefone: campoObrigatorioValidation,
    numero: campoObrigatorioValidation,
    cidade: campoObrigatorioValidation,
    estado: campoObrigatorioValidation
})