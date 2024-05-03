import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useAtendimentoContext } from "../../contexto/Atendimento"
import { Botao } from "../../componentes/Botao/Botao"
import { TextField, Button } from '@mui/material';
import { useComandaContext } from "../../contexto/Comanda";
import { useLoginContext } from "../../contexto/Login";

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
        setErros,
        setAtendente,
        setCliente,
        setMesa,
        setComandaID,
        setInicio,
        setTermino,
        submeterComanda
    } = useComandaContext()

    const iniciar = (event) => {//preciso do id do restaurante
        event.preventDefault();
        const dataInicio = new Date();
        setInicio(dataInicio);
        setAtendente(login.email)
        submeterComanda()
    }
    
    return (
        <Container style={{margin: "80px"}}>
            <form onSubmit={iniciar}>
                <Row justify="center" >
                    <Col xxxl={4} xxl={4} xl={4} lg={4} md={8} sm={12}>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Cliente"
                                    onChange={({target}) => setCliente(target.value)}
                                    type="text"
                                    size="small"
                                    margin="dense"
                                />
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
                        <Row>
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
                        </Row>
                        <Row justify="center">
                            <Button variant="contained" type="submit">
                                Iniciar
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}