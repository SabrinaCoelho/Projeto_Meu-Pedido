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
    
    const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    
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
            axios.get("http://localhost:3001/api/comandas/"+comanda.comandaId, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
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
        //Atualiza total da comanda
        let [,total] = comandaDaVez.total.split(/\s/);
        total = parseFloat(total.replace(/,/, '.'));

        let itemPreco = parseFloat(item.preco.split(/\s/)[1].replace(/,/, '.')) * parseInt(item.un);
        total -= itemPreco;
        //Formata e manda pro banco
        let totalAtualizadoFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        
        axios.put("http://localhost:3001/api/pedidos", {comandaDados: {
            comandaId: comandaDaVez.comandaId,
            restauranteId: comandaDaVez.restauranteId,
            pedidoId: item.id,
            total: totalAtualizadoFormatado
            }},
            )
            .then(
                res => {
                    if(res && res.data){
                        socket.emit("pedido_cancelado", {
                            comandaId: comandaDaVez.comandaId,
                            restauranteId: comandaDaVez.restauranteId,
                            pedidoId: item.id
                        })
                        const {comandaAtualizada} = res.data;
                        setComandaDaVez(comandaAtualizada);
                    }
                    setCarregando(false)
                }
            )
            .catch(err => {//TODO
                alert(err.response.data.message);
            });
    }
    const finalizarAtendimento = () => {
        setTermino(new Date())
        console.log(comanda.termino)
        axios.put("http://localhost:3001/api/comandas/finalizar/"+comanda.comandaId, {comanda},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
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
            console.log(err)
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
                                Comanda n° {comandaDaVez.comandaId}
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography variant="body" component="body">
                                Cliente: {comandaDaVez.cliente}
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography variant="body" component="body">
                                Mesa: {comandaDaVez.mesa}
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography variant="body" component="body">
                                Atendente: {comandaDaVez.atendenteNome}
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography variant="body" component="body">
                                Código de acesso: {comandaDaVez.codigo}
                            </Typography>
                        </Col>
                    </Row>
                        {
                            comandaDaVez.pedidos.length ? comandaDaVez.pedidos.map(
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
                                            item.ativo && comandaDaVez.status === "aberto" ? (
                                                <CardActions>
                                                    <Container>
                                                        <Row style={{justifyContent: "right"}}>
                                                            <Button variant="contained" onClick={()=>cancelaItem(item)}>
                                                                Cancelar
                                                            </Button>
                                                        </Row>
                                                    </Container>
                                                </CardActions>
                                            ): !item.ativo ? (
                                                <CardActions>
                                                    <Typography component="body">
                                                        Pedido cancelado
                                                    </Typography>
                                                </CardActions>
                                            ): <></>
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
                                {comandaDaVez.total}
                            </Typography>
                        </Col>
                    </Row>
                    {
                        comandaDaVez.status === "aberto" ?(
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
                                        if(usuario.id && comandaDaVez.comandaId){
                                            navegar("/perfil/restaurantes/"+comandaDaVez.restauranteId) 
                                        }else if(!usuario.id && comandaDaVez.comandaId){
                                            console.log("sem login")
                                            navegar("/restaurantes/"+comandaDaVez.restauranteId) 
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