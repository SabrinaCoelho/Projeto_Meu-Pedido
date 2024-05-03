import { Tipografia } from "../../componentes/Tipografia/Tipografia"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { Container, Col, Row } from "react-grid-system"
import { Botao } from "../../componentes/Botao/Botao"
import { Link, useNavigate } from "react-router-dom"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { useLocation } from 'react-router-dom';
import { useLoginContext } from "../../contexto/Login"
import TextField from '@mui/material/TextField';
import { Avatar, Button } from "@mui/material"

export const CadastroUsuario = () => {
    const {pathname} = useLocation()

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
    
    const finalizarCadastro = (evento) => {
        evento.preventDefault();
        console.log(usuario)
        //submeterUsuario()
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
                {usuario.tipo == "restaurante" ? 
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
                                            defaultValue={usuario.nome}
                                            onChange={({target}) => setNome(target.value)}
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
                                            onChange={({target}) => setCnpj(target.value)}
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
                                            onChange={({target}) => setEmail(target.value)}
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
                                            onChange={({target}) => setEndereco(target.value)}
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
                                            label="Senha"
                                            onChange={({target}) => setSenha(target.value)}
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
                                            onChange={({target}) => setSenhaConfirmada(target.value)}
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
                                            onChange={({target}) => setInformacoes(target.value)}
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
                {usuario.tipo == "atendente" ? 
                    (
                    <>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Nome completo"
                                    defaultValue={usuario.nome}
                                    onChange={({target}) => setNome(target.value)}
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
                                    defaultValue={usuario.restauranteId}
                                    onChange={({target}) => setRestauranteId(target.value)}
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
                                    defaultValue=""
                                    onChange={({target}) => setSenha(target.value)}
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
                                    defaultValue=""
                                    onChange={({target}) => setSenhaConfirmada(target.value)}
                                    type="password"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        
                    </>) : null
                }
                {usuario.tipo == "cliente" ? 
                    (
                    <>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Nome completo"
                                    defaultValue={usuario.nome}
                                    onChange={({target}) => setNome(target.value)}
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
                                    defaultValue={usuario.email}
                                    onChange={({target}) => setEmail(target.value)}
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
                                    defaultValue=""
                                    onChange={({target}) => setSenha(target.value)}
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
                                    defaultValue=""
                                    onChange={({target}) => setSenhaConfirmada(target.value)}
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
                                <Link to="..">
                                    <Button variant="contained">
                                        Anterior
                                    </Button>
                                </Link>
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                <div style={{ textAlign: 'right' }}>
                                    <Button variant="contained" onClick={submeterUsuario}>
                                        Cadastrar
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    ):(
                        <Row>
                            <Col>
                                <div style={{ textAlign: 'right' }}>
                                    <Button variant="contained">
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