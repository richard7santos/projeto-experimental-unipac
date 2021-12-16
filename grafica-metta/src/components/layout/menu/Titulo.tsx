interface TituloProps {
    titulo: string
    subtitulo: string
}

export default function Titulo(props: TituloProps) {
    return (
        <div className="pt-3 pb-3 pl-10 bg-gray-200">
            <h1 className={`
                font-black text-2xl
                text-gray-900
            `}>
                {props.titulo}
            </h1>
            <h2 className={`
                font-bold 
            `}>
                {props.subtitulo}
            </h2>
        </div>
    )
}