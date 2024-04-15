import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useAtendimentoContext } from "../../contexto/Atendimento"
import { Botao } from "../../componentes/Botao/Botao"
import { useState } from "react"
import { TextField, Button } from "@mui/material"

export const PesquisarRestaurantes = () => {
    const [pesquisa, setPesquisa] = useState("")

    const entrar = (event) => {
        event.preventDefault();
        console.log(pesquisa)
    }
    
    return (
        <Container style={{margin: "80px"}}>
            <form onSubmit={entrar}>
                <Row justify="center" align="center">
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12}>
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Nome do restaurante ou ID"
                            defaultValue=""
                            onChange={setPesquisa}
                            size="small"
                            margin="dense"
                        />
                    </Col>
                    <Col justify="right" xxl={2} xl={2} lg={2} md={2} sm={12}>
                        <Button variant="contained" >
                            Pesquisar
                        </Button>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}