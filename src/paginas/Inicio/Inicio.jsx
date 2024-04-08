import { Row, Col } from "react-grid-system"
import { WrapperConteudo } from "../../componentes/WrapperConteudo/WrapperConteudo"
import { Tipografia } from "../../componentes/Tipografia/Tipografia"
import { Botao } from "../../componentes/Botao/Botao"
import { Link } from "react-router-dom/dist"


export const Inicio = () => {
    return(
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
                            <Link to="/login">
                                <Botao variante="primaria">
                                    Login
                                </Botao>
                            </Link>
                        </Col>
                    </Row>
                </WrapperConteudo>
            </Col>
        </Row>
    )
}