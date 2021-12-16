import NextAuth from 'next-auth'
import { providers } from 'next-auth/client'
import Providers from 'next-auth/providers'


export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credenciais',

            credentials: {
                username: { label: "Usuário", type: "text", placeholder: "Nome de Usuário" },
                password: { label: "Senha", type: "password" , placeholder: "Insira sua Senha"}
            },
            authorize: (credentials) => {

               if (credentials.username === "Master" && credentials.password==="master" ) {
                    return{
                        id:1,
                        name:"Master"
                    }
                } else {

                    return null

                }
            }

        })

    ],
    callbacks:{
        jwt: async({token, user})=>{
            if(user){
                token.id = user.id;
            }
            return token;
        },
        session: (session, token)=> {
            if(token){
                session.id = token.id;
            }
            return session;
        },
    },
    secret: "1234",
    encryption: true,
})