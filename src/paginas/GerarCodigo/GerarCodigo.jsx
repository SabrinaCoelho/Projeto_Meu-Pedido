import { Col, Container, Row } from "react-grid-system"
import { Button, TextField, Typography } from '@mui/material';
import { useState } from "react";
import axios from "axios";
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario";

export const GerarCodigo = () => {

    const [ codigoGerado, setCodigoGerado ] = useState("");
    const [ mesa, setMesa ] = useState("");
    const [ bloqueado, setBloqueado ] = useState(false);
    const { usuario } = useCadastroUsuarioContext();
    
    const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    const geraCodigo = () => {
        axios.post("http://localhost:3001/api/gera-codigo", {
                atendenteId: usuario.id,
                restauranteId: usuario.restauranteId,
                mesa
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(
                res => {
                    console.log("geraCodigo")
                    if(res && res.data){
                        const { codigo } = res.data.codigo;
                        setBloqueado(true);
                        setCodigoGerado(codigo);
                    }
                }
            )
            .catch(err => {
                alert(err.response.data.message)
            })
    }
    
    return (
        <Container style={{margin: "80px"}}>
            <Typography component="h1" variant="h3" sx={{ textAlign: "center", my: 3 }} >
                Gerar código de acesso
            </Typography>
            <Row>
                <Col >
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Mesa"
                        defaultValue={mesa}
                        onChange={({target}) => setMesa(target.value)}
                        type="text"
                        size="small"
                        margin="dense"
                        disabled={bloqueado}
                    />
                </Col>
            </Row>
                
            {
                codigoGerado?
                <Typography component="h2" variant="h5" sx={{ textAlign: "center", my: 2 }}>
                    {codigoGerado}
                </Typography>
                :<></>
            }
            <Row justify="center">
                <Button variant="contained" onClick={() => geraCodigo()}>
                    Gerar
                </Button>
            </Row>
        </Container>
    )
}