import { createBrowserRouter } from "react-router-dom";
import { LayoutBase } from "../paginas/LayoutBase";
import { LayoutBasePerfil } from "../paginas/LayoutBasePerfil";
import { Inicio } from "../paginas/Inicio/Inicio";
import { Login } from "../paginas/Login/Login";
import { AcessoComandaDigital } from "../paginas/ComandaDigital/AcessoComandaDigital";
import { SelecaoTipoUsuario } from "../paginas/CadastroUsuario/SelecaoTipoUsuario";
import { CadastroUsuario } from "../paginas/CadastroUsuario/CadastroUsuario";
import { Tipografia } from "../componentes/Tipografia/Tipografia";
import { Atendimento } from "../paginas/InicioAtendimento/InicioAtendimento";
import { PesquisarRestaurantes } from "../paginas/PesquisaRestaurantes/PesquisaRestaurantes";
import { ComandaDigital } from "../paginas/ComandaDigital/Comanda";

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
            {
                path: "comanda-digital",
                element: <ComandaDigital/>
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
                path: "acesso-comanda-digital",
                element: <AcessoComandaDigital/>
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