import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useLoginContext } from "../../contexto/Login"
import { Botao } from "../../componentes/Botao/Botao"
import { WrapperConteudo } from "../../componentes/WrapperConteudo/WrapperConteudo"
import { useComandaContext } from "../../contexto/Comanda"
import { Tipografia } from "../../componentes/Tipografia/Tipografia"


export const ComandaDigital = () => {
    const comandaPedidos = {//TODO
        total: "30,00"
    }
    const pedidos = [
        {
            id: "",
            comanda: "",
            atendente: "Rohan",
            hora: "10:06:10",
            data: "10/05/2024",
            total: "30,00",
            itens: [
                {
                    nome: "Bolo de laranja",
                    descricao: "Bolo de laranja. Contém glútem, derivados de leite, ovos, e laranja.",
                    un: "1",
                    preco: "25,00",
                    ativo: "true"
                },
                {
                    nome: "Suco de laranja 400ml",
                    descricao: "Contém laranja.",
                    un: "1",
                    preco: "5,00",
                    ativo: "true"
                }
            ]
        }
    ]
    const {
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
    }
    
    return (
        <Container style={{paddingBottom: "100px"}}>
            <Row justify="between">
                <Col>
                    <Tipografia variante="h1" componente="h1">
                        Pedidos
                    </Tipografia>
                </Col>
                <Col>
                    <Tipografia variante="h1" componente="h1">
                        Comanda n° {comanda.comandaID}
                    </Tipografia>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tipografia variante="body" componente="body">
                        Cliente: {comanda.cliente}
                    </Tipografia>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tipografia variante="body" componente="body">
                        Mesa: {comanda.mesa}
                    </Tipografia>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tipografia variante="body" componente="body">
                        Atendente: {comanda.atendente}
                    </Tipografia>
                </Col>
            </Row>
            {
                pedidos.flatMap(
                    (pedido) => {
                        return pedido.itens.map(
                            (item, i) => (
                                <WrapperConteudo key={i}>
                                    <Container>
                                        <Row justify="between">
                                            <div>
                                                <Tipografia variante="body" componente="body">{item.nome}</Tipografia>
                                            </div>
                                            <div>
                                                <Tipografia variante="body" componente="body">{item.un} X R$ {item.preco}</Tipografia>
                                            </div>
                                        </Row>
                                        <Row justify="between">
                                            <div>
                                                <Tipografia variante="body" componente="body">{item.descricao}</Tipografia>
                                            </div>
                                            <div>
                                                <Tipografia variante="body" componente="body">{pedido.data}-{pedido.hora}</Tipografia>
                                            </div>
                                        </Row>
                                        <Row justify="between">
                                            <div>
                                                <Tipografia variante="body" componente="body">{item.un} Un.</Tipografia>
                                            </div>
                                            <div>
                                                <Tipografia variante="body" componente="body">Efetuado por {pedido.atendente}</Tipografia>
                                            </div>
                                        </Row>
                                        <Row justify="right">
                                            <Botao onClick={() => console.log("Cancelar pedido.")}>
                                                Cancelar
                                            </Botao>
                                        </Row>
                                    </Container>
                                </WrapperConteudo>
                            )
                        )
                    }
                )
            }
            <Row justify="between">
                <div>
                    <Tipografia variante="h1" componente="h1">
                        Total
                    </Tipografia>
                </div>
                <div>
                    <Tipografia variante="h1" componente="h1">
                        {comandaPedidos.total}
                    </Tipografia>
                </div>
            </Row>
            <Row justify="right">
                <div>
                    <Botao>Finalizar atendimento</Botao>
                </div>
                <div style={{marginLeft: "10px"}}>
                    <Botao>Cardápio</Botao>
                </div>
            </Row>
        </Container>
        
    )
}