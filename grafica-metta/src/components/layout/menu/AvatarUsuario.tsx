/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import React from "react";


interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    return (
        <Link href="#">
            <img
                src={'/images/avatar.svg'}
                alt="Avatar do Usuário"
                className={`
                h-12 w-12 rounded-full cursor-pointer
                    ${props.className}
                `}
            />
        </Link>
    )
}