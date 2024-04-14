import { CadastroUsuarioProvider } from "../contexto/CadastroUsuario"
import { LoginProvider } from "../contexto/Login"
import { Outlet } from "react-router-dom"

export const LayoutProviders = () => {
    return(
        <>
            <CadastroUsuarioProvider>
                <LoginProvider>
                    <Outlet/>
                </LoginProvider>
            </CadastroUsuarioProvider>
        </>
    )
}