import { Produto } from "app/models/produtos"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'

import { useState } from "react"


interface TabelaProdutosProps {
    produtos: Array<Produto>;
    onEdit: (produto: any) => void;
    onDelete: (produto: any) => void;
}


export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({ produtos, onEdit, onDelete }) => {
    const actionTemplate = (registro: Produto) => {
        const url = `/cadastros/produtos?id=${registro.id}`

        return (
            <div>
                <Button label="Editar"
                    className="p-button-rounded p-button-info mr-4"
                    onClick={e => onEdit(registro)}
                />
                <Button label="Deletar"
                    className="p-button-rounded p-button-danger"
                    onClick={event => {
                        confirmDialog({
                            message: "Confirma a exclusão deste registro?",
                            acceptLabel: "Sim",
                            rejectLabel: "Não",
                            accept: () => onDelete(registro),
                            header: "Confirmação"
                        })
                    }}
                />
            </div>
        )
    }
    return (
        <DataTable value={produtos} paginator rows={5}>
            <Column field="id" header="Código" />
            <Column field="nomeArquivo" header="Nome do Arquivo" />
            <Column field="nomeCliente" header="Cliente" />
            <Column field="tipoProduto" header="Tipo" />
            <Column field="dataEntrada" header="Data de Entrada" />
            <Column header="" body={actionTemplate} />
        </DataTable>
    )
}

