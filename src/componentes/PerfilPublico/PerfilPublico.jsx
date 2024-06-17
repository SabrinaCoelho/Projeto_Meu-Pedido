import { Container, Row, Col } from "react-grid-system"
import { Button, Typography } from "@mui/material"
import { Cardapio } from "../../paginas/Cardapio/Cardapio"
import { useNavigate, useParams } from "react-router-dom"
import { useComandaContext } from "../../contexto/Comanda"
import { useEffect, useState } from "react"
import axios from "axios"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"

export const PerfilPublico = ({restauranteDados}) => {
    
    const {comanda, setRestauranteId} = useComandaContext();
    const [carregando, setCarregando] = useState(true)
    const [ restaurante, setRestaurante ] = useState(null);
    
    const { restauranteId } = useParams();
    
    const { usuario } = useCadastroUsuarioContext();
    useEffect(
        () => {
            if(restauranteId){
                axios.get("http://localhost:3001/api/restaurantes/"+restauranteId)
                    .then(
                        res => {
                            if(res && res.data){
                                setRestaurante(res.data.restaurante);
                                setCarregando(false);
                            }
                        }
                    )
                    .catch(err => {//TODO
                        alert(err.response.data.message)
                        setCarregando(false)
                        console.log(err)
                    }

                    )
            }else{
                setRestaurante(restauranteDados);
                setCarregando(false);
            }
        }, [restauranteId, carregando, restauranteDados]
    );
    const navegar = useNavigate()

    return restaurante ? (
        <>
            <Row>
                <Col>
                    <Typography variant="h4" component="h1">
                        {restaurante.nome}
                    </Typography>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Typography variant="body" component="body">
                        {restaurante.nome}
                    </Typography>
                    <Typography variant="body" component="body">
                        {restaurante.email}
                    </Typography>
                    <Typography variant="body" component="body">
                        {restaurante.cnpj}
                    </Typography>
                    <Typography variant="body" component="body">
                        {restaurante.endereco}
                    </Typography>
                </Col>
            </Row>
            <Cardapio restauranteId={restaurante.id}/>
            {
                usuario.id && (!comanda.comandaId || comanda.restauranteId !== restaurante.id) ?(
                    <Button variant="contained" size="small" onClick={() => {
                        setRestauranteId(restaurante.id);
                        navegar("/perfil/iniciar-atendimento")
                    }}>
                        Iniciar atendimento
                    </Button>
                ): comanda.comandaId && comanda.restauranteId === restaurante.id ?(
                    <Button variant="contained" size="small" onClick={() => {
                        if(usuario.id && comanda.comandaId){
                            navegar("/perfil/comanda-digital") 
                        }else if(!usuario.id && comanda.comandaId){
                            console.log("sem login")
                            navegar("/comanda-digital")
                        }
                    }}>
                        Acessar comanda
                    </Button>
                ): (<></>)
            }
        </>
    ):<></>
}