import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useAtendimentoContext } from "../../contexto/Atendimento"
import { Botao } from "../../componentes/Botao/Botao"
import { TextField, Button } from '@mui/material';

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
        <Container style={{margin: "80px"}}>
            <form onSubmit={entrar}>
                <Row justify="center" >
                    <Col xxxl={4} xxl={4} xl={4} lg={4} md={8} sm={12}>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Cliente"
                                    onChange={setCliente}
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
                                    onChange={setMesa}
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
                                    onChange={setComanda}
                                    type="text"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Button variant="contained" >
                                Entrar
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}