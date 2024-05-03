import { CadastroUsuarioProvider } from "../contexto/CadastroUsuario"
import { LoginProvider } from "../contexto/Login"
import { ProdtutoProvider } from "../contexto/Produto"
import { ComandaProvider } from "../contexto/Comanda"
import { Outlet } from "react-router-dom"

export const LayoutProviders = () => {
    return(
        <>
            <CadastroUsuarioProvider>
                <LoginProvider>
                    <ProdtutoProvider>
                        <ComandaProvider>
                            <Outlet/>
                        </ComandaProvider>
                    </ProdtutoProvider>
                </LoginProvider>
            </CadastroUsuarioProvider>
        </>
    )
}