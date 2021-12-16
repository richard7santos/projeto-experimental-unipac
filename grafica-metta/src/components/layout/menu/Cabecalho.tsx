import AvatarUsuario from "./AvatarUsuario";
import Logo from "./logo";

interface CabecalhoProps {
    titulo?: string
    subtitulo?: string
}

export default function Cabecalho(props: CabecalhoProps) {
    
    return (
        <div className={`flex justify-between
         bg-gradient-to-l from-gray-900 to-blue-800 p-2 mb-3 h-20 text-white
        `}>
            
            <div className={`flex flex-grow justify-end items-center`}>
              <Logo/>.
            </div>

            <div className={`flex flex-grow justify-end items-center`}>
                <AvatarUsuario className="mr-10" />
            </div>
            
        </div>
    )
}