import { Tipografia } from "../../componentes/Tipografia/Tipografia"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { Container, Col, Row } from "react-grid-system"
import { Botao } from "../../componentes/Botao/Botao"
import { Link } from "react-router-dom"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { useLocation } from 'react-router-dom';
import { useLoginContext } from "../../contexto/Login"
import TextField from '@mui/material/TextField';
import { Avatar, Button } from "@mui/material"

export const CadastroUsuario = () => {
    const {pathname} = useLocation()
    console.log(pathname)

    const {
        login
    } = useLoginContext()

    const { 
        usuario, 
        setNome, 
        setTelefone,
        setRestauranteId,
        setEmail, 
        setSenha, 
        setCnpj, 
        setSenhaConfirmada, 
        setEndereco,
        setInformacoes,
        submeterUsuario
    } = useCadastroUsuarioContext()
    console.log(usuario)
    const finalizarCadastro = (evento) => {
        evento.preventDefault();
        submeterUsuario()
    }
    const atualizarCadastro = (evento) => {
        console.log("OK");
        evento.preventDefault();
        submeterUsuario()
    }

    return (
        <Container>
            <form onSubmit={true ? atualizarCadastro: finalizarCadastro}>
                <Row justify="center" style={{margin: "1.2rem"}}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 150, height: 150 }}
                    />
                </Row>
                {usuario.tipo == 1 ||  login.tipo == '1'? 
                    (
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Nome"
                                            defaultValue=""
                                            onChange={setNome}
                                            size="small"
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="CNPJ"
                                            defaultValue=""
                                            onChange={setCnpj}
                                            type="number"
                                            size="small"
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="E-mail"
                                            onChange={setEmail}
                                            type="email"
                                            size="small"
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Endereço"
                                            onChange={setEndereco}
                                            type="text"
                                            size="small"
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Endereço"
                                            onChange={setTelefone}
                                            type="number"
                                            size="small"
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Texto informativo"
                                            onChange={setInformacoes}
                                            type="text"
                                            size="small"
                                            multiline
                                            rows={4}
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
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
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Confirmar senha"
                                            onChange={setSenhaConfirmada}
                                            type="password"
                                            size="small"
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Texto informativo"
                                            onChange={setInformacoes}
                                            type="text"
                                            size="small"
                                            multiline
                                            rows={4}
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label=""
                                            type="file"
                                            size="small"
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ) : null
                }
                {usuario.tipo == 2 || login.tipo == '2' ? 
                    (
                    <>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Nome completo"
                                    defaultValue=""
                                    onChange={setNome}
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Funcionário do restaurante"
                                    defaultValue=""
                                    onChange={setRestauranteId}
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
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
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Confirmar senha"
                                    onChange={setSenhaConfirmada}
                                    type="password"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        
                    </>) : null
                }
                {usuario.tipo == 3 || login.tipo == '3' ? 
                    (
                    <>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Nome completo"
                                    defaultValue=""
                                    onChange={setNome}
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    onChange={setEmail}
                                    type="email"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
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
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Confirmar senha"
                                    onChange={setSenhaConfirmada}
                                    type="password"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        
                    </>) : null
                }
                {
                    pathname.includes("cadastro/dados-usuario") ?
                    (
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                {/* <Link to=".."> */}
                                    <Button variant="contained">
                                        Anterior
                                    </Button>
                                {/* </Link> */}
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                <div style={{ textAlign: 'right' }}>
                                    <Button variant="contained">
                                        Próxima
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    ):(
                        <Row>
                            <Col>
                                <div style={{ textAlign: 'right' }}>
                                    <Button varinat="contained">
                                        Atualizar cadastro 
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    )
                } 
            </form>  
        </Container>
    )
}