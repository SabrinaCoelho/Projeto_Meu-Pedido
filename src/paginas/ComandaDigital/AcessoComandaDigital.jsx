import { Container, Col, Row } from "react-grid-system"
import { TextField, Button } from "@mui/material"
import { useComandaContext } from "../../contexto/Comanda"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"

export const AcessoComandaDigital = () => {

    const {
        comanda,
        setComandaId,
        setAtendenteId,
        setAtendenteNome,
        setCliente,
        setInicio,
        setMesa,
        setPedidos,
        setRestauranteId,
        setTermino,
        setTotal
    } = useComandaContext()

    const { 
        usuario
    } = useCadastroUsuarioContext()

    const navegar = useNavigate()

    const acessar = (event) => {
        event.preventDefault();
        if(usuario.id){//TODO - deixa pra autenticação coletar
            console.log("tem usuario")
            axios.get("http://localhost:3001/api/comandas/"+comanda.comandaId, {})//TODO NO BACK
                .then(
                    res => {
                        console.log("OK, CHAOS!")
                        if(res && res.data){
                            let { comandaId, atendenteId, atendenteNome, cliente, inicio, mesa, restauranteId, termino, total, pedidos} = res.data.comanda;
                            console.log(res.data.comanda);
                            setComandaId(comandaId)
                            setAtendenteId(atendenteId)
                            setAtendenteNome(atendenteNome)
                            setCliente(cliente)
                            setInicio(inicio)
                            setMesa(mesa)
                            //setPedidos(pedidos)
                            setRestauranteId(restauranteId)
                            setTermino(termino)
                            setTotal(total)
                            console.log(restauranteId)
                            console.log({
                                comandaId: comandaId,
                                usuarioId: usuario.id,
                                restauranteId: restauranteId
                            })
                            
                            navegar("/perfil/comanda-digital")
                        }
                    }
                )
                .catch(err => {//TODO
                    console.log("NAO deu certo")
                }

            )
        }else if(!usuario.id && comanda.comandaId){
            // alert("Não foi possivel acessar a comanda.")
            axios.get("http://localhost:3001/api/comandas/"+comanda.comandaId, {})//TODO NO BACK
                .then(
                    res => {
                        console.log("OK, CHAOS!")
                        if(res && res.data){
                            let { comandaId, atendenteId, atendenteNome, cliente, inicio, mesa, restauranteId, termino, total, pedidos} = res.data.comanda;
                            console.log(res.data.comanda);
                            setComandaId(comandaId)
                            setAtendenteId(atendenteId)
                            setAtendenteNome(atendenteNome)
                            setCliente(cliente)
                            setInicio(inicio)
                            setMesa(mesa)
                            //setPedidos(pedidos)
                            setRestauranteId(restauranteId)
                            setTermino(termino)
                            setTotal(total)
                            console.log(restauranteId)
                            console.log({
                                comandaId: comandaId,
                                usuarioId: usuario.id,
                                restauranteId: restauranteId
                            })
                            
                            navegar("/comanda-digital")
                        }
                    }
                )
                .catch(err => {//TODO
                    console.log("NAO deu certo")
                }

            )
        }
    }
    
    return (
        <Container>
            <form onSubmit={acessar}>
                <Row justify="center" >
                    <Col xxxl={6} xxl={6} xl={6} lg={6} md={8} sm={12}>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Digite o n° da comanda"
                                    onChange={({target}) => setComandaId(target.value)}
                                    type="text"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Button variant="contained" type="submit">
                                Acessar comanda
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}