import { createBrowserRouter } from "react-router-dom";
import { LayoutBase } from "../paginas/LayoutBase";
import { LayoutBasePerfil } from "../paginas/LayoutBasePerfil";
import { Inicio } from "../paginas/Inicio/Inicio";
import { Login } from "../paginas/Login/Login";
import { ComandaDigital } from "../paginas/ComandaDigital/ComandaDigital";
import { SelecaoTipoUsuario } from "../paginas/CadastroUsuario/SelecaoTipoUsuario";
import { CadastroUsuario } from "../paginas/CadastroUsuario/CadastroUsuario";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutBase/>,
        children: [
            {
                path: "",
                element: <Inicio/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "comanda-digital",
                element: <ComandaDigital/>
            },
            {
                path: "cadastro",
                children: [
                    {
                        path: "tipo-usuario",
                        element: <SelecaoTipoUsuario/>
                    },
                    {
                        path: "dados-usuario",
                        element: <CadastroUsuario/>
                    },
                ] 
            },
            {
                path: "perfil",
                element: <LayoutBasePerfil/>,
                children:[
                    {
                        path: "atualizar-dados",
                        element: <h1>KIRYU-CHAN</h1>
                    }
                ]
            }
        ]
    }
])