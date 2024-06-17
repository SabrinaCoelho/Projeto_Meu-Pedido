import { Container, Col, Row } from "react-grid-system"
import { useLoginContext } from "../../contexto/Login"
import { Button, TextField } from "@mui/material"
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

        axios.post("http://localhost:3001/api/aut/login", {login})
            .then(
                res => {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("usuario", res.data.usuario.email)
                    if(res){
                        navegar('/perfil')
                    }
                }
            )
            .catch(err => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
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