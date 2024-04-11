import styled from '@emotion/styled'
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from 'react-grid-system';
import { Cabecalho } from '../componentes/Cabecalho/Cabecalho';
import { Tipografia } from '../componentes/Tipografia/Tipografia';
import { Link } from '../componentes/Link/Link';
import { Link as RouterLink } from 'react-router-dom'; 
import { useCadastroUsuarioContext } from "../contexto/CadastroUsuario"



const SideMenu = styled.div`
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;

`
const SideMenuItem = styled.a`
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;

    &:hover{
        color: #f1f1f1;
    }
`
const Conteudo = styled.div`
    margin-left: 200px;
`
export const LayoutBasePerfil = () => {
    const { 
        usuario
    } = useCadastroUsuarioContext()

    let itens = []

    if(usuario.tipo == '1'){//atendimento
        itens = ["Atualizar cadastro", "Histórico de atendimentos", "Iniciar atendimento", "Pedidos em andamento"]
    }else if(usuario.tipo == '2'){//cliente
        itens = ["Atualizar cadastro", "Histórico de atendimentos", "Iniciar atendimento", "Restaurantes", "Comanda digital"]
    }else{
        itens = ["Atualizar cadastro", "Configurar funcionários", "Cardápio", "Histórico de atendimentos", "Chamados", "Pedidos"]
    }
    return(
        <>
            <SideMenu>
                <div>
                    <Tipografia variante="h4" componente="h1">Perfil</Tipografia>
                </div>
                {
                    itens.map(e => (<SideMenuItem>
                        <Tipografia variante="body" componente="body">
                            {e}
                        </Tipografia>
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
        </>
    )
}