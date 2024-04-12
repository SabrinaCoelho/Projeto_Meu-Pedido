import { Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useAtendimentoContext } from "../../contexto/Atendimento"
import { Botao } from "../../componentes/Botao/Botao"

export const Atendimento = () => {

    const {
        atendimento,
        setCliente,
        setMesa,
        setComanda
    } = useAtendimentoContext()

    const entrar = (event) => {
        event.preventDefault();
        console.log(atendimento)
    }
    
    return (
        <form onSubmit={entrar}>
            <Row justify="center" >
                <Col xxxl={4} xxl={4} xl={4} lg={4} md={8} sm={12}>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Cliente" 
                                valor={atendimento.cliente}
                                onChange={setCliente}
                                tipo="text"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <CampoTexto 
                                titulo="Mesa" 
                                valor={atendimento.mesa}
                                onChange={setMesa}
                                tipo="text"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <CampoTexto 
                                titulo="Comanda" 
                                valor={atendimento.comanda}
                                onChange={setComanda}
                                tipo="text"
                            />
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Botao variante="primaria" >
                            Entrar
                        </Botao>
                    </Row>
                </Col>
            </Row>
        </form>
    )
}