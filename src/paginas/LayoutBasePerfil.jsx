import styled from '@emotion/styled'
import { Outlet, useLocation, useParams } from "react-router-dom";
import { Col, Container, Row } from 'react-grid-system';
import { Cabecalho } from '../componentes/Cabecalho/Cabecalho';
import { Tipografia } from '../componentes/Tipografia/Tipografia';
import { Link } from '../componentes/Link/Link';
import { Link as RouterLink } from 'react-router-dom'; 
import { CadastroUsuarioProvider, useCadastroUsuarioContext } from "../contexto/CadastroUsuario";
import { LoginProvider } from "../contexto/Login";
import { useLoginContext } from "../contexto/Login"
import MenuLateral from "../componentes/MenuLateral/MenuLateral"
import { useEffect } from 'react';
import axios from 'axios';

const SideMenu = styled.div`
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
`
const SideMenuItem = styled.a`
    padding: 6px 6px 6px 6px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    margin: 0;
    &:hover{
        color: #f1f1f1;
    }
`
const Conteudo = styled.div`
    margin-left: 200px;
`
const ContainerPerfil = styled.div`
    height: 200px;
    width: 100%;
    background-color: pink;
`
export const LayoutBasePerfil = () => {
    
    let {pathname} = useLocation()
    let teste = pathname.split("/")
    pathname = teste[1]
    console.log(pathname)
    let userId = teste[2]

    const {
        login
    } = useLoginContext()
    
    const { 
        setNome, 
        setTelefone,
        setRestauranteId,
        setEmail, 
        setSenha, 
        setCnpj, 
        setSenhaConfirmada, 
        setEndereco,
        setInformacoes,
        submeterUsuario
    } = useCadastroUsuarioContext()
    
    useEffect(
        () => {
            axios.get("http://localhost:3001/usuarios/"+userId, )
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res);
                    if(res){
                        setNome(res.data.nome);
                        setEmail(res.data.email);
                    }
                }
            )
            .catch(err => {//TODO
                console.log("NAO deu certo")
            }

            ) 
        }, [login, userId]
    )

    let itens = []
    if(login.tipo == '1'){
        itens = [
            {
                texto: "Atualizar cadastro",
                link: "/perfil/atualizar-dados"
            },
            {
                texto: "Configurar funcionários",
                link: "/perfil/configurar-funcionarios"
            },
            {
                texto: "Cardápio",
                link: "/perfil/cardapio"
            },
            {
                texto: "Histórico de atendimentos",
                link: "/perfil/historico-atendimentos"
            },
            {
                texto: "Chamados",
                link: "/perfil/chamados"
            },
            {
                texto: "Pedidos",
                link: "/perfil/pedidos"
            },
        ]
    }else if(login.tipo == '2'){
        itens = [
            {
                texto: "Atualizar cadastro",
                link: "/perfil/atualizar-dados"
            },
            {
                texto: "Histórico de atendimentos",
                link: "/perfil/historico-atendimentos"
            },
            {
                texto: "Iniciar atendimento",
                link: "/perfil/iniciar-atendimento"
            },
            {
                texto: "Comandas em andamento",
                link: "/perfil/comandas-em-andamento"
            },
        ]
    }else{
        itens = [
            {
                texto: "Atualizar cadastro",
                link: "/perfil/atualizar-dados"
            },
            {
                texto: "Histórico de atendimentos",
                link: "/perfil/historico-atendimentos"
            },
            {
                texto: "Iniciar atendimento",
                link: "/perfil/iniciar-atendimento"
            },
            {
                texto: "Restaurantes",
                link: "/perfil/restaurantes"
            },
            {
                texto: "Comanda digital",
                link: "/perfil/comanda-digital"
            },
        ]
    }
    return(
        <MenuLateral itensMenu={itens}>
            <Outlet/>
        </MenuLateral>
    )
}

/* 

                    <SideMenu>
                        <ContainerPerfil>
                            <Container>
                                <Row>
                                    <Col>
                                        <Tipografia variante="h5" componente="h1">
                                            Perfil
                                        </Tipografia>
                                    </Col>
                                </Row>
                            </Container>
                        </ContainerPerfil>
                        {
                            itens.map((e, i) => (
                            <SideMenuItem key={i}>
                                <RouterLink to={e.link}>
                                    <Tipografia variante="body" componente="body" style={{margin: '0'}}>
                                        {e.texto}
                                    </Tipografia>
                                </RouterLink>
                            </SideMenuItem>))
                        }
                    </SideMenu>
                    <Conteudo>
                        <Cabecalho>
                            <Container>
                                <Row align="right">
                                    <Col style={{ textAlign: 'right' }}>
                                        <Link>
                                            Logout
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>
                        </Cabecalho>
                        <Container fluid style={{minHeight: "80vh"}}>
                            <Outlet/>
                        </Container>
                    </Conteudo>
*/