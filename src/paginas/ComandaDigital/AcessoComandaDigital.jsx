import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { Botao } from "../../componentes/Botao/Botao"
import { TextField, Button } from "@mui/material"
import { useComandaContext } from "../../contexto/Comanda"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const AcessoComandaDigital = () => {

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

    const navegar = useNavigate()

    const acessar = (event) => {
        event.preventDefault();
        console.log(comanda)
        axios.post("http://localhost:3001/comanda/"+comanda.comandaID, {})//TODO NO BACK
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res);
                    if(res){
                        navegar("/acesso-comanda-digital/comanda-digital")
                    }
                }
            )
            .catch(err => {//TODO
                console.log("NAO deu certo")
            }

        )

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
                                    onChange={({target}) => setComandaID(target.value)}
                                    type="number"
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