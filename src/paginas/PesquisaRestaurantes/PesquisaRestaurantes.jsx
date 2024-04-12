import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useAtendimentoContext } from "../../contexto/Atendimento"
import { Botao } from "../../componentes/Botao/Botao"
import { useState } from "react"

export const PesquisarRestaurantes = () => {
    const [pesquisa, setPesquisa] = useState("")

    const entrar = (event) => {
        event.preventDefault();
        console.log(pesquisa)
    }
    
    return (
        <Container style={{margin: "80px"}}>
            <form onSubmit={entrar}>
                <Row justify="center" align="center">
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12}>
                        <CampoTexto 
                            titulo="Nome do restaurante ou ID" 
                            valor={pesquisa}
                            onChange={setPesquisa}
                            tipo="text"
                        />
                    </Col>
                    <Col justify="right" xxl={2} xl={2} lg={2} md={2} sm={12}>
                        <Botao variante="primaria" >
                            Pesquisar
                        </Botao>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}