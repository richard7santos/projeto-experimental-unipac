import Link from 'next/link'

interface MenuItemProps {
    texto: string
    icone: any
    url?: string
    className?: string
    onClick?: () => void;
}

export default function MenuItem(props: MenuItemProps) {
    function renderizarLink() {
        return (
            <a className={`
                    flex flex-col justify-center items-center
                    h-20 w-20
                    ${props.className}
                `}>
                {props.icone}
                <span className={`text-xs font-light`}>
                    {props.texto}
                </span>
            </a>
        )
    }
    return (
        <li onClick={props.onClick} className={`
            hover:bg-gray-100 hover:text-gray-700
            cursor-pointer
        `}>
            {props.url ? (
                <Link href={props.url}>
                    {renderizarLink()}
                </Link>
            ) : (
                renderizarLink()
            )}
        </li>
    )
}