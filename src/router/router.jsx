import { createBrowserRouter } from "react-router-dom";
import { LayoutBase } from "../paginas/LayoutBase";
import { LayoutBasePerfil } from "../paginas/LayoutBasePerfil";
import { Inicio } from "../paginas/Inicio/Inicio";
import { Login } from "../paginas/Login/Login";
import { ComandaDigital } from "../paginas/ComandaDigital/ComandaDigital";
import { SelecaoTipoUsuario } from "../paginas/CadastroUsuario/SelecaoTipoUsuario";
import { CadastroUsuario } from "../paginas/CadastroUsuario/CadastroUsuario";
import { Tipografia } from "../componentes/Tipografia/Tipografia";
import { Atendimento } from "../paginas/InicioAtendimento/InicioAtendimento";
import { PesquisarRestaurantes } from "../paginas/PesquisaRestaurantes/PesquisaRestaurantes";

export const router = createBrowserRouter([
    
    {
        path: "perfil",
        element: <LayoutBasePerfil/>,
        children:[
            {
                path: "",
                element: <Tipografia variante="h4" componente="h1">O que deseja fazer?</Tipografia>
            },
            {
                path: "atualizar-dados",
                element: <CadastroUsuario/>
            },
            {
                path: "iniciar-atendimento",
                element: <Atendimento/>
            },
            {
                path: "restaurantes",
                element: <PesquisarRestaurantes/>
            },
        ]
    },
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
            }
        ]
    }
])