import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useLoginContext } from "../../contexto/Login"
import { Botao } from "../../componentes/Botao/Botao"
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const navegar = useNavigate()
    const {
        login,
        setEmail,
        setSenha
    } = useLoginContext()

    const entrar = (event) => {
        event.preventDefault();
        console.log(login)

        axios.post("http://localhost:3001/login", {login})
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res);
                    if(res){
                        navegar('/perfil/'+res.data._id)
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
            <form onSubmit={entrar}>
                <Row justify="center" >
                    <Col xxxl={6} xxl={6} xl={6} lg={6} md={8} sm={12}>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    onChange={setEmail}
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
                                    label="Senha"
                                    onChange={setSenha}
                                    type="password"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Button variant="contained" type="submit">
                                Entrar
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}