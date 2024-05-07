import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useLoginContext } from "../../contexto/Login"
import { Botao } from "../../componentes/Botao/Botao"
import { WrapperConteudo } from "../../componentes/WrapperConteudo/WrapperConteudo"
import { useComandaContext } from "../../contexto/Comanda"
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useEffect, useState } from "react"
import axios from "axios"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"

export const ComandaDigital = () => {
    const [ comandas, setComandas ] = useState(null);
    const [ carregando, setCarregando ] = useState(true);
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
    const { 
        usuario
    } = useCadastroUsuarioContext()

    const iniciar = (event) => {
        event.preventDefault();
        console.log(comanda)
    }
    useEffect(
        () => {
            console.log(usuario.email)
            axios.get("http://localhost:3001/comandasAbertas/"+usuario.email, {})
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res);
                    setComandas(res.data);
                    setCarregando(false)
                }
            )
            .catch(err => {//TODO
                console.log("NAO deu certo")
                setCarregando(false)
            }

        )
        }, [carregando]
    )
    
    return comandas && comandas.length ? comandas.map(
            (comanda, i) => (
                <Container style={{paddingBottom: "100px"}} key={i}>
                    <Row justify="between">
                        <Col>
                            <Typography variant="h5" component="h1">
                                Pedidos
                            </Typography>
                        </Col>
                        <Col>
                            <Typography variant="h5" component="h1">
                                Comanda n° {comanda.comandaID}
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography variant="body" component="body">
                                Cliente: {comanda.cliente}
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography variant="body" component="body">
                                Mesa: {comanda.mesa}
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography variant="body" component="body">
                                Atendente: {comanda.atendente}
                            </Typography>
                        </Col>
                    </Row>
                        {
                            comanda.pedidos.length ? comanda.pedidos.flatMap(
                                (pedido) => {
                                    return pedido.itens.map(
                                        (item, i) => (
                                            <Card variant="outlined" sx={{ minWidth: "100%" }} key={i}>
                                                <CardContent>
                                                    <Container>
                                                        <Row justify="between">
                                                            <div>
                                                                <Typography variant="h6" component="h6">{item.nome}</Typography>
                                                            </div>
                                                            <div>
                                                                <Typography variant="h6" component="h6">{item.un} X R$ {item.preco}</Typography>
                                                            </div>
                                                        </Row>
                                                        <Row justify="between">
                                                            <div>
                                                                <Typography variant="body" component="body">{item.descricao}</Typography>
                                                            </div>
                                                            <div>
                                                                <Typography variant="body" component="body">{pedido.data}-{pedido.hora}</Typography>
                                                            </div>
                                                        </Row>
                                                        <Row justify="between">
                                                            <div>
                                                                <Typography variant="body" component="body">{item.un} Un.</Typography>
                                                            </div>
                                                            <div>
                                                                <Typography variant="body" component="body">Efetuado por {pedido.atendente}</Typography>
                                                            </div>
                                                        </Row>
                                                    </Container>
                                                </CardContent>
                                                <CardActions>
                                                    <Container>
                                                        <Row style={{justifyContent: "right"}}>
                                                            <Button variant="contained">
                                                                Cancelar
                                                            </Button>
                                                        </Row>
                                                    </Container>
                                                </CardActions>
                                            </Card>
                                        )
                                    )
                                }
                            ) :
                            <Typography variant="h3" component="h1">
                                Ainda não há pedidos
                            </Typography>
                        }
                    <Row justify="between">
                        <Col>
                            <Typography variant="h5" component="h1">
                                Total
                            </Typography>
                        </Col>
                        <Col>
                            <Typography variant="h5" component="h1">
                                {comandaPedidos.total}
                            </Typography>
                        </Col>
                    </Row>
                    <Row justify="right">
                        <Col>
                            <Button variant="contained">Finalizar atendimento</Button>
                        </Col>
                        <Col style={{marginLeft: "10px"}}>
                            <Button variant="contained">Cardápio</Button>
                        </Col>
                    </Row>
                </Container>
            )
        )
    : <></>
      
}