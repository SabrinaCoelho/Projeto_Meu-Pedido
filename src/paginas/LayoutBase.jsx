import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import { Tipografia } from "../componentes/Tipografia/Tipografia"
import { Cabecalho } from "../componentes/Cabecalho/Cabecalho";
import { Link } from "../componentes/Link/Link";
import { Link as RouterLink } from "react-router-dom/dist";
import { Rodape } from "../componentes/Rodape/Rodape"
import { CadastroUsuarioProvider } from "../contexto/CadastroUsuario";
import { LoginProvider } from "../contexto/Login";

export const LayoutBase = () => {
  return (
    <>
        
            <LoginProvider>
                <Cabecalho>
                    <Container>
                        <Row align="center">
                            <Col>
                                <Tipografia variante="body" componente="h4">
                                    Meu Pedido
                                </Tipografia>
                            </Col>
                            <Row>
                                <Col style={{ textAlign: 'center' }}>
                                    <Link>
                                        Sobre
                                    </Link>
                                </Col>
                                <Col>
                                    <RouterLink to="/cadastro/tipo-usuario">
                                        
                                            Cadastro
                                        
                                    </RouterLink>
                                </Col>
                                <Col>
                                    <RouterLink to="/acesso-comanda-digital">
                                        
                                            Comanda Digital
                                        
                                    </RouterLink>
                                </Col>
                            </Row>
                            <Col style={{ textAlign: 'right' }}>
                                
                                    Login
                                
                            </Col>
                        </Row>
                    </Container>
                </Cabecalho>
                <Container style={{margin: "80px auto"}}>
                    <Outlet/>
                </Container>
                <Rodape>
                    <Container>
                        <Row>
                            <Col style={{alignItems: "center"}}>
                            <Tipografia variante="legenda" componente="body">
                                2024
                            </Tipografia>
                            </Col>
                        </Row>
                    </Container>
                </Rodape>
            </LoginProvider>
    </>
  );
}
