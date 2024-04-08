import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import { Tipografia } from "../componentes/Tipografia/Tipografia"
import { Cabecalho } from "../componentes/Cabecalho/Cabecalho";
import { Link } from "../componentes/Link/Link";
import { Link as RouterLink } from "react-router-dom/dist";
import { Rodape } from "../componentes/Rodape/Rodape"
import { CadastroUsuarioProvider } from "../contexto/CadastroUsuario";

export const LayoutBase = () => {
  return (
    <>
        <CadastroUsuarioProvider>
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
                                    <Link>
                                        Cadastro
                                    </Link>
                                </RouterLink>
                            </Col>
                            <Col>
                                <RouterLink to="/cadastro/comanda-digital">
                                    <Link>
                                        Comanda Digital
                                    </Link>
                                </RouterLink>
                            </Col>
                        </Row>
                        <Col style={{ textAlign: 'right' }}>
                            <Link>
                                Login
                            </Link>
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
        </CadastroUsuarioProvider>
    </>
  );
}
