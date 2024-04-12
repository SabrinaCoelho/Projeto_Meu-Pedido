import { Col, Row } from "react-grid-system"
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
        <form onSubmit={entrar}>
            <Row justify="center" >
                <Col xxxl={6} xxl={6} xl={6} lg={6} md={8} sm={12}>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Nome do restaurante ou ID" 
                                valor={pesquisa}
                                onChange={setPesquisa}
                                tipo="text"
                            />
                        </Col>
                        <Col justify="right">
                            <Botao variante="primaria" >
                                Entrar
                            </Botao>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </form>
    )
}