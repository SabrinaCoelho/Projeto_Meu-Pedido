import { Container, Col, Row } from "react-grid-system"
import { Link } from "react-router-dom"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { useLocation } from 'react-router-dom';
import { useLoginContext } from "../../contexto/Login"
import TextField from '@mui/material/TextField';
import { Avatar, Button } from "@mui/material"
import { useCadastroAtendenteContext } from "../../contexto/CadastroAtendente";
import { useEffect } from "react";
import axios from "axios";

export const CadastroUsuario = ({addAtendente}) => {
    const token = localStorage.getItem("token");

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
    const { 
        atendente, 
        setNomeAtendente, 
        setTipoAtendente,
        setRestauranteIdAtendente,
        setEmailAtendente, 
        setSenhaAtendente,
        setSenhaConfirmadaAtendente,
        submeterUsuarioAtendente,
        resetAtendente,
        setSubmetido,
    } = useCadastroAtendenteContext()


    useEffect(
        () => {
            setTipoAtendente("atendente");
            setRestauranteIdAtendente(usuario.id);
        }, [addAtendente]
    );
    const finalizarCadastro = (evento) => {
        evento.preventDefault();
        //submeterUsuario()
    }
    const atualizarCadastro = (evento) => {
        evento.preventDefault();
        submeterUsuario()
    }

    const criarAtendente = () => {
        //submeterUsuarioAtendente();
        
        axios.post("http://localhost:3001/api/aut/registro", {usuario: atendente})
            .then(
                res => {
                    if(res && res.data){
                        alert(res.data.message);
                        // resetAtendente();
                        setNomeAtendente("");
                        setEmailAtendente("");
                        setSenhaAtendente("");
                        setSenhaConfirmadaAtendente("");
                        setSubmetido(true)
                        addAtendente = null;
                    }
                }
            )
            .catch(err => {//TODO
                alert(err.response.data.message);
            }
        )
    }
    const atualizaCadastro = () => {
        
        axios.put("http://localhost:3001/api/aut/registro", {usuario},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(
                res => {
                    if(res && res.data){
                        alert(res.data.message);
                    }
                }
            )
            .catch(err => {//TODO
                alert(err.response.data.message);
            }
        )
    }
    return (
        <Container>
            <form onSubmit={true ? atualizarCadastro: finalizarCadastro} id="cadastro">
                {
                    !addAtendente ?
                    <Row justify="center" style={{margin: "1.2rem"}}>
                        <Avatar
                            alt={usuario.nome}
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 150, height: 150 }}
                        />
                    </Row>: <></>
                }
                {usuario.tipo == "restaurante" && !addAtendente ? 
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
                                            defaultValue={usuario.cnpj}
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
                                            label="Endereço"
                                            defaultValue={usuario.endereco}
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
                                            defaultValue={usuario.informacoes}
                                            onChange={({target}) => {
                                                console.log(target.value)
                                                setInformacoes(target.value)
                                            }}
                                            type="text"
                                            size="small"
                                            multiline
                                            rows={4}
                                            margin="dense"
                                        />
                                    </Col>
                                </Row>
                                {/* <Row>
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
                                </Row> */}
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
                                    label="Email"
                                    defaultValue={usuario.email}
                                    onChange={({target}) => setEmail(target.value)}
                                    type="email"
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Funcionário do restaurante (Restaurante ID)"
                                    defaultValue={usuario.restauranteId}
                                    onChange={({target}) => setRestauranteId(target.value)}
                                    size="small"
                                    margin="dense"
                                />
                            </Col>
                        </Row> */}
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
                {addAtendente  && usuario.tipo === "restaurante" ? 
                    (<>
                        <Row>
                            <Col>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Nome completo"
                                    defaultValue={atendente.nome}
                                    onChange={({target}) => setNomeAtendente(target.value)}
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
                                    defaultValue={atendente.email}
                                    onChange={({target}) => setEmailAtendente(target.value)}
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
                                    label="Funcionário do restaurante (Restaurante ID)"
                                    defaultValue={usuario.id}
                                    size="small"
                                    margin="dense"
                                    disabled="true"
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
                                    onChange={({target}) => setSenhaAtendente(target.value)}
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
                                    onChange={({target}) => setSenhaConfirmadaAtendente(target.value)}
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
                                        Adicionar
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    ): !addAtendente ?(
                        <Row>
                            <Col>
                                <div style={{ textAlign: 'right' }}>
                                    <Button variant="contained" onClick={() => atualizaCadastro()}>
                                        Atualizar cadastro 
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    ): (
                        <Col>
                            <div style={{ textAlign: 'right' }}>
                                <Button variant="contained" onClick={() => criarAtendente()}>
                                    Adicionar atendente!
                                </Button>
                            </div>
                        </Col>
                    )
                } 
            </form>  
        </Container>
    )
}