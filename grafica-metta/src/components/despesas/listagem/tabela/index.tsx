import { Despesa } from "app/models/despesas"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'

import { useState } from "react"


interface TabelaDespesasProps {
    despesas: Array<Despesa>;
    onEdit: (despesas: any) => void;
    onDelete: (despesas: any) => void;
}


export const TabelaDespesas: React.FC<TabelaDespesasProps> = ({ despesas, onEdit, onDelete }) => {
    const actionTemplate = (registro: Despesa) => {
        const url = `/cadastros/despesas?id=${registro.id}`

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
        <DataTable value={despesas} paginator rows={5}>
            <Column field="id" header="Código" />
            <Column field="tipoDespesa" header="Tipo de Despesa" />
            <Column field="valor" header="Valor" />
            <Column field="responsavel" header="Responsavel" />
            <Column field="dataDespesa" header="Data" />
            <Column header="" body={actionTemplate} />
        </DataTable>
    )
}

