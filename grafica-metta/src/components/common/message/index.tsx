import { ReactNode } from "react"

interface MessageProps {
    tipo?: string
    field?: string
    texto: string
}
export interface Alert {
    field?: string;
    texto: string;
    tipo?: string
}

export const Message: React.FC<MessageProps> = ({
    texto,
    field,
    tipo
}) => {
    return (
        <article className={`message is-${tipo}`}>
            <div className="message-body">
                {field && `${field}:`} {texto}
            </div>
        </article>
    )
}