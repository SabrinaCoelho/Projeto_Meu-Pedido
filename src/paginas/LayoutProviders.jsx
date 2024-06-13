import { CadastroUsuarioProvider } from "../contexto/CadastroUsuario"
import { LoginProvider } from "../contexto/Login"
import { ProdtutoProvider } from "../contexto/Produto"
import { ComandaProvider } from "../contexto/Comanda"
import { SocketProvider } from "../contexto/Socket" 
import { Outlet } from "react-router-dom"

export const LayoutProviders = () => {
    return(
        <>
            <CadastroUsuarioProvider>
                <SocketProvider>
                    <LoginProvider>
                        <ProdtutoProvider>
                            <ComandaProvider>
                                <Outlet/>
                            </ComandaProvider>
                        </ProdtutoProvider>
                    </LoginProvider>
                </SocketProvider>
            </CadastroUsuarioProvider>
        </>
    )
}