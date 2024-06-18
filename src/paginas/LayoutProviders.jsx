import { CadastroUsuarioProvider } from "../contexto/CadastroUsuario"
import { LoginProvider } from "../contexto/Login"
import { ProdtutoProvider } from "../contexto/Produto"
import { ComandaProvider } from "../contexto/Comanda"
import { SocketProvider } from "../contexto/Socket" 
import { Outlet } from "react-router-dom"
import { CadastroAtendenteProvider } from "../contexto/CadastroAtendente"
import { AuthProvider } from "../contexto/Auth"

export const LayoutProviders = () => {
    return(
        <>
            <AuthProvider>
                <CadastroUsuarioProvider>
                    <CadastroAtendenteProvider>
                        <SocketProvider>
                            <LoginProvider>
                                <ProdtutoProvider>
                                    <ComandaProvider>
                                        <Outlet/>
                                    </ComandaProvider>
                                </ProdtutoProvider>
                            </LoginProvider>
                        </SocketProvider>
                    </CadastroAtendenteProvider>
                </CadastroUsuarioProvider>
            </AuthProvider>
        </>
    )
}