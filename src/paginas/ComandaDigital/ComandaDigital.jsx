import { Container, Col, Row } from "react-grid-system"
import { useComandaContext } from "../../contexto/Comanda"
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useEffect, useState } from "react"
import axios from "axios"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { useNavigate } from "react-router-dom"
import { useSocketContext } from "../../contexto/Socket"

export const ComandaDigital = () => {
    // const [ comandas, setComandas ] = useState(null);
    const [ comandaDaVez, setComandaDaVez ] = useState(null);
    const [ carregando, setCarregando ] = useState(true);
    const [ itemCancelado, setItemCancelado ] = useState();
    
    const { socket } = useSocketContext();
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
        setTotal,
        setTermino
    } = useComandaContext()
    const { 
        usuario
    } = useCadastroUsuarioContext()

    /* const { atendimento, setRestauranteId } = useAtendimentoContext(); */
    const navegar = useNavigate();
    const iniciar = (event) => {
        event.preventDefault();
        console.log(comanda)
    }
    useEffect(
        () => {
            console.log(comanda)
            axios.get("http://localhost:3001/api/comandas/"+comanda.comandaId, {})
            .then(
                res => {
                    const { comanda } = res.data;
                    setComandaDaVez(comanda);//TODO
                    if(usuario.tipo === "cliente"){
                        /* if(!socket.connected){//TODO melhorar isso aqui
                            socket.connect();
                        } */
                        socket.emit("acessa_comanda", {
                            comandaId: comanda.comandaId,
                            usuarioId: usuario.id,
                            restauranteId: comanda.restauranteId
                        })
                    }
                    setCarregando(false)
                }
            )
            .catch(err => {//TODO
                console.log("NAO deu certo")
                setCarregando(false)
            }
        )
        }, [carregando, comanda]
    )
    const cancelaItem = (item) => {
        //TODO
        const pedidoCancelado = {
            comandaId: comanda.comandaId,
            restauranteId: comanda.restauranteId
        }
        socket.emit("pedido_cancelado", pedidoCancelado)
        axios.put("http://localhost:3001/api/pedidos", {comandaDados: {
            comandaId: comanda.comandaId,
            restauranteId: comanda.restauranteId,
            pedidoId: item.id
        }})
            .then(
                res => {
                    if(res && res.data){
                        console.log(res.data.pedido)
                        setComandaDaVez(res.data.pedido)//TODO- Nao ta atualizando
                    }
                    setCarregando(false)
                }
            )
            .catch(err => {//TODO
                alert(err.response.data.message);
            })
        /* item.ativo = false
        setItemCancelado(item) */
    }
    const finalizarAtendimento = () => {
        setTermino(new Date())
        console.log(comanda.termino)
        axios.put("http://localhost:3001/api/comandas/finalizar/"+comanda.comandaId, {comanda})//TODO REVISAR
        .then(
            res => {
                if(res && res.data && res.data.comandaFechada){
                    console.log("OK, CHAOS!")
                    //setComandas([res.data.comanda]);//TODO
                }
                setCarregando(true)
            }
        )
        .catch(err => {//TODO
            console.log("NAO deu certo")
            setCarregando(false)
        })
    }
    return comandaDaVez ? (
                <Container style={{paddingBottom: "100px"}}>
                    <Row justify="between">
                        <Col>
                            <Typography variant="h5" component="h1">
                                Pedidos
                            </Typography>
                        </Col>
                        <Col>
                            <Typography variant="h5" component="h1">
                                Comanda n° {comanda.comandaId}
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
                                Atendente: {comanda.atendenteNome}
                            </Typography>
                        </Col>
                    </Row>
                        {
                            comanda.pedidos.length ? comanda.pedidos.map(
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
                                                        <Typography variant="body" component="body">{item.data}</Typography>
                                                    </div>
                                                </Row>
                                                <Row justify="between">
                                                    <div>
                                                        <Typography variant="body" component="body">{item.un} Un.</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="body" component="body">Efetuado por {item.atendente}</Typography>
                                                    </div>
                                                </Row>
                                            </Container>
                                        </CardContent>
                                        {
                                            item.ativo ? (
                                                <CardActions>
                                                    <Container>
                                                        <Row style={{justifyContent: "right"}}>
                                                            <Button variant="contained" onClick={()=>cancelaItem(item)}>
                                                                Cancelar
                                                            </Button>
                                                        </Row>
                                                    </Container>
                                                </CardActions>
                                            ):(
                                                <Typography component="body">
                                                    Pedido cancelado
                                                </Typography>
                                            )
                                        }
                                    </Card>
                                )
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
                                {comanda.total}
                            </Typography>
                        </Col>
                    </Row>
                    {
                        comanda.status === "aberto" ?(
                            <Row justify="between">
                                {
                                    usuario.tipo === "atendente" || usuario.tipo === "restaurante" ?
                                    (
                                        <Col>
                                            <Button variant="contained" onClick={finalizarAtendimento}>
                                                Finalizar atendimento
                                            </Button>
                                        </Col>
                                    ): null
                                }
                                <Col style={{marginLeft: "10px"}}>
                                    <Button variant="contained" onClick={() => {
                                        if(usuario.id && comanda.comandaId){
                                            navegar("/perfil/restaurantes/"+comanda.restauranteId) 
                                        }else if(!usuario.id && comanda.comandaId){
                                            console.log("sem login")
                                            navegar("/restaurantes/"+comanda.restauranteId) 
                                        }
                                    }}>Cardápio</Button>
                                </Col>
                            </Row>
                        ):(
                            <Typography component="body">
                                Esta comanda está finalizada.
                            </Typography>
                        )
                    }
                </Container>
            )
        
    : <></>
      
}