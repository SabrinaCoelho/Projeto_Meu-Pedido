import { Container, Row, Col } from "react-grid-system";
import { Estilos } from "./componentes/EstilosGlobais/Estilos"
import { ProvedorTema } from "./componentes/ProvedorTema/ProvedorTema"
import { Tipografia } from "./componentes/Tipografia/Tipografia"
import { WrapperConteudo } from "./componentes/WrapperConteudo/WrapperConteudo"
import { Botao } from "./componentes/Botao/Botao";
import { Cabecalho } from "./componentes/Cabecalho/Cabecalho";
import { Link } from "./componentes/Link/Link";
import { Rodape } from "./componentes/Rodape/Rodape";
import { CampoTexto } from "./componentes/CampoTexto/CampoTexto";

function App() {
  return (
    <ProvedorTema>
      <Estilos/>
        <Cabecalho>
          <Container>
            <Row align="center">
              <Col>
                <Tipografia variante="body" componente="h4">
                  Meu Pedido
                </Tipografia>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <Link>
                  Login
                </Link>
              </Col>
            </Row>
          </Container>
        </Cabecalho>
        <Container style={{margin: "80px auto"}}>
          <Row justify="center">
            <Col style={{textAlign: 'center'}}>
            <WrapperConteudo>
                <Tipografia variante="h1" componente="h1">
                  Com Meu Pedido você dá autonomia e otimiza o atendimento ao seu cliente
                </Tipografia>
                <Tipografia variante="h3" componente="h2">
                  Através da comanda digital ambos ficam por dentro de todos os pedidos feitos em tempo real, além de diminuir o tempo de espera por um atendente.
                </Tipografia>
                <Row justify="center">
                  <Col>
                    <Botao variante="secundaria">
                      Saiba mais
                    </Botao>
                  </Col>
                  <Col>
                    <Botao variante="primaria">
                      Login
                    </Botao>
                  </Col>
                </Row>
              </WrapperConteudo>
            </Col>
          </Row>
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
    </ProvedorTema>
  );
}

export default App;
