/* eslint-disable @next/next/link-passhref */
import { Fornecedor } from "app/models/fornecedores"


import Router from 'next/router'




interface FornecedorDetalheProps {
    fornecedor: Fornecedor;
}

export const ExibeFornecedor: React.FC<FornecedorDetalheProps> = ({
    fornecedor,

}) => {

    return (
      
        <div className="bg-gray-200 p-7 rounded-md ml-auto mr-auto w-11/12">
            <ul>

                <li>{fornecedor.id}</li>
                <li>{fornecedor.cpfCnpj}</li>
                <li>{fornecedor.razaoSocial}</li>
                <li>{fornecedor.produtoServico}</li>
                <li>{fornecedor.cpfCnpj}</li>
                <li>{fornecedor.produtoServico}</li>
                <li> {fornecedor.cep}</li>
                <li>{fornecedor.logradouro}</li>
                <li>{fornecedor.numero}</li>
                <li>{fornecedor.complemento}</li>
                <li>{fornecedor.bairro}</li>
                <li>{fornecedor.cidade}</li>
                <li>{fornecedor.email}</li>
                <li>{fornecedor.telefone}</li>
                <li> {fornecedor.observacao}</li>
            </ul>

        </div>
    )

}