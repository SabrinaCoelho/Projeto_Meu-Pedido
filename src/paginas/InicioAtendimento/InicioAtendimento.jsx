import { Container, Col, Row } from "react-grid-system"
import { TextField, Button } from '@mui/material';
import { useComandaContext } from "../../contexto/Comanda";
import { useLoginContext } from "../../contexto/Login";
import { useNavigate } from "react-router-dom";
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario";

export const Atendimento = () => {

    /* const {
        atendimento,
        setCliente,
        setMesa,
        setComanda
    } = useAtendimentoContext()

    const entrar = (event) => {
        event.preventDefault();
        console.log(atendimento)
    } */
    const {
        login
    } = useLoginContext();
    const {
        comanda,
        setRestauranteId,
        setErros,
        setAtendenteId,
        setAtendenteNome,
        setCliente,
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
        if(!comanda.cliente) setCliente(usuario.email)
        console.log(comanda)
        submeterComanda()
    }
    
    return (
        <Container style={{margin: "80px"}}>
            <form onSubmit={iniciar}>
                <Row justify="center" >
                    <Col xxxl={4} xxl={4} xl={4} lg={4} md={8} sm={12}>
                        <Row>
                            <Col>
                                {
                                    usuario.tipo === "cliente"?(
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

                                                setRestauranteId(usuario.restauranteId)
                                                console.log(comanda)
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