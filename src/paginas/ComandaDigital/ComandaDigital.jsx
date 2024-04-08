import { Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { Botao } from "../../componentes/Botao/Botao"


export const ComandaDigital = () => {

    /* const {
        comanda,
        setErros,
        setAtendente,
        setCliente,
        setMesa,
        setComandaID,
        setInicio,
        setTermino,
        submeterComanda
    } = useComandaContext()

    const iniciar = (event) => {
        event.preventDefault();
        console.log(comanda)
    } */
    
    return (
        <form>
            <Row justify="center" >
                <Col xxxl={6} xxl={6} xl={6} lg={6} md={8} sm={12}>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Digite o n° da comanda:" 
                                valor={""}
                                onChange={null}
                                tipo="text"
                            />
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Botao variante="primaria" >
                            Acessar comanda
                        </Botao>
                    </Row>
                </Col>
            </Row>
        </form>
    )
}