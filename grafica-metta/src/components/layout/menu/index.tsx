
import { IconeCasa, IconeLotes, IconeVendas, IconeCliente, IconeFornecedores, IconeSair } from "components"
import { signOut } from "next-auth/client"
import MenuItem from "./MenuItem"



export default function MenuLateral() {

    return (
        <aside className={`
            flex flex-col
            bg-gray-200 text-white
         `}>

            <ul className="flex-grow">
                <MenuItem url="/" texto="Início" icone={IconeCasa} />
                <MenuItem url="/consultas/clientes" texto="Clientes" icone={IconeCliente} />
                <MenuItem url="/consultas/produtos" texto="Produtos" icone={IconeLotes} />
                <MenuItem url="/vendas/relatorio-vendas" texto="Vendas" icone={IconeVendas} />
                <MenuItem url="/consultas/despesas" texto="Despesas" icone={IconeLotes} />
                <MenuItem url="/consultas/fornecedores" texto="Fornecedores" icone={IconeFornecedores} />
            </ul>
            <ul>
                <MenuItem
                    texto="Sair" icone={IconeSair}
                    onClick={() => signOut()}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                  `}
                />
            </ul>
        </aside>
    )
}