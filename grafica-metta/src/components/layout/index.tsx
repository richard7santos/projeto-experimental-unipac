/* eslint-disable react/jsx-key */
import React, { ReactNode } from 'react'
import { Message } from '../common'
import { Alert } from 'components/common/message'
import MenuLateral from './menu'
import Cabecalho from './menu/Cabecalho'
import Titulo from './menu/Titulo'

interface LayoutProps {
    titulo?: String;
    subtitulo?: String;
    children?: ReactNode;
    mensagens?: Array<Alert>;

}

interface ConteudoProps {
    children?: any
}

export default function Conteudo(props: ConteudoProps) {
    return (
        <div className={`
            flex flex-col mt-7
            dark:text-gray-200
        `}>
            {props.children}
        </div>
    )
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    return (

        <div className={`flex w-screen h-screen`}>
            <MenuLateral />
            <div className={`
                flex flex-col w-full 
                bg-gray-300
            `}>
                <Cabecalho />
                <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
                <div className="w-full overflow-y-scroll">
                    
                    <Conteudo>
                        {props.mensagens &&
                            props.mensagens.map(msg => <Message key={msg.texto} {...msg} />)
                        }
                        {props.children}
                    </Conteudo>

                </div>
            </div>
        </div>


    )
}