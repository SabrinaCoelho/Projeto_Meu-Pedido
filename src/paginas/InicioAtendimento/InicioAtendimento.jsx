import { Container, Col, Row } from "react-grid-system"
import { TextField, Button } from '@mui/material';
import { useComandaContext } from "../../contexto/Comanda";
import { useLoginContext } from "../../contexto/Login";
import { useNavigate } from "react-router-dom";
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario";
import axios from "axios";

export const Atendimento = () => {

    const {
        login
    } = useLoginContext();
    const {
        comanda,
        setRestauranteId,
        setErros,
        setCodigo,
        setAtendenteId,
        setAtendenteNome,
        setCliente,
        setClienteId,
        setMesa,
        setComandaID,
        setInicio,
        setTermino,
        submeterComanda
    } = useComandaContext()
    const navegar = useNavigate();

    const { 
        usuario
    } = useCadastroUsuarioContext()

    const iniciar = (event) => {//preciso do id do restaurante
        event.preventDefault();
        const dataInicio = new Date();
        setInicio(dataInicio);
        if((!comanda.cliente || !comanda.clienteId) && usuario.tipo === "cliente"){//Se estiver vazio -> cliente que esta iniciando
            setCliente(usuario.email)
            setClienteId(usuario.id)
        }
        submeterComanda()
    }
    const pesquisaCodigo = (value) => {
        setCodigo(value);
        axios.get("http://localhost:3001/api/mesa-codigo/"+comanda.codigo)
            .then(
                res => {
                    if(res && res.data){
                        console.log(res)
                        //setMesa()
                        //setCardapio(res.data.produtos);
                    }
                    //setCarregando(false)
                }
            )
            .catch(err => {//TODO
                console.log(err)
                //setCarregando(false)
            }
        )
    }
    return (
        <Container style={{margin: "80px"}}>
            <form onSubmit={iniciar}>
                <Row justify="center" >
                    <Col>
                        <Row>
                            <Col>
                                {
                                    usuario.tipo === "cliente"?(
                                        <>
                                            <TextField
                                                fullWidth
                                                id="outlined-required"
                                                label="Cliente"
                                                defaultValue={usuario.id}
                                                type="text"
                                                size="small"
                                                margin="dense"
                                                disabled="true"
                                            />
                                            
                                            <TextField
                                                fullWidth
                                                required
                                                id="outlined-required"
                                                label="Código"
                                                onChange={({target}) => pesquisaCodigo(target.value)}
                                                onBlur={({target}) => pesquisaCodigo(target.value)}
                                                type="text"
                                                size="small"
                                                margin="dense"
                                            />
                                        </>
                                    ): usuario.tipo === "atendente" ? (
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Cliente"
                                            onChange={({target}) => {
                                                setAtendenteId(usuario.id)
                                                setAtendenteNome(usuario.nome)
                                                //PARA CLIENTE NAO CADASTRADO:
                                                //É responsabilidade do cliente saber e guardaro nome 
                                                //que ele ta dando pra depois, se precisar, chegar no balcao
                                                //e pedir pra ver a comanda
                                                
                                                //PARA CLIENTE CADASTRADO:
                                                //Ideal seria passar o id, mas é muito grande - TODO URG -> SOL1: usuario criar nickname?
                                                setCliente(target.value)
                                                setRestauranteId(usuario.restauranteId)
                                            }}
                                            onBlur={({target}) => {
                                                setAtendenteId(usuario.id)
                                                setAtendenteNome(usuario.nome)
                                                setCliente(target.value)
                                                setClienteId(target.value);
                                                setRestauranteId(usuario.restauranteId)
                                                // console.log(comanda)
                                            }}
                                            type="text"
                                            size="small"
                                            margin="dense"
                                        />
                                    ):<></>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Mesa"
                                    onChange={({target}) => setMesa(target.value)}
                                    type="text"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col >
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Comanda"
                                    onChange={({target}) => setComandaID(target.value)}
                                    type="text"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row> */}
                        <Row justify="center">
                            <Button variant="contained" type="submit" onClick={() => {
                                //navegar("/perfil/comanda-digital")
                                console.log(comanda)
                            }}>
                                Iniciar
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}