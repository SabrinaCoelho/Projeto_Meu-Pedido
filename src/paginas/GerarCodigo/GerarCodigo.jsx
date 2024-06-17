import { Container, Row } from "react-grid-system"
import { Button, Typography } from '@mui/material';
import { useState } from "react";
import axios from "axios";
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario";

export const GerarCodigo = () => {

    const [ codigoGerado, setCodigoGerado ] = useState("");
    const { usuario } = useCadastroUsuarioContext();
    
    const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    const geraCodigo = () => {//preciso do id do restaurante
        // console.log({
        //     atendenteId: usuario.id,
        //     restauranteId: usuario.restauranteId
        // })
        axios.post("http://localhost:3001/api/gera-codigo", {
            atendenteId: usuario.id,
            restauranteId: usuario.restauranteId
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(
                res => {
                    if(res && res.data){
                        const { codigo } = res.data.codigo;
                        setCodigoGerado(codigo);
                    }
                }
            )
            .catch(err => {//TODO
                alert(err.response.data.message)
            })
    }
    
    return (
        <Container style={{margin: "80px"}}>
            <Typography component="h1" variant="h3" sx={{ textAlign: "center", my: 3 }} >
                Gerar código de acesso
            </Typography>
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