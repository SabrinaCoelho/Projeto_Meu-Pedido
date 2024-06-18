import { createBrowserRouter } from "react-router-dom";
import { LayoutBase } from "../paginas/LayoutBase";
import { LayoutBasePerfil } from "../paginas/LayoutBasePerfil";
import { Inicio } from "../paginas/Inicio/Inicio";
import { Login } from "../paginas/Login/Login";
import { AcessoComandaDigital } from "../paginas/ComandaDigital/AcessoComandaDigital";
import { SelecaoTipoUsuario } from "../paginas/CadastroUsuario/SelecaoTipoUsuario";
import { CadastroUsuario } from "../paginas/CadastroUsuario/CadastroUsuario";
import { Atendimento } from "../paginas/InicioAtendimento/InicioAtendimento";
import { PesquisarRestaurantes } from "../paginas/PesquisaRestaurantes/PesquisaRestaurantes";
import { ComandaDigital } from "../paginas/ComandaDigital/ComandaDigital";
import { Cardapio } from "../paginas/Cardapio/Cardapio";
import { LayoutProviders } from "../paginas/LayoutProviders";
import Typography from '@mui/material/Typography';
import ConfigurarFuncionario from "../paginas/ConfigurarFuncionario/ConfigurarFuncionario";
import { HistoricoAtendimentos } from "../paginas/HistoricoAtendimentos/HistoricoAtendimentos";
import { PesquisarComandas } from "../paginas/PesquisarComandas/PesquisarComandas"
import ControlePedidos from "../paginas/ControlePedidos/ControlePedidos";
import { GerarCodigo } from "../paginas/GerarCodigo/GerarCodigo";
import { ProtectedRoute } from "../componentes/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutProviders/>,
        children: [
            {
                path: "perfil",
                element: <ProtectedRoute allowedTypes={["restaurante", "atendente", "cliente"]}><LayoutBasePerfil/></ProtectedRoute>,
                children:[
                    {
                        path: "",
                        element: <Typography variant="h1" component="h1">O que deseja fazer?</Typography>
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
                        path: "pedidos",
                        element: <ProtectedRoute allowedTypes={["restaurante"]}><ControlePedidos/></ProtectedRoute>
                    },
                    {
                        path: "restaurantes/:restauranteId",//TO DO REVISAR
                        element: <PesquisarRestaurantes/>
                    },
                    {
                        path: "comanda-digital",
                        element: <ComandaDigital/>
                    },
                    {
                        path: "gerar-codigo",
                        element: <ProtectedRoute allowedTypes={["atendente"]}><GerarCodigo/></ProtectedRoute>
                    },
                    {
                        path: "acesso-comanda-digital",
                        element: <ProtectedRoute allowedTypes={["atendente", "cliente"]}><AcessoComandaDigital/></ProtectedRoute>,
                        children:[
                            {
                                path: "comanda-digital",
                                element: <ProtectedRoute allowedTypes={["atendente", "cliente"]}><ComandaDigital/></ProtectedRoute>
                            }
                        ]
                    },
                    {
                        path: "cardapio",
                        element: <Cardapio/>
                    },
                    {
                        path: "configurar-funcionarios",
                        element: <ProtectedRoute allowedTypes={["restaurante"]}><ConfigurarFuncionario/></ProtectedRoute>
                    },
                    {
                        path: "historico-atendimentos",
                        element: <HistoricoAtendimentos/>
                    },
                    {
                        path: "comandas-em-andamento",
                        element: <ProtectedRoute allowedTypes={["atendente"]}><PesquisarComandas/></ProtectedRoute>
                    },
                    {
                        path:"acesso-negado" ,
                        element: <Typography>Acesso negado</Typography>
                    },
                ]
            },
            {
                path: "",
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
                        path: "restaurantes",
                        element: <PesquisarRestaurantes/>
                    },
                    {
                        path: "restaurantes/:restauranteId",//TO DO REVISAR
                        element: <PesquisarRestaurantes/>
                    },
                    {
                        path: "comanda-digital",
                        element: <ComandaDigital/>
                    },
                    {
                        path: "cadastro",
                        children: [
                            {
                                path: "",
                                element: <SelecaoTipoUsuario/>
                            },
                            {
                                path: "dados-usuario",
                                element: <CadastroUsuario/>
                            },
                        ] 
                    }
                ]
            },
            
        ],
        
    },
    {
        path:"acesso-negado" ,
        element: <Typography>Acesso negado</Typography>
    },
    {
        path:"*" ,
        element: <Typography>Xiii</Typography>
    }
])