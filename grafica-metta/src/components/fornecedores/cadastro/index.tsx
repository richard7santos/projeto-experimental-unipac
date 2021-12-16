import { Layout } from "components"
import { useState, useEffect } from "react"
import { FornecedorForm } from './form'
import { Fornecedor } from "app/models/fornecedores"
import { useFornecedorService } from 'app/services'
import { Alert } from 'components/common/message'
import { useRouter } from 'next/router'


export const CadastroFornecedor: React.FC = () => {

    const [fornecedor, setFornecedor] = useState<Fornecedor>({});
    const [messages, setMessages] = useState<Array<Alert>>([])
    const service = useFornecedorService();
    const router = useRouter();
    const { id } = router.query;

    useEffect( () => {
        if(id){
            service.carregarFornecedor(id)
                .then(fornecedorEncontrado => setFornecedor(fornecedorEncontrado) )
        }
    }, [id] )


    const handleSubmit = (fornecedor: Fornecedor) => {
        if (fornecedor.id) {
            service.atualizar(fornecedor).then(response => {
                setMessages([{
                    tipo: "success", texto: "Fornecedor atualizado com sucesso!"
                }])
            })
        } else {
            service.salvar(fornecedor)
                .then(fornecedorSalvo => {
                    setFornecedor(fornecedorSalvo);
                    setMessages([{
                        tipo: "success", texto: "Fornecedor salvo com sucesso!"
                    }])
                })
        }
    }

    return (
        <Layout titulo="Fornecedores" subtitulo="Cadastro de Fornecedores" mensagens={messages}>
            <FornecedorForm fornecedor={fornecedor} onSubmit={handleSubmit} />

        </Layout>
    )
}