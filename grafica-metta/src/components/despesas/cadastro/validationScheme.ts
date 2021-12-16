import * as Yup from 'yup'

const campoObrigatorioMensagem = "Campo obrigatório";
const campoObrigatorioValidation = Yup.string().trim().required(campoObrigatorioMensagem);

export const validationScheme = Yup.object().shape({
    tipoDespesa: campoObrigatorioValidation,
    valor: campoObrigatorioValidation,
    motivo: campoObrigatorioValidation,
    dataDespesa: campoObrigatorioValidation,
    responsavel: campoObrigatorioValidation,

})