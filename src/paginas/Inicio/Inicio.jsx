import { Container, Row, Col } from "react-grid-system"
import { WrapperConteudo } from "../../componentes/WrapperConteudo/WrapperConteudo"
import { Tipografia } from "../../componentes/Tipografia/Tipografia"
import { Botao } from "../../componentes/Botao/Botao"
import { Link } from "react-router-dom/dist"
import { Typography, Button } from "@mui/material"


export const Inicio = () => {
    return(
        <Container style={{margin: "7rem auto"}}>
            <Row>
                <Col>
                    <Row>
                        <Typography variant="h2" component="h1" textAlign="center">
                            Com Meu Pedido você dá autonomia e otimiza o atendimento ao seu cliente
                        </Typography>
                    </Row>
                    <Row>
                        <Typography variant="h5" component="h2" textAlign="center">
                            Através da comanda digital ambos ficam por dentro de todos os pedidos feitos em tempo real, além de diminuir o tempo de espera por um atendente.
                        </Typography>
                    </Row>
                </Col>
            </Row>
            <Row justify="center" style={{margin: "2rem auto"}}>
                <Col xxxl={6} xxl={6} xl={2} lg={2} md={2} sm={2}>
                    <Button variant="outlined">
                        Saiba mais
                    </Button>
                </Col>
                <Col xxxl={6} xxl={6} xl={2} lg={2} md={2} sm={2}>
                    <Link to="/login">
                        <Button variant="contained">
                            Login
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}