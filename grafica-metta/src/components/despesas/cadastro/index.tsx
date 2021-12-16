import { Layout } from "components"
import { useState, useEffect } from "react"
import { DespesaForm } from './form'
import { Despesa } from "app/models/despesas"
import { useDespesaService } from 'app/services'
import { Alert } from 'components/common/message'
import { useRouter } from 'next/router'

export const RegistroDespesa: React.FC = () => {

    const [despesa, setDespesa] = useState<Despesa>({});
    const [messages, setMessages] = useState<Array<Alert>>([])
    const service = useDespesaService();
    const router = useRouter();
    const { id } = router.query;

    useEffect( () => {
        if(id){
            service.carregarDespesa(id)
                .then(despesaEncontrado => setDespesa(despesaEncontrado) )
        }
    }, [id] )


    const handleSubmit = (despesa: Despesa) => {
        if (despesa.id) {
            service.atualizar(despesa).then(response => {
                setMessages([{
                    tipo: "success", texto: "Registro atualizado com sucesso!"
                }])
            })
        } else {
            service.salvar(despesa)
                .then(despesaSalva => {
                    setDespesa(despesaSalva);
                    setMessages([{
                        tipo: "success", texto: "Registro salvo com sucesso!"
                    }])
                })
        }
    }

    return (
        <Layout titulo="Despesas" subtitulo="Registro de Despesas" mensagens={messages}>
            <DespesaForm despesa={despesa} onSubmit={handleSubmit} />

        </Layout>
    )
}